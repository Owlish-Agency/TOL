<template>
    <div class="flex flex-wrap w-full">
        <MazInput
            v-model="value"
            :placeholder="field.Title"
            :required="field.IsRequired == '1'"
            :error="field.hasError"
            class="w-full"
            textarea
            @focus="field.hasError ? resetField() : null"
        />
        <span v-if="field.hasError" class="text-red-600">
            {{
                field.errorMessage
                    ? field.errorMessage
                    : 'This field is required'
            }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'TextField',
    props: {
        field: {
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
            value: this.formData[this.field.ID] ?? null,
        }
    },
    watch: {
        value(newValue) {
            this.$emit('input', newValue)
        },
    },
    methods: {
        resetField() {
            this.$root.$emit('resetFields', this.field.ID)
        },
    },
}
</script>
