<template>
  <div>
    <div id="content" style="height: 100vh; text-align: center;" class="pt-4">
        <router-link to="/settings">Settings</router-link><br>
        Drop your setup here
    </div>
    <modal name="guess">
      <div class="container mt-4">
        <h3>Your Setup</h3>
        <div class="row">
          <div class="col-xs-6 ml-3 mr-5">
            <strong>Track</strong><br>
            {{ guess.track ? guess.track[1] : 'Not guessed' }}<br>
            <p class="mt-4">
              <a @click="copyFile" class="text-primary">Correct!</a> or <a @click="fix" class="text-primary">Wrong :(</a>
            </p>
          </div>
          <div class="col-xs-6 ml-5">
            <strong>Car</strong><br>
            {{ guess.car ? guess.car[1] : 'Not guessed' }}<br>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data: () => {
      return {
        folder: null,
        saving: null,
        inputs: { folder: null, saving: null },
        guess: {path: null, name: null, car: null, track: null}
      }
    },
    methods: {
      hide (modal) {
        this.$modal.hide(modal)
      },
      guessInfo (path, filename) {
        this.guess = {path: null, name: null, car: null, track: null}
        this.$axios.post(this.$backend + 'guess', {path: path, filename: filename}).then(res => {
          this.guess = res.data
          this.guess.name = filename
          this.guess.path = path
        }).catch(err => {
          console.log(err)
          this.notify('error', 'There has been an issue guessing your track. Please try again')
        })
        this.$modal.show('guess')
      },
      copyFile () {
        let path = this.createFolders(this.guess.car[2], this.guess.track[0])
        this.$fs.copy(this.guess.path, path + this.guess.name).then(() => {
          this.notify('success', 'File successfully copied')
        }).catch(err => {
          console.log(err)
          this.notify('error', 'Some kind of error happened')
        })
      },
      fix () {
        this.$router.push({path: 'fix', query: { filename: this.guess.name, path: this.guess.path }})
      }
    },
    mounted () {
      if (localStorage.getItem('folder')) {
        this.folder = localStorage.getItem('folder')
      } else {
        this.$route.push('settings')
      }
      this.saving = (localStorage.getItem('saving')) ? localStorage.getItem('saving') : 'track'
    },
    updated () {
      document.ondragover = () => {
        return false
      }
      document.ondragleave = () => {
        return false
      }
      document.ondragend = () => {
        return false
      }
      document.ondrop = (e) => {
        e.preventDefault()
        this.guessInfo(e.dataTransfer.files[0].path, e.dataTransfer.files[0].name)
        return false
      }
    }
  }
</script>