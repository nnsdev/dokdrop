<template>
  <div>
    <div class="card" v-if="!folder">
      <div class="card-body">
        <h4 class="card-title">Please set your iRacing folder and saving</h4>
        <setting-card :buttons="false"></setting-card>
      </div>
    </div>
    <div id="content" style="height: 100vh; text-align: center;" class="pt-4" v-else>
        <router-link to="/settings">Settings</router-link><br>
        Drop your setup here
    </div>
    <modal name="guess">
      <div class="container mt-4">
        <h3>Your Setup</h3>
        <div class="row">
          <div class="col-xs-4">
            <strong>Car</strong><br>
            {{ guess.car ? guess.car[1] : 'Not guessed' }}<br>
            <p class="mt-4" v-if="(saving === 'car' && guess.car) || (saving === 'track' && guess.car && guess.track) || (saving.startsWith('season') && guess.car && guess.track && guess.season)">
              <a @click="copyFile" class="text-primary">Correct!</a> or <a @click="fix" class="text-primary">Wrong :(</a>
            </p>
            <p class="mt-4" v-else>
              <a @click="fix" class="text-primary">Fix</a>
            </p>
          </div>
          <div class="col-xs-4 mx-2" v-if="saving !== 'car'">
            <strong>Track</strong><br>
            {{ guess.track ? guess.track[1] : 'Not guessed' }}<br>
          </div>
          <div class="col-xs-4 mx-2" v-if="saving.startsWith('season')">
            <strong>Season</strong><br>
            {{ guess.season ? guess.season[1] : 'Not guessed'}}
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import SettingCard from './partials/SettingCard.vue'
  export default {
    name: 'landing-page',
    components: { SettingCard },
    data: () => {
      return {
        folder: null,
        saving: null,
        guess: {path: null, name: null, car: null, track: null, season: null}
      }
    },
    methods: {
      hide (modal) {
        this.$modal.hide(modal)
      },
      guessInfo (path, filename) {
        this.guess = {path: null, name: null, car: null, track: null, season: null}
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
        let season = (typeof this.guess.season === 'undefined') ? null : this.guess.season[1]
        this.copySetup(
          this.guess.path,
          this.createFolders(this.guess.car[2], this.guess.track[0], season) + this.guess.name
        )
      },
      fix () {
        this.$router.push({path: 'fix', query: { filename: this.guess.name, path: this.guess.path }})
      }
    },
    mounted () {
      this.folder = (localStorage.getItem('folder')) ? localStorage.getItem('folder') : null
      this.saving = (localStorage.getItem('saving')) ? localStorage.getItem('saving') : 'track'
      this.$on('saved', () => {
        this.folder = localStorage.getItem('folder')
        this.saving = localStorage.getItem('saving')
      })
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