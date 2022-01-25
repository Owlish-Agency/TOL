<template>
    <div class="card-inner">
        <div class="flex flex-wrap justify-center content-center h-full px-20">
            <div
                class="w-full text-center flex justify-center flex-wrap flex-col"
            >
                <p class="text-light-blue text-xs md:text-sm uppercase mb-2">
                    Donation Level
                </p>
                <img
                    :src="sponsorshipLevel(sponsor.Field17).invertedIcon"
                    :alt="sponsorshipLevel(sponsor.Field17).label"
                    class="w-6 sm:w-auto mx-auto mb-2"
                />
                <!-- eslint-disable -->
                <p
                    class="text-gold text-xs sm:text-sm md:text-base uppercase mb-1 md:mb-0"
                    v-html="sponsorshipLevel(sponsor.Field17).label"
                ></p>
                <!-- eslint-enable -->
                <div
                    class="border-dark-blue border-t-1 w-8 mx-auto mt-2 mb-2 md:my-3 hidden sm:block"
                ></div>
                <img
                    v-if="sponsor.Field124.length"
                    :src="sponsorImage(sponsor.Field124)"
                    :alt="sponsor.Field8 + ' ' + sponsor.Field9"
                    class="sponsor-logos sm:max-w-none mx-auto"
                />
                <h3
                    v-else
                    class="text-sm sm:text-lg md:text-xl lg:text-lg xl:text-2xl px-6 md:px-16"
                >
                    {{ sponsor.Field8 }} {{ sponsor.Field9 }}
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        sponsor: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            // slideImage: '/sponsorship/sponsor-card.jpg',
            sponsorImagePath: 'https://img.hospicetreesoflight.org/sponsors/',
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
    methods: {
        sponsorshipLevel(level) {
            var matchedSponsorLevel = this.sponsorshipLevels.filter(
                a => a.label === level
            )
            return matchedSponsorLevel[0]
        },
        sponsorImage(image) {
            let regExp = /\(([^)]+)\)/
            const matches = regExp.exec(image)
            return matches[1]
        },
    },
}
</script>
<style lang="scss" scoped>
.card-inner {
    @apply absolute w-full left-0 right-0;
    height: calc(100% - 120px);
    margin: 60px auto !important;
}
.sponsor-logos {
    max-height: 50px;
    max-width: 110px;
    @media (min-width: 1200px) and (max-height: 900px) {
        // @apply max-w-lg;
        max-height: 100px;
        max-width: 110px;
    }
    @media (min-width: 1400px) and (min-height: 900px) {
        max-height: 100px;
        max-width: 200px;
    }
}
</style>
