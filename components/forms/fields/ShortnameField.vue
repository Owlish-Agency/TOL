<template>
    <div
        v-if="field.SubFields"
        class="flex flex-wrap space-y-6 md:space-y-0 -mx-3"
        :class="{ hidden: field.Label && field.Label == 'Country' }"
    >
        <div
            v-for="input in field.SubFields"
            :key="input.ID"
            class="px-3 w-full md:w-1/2"
        >
            <MazInput
                v-model="value[input.ID]"
                :placeholder="input.Label"
                type="text"
                class="w-full"
                :error="field.hasError"
                @input="val => updateField(val, input.ID)"
            />
            <span v-if="field.hasError" class="text-red-600">
                {{ field.errorMessage }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShortnameField',
    props: {
        field: {
            type: Object,
            default: Object,
        },
        formData: {
            type: Object,
            default: Object,
        },
        shortNameData: {
            type: Object,
            default: Object,
        },
    },
    data() {
        return {
            value:
                Object.keys(this.shortNameData).length !== 0
                    ? this.shortNameData
                    : {},
        }
    },
    computed: {
        subFieldIDs() {
            const ids = this.field.SubFields.map(el => {
                return el.ID
            })
            return ids
        },
    },
    methods: {
        updateField(val, id) {
            this.$emit('address', val, id)
            this.$emit('saveShortName', this.value)
        },
    },
}
</script>
