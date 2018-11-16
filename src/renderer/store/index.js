import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    folder: null,
    saving: 'season'
  },
  getters: {
    getFolder: state => state.folder,
    getSaving: state => state.saving
  },
  mutations: {
    setFolder (state, folder) {
      state.folder = folder
    },
    setSaving (state, saving) {
      state.saving = saving
    }
  },
  plugins: [
    createPersistedState()
  ]
})
