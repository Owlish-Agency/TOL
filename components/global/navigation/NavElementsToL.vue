<template>
    <div class="flex flex-col items-center space-y-8">
        <a
            href="https://hospicebr.org/"
            target="_blank"
            class="w-full mb-16 md:mb-0 md:w-40 lg:w-48"
        >
            <img
                src="/img/global/logo.svg"
                class="w-full flex-none px-16 md:px-0"
                alt="Hospice of Baton Rouge Logo"
            />
        </a>
        <ul
            v-if="navigation"
            class="flex flex-col w-full mb-16 space-y-3 flex-grow justify-start order-first overflow-y-auto max-h-screen"
        >
            <li
                v-for="link in navigation"
                :key="link.id"
                @click="$emit('closeNav')"
            >
                <a
                    :href="link.slug"
                    target="_blank"
                    class="text-muted-dark font-bold tracking-widest block text-base md:text-semi-s lg:text-base mt-1"
                    :class="{ 'glow mt-0': $route.name == link.id }"
                    >{{ link.label }}</a
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NavElements',
    props: {
        navigation: {
            type: Array,
            default: Array,
            required: true,
        },
        contactLinks: {
            type: Array,
            default: Array,
        },
    },
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
    body,
    a,
    li,
    h2 {
        font-size: 14pt;
    }
}
@media (min-width: 769px) {
    body,
    a,
    li,
    h2 {
        font-size: 16pt;
    }
}
@import url('https://fonts.googleapis.com/css2?family=Asap:wght@400&display=swap');
.glow {
    text-shadow: 0px 0px 10px rgba(223, 217, 163, 0.78);
    &-shadow {
        box-shadow: 0px 0px 10px rgba(223, 217, 163, 0.78);
    }
}

.bg-muted-dark {
    background-color: #333333; /* Use dark color for elements */
}

.text-muted-dark {
    color: #333333; /* Use dark color for text */
}

h2,
a,
li,
body {
    font-family: 'Asap', Arial, sans-serif; /* Use a clean, readable font */
    font-weight: normal;
}
</style>
