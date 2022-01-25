<template>
    <div class="field-area bg-dark-blue p-8 rounded-md relative mb-6">
        <font-awesome-icon
            class="absolute top-0 right-0 w-full text-gold my-6 mx-6 cursor-pointer"
            :icon="['fas', 'times']"
            @click="$emit('removeDynamicField', id)"
        />
        <div class="flex flex-wrap flex-row -mx-3">
            <div class="w-full px-3">
                <ValidationObserver slim>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Custom Donation"
                        rules="required|numeric|greaterThanZero"
                        :skip-if-empty="false"
                    >
                        <p
                            class="text-snow text-lg font-default font-thin mb-3"
                        >
                            Custom Donation
                        </p>
                        <!-- eslint-disable -->
                        <MoneyField
                            key="custom-donation"
                            v-model="value"
                            :form-data="formData"
                            :field="customDonationField"
                            :form-has-errors="errors.length > 0 ? true : false"
                            @input="val => updateDynamicFieldData(val, 'donation', id)"
                            @formattedValue="val => emitFormattedMoneyValue(val, id)"
                        />
                        <span class="text-red-500">
                            {{ errors[0] }}
                        </span>
                        <!-- eslint-enable -->
                    </ValidationProvider>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
export default {
    name: 'CustomDonationField',
    components: {
        MoneyField: () => import('~/components/forms/fields/MoneyField.vue'),
        ValidationObserver,
        ValidationProvider,
    },
    props: {
        id: {
            type: String,
            default: String,
        },
        customDonationField: {
            type: Object,
            default: Object,
        },
        formData: {
            type: Object,
            default: Object,
        },
    },
    data() {
        return {
            value: this.formData['donation'] ?? 0,
        }
    },
    watch: {
        value(value) {
            this.$root.$emit('updateDynamicInputVal', 'donation', value)
        },
    },
    methods: {
        ...mapMutations({
            updateDynamicInputData: 'updateDynamicInputData',
        }),
        updateDynamicFieldData(val, key, id) {
            // Add the values to the store for retaining input state between pages
            this.updateDynamicInputData({
                key: key,
                value: val,
            })
            this.$emit('updateDynamicFieldData', val, key, id)
        },
        emitFormattedMoneyValue(val, id) {
            this.$emit('formattedMoneyValue', val, id)
        },
    },
}
</script>
