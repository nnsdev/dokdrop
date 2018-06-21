import Vue from 'vue'
Vue.mixin({
  methods: {
    notify (err, msg) {
      this.$notify({
        group: 'main',
        type: err,
        text: msg
      })
    },
    createFolders (car, track, season) {
      let folder = localStorage.getItem('folder') + '\\' + car
      if (!this.$fs.existsSync(folder)) {
        this.$fs.mkdirSync(folder)
      }
      if (localStorage.getItem('saving') === 'car') {
        return folder + '\\'
      }
      if (!this.$fs.existsSync(folder + '\\' + track)) {
        this.$fs.mkdirSync(folder + '\\' + track)
      }
      if (localStorage.getItem('saving') === 'season' && !this.$fs.existsSync(folder + '\\' + track)) {
        this.$fs.mkdirSync(folder + '\\' + track + '\\' + season)
        return folder + '\\' + track + '\\' + season + '\\'
      }
      return folder + '\\' + track + '\\'
    }
  }
})
