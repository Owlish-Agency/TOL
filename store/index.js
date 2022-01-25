export const state = () => ({
    screenSize: null,
    screenSizeHeight: null,
    totalPrice: '0.00',
    priceData: [],
    activeDynamicFields: [],
    customDonationAmount: '',
    priceFields: [],
    formData: {},
    dynamicFieldInputData: {},
    isInitialPageLoad: true,
    welcomeScreenEnabled: true,
    pageTransitioning: false,
})

export const mutations = {
    WINDOW_SIZE_CHANGED(state, value) {
        state.screenSize = value.width
        state.screenSizeHeight = value.height
    },
    updateField(state, payload) {
        state.formData[payload.key] = payload.value
    },
    updateDynamicInputData(state, payload) {
        state.dynamicFieldInputData[payload.key] = payload.value
    },
    setPriceFields(state, payload) {
        state.priceFields = payload
    },
    addDynamicField(state, payload) {
        state.activeDynamicFields.push(payload)
    },
    removeDynamicField(state, payload) {
        state.activeDynamicFields.splice(payload, 1)
    },
    removeDynamicFieldData(state, payload) {
        let groupIdIndex = state.priceData.findIndex(x => x.groupId == payload)
        if (groupIdIndex !== -1) {
            state.priceData.splice(groupIdIndex, 1)
        }
    },
    emptyPriceData(state) {
        state.priceData = []
        state.totalPrice = '0.00'
    },
    emptyActiveDynamiceFields(state) {
        state.activeDynamicFields = []
    },
    incrementTotalPrice(state, payload) {
        state.totalPrice = payload.value
        // state.totalPrice.formattedValue = payload.formattedValue
    },
    updateDynamicFieldData(state, payload) {
        // Check to see if incoming groupId is already accounted for and get the index if it is
        let groupIdIndex = state.priceData.findIndex(
            x => x.groupId == payload.groupId
        )

        // groupId isn't found, add it to state
        if (groupIdIndex === -1) {
            state.priceData.push({
                [payload.key]: payload.value,
                groupId: payload.groupId,
                fieldType: payload.fieldType,
            })
        }

        // groupId has been found, update state
        else {
            // In order to maintain reactivity, we use the $set API provided by Vue:
            /**
             * ! Important: The below if/else is a workaround due to Vuex throwing a
             * ! hissy fit when updating the address field. We technically should just be
             * ! using $set here, but for now we kill reactivity when the payload.key
             * ! contains address to bandaid the issue since there is no time.
             */
            if (payload.key.includes('address')) {
                // Kill reactivity when payload.key is address
                state.priceData[groupIdIndex][payload.key] = payload.value
            } else {
                // Maintain reactivity for all other payloads
                if (payload.addFormattedDonation) {
                    this._vm.$set(
                        state.priceData[groupIdIndex],
                        'formattedDonation',
                        payload.value
                    )
                } else {
                    this._vm.$set(
                        state.priceData[groupIdIndex],
                        payload.key,
                        payload.value
                    )
                }
            }
        }
    },
    updateSponsorshipFieldData(state, payload) {
        state.priceData = [
            {
                ['fieldType']: payload.fieldType,
                ['level']: payload.donationLevel,
                ['price']: payload.value,
                ['icon']: payload.icon,
                ['includes']: payload.includes,
            },
        ]
    },
    setPageTransition(state, payload) {
        state.pageTransitioning = payload
    },
}

export const actions = {
    WINDOW_SIZE_CHANGED({ commit }, value) {
        commit('WINDOW_SIZE_CHANGED', value)
    },
    SET_PRICE_FIELDS({ commit }, value) {
        commit('setPriceFields', value)
    },
}
