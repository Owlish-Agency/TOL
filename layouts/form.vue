<template>
    <main class="relative h-screen-fix overflow-hidden">
        <nav
            class="flex justify-center items-center px-8 border-b border-muted-blue w-full z-1 min-max-h-header"
        >
            <h1
                class="uppercase text-sm md:text-lg text-gold font-medium tracking-widest"
            >
                {{ pageTitle }} Donation Form
            </h1>
        </nav>
        <div class="page-height-form">
            <nuxt />
        </div>
        <div
            v-show="shade"
            class="fixed inset-0 bg-dark-blue bg-opacity-75"
        ></div>
        <Navigation @mobileNavClosed="removeShade" @mobileNavOpen="addShade" />
    </main>
</template>

<script>
export default {
    name: 'FormLayout',
    components: {
        Navigation: () => import('~/components/global/Navigation'),
    },
    data() {
        return {
            shade: false,
        }
    },
    head() {
        return {
            htmlAttrs: {
                class:
                    'maz-is-dark bg-form-blue font-default font-normal h-full w-full',
            },
        }
    },
    computed: {
        pageTitle() {
            return this.$route.name
                .toLowerCase()
                .replace(/-/g, ' ')
                .replace(/(?:^|[\s-/])\w/g, function(match) {
                    return match.toUpperCase()
                })
        },
    },
    methods: {
        addShade() {
            this.shade = true
        },
        removeShade() {
            this.shade = false
        },
    },
}
</script>

<style lang="scss">
html {
    &.wf-loading {
        @apply invisible;
    }
    &.wf-active {
        @apply visible;
    }
}
.min-max-h-header {
    height: 75px;
}
</style>
