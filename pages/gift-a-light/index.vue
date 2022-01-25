<template>
    <FormLayout
        form-name="gift-light-form"
        :form-fields="formFields"
        :error="error"
        :intro-text="introText"
    />
</template>

<script>
export default {
    name: 'GiftLightPage',
    components: {
        FormLayout: () => import('~/components/forms/layouts/FormLayout'),
    },
    // Fetches the forms fields for us to output how we want
    async asyncData({ $axios, $config, store }) {
        let result = []
        try {
            result = await $axios.$post(
                `${$config.baseURL}${$config.netlifyGetForm}`,
                {
                    formName: 'gift-light-form',
                }
            )
        } catch (error) {
            console.log('Error on front end')
            console.log(error.response.data)
        }
        if (result.priceFields) {
            store.dispatch('SET_PRICE_FIELDS', result.priceFields)
        }

        return result.statusCode != 200
            ? {
                  error: `Status code ${result.statusCode}: ${result.body}`,
              }
            : {
                  formFields: result.fields,
                  error: false,
              }
    },
    data() {
        return {
            // Meta Information
            metaPageTitle:
                'Gift a Light | Trees Of Light | The Hospice of Baton Rouge',
            metaTitle:
                'Gift a Light | Trees Of Light | The Hospice of Baton Rouge',
            metaDescription:
                'Honor your loved ones throughout the holiday season by purchasing lights in their honor or memory on our virtual Tree of Light. Proceeds benefit the Patient Care Fund.',
            // Page Variables
            introText:
                'Gift lights below for loved ones through the end of the holiday season. We appreciate your support for The Hospice of Baton Rouge.',
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
    // eslint-disable-next-line no-unused-vars
    // Empty priceData on route leave to avoid potential conflicts on other pages
    mounted() {
        this.$store.commit('emptyPriceData')
    },
}
</script>

<style lang="scss" scoped>
.scrollable-content {
    @apply absolute;
    top: 75px;
    bottom: 65px;
    height: calc(100% - 140px);
}
</style>
