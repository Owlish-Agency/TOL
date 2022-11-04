<template>
    <div class="h-full" style="padding-top: 5rem">
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
                                2022 DONORS
                            </p>
                            <p
                                class="w-full md:w-3/5 md:px-4 text-center mb-8 sm:mb-12 text-snow text-base sm:text-lg"
                            >
                                Join us in thanking these very generous
                                supporters who have donated to our Patient Care
                                Fund. The Patient Care Fund is able to further
                                our mission to ensure all individuals seeking
                                end of life care have the care they deserve.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SponsorList :sponsors="sponsors" class="w-full" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SponsorshipPage',
    components: {
        SponsorList: () => import('@/components/donors/SponsorList.vue'),
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
                'Donors | Trees Of Light | The Hospice of Baton Rouge',
            metaTitle: 'Donors | Trees Of Light | The Hospice of Baton Rouge',
            metaDescription:
                'We would like to thank our generous donors who make it possible for us to further our mission as the first and only non-profit hospice provider in the city.',
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
