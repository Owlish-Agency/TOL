<template>
    <FormLayout
        form-name="sponsorship-form"
        :form-fields="formFields"
        :error="error"
        :intro-text="introText"
    />
</template>

<script>
export default {
    name: 'SponsorshipsDonationForm',
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
                    formName: 'sponsorship-form',
                }
            )
        } catch (error) {
            console.log('Error on front end')
            console.log(error.response.data)
        }

        if (result.priceFields) {
            store.dispatch('SET_PRICE_FIELDS', result.priceFields)
        }
        console.log(result.fields)
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
                'Become a Donor | Trees Of Light | The Hospice of Baton Rouge',
            metaTitle:
                'Become a Donor | Trees Of Light | The Hospice of Baton Rouge',
            metaDescription:
                'Support our mission by becoming a proud donor to our Trees of Light Fundraiser. Proceeds directly benefit the Patient Care Fund.',
            // Page Variables
            introText:
                'We hope you will support The Hospice of Baton Rouge and our mission by choosing to become one of our proud donors. Your donation will provide much needed care to people in our community.',
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
    mounted() {
        this.$store.commit('emptyPriceData')
        this.$store.commit('emptyActiveDynamiceFields')
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
