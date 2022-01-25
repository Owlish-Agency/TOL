<template>
    <section class="relative h-full">
        <div class="page-height-form">
            <div
                ref="overflowContainer"
                class="overflow-scroll no-scrollbar scrollable-content h-full"
            >
                <div
                    class="flex flex-wrap divide-y md:divide-x divide-muted-blue h-full"
                >
                    <div class="w-full md:w-4/6 md:min-h-full">
                        <div
                            class="relative py-6 md:py-16 px-8 sm:p-10 md:px-10 lg:px-24 2xl:px-48 md:pb-0"
                        >
                            <p class="text-snow 2xl:text-xl">
                                {{ introText }}
                            </p>
                        </div>
                        <FormStepper :steps="determineSteps" />
                        <div
                            class="relative py-6 md:py-16 px-8 sm:p-10 md:px-10 lg:px-24 2xl:px-48 md:pt-0"
                        >
                            <template v-if="showChildPage == 1">
                                <Form
                                    :form-name="formName"
                                    :form-fields="formFields"
                                    :error="error"
                                />
                            </template>
                            <nuxt-child v-else />
                        </div>
                    </div>
                    <div class="sidebar no-scrollbar">
                        <ItemsForPurchase :item-type="$route.name" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'FormLayout',
    components: {
        Form: () => import('~/components/forms/form'),
        ItemsForPurchase: () =>
            import('~/components/forms/layouts/ItemsForPurchase'),
        FormStepper: () => import('~/components/forms/layouts/FormStepper'),
    },
    props: {
        formName: {
            type: String,
            required: true,
        },
        formFields: {
            type: Array,
            default: Array,
        },
        error: {
            type: [String, Boolean],
            default: String,
        },
        introText: {
            type: String,
            default:
                'We are extremely grateful for your consideration in donating to The Hospice of Baton Rouge this holiday season.',
        },
    },
    data() {
        return {
            activeStep: 1,
        }
    },
    computed: {
        showChildPage() {
            return this.$route.matched.length
        },
        determineSteps() {
            let steps = []
            if (this.formName == 'gift-light-form') {
                steps = [
                    {
                        label: 'Lights',
                        active: this.activeStep >= 1 ? true : false,
                    },
                    {
                        label: 'Contact',
                        active: this.activeStep >= 2 ? true : false,
                    },
                    {
                        label: 'Checkout',
                        active: this.activeStep >= 3 ? true : false,
                    },
                ]
            } else {
                steps = [
                    {
                        label: 'Sponsorship',
                        active: this.activeStep >= 1 ? true : false,
                    },
                    {
                        label: 'Contact',
                        active: this.activeStep >= 2 ? true : false,
                    },
                    {
                        label: 'Checkout',
                        active: this.activeStep >= 3 ? true : false,
                    },
                ]
            }
            return steps
        },
    },
    mounted() {
        const overflowContainer = this.$refs.overflowContainer
        this.$root.$on('activeFieldUpdated', $event => {
            this.activeStep = $event + 1
        })
        this.$root.$on('scrollToTop', () => {
            if (overflowContainer) {
                overflowContainer.scrollTop = 0
            }
        })
    },
}
</script>

<style lang="scss" scoped>
.scrollable-content {
    @apply absolute;
    top: 0px;
    bottom: 0px;
}
.form-layout-height {
    height: calc(100% - 150px);
}
.sidebar {
    @apply w-full;
    @screen md {
        @apply fixed right-0 border-l border-muted-blue w-2/6 overflow-scroll;
        top: 75px;
        bottom: 75px;
    }
}
</style>
