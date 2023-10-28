<template>
    <TypeBasedTransition :transition-type="'fadeUpDown'">
        <div
            v-show="!disablePaymentOptions"
            class="p-6 mb-10 md:mb-0 bg-white rounded-md"
        >
            <p class="text-xl text-center font-bold mb-6">
                Complete your donation
            </p>
            <div v-if="paypalLoaderError" class="bg-red-100 p-3">
                <p class="text-center text-red-600">
                    There was an error loading this page. Please
                    <a
                        href="mailto:donations@hospicebr.org"
                        target="_blank"
                        class="text-light-blue"
                    >
                        contact us
                    </a>
                    to let us know about this issue.
                </p>
            </div>
            <div id="paypal-button-container"></div>
        </div>
    </TypeBasedTransition>
</template>
<script>
import TypeBasedTransition from '~/components/forms/transitions/TypeBasedTransition.vue'
export default {
    name: 'FormCheckout',
    components: {
        TypeBasedTransition,
    },
    props: {
        formName: {
            type: String,
            required: true,
            validator: value => {
                return (
                    ['gift-light-form', 'sponsorship-form'].indexOf(value) !==
                    -1
                )
            },
        },
        wufooError: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            clientId: this.$config.paypalClientId,
            sdkLoaded: false,
            paypalLoaderError: false,
            hasPaid: false,
            paymentDetails: null,
            disablePaymentOptions: false,
        }
    },
    computed: {
        totalPrice() {
            return 1
        },
        priceData() {
            return this.$store.state.priceData
        },
        paymentDescription() {
            return this.formName == 'gift-light-form'
                ? 'Lights Gifted'
                : 'Sponsorship Chosen'
        },
        itemsForPurchase() {
            let items = []
            if (this.formName == 'gift-light-form') {
                items = this.priceData.map(obj => {
                    if (obj.fieldType == 'light') {
                        return {
                            name: 'Light - $30.00',
                            description: `${obj.donationId} ${obj.honoreeName}`,
                            unit_amount: {
                                value: '30.00',
                                currency_code: 'USD',
                            },
                            quantity: '1',
                        }
                    }
                    if (obj.fieldType == 'customDonation') {
                        return {
                            name: 'Custom Donation',
                            description: `A custom donation of ${obj.formattedDonation}`,
                            unit_amount: {
                                value: obj.donation.toFixed(2).toString(),
                                currency_code: 'USD',
                            },
                            quantity: '1',
                        }
                    }
                })
            } else {
                // Sponsorship data goes here
                items = this.priceData.map(obj => {
                    return {
                        name: obj.level,
                        description: `A sponsorship to ${obj.level}`,
                        unit_amount: {
                            value: obj.price.replace(/,/g, ''),
                            currency_code: 'USD',
                        },
                        quantity: '1',
                    }
                })
            }
            return items
        },
    },
    watch: {
        hasPaid(val) {
            if (val) {
                this.$emit('submitToWufoo', this.paymentDetails)
            }
        },
        wufooError(val) {
            if (val != null) {
                this.disablePaymentOptions = true
            } else {
                this.disablePaymentOptions = false
            }
        },
    },
    async mounted() {
        await this.loadSdkScript()
        this.renderButton()
    },
    methods: {
        loadSdkScript() {
            return new Promise(resolve => {
                const script = document.createElement('script')
                script.async = true
                script.src =
                    'https://www.paypal.com/sdk/js?client-id=' +
                    this.clientId +
                    '&disable-funding=credit&currency=USD'
                script.onload = () => {
                    this.sdkLoaded = true
                    resolve()
                }
                document.body.appendChild(script)
            })
        },
        renderButton() {
            window.paypal
                .Buttons({
                    createOrder: (data, actions) =>
                        this.createOrder(data, actions),
                    onApprove: (data, actions) => this.onApprove(data, actions),
                    onError: this.onError,
                })
                .render('#paypal-button-container')
        },
        createOrder(data, actions) {
            const self = this
            return actions.order.create({
                application_context: {
                    shipping_preference: 'NO_SHIPPING',
                },
                purchase_units: [
                    {
                        description: self.paymentDescription,
                        amount: {
                            value: self.totalPrice,
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: self.totalPrice,
                                },
                                shipping: {
                                    currency_code: 'USD',
                                    value: '0',
                                },
                                handling: {
                                    currency_code: 'USD',
                                    value: '0',
                                },
                                tax_total: {
                                    currency_code: 'USD',
                                    value: '0',
                                },
                                shipping_discount: {
                                    currency_code: 'USD',
                                    value: '0',
                                },
                            },
                        },
                        items: [...self.itemsForPurchase],
                    },
                ],
            })
        },
        onApprove(data, actions) {
            const self = this
            return actions.order.capture().then(function(details) {
                // This function shows a transaction success message to your buyer.
                const completed = details.status == 'COMPLETED' ? true : false
                // const transactionId = details.id
                // const payer = details.payer
                // const purchaseUnits = details.purchase_units
                if (completed) {
                    self.paymentDetails = {
                        id: details.id,
                        status: details.status,
                    }
                    self.hasPaid = true
                } else {
                    self.paypalLoaderError = true
                    self.hasPaid = false
                    self.paymentDetails = null
                    console.error('PayPal', 'onApprove', details)
                }
            })
        },
        onError() {
            /**
             * If an error prevents buyer checkout, alert the user
             * that an error has occurred with the buttons using the onError callback:
             */
            const self = this
            return err => {
                self.paypalLoaderError = true
                self.hasPaid = false
                self.paymentDetails = null
                console.log('Error with payment')
                console.error('PayPal', 'onError', err)
            }
        },
    },
}
</script>
