<template>
    <div v-if="selectedSponsorship.length > 0">
        <div class="text-snow font-light p-10 border-b border-muted-blue">
            <p class="text-lg">Donation Summary:</p>
            <div
                v-if="selectedSponsorship[0].price"
                class="flex flex-wrap items-center mt-4"
            >
                <img
                    :src="selectedSponsorship[0].icon"
                    class="flex-0 md:px-2 max-h-20"
                />
                <div class="flex-1 md:px-2">
                    <p class="text-sm text-white">Donor Level:</p>
                    <p class="text-sm text-gold">
                        {{ selectedSponsorship[0].level }}
                        ${{ selectedSponsorship[0].price }}
                    </p>
                </div>
                <div class="w-full mt-8">
                    <span class="">
                        Level Includes:
                    </span>
                    <ul
                        v-if="selectedSponsorship[0].includes"
                        class="text-sm list-disc pl-6"
                    >
                        <li
                            v-for="(item, index) in selectedSponsorship[0]
                                .includes"
                            :key="index"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SponsorshipItem',
    computed: {
        selectedSponsorship() {
            return this.$store.state.priceData
        },
    },
}
</script>
