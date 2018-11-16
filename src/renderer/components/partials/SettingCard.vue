<template>
  <el-form ref="form" :model="inputs" label-width="120px">
    <el-form-item label="Folder">
      <el-input v-model="inputs.folder" placeholder="Folder"></el-input>
      <small>Your default folder should be something like "C:\Users\User\Documents\iRacing\setups"</small>
    </el-form-item>
    <el-form-item label="Saving type">
      <el-select v-model="inputs.saving" placeholder="Select" style="width: 300px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!showbuttons">
      <el-button type="primary" @click="set">Set</el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-button type="primary" @click="set">Set</el-button>
      <router-link to="/"><el-button type="info">Back</el-button></router-link>
      <el-button type="danger" @click="reset">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'setting-card',
  props: ['buttons'],
  data: () => {
    return {
      options: [
        {value: 'season', label: 'car\\track\\season\\setup.sto'},
        {value: 'seasonfirst', label: 'car\\season\\track\\setup.sto'},
        {value: 'track', label: 'car\\track\\setup.sto'},
        {value: 'car', label: 'car\\setup.sto'},
        {value: 'year', label: 'car\\year\\season\\setup'}
      ],
      inputs: { saving: null, folder: null },
      showbuttons: false
    }
  },
  methods: {
    set () {
      if (!this.inputs.folder) {
        this.notify('error', 'Please set a folder.')
      }
      if (!this.inputs.saving) {
        this.notify('error', 'Please set a saving method.')
      }
      if (this.inputs.folder && this.inputs.saving) {
        this.$store.commit('setSaving', this.inputs.saving)
        if (this.$fs.existsSync(this.inputs.folder)) {
          this.$store.commit('setFolder', this.inputs.folder)
          this.notify('success', 'Your settings have been saved.')
          this.showbuttons = true
        } else {
          this.$store.commit('setFolder', null)
          this.inputs.folder = null
          this.notify('error', 'Folder does not seem to exist. Please double check.')
        }
      }
    },
    reset () {
      this.$store.commit('setFolder', null)
      this.$store.commit('setSaving', 'season')
      this.inputs = {folder: null, saving: 'season'}
      this.showbuttons = false
    }
  },
  mounted () {
    this.saving = this.inputs.saving = this.$store.state.saving
    this.folder = this.inputs.folder = this.$store.state.folder
    this.showbuttons = this.buttons
  },
  computed: {
    ...mapGetters({
      folder: 'getFolder',
      saving: 'getSaving'
    })
  }
}
</script>
