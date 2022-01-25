<template>
    <div
        class="flex flex-wrap w-full"
        :class="{ hidden: field.Label && field.Label == 'Country' }"
    >
        <div class="w-full">
            <MazInput
                v-model="value"
                :placeholder="field.Title"
                type="text"
                class="w-full"
                :error="field.hasError || (!isValidEmail && value.length > 0)"
                @input="val => updateField(val, field.ID)"
            />
            <span
                v-if="field.hasError || (!isValidEmail && value.length > 0)"
                class="text-red-500"
            >
                {{
                    field.errorMessage
                        ? field.errorMessage
                        : 'Please enter a valid email address'
                }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmailField',
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
            isValidEmail: true,
            pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        }
    },
    // computed: {
    //     inputVal: {
    //         get() {
    //             return this.formData[this.field.ID]
    //         },
    //         set(newVal) {
    //             this.value = newVal
    //         },
    //     },
    // },
    methods: {
        updateField(val) {
            this.isValidEmail = false
            if (String(val).match(this.pattern)) {
                this.isValidEmail = true
                this.$emit('input', val)
            }
        },
    },
}
</script>
