<template>
    <div>
        <template v-if="field.SubFields">
            <p
                v-if="label || field.Title"
                class="text-snow text-lg font-default font-thin mb-3"
            >
                {{ label || field.Title }}
            </p>
            <span
                v-for="option in field.SubFields"
                :key="option.Label"
                class="relative text-white block w-full pl-8 mb-2"
            >
                <input
                    :id="option.Label"
                    v-model="checkedNames"
                    type="checkbox"
                    :value="option.Label"
                />
                <label for="john">{{ option.Label }}</label>
            </span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'CheckboxField',
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
                this.field.SubFields[0].defaultVal ??
                '',
        }
    },
    computed: {
        dashCasedTitle() {
            return this.$dashCase(this.field.Title)
        },
    },
    watch: {
        checkedNames(val) {
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
