<template>
    <main
        class="content"
        :class="{
            'relative h-screen-fix overflow-hidden': setPageHeight,
            'opacity-0': transitioning,
            'opacity-100': !transitioning,
        }"
    >
        <nav
            class="flex flex-wrap justify-center items-center px-8 border-b border-muted-blue w-full z-1 min-max-h-header"
        >
            <NavigationToL
                :is-form-page="isFormPage"
                @mobileNavClosed="removeShade"
                @mobileNavOpen="addShade"
            />
            <a
                href="https://hospicebr.org/"
                target="_blank"
                class="w-full mb-16 md:mb-0 md:w-40 lg:w-48 flex justify-center"
            >
                <img
                    src="//www.hospicebr.org/cdn/shop/files/THBR_Horizontal_Pantone_00f4dcf0-a42a-480f-a485-405e8097e347.png?v=1716578134&amp;width=1923"
                    alt="Hospice of Baton Rouge Logo"
                    srcset="
                        //www.hospicebr.org/cdn/shop/files/THBR_Horizontal_Pantone_00f4dcf0-a42a-480f-a485-405e8097e347.png?v=1716578134&amp;width=600 600w,
                        //www.hospicebr.org/cdn/shop/files/THBR_Horizontal_Pantone_00f4dcf0-a42a-480f-a485-405e8097e347.png?v=1716578134&amp;width=900 900w
                    "
                    sizes="(max-width: 768px) 150px, 200px"
                    class="header__logo-image w-32 md:w-48 lg:w-56 h-auto"
                />
            </a>
        </nav>
        <div
            :class="{
                'md:relative page-height': $route.path != '/' && !isFormPage,
                'page-height-form': isFormPage,
                'relative h-full overflow-hidden': $route.path == '/',
            }"
        >
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
        opacity: 0;
        background-size: cover;
    }
}
nav {
    background-color: #e5e7eb; /* Light gray color equivalent to Tailwind's bg-gray-200 */
    @apply flex-wrap;
}
</style>
