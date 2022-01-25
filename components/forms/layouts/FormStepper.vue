<template>
    <div class="relative py-10 xl:px-20">
        <ul class="progress-bar">
            <li
                v-for="(step, i) in steps"
                :key="i"
                class="relative flex flex-col text-white text-sm flex-grow text-center"
                :class="{
                    active: step.active,
                }"
            >
                {{ step.label }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'FormStepper',
    props: {
        steps: {
            type: Array,
            default: Array,
        },
    },
}
</script>

<style lang="scss" scoped>
// border-2 border-light-blue
.progress-bar {
    @apply flex justify-between items-center mx-1;
    counter-reset: step;
    li {
        &::before {
            content: counter(step);
            counter-increment: step;
            line-height: 25px;
            @apply block mx-auto w-6 h-6 rounded-full text-white text-sm bg-light-blue mb-1;
        }
        &.active {
            &::before {
                @apply bg-gold text-brown font-bold;
            }
        }
    }
    li:not(:first-child) {
        &::after {
            content: '';
            @apply w-full absolute bg-light-blue;
            height: 2px;
            left: -50%;
            top: 10px;
            z-index: -1;
        }
        &.active {
            &::after {
                @apply bg-gold;
            }
        }
    }
}
</style>
