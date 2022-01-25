<template>
    <ValidationObserver
        v-if="field.SubFields"
        slim
        class="flex flex-wrap -mx-3 -mb-3"
    >
        <ValidationProvider
            v-for="input in field.SubFields"
            v-slot="{ errors }"
            :key="input.ID"
            :name="input.ID"
            :rules="isRequired(input.ID)"
            :skip-if-empty="false"
            class="px-3 mb-6 w-full block"
            :class="{
                'md:w-1/2': splitInTwo(input.Label),
            }"
        >
            <TextField
                v-model="value[input.ID]"
                type="address"
                :form-data="formData"
                :dynamic-key="dynamicKey"
                :sub-field="input.ID"
                :set-value="getValue(input.ID)"
                :form-has-errors="errors.length > 0 ? true : false"
                :field="input"
                @input="val => updateField(val, input.ID)"
            />
            <span class="text-red-500">
                {{ errors[0] }}
            </span>
        </ValidationProvider>
    </ValidationObserver>
</template>

<script>
import TextField from '~/components/forms/fields/TextField.vue'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
export default {
    name: 'AddressField',
    components: {
        TextField,
        ValidationObserver,
        ValidationProvider,
    },
    props: {
        field: {
            type: [Object, Array],
            default: Object,
        },
        formData: {
            type: Object,
            default: Object,
        },
        dynamicKey: {
            type: String,
            default: String,
        },
        fieldType: {
            type: String,
            default: String,
        },
        conditionalParentModel: {
            type: String,
            default: String,
        },
    },
    data() {
        return {
            value: this.formData[this.dynamicKey] ?? {},
        }
    },
    methods: {
        splitInTwo(label) {
            const fieldsToSplit = [
                'Address Line 2',
                'State / Province / Region',
                'State',
                'City',
                'Zip Code',
                'Postal / Zip Code',
            ]
            return fieldsToSplit.includes(label)
        },
        // eslint-disable-next-line no-unused-vars
        getValue(key) {
            if (
                this.formData[this.dynamicKey] &&
                key in this.formData[this.dynamicKey]
            ) {
                return this.formData[this.dynamicKey][key]
            } else {
                return ''
            }
        },
        isRequired(id) {
            return this.fieldType == 'dynamic' &&
                this.conditionalParentModel.length > 0 &&
                id != 'AddressLine2'
                ? 'required'
                : ''
        },
        // eslint-disable-next-line no-unused-vars
        updateField(val, id) {
            if (this.fieldType == 'dynamic') {
                this.$emit('input', this.value)
            } else {
                let valArray = Object.entries(this.value)
                valArray.forEach(val => {
                    this.$emit('address', val[1], val[0])
                })
            }
        },
    },
}
</script>
