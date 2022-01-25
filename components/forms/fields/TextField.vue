<template>
    <div
        class="flex flex-wrap w-full"
        :class="{
            hidden: field.Label && field.Label == 'Country',
            'border-red-600': field.hasError,
        }"
    >
        <MazInput
            v-model="value"
            :placeholder="fieldLabel"
            type="text"
            class="w-full"
            :error="formHasErrors"
            @focus="field.hasError ? resetField() : null"
        />
    </div>
</template>

<script>
export default {
    name: 'TextField',
    // components: {
    //     MazInput: () => import('maz-ui/lib/maz-input'),
    // },
    props: {
        field: {
            type: Object,
            default: Object,
        },
        formHasErrors: {
            type: Boolean,
            default: false,
        },
        formData: {
            type: Object,
            default: Object,
        },
        dynamicKey: {
            type: String,
            default: String,
        },
        subField: {
            type: String,
            default: String,
        },
        type: {
            type: String,
            default: 'text',
        },
        setValue: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            value:
                this.setValue ??
                this.formData[this.dynamicKey] ??
                this.formData[this.field.ID] ??
                null,
        }
    },
    computed: {
        fieldLabel() {
            return this.field.Title ?? this.field.Label
        },
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
