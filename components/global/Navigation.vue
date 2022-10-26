<template>
    <div
        ref="mobileNavEl"
        class="transform transition-transform ease-in-out duration-200 px-8 bg-muted-blue w-full z-10 nav-header pb-16 md:pb-0"
        :class="{
            'pt-4': !isMobile,
            'pt-3': isMobile,
            'fixed left-0 right-0 bottom-0 z-30': !isFormPage,
            relative: isFormPage,
        }"
        :style="{
            transform: `translateY(${translateTo}%)`,
        }"
    >
        <div class="max-w-screen-2xl mx-auto">
            <div v-if="isMobile" class="text-center cursor-pointer">
                <div class="mb-8">
                    <font-awesome-icon
                        class="text-base w-full text-gold font-bold text-center"
                        :icon="['fas', mobileMenuIcon]"
                    />
                    <p
                        class="uppercase text-gold font-bold tracking-widest block lg:text-base"
                        @click="triggerMobileNav"
                    >
                        {{ mobileMenuLabel }}
                    </p>
                </div>
                <div class="pt-10 border-t border-light-blue">
                    <NavElements
                        :navigation="navigation"
                        :contact-links="contactLinks"
                        @closeNav="closeMobileNav"
                    />
                </div>
            </div>
            <NavElements
                v-else
                :navigation="navigation"
                :contact-links="contactLinks"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Navigation',
    components: {
        NavElements: () => import('~/components/global/navigation/NavElements'),
    },
    props: {
        isFormPage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isMobile: false,
            translateTo: this.isFormPage ? 0 : 87,
        }
    },
    computed: {
        ...mapState(['screenSize']),
        navigation() {
            return [
                {
                    label: 'Gift A Light',
                    slug: '/gift-a-light',
                    id: 'gift-a-lights',
                },
                {
                    label: 'View Lights',
                    slug: '/view-donations',
                    id: 'view-donations',
                },
                {
                    label: 'Support Patient Care Fund',
                    slug: '/donors/become-a-donor',
                    id: 'donors/become-a-donor',
                },
                {
                    label: 'View Supporters',
                    slug: '/view-supporters',
                    id: 'view-supporters',
                },
            ]
        },
        contactLinks() {
            return [
                {
                    type: 'phone',
                    value: 'tel:+12257674673',
                    id: 'phone-alt',
                },
                {
                    type: 'email',
                    value: 'mailto:donations@hospicebr.org',
                    id: 'envelope',
                },
            ]
        },
        mobileMenuLabel() {
            if (this.isFormPage) {
                return this.translateTo == 0 ? 'Menu' : 'Close'
            } else {
                return this.translateTo > 0 ? 'Menu' : 'Close'
            }
        },
        mobileMenuIcon() {
            if (this.isFormPage) {
                return this.translateTo == 0 ? 'chevron-up' : 'times'
            } else {
                return this.translateTo > 0 ? 'chevron-up' : 'times'
            }
        },
    },
    watch: {
        screenSize(value) {
            this.checkScreenSize(value)
        },
        isFormPage: {
            immediate: true,
            handler(val) {
                if (this.screenSize <= 768) {
                    if (val) {
                        this.translateTo = 0
                    } else {
                        this.translateTo = 87
                    }
                }
            },
        },
    },
    mounted() {
        this.checkScreenSize(this.screenSize)
    },
    methods: {
        checkScreenSize(size) {
            if (size >= 768) {
                this.isMobile = false
                this.translateTo = 0
            } else {
                this.isMobile = true
            }
        },
        closeMobileNav() {
            if (this.isFormPage) {
                this.$emit('mobileNavClosed')
                this.translateTo = 0
            } else {
                this.$emit('mobileNavClosed')
                this.translateTo = 87
            }
        },
        triggerMobileNav() {
            if (this.translateTo > 0) {
                if (this.isFormPage) {
                    this.$emit('mobileNavClosed')
                    this.translateTo = -87
                } else {
                    this.$emit('mobileNavOpen')
                    this.translateTo = 0
                }
            } else {
                if (this.isFormPage && this.translateTo == '-87') {
                    this.$emit('mobileNavClosed')
                    this.translateTo = 0
                } else if (this.isFormPage) {
                    this.$emit('mobileNavClosed')
                    this.translateTo = -87
                } else {
                    this.$emit('mobileNavClosed')
                    this.translateTo = 87
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.nav-header {
    @screen md {
        height: 75px;
    }
}
</style>
