<template>
    <DataDrivenTransition :is-next="isNext">
        <div v-if="active" :key="fieldId" class="field-group">
            <slot />
        </div>
    </DataDrivenTransition>
</template>
<script>
import DataDrivenTransition from '~/components/forms/transitions/DataDrivenTransition.vue'
export default {
    name: 'FieldGroup',
    components: {
        DataDrivenTransition,
    },
    props: {
        fieldId: {
            type: [Number, String],
            default: 0,
        },
        formState: {
            type: Object,
            default: Object,
        },
    },
    computed: {
        active() {
            return this.formState.activeField === this.fieldId
        },
        isNext() {
            return this.formState.isNext
        },
    },
}
</script>

<style lang="scss" scoped>
.field-group {
    width: 100%;
    @screen md {
        position: absolute;
    }
    &.rm-positioning {
        @apply static;
    }
}
</style>
