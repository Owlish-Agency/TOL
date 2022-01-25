<template>
    <div>
        <div class="search-container desktop">
            <div class="flex">
                <div class="flex-grow">
                    <div class="relative flex items-center">
                        <VueFuse
                            :list="cleansedLights"
                            :fuse-opts="options"
                            :search="search"
                            :map-results="false"
                            :default-all="isMobile ? true : false"
                            placeholder="Search for a Memorial Light"
                            class="flex-grow rounded py-3 pl-10 pr-4 bg-muted-blue border-0 text-gold text-sm"
                            @fuse-results="handleResults"
                            @focused="fusedFocused"
                        />
                        <img
                            :src="searchIcon"
                            alt=""
                            class="absolute left-0 ml-4"
                        />
                    </div>
                </div>
                <img
                    :src="searchInfo"
                    alt=""
                    class="flex-none ml-4 cursor-pointer"
                    @click="showInstructions = true"
                />
            </div>
            <template v-if="isMobile === false">
                <ul
                    v-show="
                        results.length !== 0 &&
                            selectedLight === null &&
                            showInstructions === false
                    "
                    class="mt-6"
                >
                    <li
                        v-for="(light, index) in results"
                        :key="index"
                        class="border-b-1 cursor-pointer border-muted-blue py-2 text-sm"
                        @click="
                            handleDonationClick({
                                light: light.item.light,
                                donatedBy: light.item.Field10,
                            })
                        "
                    >
                        <span class="text-snow">
                            {{ light.item.donationType }}
                        </span>
                        <span class="text-gold font-bold">
                            {{ light.item.donatedTo }}
                        </span>
                    </li>
                </ul>
            </template>
        </div>
        <div
            v-if="selectedLight !== null"
            class="flex justify-center items-center search-container md:text-sm lg:text-base"
        >
            <div class="flex-grow-0">
                <div class="light-container">
                    <span class="light-bulb"></span>
                </div>
            </div>
            <div class="flex-grow mx-4">
                <p class="text-white mb-1">
                    {{ donatedType }}:
                    <span class="text-gold font-bold">{{ donatedToName }}</span>
                </p>
                <p v-if="donatedBy" class="text-sm text-snow">
                    Lights gifted by:
                    <span class="text-white">{{ donatedBy }}</span>
                </p>
            </div>
            <div class="flex-grow-0">
                <font-awesome-icon
                    class="cursor-pointer text-white"
                    :icon="['fas', 'times']"
                    @click="$emit('unsetLight')"
                />
            </div>
        </div>
        <div
            v-show="showInstructions"
            class="flex flex-wrap justify-center items-center search-container"
        >
            <div class="w-full flex items-center mb-4">
                <img
                    :src="instructionSearch"
                    class="flex-grow-0 mr-2 w-8 sm:w-auto"
                />
                <p class="flex-grow text-snow text-sm xl:text-base">
                    Search for a Memorial Light by using the field above
                </p>
            </div>
            <div class="w-full flex items-center mb-4">
                <img
                    :src="instructionMouse"
                    class="flex-grow-0 mr-2 w-8 sm:w-auto"
                />
                <p class="flex-grow text-snow text-sm xl:text-base">
                    Click a light on the tree to view details
                </p>
            </div>
            <div class="w-full flex items-center mb-4">
                <img
                    :src="instructionInfo"
                    class="flex-grow-0 mr-2 w-8 sm:w-auto"
                />
                <p class="flex-grow text-snow text-sm xl:text-base">
                    Click the information icon to view this message again
                </p>
            </div>
            <div class="w-full text-center mt-2">
                <button class="btn rounded" @click="showInstructions = false">
                    Got It
                </button>
            </div>
        </div>
        <template
            v-if="isMobile && selectedLight === null && results.length > 0"
        >
            <div class="mt-6 search-container">
                <ul class="search-scroll">
                    <li
                        v-for="(light, index) in results"
                        :key="index"
                        class="border-b-1 cursor-pointer border-muted-blue py-2 text-sm"
                        @click="
                            handleDonationClick({
                                light: light.item.light,
                                donatedBy: light.item.Field10,
                            })
                        "
                    >
                        <span class="text-snow">
                            {{ light.item.donationType }}
                        </span>
                        <span class="text-gold font-bold">
                            {{ light.item.donatedTo }}
                        </span>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    components: {
        VueFuse: () => import('~/components/VueFuse.vue'),
    },
    props: {
        lights: {
            type: Array,
            default: Array,
        },
        selectedLight: {
            type: String,
            default: String,
        },
        donatedBy: {
            type: String,
            default: String,
        },
    },
    data() {
        return {
            searchInfo: '/img/donations/tol-search-info.svg',
            instructionInfo: '/img/donations/tol-instruction-info.svg',
            instructionMouse: '/img/donations/tol-instruction-mouse.svg',
            instructionSearch: '/img/donations/tol-instruction-search.svg',
            search: '',
            results: [],
            showInstructions: true,
            isMobile: false,
            searchIcon: '/img/donations/tol-search.svg',
        }
    },
    computed: {
        ...mapState(['screenSize']),
        options() {
            return {
                keys: ['light'],
            }
        },
        cleansedLights() {
            let results = this.lights.filter(
                (light, index, self) =>
                    index ===
                    self.findIndex(
                        t =>
                            t.EntryId === light.EntryId &&
                            t.donatedTo === light.donatedTo
                    )
            )
            return results
        },
        donatedType() {
            let donationType = ''
            if (this.strippedLight.includes('In memory of')) {
                donationType = 'In memory of'
            } else {
                donationType = 'In honor of'
            }
            return donationType
        },
        donatedToName() {
            let donatedTo = ''
            if (this.strippedLight.includes('In memory of')) {
                donatedTo = this.strippedLight.replace('In memory of ', '')
            } else {
                donatedTo = this.strippedLight.replace('In honor of ', '')
            }
            return donatedTo
        },
        strippedLight() {
            return this.selectedLight.substr(
                0,
                this.selectedLight.indexOf(' -')
            )
        },
    },
    watch: {
        showInstructions() {
            this.$emit('unsetLight')
        },
        screenSize(value) {
            this.checkScreenSize(value)
        },
        selectedLight(value) {
            if (value) {
                this.showInstructions = false
            }
        },
    },
    mounted() {
        this.checkScreenSize(this.screenSize)
    },
    created() {
        this.showInstructions = true
    },
    methods: {
        fusedFocused() {
            this.showInstructions = false
            this.$emit('unsetLight')
        },
        checkScreenSize(size) {
            if (size >= 641) {
                this.isMobile = false
            } else {
                this.isMobile = true
            }
        },
        handleResults(r) {
            this.results = r
        },
        handleDonationClick(light, donatedBy) {
            this.$emit('setLightFromSearch', light, donatedBy)
        },
        selectedLightContent(el, donor) {
            let donationType = ''
            let donatedTo = ''
            let strippedLight = el.substr(0, el.indexOf(' -'))
            if (strippedLight.includes('In memory of')) {
                donatedTo = strippedLight.replace('In memory of ', '')
                donationType = 'In memory of'
            } else {
                donatedTo = strippedLight.replace('In honor of ', '')
                donationType = 'In honor of'
            }
            return (
                '<sp><span class="text-white">' +
                donationType +
                ': </span>' +
                '<span class="text-gold font-bold">' +
                donatedTo +
                '</span></sp><p><span class="text-sm text-snow">Lights gifted by: </span><span class="text-sm text-white text-bold">' +
                donor +
                '</span></p>'
            )
        },
    },
}
</script>
<style lang="scss">
.search-container {
    @apply bg-dark-blue p-6 rounded mt-4;
    &.desktop {
        max-height: 400px;
        @apply overflow-hidden overflow-y-scroll;
        &::-webkit-scrollbar {
            @apply px-1;
            width: 0.4em;
            height: 0.4em;
        }
        &::-webkit-scrollbar-thumb {
            @apply bg-light-blue;
            border-radius: 3px;

            &:hover {
                @apply bg-light-blue;
            }
        }
    }
    @screen lg {
        @apply p-8;
    }
}
.search-scroll {
    height: 140px;
    overflow: scroll;
}
.light-container {
    @apply relative flex items-center justify-center w-20 h-20;
    @screen xl {
        @apply w-32 h-32;
    }
    &::after {
        content: '';
        @apply absolute w-full h-full inset-0;
        background: radial-gradient(
            44.12% 44.12% at 50% 50%,
            #ffe6ab 4.17%,
            rgba(255, 233, 156, 0.42) 40.1%,
            rgba(16, 46, 81, 0) 100%
        );
    }
    .light-bulb {
        border-radius: 50%;
        @apply relative z-10 block w-1 h-3 bg-white;
        @screen lg {
            @apply w-2 h-5;
        }
    }
}
</style>
