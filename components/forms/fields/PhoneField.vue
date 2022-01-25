<template>
    <div
        class="flex flex-wrap w-full"
        :class="{ hidden: field.Label && field.Label == 'Country' }"
    >
        <div :key="field.ID" class="w-full">
            <MazPhoneNumberInput v-model="value" :no-country-selector="true" />
        </div>
    </div>
</template>

<script>
import MazPhoneNumberInput from 'maz-ui/lib/maz-phone-number-input'
export default {
    name: 'PhoneField',
    components: {
        MazPhoneNumberInput,
    },
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
            let formattedValue = ''
            if (newValue) {
                formattedValue = newValue.replace(/\D/g, '').slice(-10)
            } else {
                formattedValue = ''
            }
            this.$emit('input', formattedValue)
        },
    },
}
</script>

<style lang="scss" scoped>
.has-error {
    .maz-border-color {
        border-color: '#ff4500';
    }
}
</style>
