<template>
    <transition name="view" appear>
        <div v-show="welcomeScreenEnabled" class="welcomeScreen">
            <transition name="view" appear>
                <div v-show="isReady" class="container">
                    <div class="welcome-intro">
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
                        </div>
                        <ul
                            class="relative flex flex-wrap justify-center w-full text-center"
                        >
                            <li class="px-4">
                                <button
                                    class="btn mb-6"
                                    @click="closeOverlay(true)"
                                >
                                    Continue with sound
                                </button>
                            </li>
                            <li class="px-4">
                                <button
                                    class="btn mb-6"
                                    @click="closeOverlay(false)"
                                >
                                    Continue with no sound
                                </button>
                            </li>
                        </ul>
                    </div>
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
    </transition>
</template>

<script>
export default {
    name: 'WelcomePage',
    data() {
        return {
            isReady: false,
            overlayOpacity: 100,
            welcomeScreenEnabled: this.$route.path == '/' ? true : false,
        }
    },
    mounted() {
        let self = this
        setTimeout(() => {
            self.isReady = true
        }, 500)
    },
    methods: {
        closeOverlay(e) {
            this.welcomeScreenEnabled = false
            if (e) {
                this.$emit('closeOverlay')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.welcome-intro {
    position: relative;
    z-index: 10;
}
.welcomeScreen {
    @apply fixed inset-0 w-full h-full z-50 flex justify-center items-center transition duration-300;
    background-image: url(/img/tol-bg.jpg);
    background-size: cover;
}
.view-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.view-enter-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease;
    transition-delay: 0.5s;
}

.view-enter,
.view-leave-to {
    opacity: 0;
}

.view-enter-to,
.view-leave {
    opacity: 1;
}
.tree {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
