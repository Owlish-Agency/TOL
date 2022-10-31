<template>
    <div class="h-full md:relative">
        <transition name="fade" appear>
            <div
                v-if="$fetchState.pending"
                class="flex flex-col items-center justify-center bg-dark-blue bg-opacity-75 absolute inset-0 z-20"
            >
                <div class="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
                <p class="text-white text-sm font-default font-light">
                    Placing lights on tree...
                </p>
            </div>
        </transition>
        <div
            v-if="!$fetchState.pending && lights"
            class="px-4 md:px-16 pt-6 sm:pt-16 pb-32 md:pb-6 2xl:pb-12 xl:container mx-auto relative z-10 h-full"
        >
            <div class="flex flex-wrap h-full">
                <div class="w-full sm:w-2/5 xl:w-1/2">
                    <div class="donation-info">
                        <div class="donation-goal flex">
                            <div class="w-3/5 sm:w-full">
                                <div class="progress-bar">
                                    <span
                                        class="bg-gold block h-full"
                                        :style="`width: ${percentageOfGoal}%`"
                                    ></span>
                                </div>
                                <p class="text-2xl font-bold text-gold mt-2">
                                    {{ lights.length }}
                                </p>
                                <p class="text-sm text-blue-400 font-medium">
                                    donations of 1,000 goal
                                </p>
                            </div>
                        </div>
                        <LightSearch
                            :lights="lights"
                            :selected-light="selectedLight"
                            :donated-by="donatedBy"
                            @unsetLight="selectedLight = null"
                            @setLightFromSearch="setLightFromSearch"
                        />
                    </div>
                </div>
                <div
                    ref="tree"
                    class="w-full sm:w-3/5 xl:w-1/2 self-end h-full flex"
                >
                    <TreeOfLights
                        :lights="lights"
                        :selected-light="selectedLight"
                        :donated-by="donatedBy"
                        @unsetLight="selectedLight = null"
                        @setLightFromTree="setLight"
                    />
                </div>
            </div>
        </div>
        <div class="ground-snow hidden sm:block">
            <img class="w-full" :src="groundSnow" alt="Ground Snow" />
        </div>
        <div class="forest-background"></div>
    </div>
</template>

<script>
export default {
    name: 'LightsDonatedPage',
    components: {
        TreeOfLights: () => import('~/components/donations/TreeOfLights'),
        LightSearch: () => import('~/components/donations/LightSearch'),
    },
    data() {
        return {
            // Meta Information
            metaPageTitle:
                'View Donations | Trees Of Light | The Hospice of Baton Rouge',
            metaTitle:
                'View Donations | Trees Of Light | The Hospice of Baton Rouge',
            metaDescription:
                'View Memorial Lights on our virtual Tree of Light. Lights gifted in honor or memory of loved ones will shine throughout the holiday season.',
            // Page Variables
            groundSnow: '/img/tol-ground-snow.png',
            interactiveTree: '/img/tol-interactive-tree.svg',
            selectedLight: null,
            donatedBy: null,
            goal: 1000,
            maxLightsInFetch: 100,
            totalEntries: 0,
            loadingLights: false,
            lights: [],
        }
    },
    // Fetches the forms fields for us to output how we want
    async fetch() {
        // Initiate the request
        let result = await this.fetchLights()

        if (result.lights.length > 0) {
            this.lights = result.lights
            this.totalEntries = result.totalEntries

            /**
             * If the total amount of entries returned are EQUALS the max entries:
             *  - Send additional requests
             * If the total amount of entries returned are LESS THAN the max entries
             *  - Set the lights and be done
             */
            if (this.totalEntries == this.maxLightsInFetch) {
                let afterEntryAmount = this.totalEntries
                let hasMoreEntries = true
                this.loadingLights = true
                while (hasMoreEntries) {
                    let moreResults = await this.fetchLights(afterEntryAmount)
                    if (moreResults.totalEntries > 0) {
                        afterEntryAmount += moreResults.totalEntries
                        let additionalLights = moreResults.lights
                        this.lights = [...this.lights, ...additionalLights]
                    } else {
                        hasMoreEntries = false
                        this.loadingLights = false
                    }
                }
            }
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
    computed: {
        percentageOfGoal() {
            return (this.lights.length / this.goal) * 100
        },
    },
    methods: {
        async fetchLights(afterEntryAmount) {
            let result = null
            console.log('requesting light entries')
            try {
                result = await this.$axios.$post(
                    `${this.$config.baseURL}${this.$config.netlifyGetLightEntries}`,
                    {
                        formName: 'light-entries',
                        afterEntryAmount: afterEntryAmount,
                    }
                )
            } catch (error) {
                console.log('Error on front end')
                console.log(error)
            }
            return result
        },
        setLightFromSearch({ light, donatedBy }) {
            this.setLight({ light: light, donatedBy: donatedBy })
            if (this.$store.state.screenSize < 768) {
                let treeEl = this.$refs.tree
                let treeElYPos = treeEl.getBoundingClientRect().y
                this.doScrolling(treeElYPos, 500)
            }
        },
        setLight({ light, donatedBy }) {
            this.selectedLight = light
            this.donatedBy = donatedBy
        },
        doScrolling(elementY, duration) {
            var startingY = window.pageYOffset
            var diff = elementY - startingY
            var start

            // Bootstrap our animation - it will get called right before next frame shall be rendered.
            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp
                // Elapsed milliseconds since start of scrolling.
                var time = timestamp - start
                // Get percent of completion in range [0, 1].
                var percent = Math.min(time / duration, 1)

                window.scrollTo(0, startingY + diff * percent)

                // Proceed with animation as long as we wanted it to.
                if (time < duration) {
                    window.requestAnimationFrame(step)
                }
            })
        },
    },
}
</script>
<style scoped>
.forest-background {
    @screen md {
        background-image: url(/img/tol-forest.png);
        @apply bg-cover bg-no-repeat w-full h-full absolute inset-0 z-1 opacity-25;
        background-position: center bottom;
    }
}
.progress-bar {
    @apply relative bg-muted-blue h-1 w-full;
}
.ground-snow {
    width: 100%;
    height: auto;
    max-height: 80px;
    position: absolute;
    z-index: 5;
    bottom: -30px;
    @screen 2xl {
        bottom: 0;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
}
@keyframes lds-ripple {
    0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
    }
}
</style>
