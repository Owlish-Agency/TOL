<template>
    <div class="w-full pb-2 mb-2">
        <p v-if="heading" class="text-snow text-lg">
            {{ heading }}
        </p>
        <p v-if="subHeading" class="text-snow font-light">
            {{ subHeading }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'InstructionsField',
    props: {
        heading: {
            type: String,
            default: String,
        },
        subHeading: {
            type: String,
            default: String,
        },
    },
}
</script>
