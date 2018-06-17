import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import Notifications from 'vue-notification'
import guess from './guesser'
import VModal from 'vue-js-modal'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$fs = require('fs-extra')
Vue.prototype.$guesser = guess

Vue.use(Notifications)
Vue.use(VModal, {dialog: true})

Vue.mixin({
  methods: {
    notify (err, msg) {
      this.$notify({
        group: 'main',
        type: err,
        text: msg
      })
    },
    createFolders (car, track) {
      let folder = localStorage.getItem('folder') + '/' + car
      if (!this.$fs.existsSync(folder)) {
        this.$fs.mkdirSync(folder)
      }
      if (localStorage.getItem('saving') === 'car') {
        return folder + '/'
      }
      if (!this.$fs.existsSync(folder + '/' + track)) {
        this.$fs.mkdirSync(folder + '/' + track)
      }
      return folder + '/' + track + '/'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
