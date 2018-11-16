<template>
  <div>
    <el-row :gutter="5" v-show="folder">
      <el-col :span="12">
        <el-card style="height: 90vh;" id="area">
          <div class="clearfix" style="text-align: center;"><span>Drag your setup to guess here</span></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="clearfix" slot="header">Dokfast</div>
          <el-form ref="form">
            <el-form-item label="Delete after:">
              <el-radio-group v-model="dokfast_upload">
                <el-radio label="Single use" name="single"></el-radio>
                <el-radio label="24 hours" name="24h"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dokfast()">Upload currently used setup</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-top: 10px;">
          <div class="clearfix" slot="header">Insert Dokfast link</div>
          <el-form ref="form" :inline="true">
            <el-form-item label="Hash">
              <el-input v-model="dokfast_download" placeholder="Hash"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dokfastDownload()">Download</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-top: 10px;">
          <router-link to="/settings"><el-button type="info">Settings</el-button></router-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-show="!folder">
      <el-col :span="24">
        <el-card>
          <div class="clearfix" slot="header">Please specify your iRacing folder and saving method</div>
          <setting-card :buttons="false"></setting-card>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="Confirm or Fix" :visible.sync="modal_visible" width="50%">
      <h3>Car</h3>
      {{ guess.car ? guess.car.name : 'Not guessed' }}<br>
      <div v-if="saving !== 'car'">
        <h3>Track</h3>
        {{ guess.track ? guess.track.name : 'Not guessed' }}<br>
      </div>
      <div v-if="saving.startsWith('season')">
        <h3>Season</h3>
        {{ guess.season ? guess.season.name : 'Not guessed'}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fix()">Fix</el-button>
        <el-button v-if="isCorrect()" @click="copyFile()">Correct</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SettingCard from './partials/SettingCard.vue'
  import { getSetup, uploadSetup } from '../dokfast/upload.js'
  import { getInformation, getDownload } from '../dokfast/download.js'
  const { clipboard } = require('electron')
  export default {
    name: 'landing-page',
    components: { SettingCard },
    data: () => {
      return {
        modal_visible: false,
        dokfast_download: null,
        dokfast_upload: 'single',
        guess: {path: null, name: null, car: null, track: null, season: null}
      }
    },
    methods: {
      isCorrect () {
        if (this.saving === 'car' && this.guess.car) {
          return true
        } else if (this.saving === 'track' && this.guess.car && this.guess.track) {
          return true
        } else if (this.saving === 'season' && this.guess.car && this.guess.track && this.guess.season) {
          return true
        } else if (this.saving === 'seasonfirst' && this.guess.car && this.guess.track && this.guess.season) {
          return true
        } else if (this.saving === 'year' && this.guess.season && this.guess.car) {
          return true
        }
        return false
      },
      hide (modal) {
        this.modal_visible = false
      },
      guessInfo (path, filename) {
        this.guess = {path: null, name: null, car: null, track: null, season: null}
        this.$axios.post(this.$backend + 'guess', {filename: filename}).then(res => {
          this.guess = res.data
          this.guess.name = filename
          this.guess.path = path
          this.modal_visible = true
        }).catch(err => {
          console.log(err)
          this.notify('error', 'There has been an issue guessing your track. Please try again')
        })
      },
      dokfastDownload () {
        getInformation(this.dokfast_download).then((res) => {
          getDownload(this.dokfast_download, res.data, this.folder, this.saving).then((save) => {
            this.notify('success', 'File successfully saved!')
          }).catch(err => console.error(err))
        }).catch(err => {
          console.log(err)
          this.notify('error', 'There was an error or the setup does not exist.')
        })
      },
      dokfast () {
        if (!this.dokfast_upload) {
          this.notify('error', 'Please set how long the setup should be saved')
        }
        let setup = getSetup()
        if (!setup) {
          this.notify('error', 'There has been an error or iRacing is not running')
        }
        setup.delete_type = this.dokfast_upload
        uploadSetup(this.folder + '\\' + setup.car + '\\' + setup.setup_name, setup).then((res) => {
          clipboard.writeText(res, 'selection')
          this.notify('success', 'Setup successfully uploaded! Please check your clipboard for a link')
        }).catch((err) => {
          this.notify('error', 'There has been an issue trying to upload the setup, please try again')
          console.log(err)
        })
      },
      copyFile () {
        let season = (typeof this.guess.season === 'undefined') ? null : this.guess.season.name
        this.copySetup(
          this.guess.path,
          this.createFolders(this.guess.car.folder_name, this.guess.track.folder_name, season) + this.guess.name
        )
      },
      fix () {
        this.$router.push({path: 'fix', query: { filename: this.guess.name, path: this.guess.path }})
      }
    },
    mounted () {
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
    },
    computed: {
      ...mapGetters({
        folder: 'getFolder',
        saving: 'getSaving'
      })
    }
  }
</script>