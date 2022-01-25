<template>
    <div
        class="flex flex-wrap flox-col md:flex-row justify-around items-center"
    >
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
            class="flex flex-wrap flex-col md:flex-row w-full mb-16 md:mb-0 md:w-auto space-y-3 md:space-y-0 md:space-x-3 lg:space-x-6 flex-grow justify-center order-first md:order-none"
        >
            <li
                v-for="link in navigation"
                :key="link.id"
                @click="$emit('closeNav')"
            >
                <span
                    class="h-2 w-2 rounded-full block mx-auto"
                    :class="{
                        'bg-gold glow-shadow': $route.name == link.id,
                        'bg-muted-blue': $route.name != link.id,
                    }"
                ></span>
                <nuxt-link
                    v-if="link.id != 'gala-tickets'"
                    :to="link.slug"
                    class="uppercase text-gold font-bold tracking-widest block text-base md:text-semi-s lg:text-base mt-1"
                    :class="{ 'glow mt-0': $route.name == link.id }"
                >
                    {{ link.label }}
                </nuxt-link>
                <a
                    v-else
                    :href="link.slug"
                    target="_blank"
                    class="uppercase text-gold font-bold tracking-widest block text-base md:text-semi-s lg:text-base mt-1"
                    :class="{ 'glow mt-0': $route.name == link.id }"
                    >{{ link.label }}</a
                >
            </li>
        </ul>
        <ul
            v-if="contactLinks"
            class="flex flex-wrap flex-row space-x-3 flex-none"
        >
            <li v-for="link in contactLinks" :key="link.id">
                <a
                    :href="link.value"
                    class="bg-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                    <font-awesome-icon
                        class="text-muted-blue text-base"
                        :icon="['fas', link.id]"
                    />
                </a>
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
.glow {
    text-shadow: 0px 0px 10px rgba(223, 217, 163, 0.78);
    &-shadow {
        box-shadow: 0px 0px 10px rgba(223, 217, 163, 0.78);
    }
}
</style>
