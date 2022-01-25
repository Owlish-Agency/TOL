import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

library.add(faPhoneAlt, faEnvelope, faChevronUp, faTimes, faExclamationTriangle)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
