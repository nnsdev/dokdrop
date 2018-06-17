<template>
  <div>
    <div class="card" v-if="!folder">
      <div class="card-body">
        <h4 class="card-title">Please set your iRacing folder and saving</h4>
        <p class="card-text">
          Your default folder should be something like "C:\Users\User\Documents\iRacing\setups"
          <form>
            <label for="folder" class="grey-text">Folder</label>
            <input type="text" v-model="inputs.folder" class="form-control" placeholder="Folder">
            <label for="saving" class="grey-text mt-2">Saving Method</label>
            <div class="md-form mt-2">
              <div class="col-sm-3">
                <input type="radio" v-model="inputs.saving" value="track"> car\track\setup.sto
              </div>
              <div class="col-sm-3">
                <input type="radio" v-model="inputs.saving" value="car"> car\setup.sto
              </div>
            </div>
            <div class="text-center mt-4">
              <button class="btn btn-primary" type="button" @click="set">Set</button>
            </div>
          </form>
        </p>
      </div>
    </div>
    <div id="content" style="height: 100vh; text-align: center;" class="pt-4" v-else>
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
      set () {
        if (!this.inputs.folder) {
          this.notify('error', 'Please set a folder.')
        }
        if (!this.inputs.saving) {
          this.notify('error', 'Please set a saving method.')
        }
        if (this.inputs.folder && this.inputs.saving) {
          this.saving = this.inputs.saving
          localStorage.setItem('saving', this.saving)
          if (this.$fs.existsSync(this.inputs.folder)) {
            this.folder = this.inputs.folder
            localStorage.setItem('folder', this.folder)
          } else {
            this.folder = null
            localStorage.removeItem('folder')
            this.notify('error', 'Folder does not seem to exist. Please double check.')
          }
        }
      },
      guessInfo (path, filename) {
        this.guess = {path: null, name: null, car: null, track: null}
        this.guess = this.$guesser(path, filename)
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

      }
    },
    mounted () {
      if (localStorage.getItem('folder')) {
        this.folder = localStorage.getItem('folder')
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