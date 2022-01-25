<template>
    <div>
        <ul class="flex flex-wrap md:-mx-5">
            <li
                v-for="(level, index) in sponsorshipLevels"
                :key="index"
                class="cursor-pointer w-full md:w-1/2 md:px-5 mb-6"
                @click="
                    selectedSponsor(
                        level.label,
                        level.value,
                        level.icon,
                        level.includes
                    )
                "
            >
                <div
                    :class="{
                        'border-1 border-gold':
                            priceData.length > 0 &&
                            priceData[0].level === level.label,
                    }"
                    class="flex flex-wrap items-center h-full md:-mx-2 rounded px-4 py-6 bg-dark-blue sponsorship-level"
                >
                    <img :src="level.icon" class="flex-0 md:px-2 max-h-20" />
                    <div class="flex-1 px-2">
                        <p class="text-white">Sponsorship Level:</p>
                        <p class="text-gold">
                            {{ level.label }} ${{ level.value }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'SponsorshipFieldLayout',
    data() {
        return {
            sponsorshipLevels: [
                {
                    label: 'Star Tree Topper',
                    value: '10,000.00',
                    icon: '/sponsorship/sponsorship-tree-star-topper.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-tree-star-topper-inverted.svg',
                    includes: [
                        'Stage Recognition',
                        'One reserved table and 10 Gala tickets',
                        'Name/Logo on Gala event signage',
                        'Name/Logo recognition on the webpage as a Star Tree Topper Sponsor',
                    ],
                },
                {
                    label: "Angel's Trumpet",
                    value: '5,000.00',
                    icon: '/sponsorship/sponsorship-angels-trumpet.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-angels-trumpet-inverted.svg',
                    includes: [
                        'Stage Recognition',
                        'One reserved table and 6 Gala tickets',
                        'Name/Logo on Gala event signage',
                        'Name/Logo recognition on the webpage as an Angel’s Trumpet Sponsor',
                    ],
                },
                {
                    label: 'Blessing Bells',
                    value: '3,000.00',
                    icon: '/sponsorship/sponsorship-blessing-bells.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-blessing-bells-inverted.svg',
                    includes: [
                        '4 Gala tickets',
                        'Name/Logo on Gala event signage',
                        'Name/Logo recognition on the webpage as a Blessing Bells Sponsor',
                    ],
                },
                {
                    label: 'Candlelight',
                    value: '1,000.00',
                    icon: '/sponsorship/sponsorship-candlelight.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-candlelight-inverted.svg',
                    includes: [
                        '2 Gala tickets',
                        'Name/Logo recognition on the webpage as a Candlelight Sponsor',
                    ],
                },
                {
                    label: 'Holiday Ornament',
                    value: '500.00',
                    icon: '/sponsorship/sponsorship-holiday-ornament.svg',
                    invertedIcon:
                        '/sponsorship/sponsorship-holiday-ornament-inverted.svg',
                    includes: [
                        'Name/Logo recognition on webpage as a Holiday Ornament Sponsor',
                    ],
                },
            ],
            selectedSponsorshipLevel: '',
        }
    },
    computed: {
        priceData() {
            return this.$store.state.priceData
        },
    },
    watch: {
        value(val) {
            this.updateValue(val)
        },
    },
    methods: {
        ...mapMutations({
            updateSponsorshipFieldData: 'updateSponsorshipFieldData',
            incrementTotalPrice: 'incrementTotalPrice',
        }),
        selectedSponsor(label, val, icon, includes) {
            this.selectedSponsorshipLevel = label
            this.updateSponsorshipFieldData({
                donationLevel: label,
                value: val,
                icon: icon,
                includes: includes,
                fieldType: 'sponsorship',
            })
            this.incrementTotalPrice({
                value: val,
            })
            this.$emit('selectedSponsorLevel', label)
        },
    },
}
</script>
<style lang="scss">
.sponsorship-level {
    p {
        @apply text-sm;
    }
}
</style>
