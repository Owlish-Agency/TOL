<template>
    <div
        class="flex flex-wrap w-full"
        :class="{ hidden: field.Label && field.Label == 'Country' }"
    >
        <MazInput
            ref="inputRef"
            v-model="formattedValue"
            :placeholder="field.Title ? field.Title : field.Label"
            type="text"
            :error="field.hasError"
            class="w-full"
            @blur="isInputActive = false"
            @focus="isInputActive = true"
            @keydown="isNumber($event)"
        />
    </div>
</template>

<script>
export default {
    name: 'MoneyField',
    props: {
        value: {
            type: Number,
            default: String,
        },
        field: {
            type: Object,
            default: Object,
        },
        placeholderText: {
            type: String,
            default: '',
        },
        formData: {
            type: Object,
            default: Object,
        },
    },
    data() {
        return {
            isInputActive: false,
        }
    },
    computed: {
        placeholder() {
            return this.placeholderText ?? this.field.Title
        },
        formattedValue: {
            get: function() {
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return this.value.toString()
                } else {
                    // User is not modifying now. Format display value for user interface
                    // $emit the event so that parent component gets it
                    let formatted =
                        '$ ' +
                        this.value
                            .toFixed(2)
                            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
                    this.$emit('formattedValue', formatted)
                    return formatted
                }
            },
            set: function(modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                // eslint-disable-next-line no-useless-escape
                let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))

                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0
                }
                // $emit the event so that parent component gets it
                this.$emit('input', newValue)
            },
        },
    },
    methods: {
        isNumber(evt) {
            evt = evt ? evt : window.event
            let charCode = evt.which ? evt.which : evt.keyCode
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                evt.preventDefault()
            } else {
                return true
            }
        },
    },
}
</script>
