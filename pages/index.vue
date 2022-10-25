<template>
    <div>
        <transition name="slide" appear>
            <div v-show="isReady" class="intro container">
                <div
                    class="flex flex-wrap justify-center content-center h-full"
                >
                    <div class="w-full">
                        <div
                            class="flex flex-wrap flex-column justify-center md:-mx-4"
                        >
                            <img
                                class="w-1/2 md:w-2/5 lg:w-1/4 md:px-4 mb-4 md:mb-6"
                                src="/img/global/logo.svg"
                                alt=""
                            />
                            <p
                                class="w-full md:px-4 text-center mb-4 text-white font-heading text-xl md:text-2xl"
                            >
                                ANNUAL HOLIDAY FUNDRAISER
                            </p>
                            <img
                                class="w-full md:w-3/4 lg:w-1/2 xl:w-3/5 md:px-4 mb-8 md:mb-12"
                                src="/img/tol-logo.svg"
                                alt=""
                            />
                            <ul
                                class="w-full md:w-3/4 lg:w-full md:px-4 md:-mx-4 text-center"
                            >
                                <li
                                    class="block w-full md:w-auto md:inline-block md:px-4"
                                >
                                    <nuxt-link
                                        class="btn w-full md:w-auto mb-6"
                                        to="/gift-a-light"
                                        >Gift A Light</nuxt-link
                                    >
                                </li>
                                <li
                                    class="block w-full md:w-auto md:inline-block md:px-4"
                                >
                                    <nuxt-link
                                        class="btn w-full md:w-auto mb-6"
                                        to="/sponsorships/become-a-sponsor"
                                        >Support Patient Care Fund</nuxt-link
                                    >
                                </li>
                            </ul>
                            <ul
                                class="w-full md:w-3/4 lg:w-full md:px-4 md:-mx-4 text-center"
                            >
                                <li
                                    class="block w-full md:w-auto md:inline-block md:px-4"
                                >
                                    <nuxt-link
                                        class="btn w-full md:w-auto mb-6"
                                        to="/view-donations"
                                        >View Lights</nuxt-link
                                    >
                                </li>
                                <li
                                    class="block w-full md:w-auto md:inline-block md:px-4"
                                >
                                    <nuxt-link
                                        class="btn w-full md:w-auto mb-6"
                                        to="/view-supporters"
                                        >View Supporters</nuxt-link
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade" appear>
            <div v-show="isReady" class="elContainer">
                <div class="orbs"></div>
                <div class="tree container">
                    <div
                        class="flex justify-center flex-wrap content-center h-full"
                    >
                        <div class="w-full md:w-3/4 lg:w-1/2 2xl:w-3/5">
                            <img
                                src="/img/tol-tree.svg"
                                class="w-full"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isReady: false,
            // Meta Information
            metaPageTitle: 'Trees Of Light | The Hospice of Baton Rouge',
            metaTitle: "The Hospice of Baton Rouge's Trees Of Light Gala",
            metaDescription:
                'Join us by supporting our annual fundraiser, Trees of Light. Purchase lights, sponsorships, and event tickets to help further the mission of The Hospice of Baton Rouge.',
        }
    },
    // Meta Information
    head() {
        return {
            title: this.metaPageTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.metaDescription,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.metaTitle,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.metaDescription,
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.metaTitle,
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.metaDescription,
                },
            ],
        }
    },
    mounted() {
        let self = this
        setTimeout(() => {
            self.isReady = true
        }, 800)
    },
}
</script>
<style scoped>
.intro {
    position: absolute;
    z-index: 5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.orbs {
    background-image: url(/img/tol-orbs.png);
    background-size: cover;
    opacity: 0.03;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}
.tree {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.elContainer {
    -webkit-backface-visibility: hidden;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
    transition: all 1s;
    transition-delay: 1s;
    transform: translateY(0);
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateY(5%);
}
</style>
