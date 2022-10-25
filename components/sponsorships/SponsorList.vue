<template>
    <div class="relative z-20">
        <div
            v-for="(listItem, listIndex) in sponsorshipLevels"
            :key="listIndex"
            class="w-full text-center flex justify-center flex-wrap flex-col"
        >
            <!-- eslint-disable -->
            <p
                class="text-gold text-xs sm:text-sm md:text-base uppercase mb-1 md:mb-0"
            >
                Donation Level: <span v-html="listItem.label" /> ($<span
                    v-html="listItem.value"
                />)
            </p>
            <!-- eslint-enable -->
            <img
                :src="listItem.invertedIcon"
                :alt="listItem.label"
                class="w-6 sm:w-auto mx-auto mb-2"
            />
            <div
                v-for="(sponsor, index) in sponsorsForLevel(listItem.label)"
                :key="index"
                class="w-full text-center flex justify-center flex-wrap flex-col"
            >
                <p
                    class="text-white text-xs sm:text-sm md:text-base uppercase mb-1 md:mb-0"
                >
                    {{ sponsor.Field8 }} {{ sponsor.Field9 }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
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
            sponsorshipLevels: [
                {
                    label: 'Star Tree Topper',
                    value: '10,000.00',
                    icon: '/sponsorship/sponsorship-tree-star-topper.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-tree-star-topper-inverted.svg',
                },
                {
                    label: "Angel's Trumpet",
                    value: '5,000.00',
                    icon: '/sponsorship/sponsorship-angels-trumpet.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-angels-trumpet-inverted.svg',
                },
                {
                    label: 'Blessing Bells',
                    value: '3,000.00',
                    icon: '/sponsorship/sponsorship-blessing-bells.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-blessing-bells-inverted.svg',
                },
                {
                    label: 'Candlelight',
                    value: '1,000.00',
                    icon: '/sponsorship/sponsorship-candlelight.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-candlelight-inverted.svg',
                },
                {
                    label: 'Holiday Ornament',
                    value: '500.00',
                    icon: '/sponsorship/sponsorship-holiday-ornament.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-holiday-ornament-inverted.svg',
                },
            ],
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
        sponsorsForLevel(level) {
            console.log(this.sponsors)
            var matchedSponsorsForLevel = this.sponsors.filter(
                a => a.Field17 === level && a.Field126 === 'Yes'
            )
            return matchedSponsorsForLevel
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
