<template>
    <div class="relative z-20">
        <div v-if="sponsors && sponsors.length > 2">
            <client-only>
                <flickity ref="flickityEl" :options="options" @init="onInit">
                    <div
                        v-for="(item, index) in sponsors"
                        :key="index"
                        :style="'background-image:url(' + slideImage + ');'"
                        class="relative bg-contain bg-center bg-no-repeat w-full card text-center cursor-grab lg:w-3/5 xl:w-1/2 mr-6"
                        @mouseover="isPaused = true"
                        @mouseleave="isPaused = false"
                    >
                        <SponsorCard
                            :sponsor="item"
                            :in-slider="true"
                            @mouseover="isPaused = true"
                            @mouseleave="isPaused = false"
                        ></SponsorCard>
                    </div>
                </flickity>
            </client-only>
        </div>
        <div
            v-else
            class="flex flex-wrap lg:flex-no-wrap flex-row"
            :class="{
                'justify-center': sponsors.length == 1,
            }"
        >
            <div
                v-for="(item, index) in sponsors"
                :key="index"
                :style="'background-image:url(' + slideImage + ');'"
                class="relative bg-contain bg-center bg-no-repeat w-full card text-center cursor-grab mb-6 lg:mb-0 lg:w-1/2 mx-6"
            >
                <SponsorCard :in-slider="false" :sponsor="item"></SponsorCard>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        SponsorCard: () => import('~/components/donors/SponsorCard.vue'),
    },
    props: {
        sponsors: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            slideImage: '/sponsorship/sponsor-card.jpg',
            flickity: null,
            sliderReady: false,
            tickerSpeed: 1,
            isPaused: false,
            id: undefined,
            options: {
                autoPlay: false,
                prevNextButtons: false,
                pageDots: false,
                draggable: true,
                wrapAround: true,
                selectedAttraction: 0.015,
                friction: 0.25,
            },
        }
    },
    head() {
        return {
            link: [
                {
                    rel: 'stylesheet',
                    href:
                        'https://unpkg.com/flickity@2.2.2/dist/flickity.min.css',
                },
            ],
        }
    },
    watch: {
        isPaused() {
            if (this.isPaused) {
                window.cancelAnimationFrame(this.id)
            } else {
                this.initMarqueeSlider()
            }
        },
    },
    destroyed() {
        window.cancelAnimationFrame(this.id)
        this.id = undefined
    },
    methods: {
        onInit() {
            this.flickity = this.$refs.flickityEl.$flickity
            this.initMarqueeSlider()
            this.initListeners()
            this.sliderReady = true
        },
        initMarqueeSlider() {
            if (this.flickity.slides) {
                this.flickity.x =
                    (this.flickity.x - this.tickerSpeed) %
                    this.flickity.slideableWidth
                this.flickity.selectedIndex = this.flickity.dragEndRestingSelect()
                this.flickity.updateSelectedSlide()
                this.flickity.settle(this.flickity.x)
            }
            this.id = window.requestAnimationFrame(this.initMarqueeSlider)
        },
        initListeners() {
            this.flickity.on(
                'dragStart',
                () => (this.flickity.slider.style.pointerEvents = 'none')
            )
            this.flickity.on(
                'dragEnd',
                () => (this.flickity.slider.style.pointerEvents = 'auto')
            )
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    height: 0;
    padding-bottom: 56.3%;
    @screen lg {
        padding-bottom: 28.3%;
    }
}
</style>
