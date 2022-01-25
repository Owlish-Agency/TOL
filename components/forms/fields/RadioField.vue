<template>
    <div>
        <template v-if="field.Choices">
            <p
                v-if="label || field.Title"
                class="text-snow text-lg font-default font-thin mb-3"
            >
                {{ label || field.Title }}
            </p>
            <label
                v-for="option in field.Choices"
                :key="option.Value ? option.Value : option.Label"
                :for="option.Value ? option.Value : option.Label"
                class="relative text-white block w-full pl-8 mb-2"
            >
                {{ option.Label }}
                <input
                    :id="option.Value ? option.Value : option.Label"
                    v-model="value"
                    :value="option.Value ? option.Value : option.Label"
                    type="radio"
                    class="absolute opacity-0 cursor-pointer"
                    :name="option.Value ? option.Value : option.Label"
                />
                <span class="checkmark"></span>
            </label>
        </template>
    </div>
</template>

<script>
export default {
    name: 'RadioField',
    props: {
        field: {
            type: Object,
            default: Object,
        },
        label: {
            type: String,
            default: String,
        },
        formData: {
            type: Object,
            default: Object,
        },
        dynamicKey: {
            type: String,
            default: String,
        },
    },
    data() {
        return {
            value:
                this.formData[this.dynamicKey] ??
                this.field.Choices[0].Value ??
                '',
        }
    },
    computed: {
        dashCasedTitle() {
            return this.$dashCase(this.field.Title)
        },
    },
    watch: {
        value(val) {
            this.updateValue(val)
        },
    },
    mounted() {
        this.updateValue(this.value)
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        },
        camelCaseStr(str) {
            return this.$camelCase(str)
        },
    },
}
</script>

<style lang="scss" scoped>
.checkmark {
    @apply absolute top-0 left-0 h-5 w-5 border-2 border-gold rounded-full flex justify-center items-center;
}
input:checked ~ .checkmark:after {
    content: '';
    @apply w-2 h-2 bg-gold block rounded-full;
}
</style>
