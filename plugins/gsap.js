import { gsap } from 'gsap/dist/gsap'

// Import plugins
// !Must be the ESM versions
// import { CustomEase } from '~/assets/vendor/CustomEase'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default (context, inject) => {
    // Inject the main GSAP instance
    inject('gsap', gsap)
    // gsap.registerPlugin(CustomEase, ScrollTrigger)

    // Register and inject GSAP plugins into the $root
    // inject('ScrollTrigger', ScrollTrigger)
    // inject('CustomEase', CustomEase)
}
