<template>
    <div>
        <div
            v-if="availableLights.length > 0"
            class="text-snow font-light p-6 border-b border-muted-blue"
        >
            <p class="lg:text-lg px-4 mb-6">Lights gifted:</p>
            <div
                v-for="(data, i) in availableLights"
                :key="i"
                class="flex flex-row space-x-3 lg:space-x-5 items-center"
                :class="{ 'mb-3': i + 1 != availableLights.length }"
            >
                <div class="light-container">
                    <span class="light-bulb"></span>
                </div>
                <div class="flex-grow">
                    <p v-if="data.honoreeName" class="sm:text-sm lg:text-base">
                        {{ data.donationId }}<br />
                        <span
                            class="text-gold font-default font-medium block mb-1"
                        >
                            {{ data.honoreeName }}<br />
                        </span>
                    </p>
                    <span class="text-white text-sm lg:text-base"
                        >1 light: $30</span
                    >
                </div>
            </div>
        </div>
        <div
            v-if="availableCustomDonations.length > 0"
            class="text-snow font-light p-10 border-b border-muted-blue"
        >
            <p class="lg:text-lg mb-6">Custom donations given:</p>
            <div class="flex flex-row space-x-5 items-center">
                <img class="w-16 lg:w-24" src="/img/cash-icon.svg" alt="" />
                <p class="text-sm lg:text-base">
                    Custom Donation:<br />
                    <span class="text-gold font-default font-medium">
                        {{ availableCustomDonations[0].formattedDonation }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'LightItems',
    computed: {
        ...mapState(['priceData', 'totalPrice']),
        availableLights() {
            let lights = this.priceData.filter(el => el.fieldType == 'light')
            return lights
        },
        availableCustomDonations() {
            let donationAvailable = this.priceData.filter(
                el => el.fieldType == 'customDonation'
            )
            return donationAvailable
        },
    },
    watch: {
        availableLights() {
            this.calculateTotalAmount()
        },
        availableCustomDonations: {
            handler() {
                this.calculateTotalAmount()
            },
            deep: true,
        },
    },
    methods: {
        ...mapMutations({
            incrementTotalPrice: 'incrementTotalPrice',
        }),
        calculateTotalAmount() {
            let totalLights =
                this.availableLights.length > 0
                    ? this.availableLights.length * 30
                    : 0
            let customDonationAmount =
                this.availableCustomDonations.length > 0 &&
                this.availableCustomDonations[0].donation
                    ? this.availableCustomDonations[0].donation
                    : 0
            let totalAmount = totalLights + customDonationAmount
            this.incrementTotalPrice({
                value: totalAmount.toFixed(2),
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.light-container {
    @apply relative flex items-center justify-center w-20 h-20;
    @screen lg {
        @apply w-32 h-32;
    }
    &::after {
        content: '';
        @apply absolute w-full h-full inset-0;
        background: radial-gradient(
            44.12% 44.12% at 50% 50%,
            #ffe6ab 4.17%,
            rgba(255, 233, 156, 0.42) 40.1%,
            rgba(16, 46, 81, 0) 100%
        );
    }
    .light-bulb {
        border-radius: 50%;
        @apply relative z-10 block w-1 h-3 bg-white;
        @screen lg {
            @apply w-2 h-5;
        }
    }
}
</style>
