<template>
    <div v-if="formFields" class="my-16">
        <div class="grid grid-cols-2 justify-items-center items-center h-full">
            <button
                v-if="formState.activeField > 0"
                type="button"
                class="h-full text-gold font-medium tracking-widest text-sm justify-self-start uppercase"
                @click="goToPrevious"
            >
                Previous
            </button>
            <button
                v-if="formState.activeField == formState.formLength"
                type="submit"
                class="btn justify-self-end"
            >
                Submit
            </button>
            <button
                v-else
                type="button"
                class="btn justify-self-end"
                :class="{
                    'col-span-2': formState.activeField == 0,
                }"
                @click="goToNext"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormPagination',
    props: {
        formFields: {
            type: Array,
            default: Array,
        },
        formState: {
            type: Object,
            default: Object,
        },
    },
    methods: {
        goToNext() {
            this.$emit('goToNext')
        },
        goToPrevious() {
            this.$emit('goToPrevious')
        },
    },
}
</script>

<style lang="scss" scoped>
// .form-stepper {
//     @apply w-full absolute;
//     bottom: 75px;
// }
</style>
