<template>
    <div>
        <template v-for="(value, index) in activeDynamicFields">
            <GiftLightFields
                v-if="value.type == 'light'"
                :id="value.id"
                :key="`val-${value.id}`"
                :dynamic-field-input-data="dynamicFieldInputData"
                :iteration="index"
                :radio-field-options="value.fields[0].option"
                :honorees-name="value.fields[1][0].honoree"
                :notifiers-name="value.fields[2][0].notifier"
                :address-options="value.fields[3]"
                :active-dynamic-fields="activeDynamicFields"
                @updateDynamicFieldData="
                    (val, key, groupId) =>
                        updateData(val, key, groupId, 'light')
                "
                @removeDynamicField="val => removeField(val)"
            />
            <CustomDonationField
                v-if="value.type == 'customDonation'"
                :id="value.id"
                :key="`custom-donation-${index}`"
                :form-data="dynamicFieldInputData"
                :custom-donation-field="customDonationField[0].donation"
                @formattedMoneyValue="
                    (val, groupId) =>
                        addFormattedDonation(val, groupId, 'customDonation')
                "
                @updateDynamicFieldData="
                    (val, key, groupId) =>
                        updateData(val, key, groupId, 'customDonation')
                "
                @removeDynamicField="val => removeField(val)"
            />
        </template>
        <div class="py-10 border-b border-muted-blue">
            <div
                class="flex flex-row flex-wrap items-center justify-around space-y-6 md:space-y-0 -mx-3"
            >
                <div
                    v-for="btn in fieldButtons"
                    :key="btn.id"
                    class="w-full md:w-1/2 md:px-3"
                >
                    <button
                        v-tooltip="{
                            content:
                                btn.id == 'addCustomDonation'
                                    ? donationBtnTooltip
                                    : null,
                            classes: 'text-gold',
                        }"
                        class="bg-dark-blue text-gold py-4 px-6 lg:px-8 w-full font-default font-medium border-2 border-gold border-dashed text-sm focus:outline-none"
                        :class="
                            donationFieldActive
                                ? `${btn.id}Disabled`
                                : 'enabled'
                        "
                        @click.prevent="determineClickEvent(btn.id)"
                    >
                        {{ btn.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'DynamicFieldLayout',
    components: {
        GiftLightFields: () =>
            import('/components/forms/fields/GiftLightField.vue'),
        CustomDonationField: () =>
            import('/components/forms/fields/CustomDonationField.vue'),
    },
    props: {
        dynamicFieldInputData: {
            type: Object,
            default: Object,
        },
    },
    data() {
        return {
            fieldButtons: [
                {
                    id: 'addLight',
                    label: 'Add a Light ($30.00)',
                },
                {
                    id: 'addCustomDonation',
                    label: 'Add a Custom Donation',
                },
            ],
        }
    },
    computed: {
        // Map the active dynamic field state to this component
        ...mapState(['activeDynamicFields', 'donationField']),
        donationFieldActive() {
            return this.activeDynamicFields.some(
                obj => obj.type == 'customDonation'
            )
        },
        donationBtnTooltip() {
            return this.donationFieldActive
                ? 'Only one custom donation allowed'
                : false
        },
        addressOptions() {
            return {
                SubFields: [
                    {
                        ID: 'StreetAddress',
                        Label: 'Street Address',
                    },
                    {
                        ID: 'AddressLine2',
                        Label: 'Address Line 2',
                    },
                    {
                        ID: 'City',
                        Label: 'City',
                    },
                    {
                        ID: 'State',
                        Label: 'State',
                    },
                    {
                        ID: 'Postal',
                        Label: 'Zip Code',
                    },
                ],
            }
        },
        honoreesName() {
            return [
                {
                    honoree: {
                        Label: "Honoree's Name",
                    },
                },
            ]
        },
        notifiersName() {
            return [
                {
                    notifier: {
                        Label: 'Please Notify',
                    },
                },
            ]
        },
        customDonationField() {
            return [
                {
                    donation: {
                        Label: 'Custom Donation',
                    },
                },
            ]
        },
    },
    methods: {
        ...mapMutations({
            updateDynamicFieldData: 'updateDynamicFieldData',
            removeDynamicFieldData: 'removeDynamicFieldData',
            addDynamicField: 'addDynamicField',
            removeDynamicField: 'removeDynamicField',
            updateDynamicInputData: 'updateDynamicInputData',
        }),
        determineClickEvent(id) {
            if (id == 'addLight') {
                this.addLightField()
            } else {
                if (!this.donationFieldActive) {
                    this.addDonationFieldMethod()
                }
            }
        },
        // Radio options must be a method in order to generate unique values for radio values
        radioFieldOptions() {
            let options = {
                option: {
                    IsRequired: '1',
                    Choices: [
                        {
                            Label: 'In memory of',
                            // eslint-disable-next-line prettier/prettier
                            Value: `In memory of ${this.activeDynamicFields
                                .length + 1}`,
                            IsRequired: '1',
                        },
                        {
                            Label: 'In honor of',
                            // eslint-disable-next-line prettier/prettier
                            Value: `In honor of ${this.activeDynamicFields
                                .length + 1}`,
                            IsRequired: '1',
                        },
                    ],
                },
            }
            return options
        },
        guidGenerator(i) {
            let S4 = () =>
                (((i + Math.random()) * 0x10000) | 0).toString(16).substring(1)
            return S4()
        },
        id() {
            return this.guidGenerator(this.activeDynamicFields.length + 1)
        },
        // eslint-disable-next-line no-unused-vars
        updateData(val, key, groupId, fieldType) {
            // let val =
            //     'In memory of Tim Ford - Notify Gwen Ford - 123 S Street, Houston, Texas 77001\nIn memory of James Dean - Notify Charles Dean - 456 N Street, Dallas, Texas, 77890'

            // Save the values in vuex for submitting to wufoo
            this.updateDynamicFieldData({
                key: key,
                value: val,
                groupId: groupId,
                fieldType: fieldType,
            })

            // Add the values to the store for retaining input state between pages
            this.updateDynamicInputData({
                key: key,
                value: val,
            })
        },
        addFormattedDonation(val, groupId, fieldType) {
            this.updateDynamicFieldData({
                key: 'updatedDonation',
                value: val,
                groupId: groupId,
                fieldType: fieldType,
                addFormattedDonation: true,
            })
        },
        addLightField() {
            /**
             * Add the item to the UI and store
             */
            this.addDynamicField({
                id: this.id(),
                type: 'light',
                fields: [
                    this.radioFieldOptions(),
                    this.honoreesName,
                    this.notifiersName,
                    this.addressOptions,
                ],
            })
        },
        removeField(uniqueId) {
            /**
             * Remove the item from the UI and store
             */
            let index = this.activeDynamicFields.findIndex(
                o => o.id === uniqueId
            )
            if (index !== -1) {
                this.removeDynamicField(index)
                this.removeDynamicFieldData(uniqueId)
            } else {
                console.warn('Could not find index of item in array')
            }
        },
        addDonationFieldMethod() {
            /**
             * Add the item to the UI and store
             */
            // this.addDonationField(this.customDonationField)
            this.addDynamicField({
                id: this.id(),
                type: 'customDonation',
                fields: [this.customDonationField],
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.addCustomDonationDisabled {
    @apply cursor-not-allowed border-gray-600 text-gray-600;
}
</style>
