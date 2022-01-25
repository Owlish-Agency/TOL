<template>
    <!-- <div class="w-full page-height-form relative"> -->
    <div class="w-full relative">
        <template v-if="error != null">
            <div class="p-6 bg-light-blue rounded mb-10 text-white text-xl">
                <!-- eslint-disable -->
                <p v-html="error">
                    <font-awesome-icon
                        class="text-gold"
                        :icon="['fas', 'exclamation-triangle']"
                    />
                </p>
                <a
                    v-if="technicalError"
                    :href="technicalError"
                    class="mt-4 btn w-full"
                    >Report Issue</a
                >
                <!-- eslint-enable -->
            </div>
        </template>
        <ValidationObserver
            ref="form"
            v-slot="{ handleSubmit }"
            slim
            @submit.prevent="handleSubmit"
        >
            <form
                :name="formName"
                action=""
                @submit.prevent="handleSubmit(onSubmit)"
            >
                <FieldGroup
                    v-for="(fieldGroups, index) in formFields"
                    :key="'page' + (index + 1)"
                    :field-id="index"
                    :form-state="formState"
                >
                    <div
                        v-for="field in fieldGroups[1]"
                        :key="field[index]"
                        class="field-area w-full flex flex-wrap"
                        :class="{
                            'mb-6': !isInstructionsField(field),
                            'mb-1': isInstructionsField(field),
                        }"
                    >
                        <instructions
                            v-if="isInstructionsField(field)"
                            :heading="field.Title"
                            :sub-heading="field.Instructions"
                        />
                        <div v-else class="w-full">
                            <ValidationProvider
                                v-slot="{ errors }"
                                :name="field.Title"
                                :rules="determineRules(field)"
                                :skip-if-empty="isInstructionsField(field)"
                            >
                                <template v-if="field.ID === 'Field17'">
                                    <span class="text-red-500">
                                        {{ errors[0] }}
                                    </span>
                                    <SponsorshipFieldLayout
                                        v-model="sponsorshipValue"
                                        @selectedSponsorLevel="
                                            val =>
                                                updateFormData(val, field.ID, {
                                                    setValue: true,
                                                })
                                        "
                                    ></SponsorshipFieldLayout>
                                </template>
                                <template v-else>
                                    <component
                                        :is="formatComponentHandle(field.Type)"
                                        ref="input"
                                        :key="field.Type"
                                        v-model="formData[field.ID]"
                                        field-type="default"
                                        :form-data="formData"
                                        :short-name-data="shortNameData"
                                        :name="camelCaseStr(field.Title)"
                                        :field="field"
                                        :form-has-errors="
                                            errors.length > 0 ? true : false
                                        "
                                        @input="
                                            val =>
                                                updateFormData(val, field.ID, {
                                                    setValue: false,
                                                })
                                        "
                                        @address="
                                            (val, id) =>
                                                updateFormData(val, id, {
                                                    setValue: true,
                                                })
                                        "
                                        @formattedValueUpdated="
                                            val =>
                                                updateFormData(val, field.ID, {
                                                    setValue: true,
                                                })
                                        "
                                        @saveShortName="
                                            val => updateShortNameData(val)
                                        "
                                    />
                                    <span class="text-red-500">
                                        {{ errors[0] }}
                                    </span>
                                </template>
                            </ValidationProvider>
                        </div>
                    </div>
                    <DynamicFieldLayout
                        v-if="showDynamicFields(index)"
                        :dynamic-field-input-data="dynamicFieldInputData"
                    />
                    <FormPagination
                        :form-state="formState"
                        :form-fields="formFields"
                        :wufoo-error="error"
                        @goToNext="next"
                        @goToPrevious="back"
                    />
                </FieldGroup>
            </form>
        </ValidationObserver>
        <FormCheckout
            v-show="formState.isComplete"
            :form-name="formName"
            :wufoo-error="error"
            @submitToWufoo="val => onSubmit(val)"
        />
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
import formMixin from '~/mixins/FormMixin'
import 'isomorphic-fetch'

export default {
    name: 'Form',
    components: {
        'address-field': () =>
            import('/components/forms/fields/AddressField.vue'),
        'checkbox-field': () =>
            import('~/components/forms/fields/CheckboxField.vue'),
        'email-field': () => import('~/components/forms/fields/EmailField.vue'),
        instructions: () =>
            import('~/components/forms/fields/instructions.vue'),
        'money-field': () => import('~/components/forms/fields/MoneyField.vue'),
        'phone-field': () => import('~/components/forms/fields/PhoneField.vue'),
        'radio-field': () => import('~/components/forms/fields/RadioField.vue'),
        'shortname-field': () =>
            import('~/components/forms/fields/ShortnameField.vue'),
        'text-field': () => import('~/components/forms/fields/TextField.vue'),
        'textarea-field': () =>
            import('~/components/forms/fields/TextareaField.vue'),
        DynamicFieldLayout: () =>
            import('~/components/forms/layouts/DynamicFieldLayout.vue'),
        SponsorshipFieldLayout: () =>
            import('~/components/forms/layouts/SponsorshipFieldLayout.vue'),

        FieldGroup: () => import('~/components/forms/fields/FieldGroup.vue'),
        'file-field': () => import('~/components/forms/fields/FileField.vue'),
        FormPagination: () =>
            import('~/components/forms/layouts/FormPagination'),
        FormCheckout: () => import('~/components/forms/layouts/FormCheckout'),
        ValidationProvider,
        ValidationObserver,
    },
    mixins: [formMixin],
    props: {
        formName: {
            type: String,
            required: true,
            validator: value => {
                return (
                    ['gift-light-form', 'sponsorship-form'].indexOf(value) !==
                    -1
                )
            },
        },
        formFields: {
            type: Array,
            default: Array,
        },
    },
    data() {
        return {
            dataToSubmit: null,
            error: null,
            formHasErrors: false,
            formInstance: null,
            shortNameData: {},
            dynamicFieldInputData: {},
            sponsorshipValue: '',
            technicalError: null,
        }
    },
    computed: {
        priceData() {
            return this.$store.state.priceData
        },
    },
    mounted() {
        this.formInstance = this.$refs.form
        this.$root.$on('updateDynamicInputVal', (key, val) => {
            this.dynamicFieldInputData[key] = val
        })
    },
    methods: {
        showDynamicFields(index) {
            return this.formName == 'gift-light-form' && index == 0
        },
        isInstructionsField(field) {
            return (
                field.ClassNames != undefined &&
                field.ClassNames.includes('instruction-field')
            )
        },
        updateFormData(val, id, { setValue = false }) {
            // If field ID's are nested (shortname field), we have to
            // manually add the key/value pair
            if (setValue) {
                this.formData[id] = val
            }
            // Add the values to the store
            this.updateField({
                key: id,
                value: this.formData[id],
            })
            if (id === 'Field17') {
                this.sponsorshipValue = val
            }
        },
        updateShortNameData(value) {
            // Used to persist data in shortname field between 'step' changes
            this.shortNameData = value
        },
        async onSubmit(paymentDetails) {
            try {
                let result = await this.$axios.$post(
                    `${this.$config.baseURL}${this.$config.netlifySubmitForm}`,
                    {
                        formName: this.formName,
                        dataToSubmit: this.formData,
                        itemsForPurchase: this.priceData,
                        paymentDetails: paymentDetails,
                    }
                )
                if (result.statusCode != 200) {
                    window.scrollTo(0, 0)
                    console.log(result)
                    let errorMessage = JSON.stringify(result)
                    this.error = `There was an error submitting your donation information. To avoid repeating your donation, please report this issue by clicking the button below.`
                    this.technicalError = `mailto:donations@hospicebr.org?subject=hospice-tol.org%20-%20${this.formName}%20error&body=%22Optional%20personal%20message%20here%22%0D%0A%0D%0A%5BDo%20not%20edit%20past%20this%20line%5D%0D%0A%0D%0AError%3A%20Did%20not%20get%20successful%20response%20from%20endpoint.%5D%0D%0A%0D%0A${errorMessage}`
                } else {
                    this.error = null
                    this.technicalError = null
                    this.$router.push('/thank-you')
                }
            } catch (error) {
                window.scrollTo(0, 0)
                console.log(error.response.data)
                let errorMessage = JSON.stringify(error.response.data)
                this.error = `There was an error submitting your donation information. To avoid repeating your donation, please report this issue by clicking the button below.`
                this.technicalError = `mailto:donations@hospicebr.org?subject=hospice-tol.org%20-%20${this.formName}%20error&body=%22Optional%20personal%20message%20here%22%0D%0A%0D%0A%5BDo%20not%20edit%20past%20this%20line%5D%0D%0A%0D%0AError%3A%20Something%20went%20wrong%20while%20submitting%20the%20form%20to%20endpoint%20OR%20a%20processing%20error%20occurred%20in%20Wufoo.%5D%0D%0A%0D%0A${errorMessage}`
            }
        },
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
        formatComponentHandle(field) {
            return this.$dashCase(field)
        },
        camelCaseStr(str) {
            return this.$camelCase(str)
        },
        ...mapMutations({
            updateField: 'updateField',
        }),
    },
}
</script>

<style lang="scss" scoped>
.fade-in-enter-active {
    transition: all 0.5s ease;
}

.fade-in-leave-active {
    transition: all 0.5s ease;
}

.fade-in-enter,
.fade-in-leave-to {
    position: absolute; /* add for smooth transition between elements */
    opacity: 0;
}
</style>
