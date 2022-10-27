if (process.env.NODE_ENV !== 'production') require('dotenv').config()

console.log('ENV: ' + process.env.NODE_ENV)

module.exports = {
    target: 'static',
    telemetry: false,
    /*
     ** Headers of the page
     */
    head: {
        title: "The Hospice of Baton Rouge's Trees Of Light Fundraiser",
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, maximum-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: '/img/global/trees-of-light-seo.jpg',
            },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '628' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Use as fallback if no runtime config is provided
    googleAnalytics: {
        id: process.env.GA_ID,
        dev: process.env.NODE_ENV != 'production' ? true : false,
    },
    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL,
        netlifyGetForm: process.env.NETLIFY_GET_FORM,
        netlifySubmitForm: process.env.NETLIFY_SUBMIT_FORM,
        netlifyGetSponsorshipEntries:
            process.env.NETLIFY_GET_SPONSORSHIP_ENTRIES,
        netlifyGetLightEntries: process.env.NETLIFY_GET_LIGHT_ENTRIES,
        paypalClientId: process.env.PAYPAL_CLIENT_ID,
        netlifyDeploySite: process.env.NETLIFY_DEPLOY_SITE,
        googleAnalytics: {
            id: process.env.GA_ID,
            dev: process.env.NODE_ENV != 'production' ? true : false,
        },
    },
    privateRuntimeConfig: {
        wufooGetLightFields: process.env.WUFOO_GET_LIGHT_FIELDS,
        wufooSubmitLightFields: process.env.WUFOO_SUBMIT_LIGHT_FIELDS,
        wufooGetLightEntries: process.env.WUFOO_GET_LIGHT_ENTRIES,
        wuofooUsername: process.env.WUFOO_USERNAME,
        wufooGetSponsorshipFields: process.env.WUFOO_GET_SPONSORSHIP_FIELDS,
        wufooSubmitSponsorshipFields:
            process.env.WUFOO_SUBMIT_SPONSORSHIP_FIELDS,
        wufooGetSponsorshipEntries: process.env.WUFOO_GET_SPONSORSHIP_ENTRIES,
    },
    loading: false,
    /*
     ** Global CSS
     */
    css: ['@fortawesome/fontawesome-svg-core/styles.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/methods.js',
        '~/plugins/gsap.js',
        '~/plugins/maz-ui.js',
        '~/plugins/tooltip.js',
        { src: '~/plugins/vee-validate.js', ssr: true },
        { src: '~/plugins/webFontLoader.js', ssr: false },
        { src: '~/plugins/resize', ssr: false },
        { src: '~/plugins/vh-check', ssr: false },
        { src: '~/plugins/fontawesome.js' },
        { src: '~/plugins/flickity', ssr: false },
        { src: '~/plugins/page-transition', ssr: false },
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/stylelint-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/router-extras',
        '@nuxtjs/svg',
        '@nuxtjs/google-analytics',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'nuxt-facebook-pixel-module',
        'nuxt-password-protect',
    ],
    passwordProtect: {
        enabled: true,
        // enabled: process.env.ENVIRONMENT === 'production',
        formPath: '/deploy-site/login',
        password: process.env.DEPLOY_PASSWORD,
        tokenSeed: 101010,
        queryString: '_pw',
        cookieName: '_password',
        cookie: {
            prefix: '',
            expires: 5,
        },
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        https: false,
    },
    /**
     * Facebook Pizel Config
     */
    facebook: {
        /* module options */
        pixelId: process.env.FACEBOOK_PIXEL_ID,
        autoPageView: true,
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        transpile: ['vee-validate', 'vee-validate/dist/rules', 'gsap'],
        babel: {
            plugins: [
                [
                    'component',
                    {
                        libraryName: 'maz-ui',
                        styleLibraryName: 'css',
                    },
                ],
            ],
        },
    },
}
