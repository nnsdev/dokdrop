import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

import App from './App'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'
import Element from 'element-ui'

const env = require('./env')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$fs = require('fs-extra')
Vue.prototype.$backend = (process.env.NODE_ENV === 'development') ? env.local_url : env.prod_url
Vue.prototype.$axios = require('axios')

Vue.use(Notifications)
Vue.use(VModal, {dialog: true})
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
})
Vue.use(Vuex)

require('./mixins')
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
