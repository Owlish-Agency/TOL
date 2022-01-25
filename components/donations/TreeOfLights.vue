<template>
    <div class="tree-width mx-auto self-end relative w-full mt-20 md:px-10">
        <TreeSvg ref="treeSvg" class="w-full" />
        <svg
            v-if="lights.length > 0"
            viewBox="0 0 584 778"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 w-full"
            style="height: 95%"
        >
            <template v-for="(light, i) in lights">
                <ellipse
                    v-if="coords(i)"
                    :key="i"
                    v-tooltip="{
                        content: toolTipContent(light),
                        show:
                            selectedLight === light.light &&
                            donatedBy == light.Field10,
                        trigger: 'manual',
                        classes:
                            'text-sm bg-dark-blue text-white z-10 py-3 px-5 rounded-full',
                    }"
                    rx="16.159"
                    ry="16.157"
                    :transform="coords(i)"
                    class="transition-all duration-500 cursor-pointer outline-none"
                    fill="url(#LightGradient)"
                    @mouseenter="setHoveredLight(light)"
                    @mouseleave="unsetHoveredLight"
                    @click="setLight(light)"
                />
            </template>
            <radialGradient id="LightGradient">
                <stop offset="0.0416667" stop-color="#FFE6AB" />
                <stop
                    offset="0.401042"
                    stop-color="#FFE99C"
                    stop-opacity="0.42"
                />
                <stop offset="1" stop-color="#102E51" stop-opacity="0" />
            </radialGradient>
        </svg>
    </div>
</template>

<script>
import TreeSvg from '~/assets/img/tree.svg?inline'
import LightsData from '~/mixins/LightsData.json'
import { mapState } from 'vuex'
export default {
    name: 'Tree',
    components: { TreeSvg },
    props: {
        lights: {
            type: Array,
            default: Array,
        },
        selectedLight: {
            type: String,
            default: String,
        },
        donatedBy: {
            type: String,
            default: String,
        },
    },
    data() {
        return {
            maxMappedLights: 200,
            lightsGifted: this.lights.length,
            lightHovered: null,
            lightsData: LightsData,
            isMobile: false,
        }
    },
    computed: {
        ...mapState(['screenSize']),
    },
    mounted() {
        this.checkScreenSize(this.screenSize)
    },
    methods: {
        checkScreenSize(size) {
            if (size >= 641) {
                this.isMobile = false
            } else {
                this.isMobile = true
            }
        },
        coords(i) {
            let indexLength = i + 1
            if (indexLength <= this.maxMappedLights) {
                let coordinates = this.lightsData[i]
                return coordinates
            } else {
                let resetIndex = indexLength - this.maxMappedLights - 1
                let coordinates = this.lightsData[resetIndex]
                return coordinates
            }
        },
        toolTipContent(el) {
            let notifierId = el.light.substr(0, el.light.indexOf('-'))
            let giftedBy = el.Field10
            return (
                '<span class="font-bold">' +
                notifierId +
                '</span><br /><span class="text-sm text-snow">Gifted by: ' +
                giftedBy +
                '</span>'
            )
        },
        setLight(lightEl) {
            this.$emit('setLightFromTree', {
                light: lightEl.light,
                donatedBy: lightEl.Field10,
            })
        },
        setHoveredLight(light) {
            this.lightHovered = light.light
        },
        unsetHoveredLight() {
            this.lightHovered = null
        },
    },
}
</script>

<style lang="scss">
.tree-width {
    @apply max-w-md;
    @media (min-width: 1200px) and (max-height: 900px) {
        @apply max-w-lg;
    }
    @media (min-width: 1400px) and (min-height: 900px) {
        @apply max-w-full;
    }
}
.tooltip .tooltip-arrow {
    @apply border-dark-blue z-1 absolute w-0 h-0;
    border-style: solid;
    margin: 10px;
    z-index: 1;
}
.tooltip[x-placement^='top'] {
    margin-bottom: 10px;
}

.tooltip[x-placement^='top'] .tooltip-arrow {
    border-width: 10px 10px 0 10px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -10px;
    left: calc(50% - 10px);
    margin-top: 0;
    margin-bottom: 0;
}
</style>
