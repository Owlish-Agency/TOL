import { extend } from 'vee-validate'
import { required, email, numeric } from 'vee-validate/dist/rules'
extend('required', {
    ...required,
    message: 'This field is required',
})
extend('greaterThanZero', {
    message: field => field + ' value must be greater than zero.',
    validate: value => {
        // value must be > zero
        if (value > 0) return true
        return false
    },
})
extend('numeric', numeric)
extend('email', email)
