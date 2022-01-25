<template>
    <div class="field-area bg-dark-blue p-8 rounded-md relative mb-6">
        <font-awesome-icon
            class="absolute top-0 right-0 w-full text-gold my-6 mx-6 cursor-pointer"
            :icon="['fas', 'times']"
            @click="$emit('removeDynamicField', id)"
        />
        <div class="flex flex-wrap flex-row -mx-3">
            <!-- eslint-disable -->
            <div v-if="radioFieldOptions" class="w-full mb-6 px-3">
                <!-- Radio field will always have default value, so no need for validation -->
                <RadioField
                    :key="`radio-${$vnode.key}`"
                    v-model="donationIdModel"
                    :form-data="dynamicFieldInputData"
                    :field="radioFieldOptions"
                    :label="lightFieldLabel"
                    :dynamic-key="`donationId${ iteration }`"
                    @input="val => updateDynamicFieldData(val, 'donationId' + iteration, id)"
                />
            </div>
            <div v-if="honoreesName" class="w-full md:w-1/2 px-3 mb-6">
                <ValidationObserver slim>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Honoree Name"
                        rules="required"
                        :skip-if-empty="false"
                    >
                        <TextField
                            :key="`honoree-${$vnode.key}`"
                            v-model="honoreeModel"
                            :form-data="dynamicFieldInputData"
                            :dynamic-key="`honoreeName${iteration}`"
                            :field="honoreesName"
                            :form-has-errors="errors.length > 0 ? true : false"
                            @input="val => updateDynamicFieldData(val, 'honoreeName' + iteration, id)"
                            
                        />
                        <span class="text-red-500">
                            {{ errors[0] }}
                        </span>
                    </ValidationProvider>
                </ValidationObserver>
            </div>
            <div v-if="notifiersName" class="w-full md:w-1/2 px-3 mb-6">
                <ValidationObserver slim>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Notifier Name"
                        :skip-if-empty="false"
                    >
                        <TextField
                            :key="`notify-${$vnode.key}`"
                            v-model="notifierNameModel"
                            :form-data="dynamicFieldInputData"
                            :dynamic-key="`notifierName${iteration}`"
                            :field="notifiersName"
                            :form-has-errors="errors.length > 0 ? true : false"
                            @input="val => updateDynamicFieldData(val, 'notifierName' + iteration, id)"
                        />
                        <span class="text-red-500">
                            {{ errors[0] }}
                        </span>
                    </ValidationProvider>
                </ValidationObserver>
            </div>
            <div v-if="addressOptions" class="w-full px-3">
                <!-- 
                    Adress component has multiple fields inside component, 
                    so validation is done in there instead of here.
                -->
                <AddressField
                    :key="`address-${$vnode.key}`"
                    v-model="addressModel"
                    :form-data="dynamicFieldInputData"
                    :dynamic-key="`address${iteration}`"
                    :field="addressOptions"
                    :conditional-parent-model="notifierNameModel"
                    field-type="dynamic"
                    @input=" val => updateDynamicFieldData(val, 'address' + iteration, id)"
                />
            </div>
            <!-- eslint-enable -->
        </div>
    </div>
</template>

<script>
import num2word from '~/mixins/NumberToWord'
import { mapMutations } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
export default {
    name: 'GiftLightField',
    components: {
        RadioField: () => import('~/components/forms/fields/RadioField.vue'),
        TextField: () => import('~/components/forms/fields/TextField.vue'),
        // eslint-disable-next-line prettier/prettier
        AddressField: () => import('~/components/forms/fields/AddressField.vue'),
        ValidationObserver,
        ValidationProvider,
    },
    mixins: [num2word],
    props: {
        iteration: {
            type: Number,
            default: 1,
        },
        id: {
            type: String,
            default: String,
        },
        radioFieldOptions: {
            type: Object,
            default: Object,
        },
        addressOptions: {
            type: Object,
            default: Object,
        },
        honoreesName: {
            type: Object,
            default: Object,
        },
        notifiersName: {
            type: Object,
            default: Object,
        },
        activeDynamicFields: {
            type: Array,
            default: Array,
        },
        dynamicFieldInputData: {
            type: Object,
            default: Object,
        },
    },
    data() {
        return {
            donationIdModel: '',
            honoreeModel:
                this.dynamicFieldInputData['honoreeName' + this.iteration] ??
                '',
            notifierNameModel:
                this.dynamicFieldInputData['notifierName' + this.iteration] ??
                '',
            addressModel:
                this.dynamicFieldInputData['address' + this.iteration] ?? {},
        }
    },
    computed: {
        lightFieldLabel() {
            let lightFields = this.activeDynamicFields.filter(
                el => el.type == 'light'
            )
            let lightIndex = lightFields.findIndex(x => x.id === this.id)
            return `My ${this.stringifyNumber(lightIndex + 1)} light is:`
        },
    },
    watch: {
        donationIdModel(value) {
            this.$root.$emit(
                'updateDynamicInputVal',
                'donationId' + this.iteration,
                value
            )
        },
        honoreeModel(value) {
            this.$root.$emit(
                'updateDynamicInputVal',
                'honoreeName' + this.iteration,
                value
            )
        },
        notifierNameModel(value) {
            this.$root.$emit(
                'updateDynamicInputVal',
                'notifierName' + this.iteration,
                value
            )
        },
        addressModel(value) {
            this.$root.$emit(
                'updateDynamicInputVal',
                'address' + this.iteration,
                value
            )
        },
    },
    methods: {
        ...mapMutations({
            updateDynamicInputData: 'updateDynamicInputData',
        }),
        determineRules(field) {
            let rules = field.IsRequired == '1' ? 'required' : ''
            rules =
                field.Type == 'email'
                    ? field.IsRequired == '1'
                        ? rules + '|email'
                        : 'email'
                    : rules
            return rules
        },
        endsWithNumber(str) {
            return isNaN(str.slice(-1)) ? 'false' : 'true'
        },
        updateDynamicFieldData(val, key, id) {
            // Format keys/values to remove indexes
            let formattedKey = this.endsWithNumber(key)
                ? key.slice(0, -1).trim()
                : key
            let formattedValue = key.includes('donationId')
                ? val.slice(0, -1).trim()
                : val

            // Add the values to the store for retaining input state between pages
            this.updateDynamicInputData({
                key: key,
                value: val,
            })
            this.$emit(
                'updateDynamicFieldData',
                formattedValue,
                formattedKey,
                id
            )
        },
    },
}
</script>
