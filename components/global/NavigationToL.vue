<template>
    <div>
        <!-- Root Element for All Navigation -->
        <div>
            <!-- Hamburger Button -->
            <button
                class="hamburger-button fixed z-50 p-3 text-muted-dark rounded-md"
                style="top:10px; left:10px;"
                :aria-expanded="isNavOpen"
                aria-label="Toggle Navigation"
                @click="toggleNav"
            >
                <FontAwesomeIcon
                    :icon="['fas', isNavOpen ? 'times' : 'bars']"
                />
            </button>

            <!-- Slide-Out Navigation -->
            <transition name="slide">
                <div
                    v-if="isNavOpen"
                    ref="navEl"
                    class="fixed top-0 left-0 h-full md:w-80 lg:w-1/3 bg-white text-muted-dark z-50"
                >
                    <div
                        class="p-8 relative h-full max-h-screen overflow-y-auto"
                    >
                        <!-- Close Button -->
                        <div class="flex items-center mb-6">
                            <h2 class="text-xl font-bold flex-1">Menu</h2>
                            <button
                                class="text-xl bg-transparent border-none ml-auto"
                                aria-label="Close Navigation"
                                @click="toggleNav"
                            >
                                x
                            </button>
                        </div>
                        <div class="flex flex-col space-y-4">
                            <NavElementsToL
                                :navigation="navigation"
                                :contact-links="contactLinks"
                                @closeNav="toggleNav"
                            />
                        </div>
                    </div>
                </div>
            </transition>

            <!-- Background Overlay -->
            <div
                v-if="isNavOpen"
                class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
                @click="toggleNav"
            ></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faBars, faTimes)
export default {
    name: 'SlideOutNavigation',
    components: {
        NavElementsToL: () =>
            import('~/components/global/navigation/NavElementsToL'),
        FontAwesomeIcon,
    },
    data() {
        return {
            isNavOpen: false,
        }
    },
    computed: {
        ...mapState(['screenSize']),
        navigation() {
            return [
                {
                    label: 'Home',
                    slug: 'https://www.hospicebr.org/pages/getting-started',
                    id: 'home',
                },
                {
                    label: 'Bereavement Support',
                    slug: 'https://www.hospicebr.org/pages/bereavement-support',
                    id: 'bereavement-support',
                },
                {
                    label: 'Getting Started',
                    slug: 'https://www.hospicebr.org/pages/getting-started',
                    id: 'getting-started',
                },
                {
                    label: 'Events',
                    slug: 'https://www.hospicebr.org/pages/events',
                    id: 'events',
                },
                {
                    label: 'Volunteer',
                    slug: 'https://www.hospicebr.org/pages/volunteer',
                    id: 'volunteer',
                },
                {
                    label: 'Contact',
                    slug: 'https://www.hospicebr.org/pages/contact',
                    id: 'contact',
                },
                {
                    label: 'Make a Referral',
                    slug: 'https://www.hospicebr.org/pages/make-a-referral',
                    id: 'make-a-referral',
                },
                {
                    label: 'Employment',
                    slug: 'https://www.hospicebr.org/pages/employment',
                    id: 'employment',
                },
                {
                    label: 'The Retreat at Quarters Lake',
                    slug:
                        'https://www.hospicebr.org/pages/the-retreat-at-quarters-lake',
                    id: 'retreat-at-quarters-lake',
                },
                {
                    label: 'Hospice Resources',
                    slug: 'https://www.hospicebr.org/pages/hospice-resources',
                    id: 'hospice-resources',
                },
                {
                    label: 'Palliative Care Resources',
                    slug:
                        'https://www.hospicebr.org/pages/palliative-care-resources',
                    id: 'palliative-care-resources',
                },
                {
                    label: 'Bereavement Resources',
                    slug:
                        'https://www.hospicebr.org/pages/bereavement-resources',
                    id: 'bereavement-resources',
                },
                {
                    label: 'Request a Presentation',
                    slug:
                        'https://www.hospicebr.org/pages/request-a-presentation',
                    id: 'request-a-presentation',
                },
                {
                    label: 'About Us',
                    slug: 'https://www.hospicebr.org/pages/about',
                    id: 'about-us',
                },
                {
                    label: 'Our Story & Mission',
                    slug: 'https://www.hospicebr.org/pages/our-story-mission',
                    id: 'our-story-mission',
                },
                {
                    label: '40th Anniversary',
                    slug: 'https://www.hospicebr.org/pages/40th-anniversary',
                    id: '40th-anniversary',
                },
                {
                    label: 'Board of Directors',
                    slug: 'https://www.hospicebr.org/pages/board-of-directors',
                    id: 'board-of-directors',
                },
                {
                    label: 'Medical Directors',
                    slug: 'https://www.hospicebr.org/pages/medical-staff',
                    id: 'medical-directors',
                },
                {
                    label: 'Our Impact',
                    slug: 'https://www.hospicebr.org/pages/our-impact',
                    id: 'our-impact',
                },
                {
                    label: 'Ways to Give',
                    slug: 'https://www.hospicebr.org/pages/donate',
                    id: 'ways-to-give',
                },
            ]
        },
        contactLinks() {
            return [
                { type: 'phone', value: 'tel:+12257674673', id: 'phone-alt' },
                {
                    type: 'email',
                    value: 'mailto:donations@hospicebr.org',
                    id: 'envelope',
                },
            ]
        },
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen
        },
    },
}
</script>

<style scoped>
.hamburger-button {
    background-color: #e5e7eb; /* Light gray color equivalent to Tailwind's bg-gray-200 */ /* White background for hamburger button */ /* Dark text color */
}

.nav-header {
    height: 75px;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
}

@media (min-width: 768px) {
    .navEl {
        width: 20rem; /* Adjusted the value for medium devices to be narrower */
    }
}

@media (min-width: 1024px) {
    .navEl {
        width: 25%; /* Adjusted to be a quarter of the screen on larger devices */
    }
}

.bg-muted-blue {
    background-color: #f5f5f5; /* Replace blue with a muted light grey */
}

.text-muted-dark {
    color: #333333; /* Use dark text for contrast */
}

h2 {
    font-family: Arial, sans-serif; /* Use a clean, readable font */
    font-weight: normal;
}

button {
    font-family: Arial, sans-serif;
}

body {
    font-family: Arial, sans-serif;
}
</style>
