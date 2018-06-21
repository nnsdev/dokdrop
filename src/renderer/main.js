import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'
require('./env')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$fs = require('fs-extra')
if (!process.env.PROD_URL) {
  process.env.PROD_URL = 'https://dokdrop.whatan.app/api/'
}
Vue.prototype.$backend = (process.env.NODE_ENV === 'development') ? process.env.LOCAL_URL : process.env.PROD_URL
Vue.prototype.$axios = require('axios')

Vue.use(Notifications)
Vue.use(VModal, {dialog: true})

require('./mixins')
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
