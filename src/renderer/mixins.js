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
    createCarFolder (car) {
      let folder = localStorage.getItem('folder') + '\\' + car
      if (!this.$fs.existsSync(folder)) {
        this.$fs.mkdirSync(folder)
      }
      return folder
    },
    createTrackFolder (folder, track) {
      if (!this.$fs.existsSync(folder + '\\' + track)) {
        this.$fs.mkdirSync(folder + '\\' + track)
      }
      return folder + '\\' + track
    },
    createSeasonFolder (folder, season) {
      if (!this.$fs.existsSync(folder + '\\' + season)) {
        this.$fs.mkdirSync(folder + '\\' + season)
      }
      return folder + '\\' + season
    },
    createFolders (car, track, season) {
      var folder = this.createCarFolder(car)
      if (localStorage.getItem('saving') === 'car') {
        return folder + '\\'
      }
      if (localStorage.getItem('saving') === 'seasonfirst') {
        folder = this.createSeasonFolder(folder, season)
        return this.createTrackFolder(folder, track) + '\\'
      }
      folder = this.createTrackFolder(folder, track)
      if (localStorage.getItem('saving') === 'season') {
        return this.createSeasonFolder(folder, season) + '\\'
      }
      return folder + '\\'
    },
    copySetup (path, newpath) {
      if (this.$fs.existsSync(newpath)) {
        this.notify('error', 'File already exists.')
      } else {
        this.$fs.copy(path, newpath).then(() => {
          this.notify('success', 'File successfully copied')
          this.$modal.hide('guess')
        }).catch(err => {
          console.log(err)
          this.notify('error', 'Some kind of error happened')
        })
      }
    }
  }
})
