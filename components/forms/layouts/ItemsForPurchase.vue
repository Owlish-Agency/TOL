<template>
    <div>
        <Lights v-if="itemType == 'gift-a-light'" />
        <Sponsorship v-else />
        <div
            class="flex flex-wrap justify-between items-baseline text-snow text-2xl font-bold p-10"
        >
            <p>Total:</p>
            <p>${{ totalPrice }}</p>
        </div>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
    name: 'ItemsForPurchase',
    components: {
        Lights: () => import('~/components/forms//layouts/sidebar/Lights'),
        Sponsorship: () =>
            import('~/components/forms//layouts/sidebar/Sponsorship'),
    },
    props: {
        itemType: {
            type: String,
            required: true,
            validator: value => {
                return (
                    ['gift-a-light', 'sponsorships-become-a-sponsor'].indexOf(
                        value
                    ) !== -1
                )
            },
        },
    },
    computed: {
        // Map the active dynamic field state to this component
        // ...mapState(['totalPrice']),
        totalPrice() {
            return this.$store.state.totalPrice
        },
    },
}
</script>
