import Vue from 'vue'
import {default as saving} from './files/saving'
Vue.mixin({
  methods: {
    notify (err, msg) {
      this.$notify({
        type: err,
        message: msg
      })
    },
    createFolders (car, track, season) {
      return saving(this.$store.state.folder, this.$store.state.saving, {car: car, track: track, season: season}) + '\\'
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
