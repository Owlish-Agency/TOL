import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            // local object variable to store form data
            formData: {},

            // Reactive object to be used for Provide/Inject
            formState: {
                activeField: 0,
                isNext: true,
                formLength: this.formFields.length,
                isComplete: false,
                isValid: false,
            },

            // Fields to omit from validation
            omittedFields: ['instructions', 'rich-text'],
        }
    },
    computed: {
        isLastField() {
            return this.formState.activeField < this.formState.formLength
        },
        fieldType() {
            return this.formFields[this.formState.activeField].type
        },
    },
    watch: {
        isLastField(newValue) {
            !newValue
                ? (this.formState.isComplete = true)
                : (this.formState.isComplete = false)
        },
        isCurrentFieldValid(newValue) {
            newValue
                ? (this.formState.isValid = true)
                : (this.formState.isValid = false)
        },
    },
    methods: {
        ...mapMutations({
            updateDynamicInputData: 'updateDynamicInputData',
        }),
        async next() {
            this.formState.isNext = true
            const isValid = await this.formInstance.validate()
            isValid ? this.proceed() : this.decline('.field-area')
            this.$root.$emit('scrollToTop')
            this.$root.$emit('activeFieldUpdated', this.formState.activeField)
        },
        back() {
            this.formState.isNext = false
            this.formState.activeField > 0 ? this.formState.activeField-- : ''
            this.$root.$emit('scrollToTop')
            this.$root.$emit('activeFieldUpdated', this.formState.activeField)
        },
        async submit() {
            const isValid = await this.formInstance.validate()
            this.formState.isNext = true
            isValid ? this.proceed() : ''
        },
        proceed() {
            this.isLastField ? this.formState.activeField++ : ''
        },
        decline(element) {
            // Shake form area when the field is invalid
            this.formHasErrors = true
            var tl = this.$gsap.timeline()
            tl.to(element, { duration: 0.1, x: 30 })
            tl.to(element, {
                x: 0,
                ease: 'elastic.out(0.9, 0.1)',
            })
        },
    },
}
