<template>
    <div
        class="h-full"
        :class="{
            'pt-24 pb-32': sponsors.length > 0,
        }"
    >
        <div class="flex flex-wrap content-center h-full">
            <div class="w-full intro container">
                <div
                    class="flex flex-wrap justify-center content-center h-full"
                >
                    <div class="w-full">
                        <div
                            class="flex flex-wrap flex-column justify-center md:-mx-4"
                        >
                            <img
                                class="w-full md:w-3/4 lg:w-1/2 md:px-4 mb-4"
                                src="/img/tol-logo.svg"
                                alt=""
                            />
                            <p
                                class="w-full md:px-4 text-center mb-4 sm:mb-6 text-gold text-lg sm:text-xl md:text-2xl"
                            >
                                2021 SPONSORS
                            </p>
                            <p
                                class="w-full md:w-3/5 md:px-4 text-center mb-8 sm:mb-12 text-snow text-base sm:text-lg"
                            >
                                We would like to thank our generous sponsors who
                                make it possible for us to further our mission
                                as the first and only non-profit hospice
                                provider in the city.
                            </p>
                            <p class="w-full md:w-3/5 md:px-4 text-center">
                                <nuxt-link
                                    class="btn mb-12"
                                    to="/sponsorships/become-a-sponsor"
                                    >Become a sponsor</nuxt-link
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SponsorSlider :sponsors="sponsors" class="w-full" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SponsorshipPage',
    components: {
        SponsorSlider: () =>
            import('@/components/sponsorships/SponsorSlider.vue'),
    },
    // Fetches the forms fields for us to output how we want
    async asyncData({ $axios, $config }) {
        let result = []
        try {
            result = await $axios.$post(
                `${$config.baseURL}${$config.netlifyGetSponsorshipEntries}`,
                {
                    formName: 'sponsorship-entries',
                }
            )
        } catch (error) {
            console.log('Error on front end')
            console.log(error)
        }
        return result.statusCode != 200
            ? {
                  error: `Status code ${result.statusCode}: ${result.body}`,
              }
            : {
                  sponsors: result.entries,
                  error: false,
              }
    },
    data() {
        return {
            // Meta Information
            metaPageTitle:
                'Sponsorships | Trees Of Light | The Hospice of Baton Rouge',
            metaTitle:
                'Sponsorships | Trees Of Light | The Hospice of Baton Rouge',
            metaDescription:
                'We would like to thank our generous sponsors who make it possible for us to further our mission as the first and only non-profit hospice provider in the city.',
            // Page Variables
            sponsors: [],
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
    created() {
        if (this.sponsors.length > 0) {
            this.$nuxt.$emit('destroyPageHeight')
        }
    },
}
</script>
<style scoped>
.intro {
    position: relative;
    z-index: 5;
}
.slider {
    z-index: 5;
}
</style>
