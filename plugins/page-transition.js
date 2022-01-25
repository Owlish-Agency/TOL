/* eslint-disable no-unused-vars */
import Vue from 'vue'

Vue.mixin({
    beforeRouteLeave(to, from, next) {
        this.$store.commit('setPageTransition', true)
        next()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.commit('setPageTransition', false)
        })
    },
})
