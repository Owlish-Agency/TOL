<template>
    <main
        class="content"
        :class="{
            'relative h-screen-fix overflow-hidden': setPageHeight,
            'opacity-0': transitioning,
            'opacity-100': !transitioning,
        }"
    >
        <NavigationToL
            v-if="showNavigation"
            :is-form-page="isFormPage"
            @mobileNavClosed="removeShade"
            @mobileNavOpen="addShade"
        />
        <nav
            v-if="isFormPage"
            class="flex md:justify-center items-center px-8 border-b border-muted-blue w-full z-1 min-max-h-header"
        >
            <h1
                class="uppercase text-sm md:text-lg text-gold font-medium tracking-widest"
            >
                {{ pageTitle }}
            </h1>
        </nav>
        <div
            :class="{
                'md:relative page-height': $route.path != '/' && !isFormPage,
                'page-height-form': isFormPage,
                'relative h-full overflow-hidden': $route.path == '/',
            }"
        >
            <div
                class="absolute right-20 md:right-48 z-20 cursor-pointer"
                style="top: 13px"
            >
                <img
                    v-if="soundIcon"
                    v-tooltip.left="{
                        content: soundIndicator,
                        show: true,
                        trigger: 'manual',
                        classes:
                            'text-xs md:text-sm tracking-widest uppercase text-white z-10 py-2 px-2 md:px-4 rounded-full',
                    }"
                    :src="soundIcon"
                    alt="music button"
                    @click="toggleAudio()"
                />
                <audio ref="audioPlayer" :src="songs[0]" @ended="songEnded">
                    Your browser does not support the audio tag.
                </audio>
            </div>
            <nuxt />
        </div>
        <div
            v-show="shade"
            class="fixed inset-0 bg-dark-blue bg-opacity-75"
        ></div>
        <Navigation
            v-if="showNavigation"
            :is-form-page="isFormPage"
            @mobileNavClosed="removeShade"
            @mobileNavOpen="addShade"
        />
        <Particle v-if="!isFormPage"></Particle>
    </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Default',
    components: {
        NavigationToL: () => import('~/components/global/NavigationToL'),
        Navigation: () => import('~/components/global/Navigation'),
        Particle: () => import('~/components/Particle'),
    },
    transition: {
        name: 'page',
        mode: '',
    },
    data() {
        return {
            transitioning: false,
            soundIcon: '/img/global/off.svg',
            shade: false,
            showNavigation: true,
            audioIsActive: false,
            audio: this.$refs.audioPlayer,
            activeSongIndex: 0,
            songs: [
                'https://hospicebr.org/music/o-christmas-tree.mp3',
                'https://hospicebr.org/music/away-in-a-manger.mp3',
                'https://hospicebr.org/music/jingle-bells.mp3',
                'https://hospicebr.org/music/silent-night.mp3',
            ],
        }
    },
    head() {
        return {
            htmlAttrs: {
                class: this.isFormPage
                    ? 'maz-is-dark bg-form-blue font-default font-normal h-full w-full'
                    : 'default-bg ' + this.$route.name,
            },
            bodyAttrs: {
                class: !this.isFormPage ? 'h-full noise' : '',
            },
        }
    },
    computed: {
        ...mapState(['screenSize', 'screenSizeHeight', 'pageTransitioning']),
        soundIndicator() {
            return !this.audioIsActive ? 'Play Music' : ''
        },
        isFormPage() {
            return (
                this.$route.path.includes('gift-a-light') ||
                this.$route.path.includes('become-a-donor')
            )
        },
        setPageHeight() {
            let setHeight = false
            if (
                this.isFormPage ||
                this.$route.path == '/' ||
                this.$route.path.includes('thank-you')
            ) {
                setHeight = true
            } else if (
                this.$route.path.includes('view-donations') &&
                this.screenSizeHeight >= 768 &&
                this.screenSize >= 768
            ) {
                setHeight = true
            } else {
                setHeight = false
            }
            return setHeight
        },
        pageTitle() {
            let pageTitle = ''
            if (this.$route.name === 'donors-become-a-donor') {
                pageTitle = 'Support The Patient Care Fund'
            } else {
                pageTitle = 'Gift a light form'
            }
            return pageTitle
        },
    },
    watch: {
        $route(to) {
            if (to.path === '/') {
                this.showNavigation = false
            } else {
                this.showNavigation = true
            }
        },
        pageTransitioning(val) {
            this.transitioning = val
        },
    },
    mounted() {
        this.audio = this.$refs.audioPlayer
        if (this.$route.path === '/') {
            this.showNavigation = false
        }
    },
    created() {
        this.$nuxt.$on('destroyPageHeight', () => {
            this.deviceHeightSet = false
        })
    },
    methods: {
        addShade() {
            this.shade = true
        },
        removeShade() {
            this.shade = false
        },
        songEnded() {
            this.activeSongIndex++
            if (this.activeSongIndex < this.songs.length) {
                this.audio.src = this.songs[this.activeSongIndex]
                this.audio.load()
                this.audio.play()
                return
            }
            this.activeSongIndex = 0
            this.audio.src = this.songs[0]
            this.audio.load()
            this.audio.play()
        },
        toggleAudio() {
            if (this.audio.paused) {
                this.audio.play()
                this.audioIsActive = true
                this.soundIcon = '/img/global/on.svg'
            } else {
                this.audio.pause()
                this.audioIsActive = false
                this.soundIcon = '/img/global/off.svg'
            }
        },
    },
}
</script>

<style lang="scss">
main {
    @apply h-full w-full transition-opacity duration-300;
}
.default-bg {
    @apply font-default relative font-normal min-h-full;
    background-image: url(/img/tol-bg.jpg);
    background-size: cover;
    &.wf-loading {
        @apply invisible;
    }
    &.wf-active {
        @apply visible;
    }
    &.view-donations {
        @apply bg-center;
        background-image: url(/img/tol-bg-reversed.jpg);
        @screen md {
            background-image: url(/img/tol-bg.jpg);
        }
    }
}
.noise {
    &::after {
        @apply absolute inset-0;
        content: '';
        background-image: url(/img/tol-noise.png);
        opacity: 0.2;
        background-size: cover;
        // width: 100%;
        // height: 100%;
        // position: absolute;
        // z-index: 3;
        // top: 0;
    }
}
// .page-enter-active,
// .page-leave-active {
//     transition-property: height, opacity;
//     transition-timing-function: ease-in-out;
//     transition-duration: 500ms;
//     @apply overflow-hidden;
// }
// .page-enter,
// .page-leave-to {
//     opacity: 0;
// }
</style>
