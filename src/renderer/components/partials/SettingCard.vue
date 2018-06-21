<template>
  <div class="card-text">
  Your default folder should be something like "C:\Users\User\Documents\iRacing\setups"
  <form>
    <label for="folder" class="grey-text">Folder</label>
    <input type="text" v-model="inputs.folder" class="form-control" placeholder="Folder">
    <label for="saving" class="grey-text mt-2">Saving Method</label>
    <div class="md-form mt-2">
      <div class="col-sm-12">
        <input type="radio" v-model="inputs.saving" value="season"> car\track\season\setup.sto
      </div>
      <div class="col-sm-12">
        <input type="radio" v-model="inputs.saving" value="track"> car\track\setup.sto
      </div>
      <div class="col-sm-12">
        <input type="radio" v-model="inputs.saving" value="car"> car\setup.sto
      </div>
    </div>
    <div class="text-center mt-4" v-if="!showbuttons">
      <button class="btn btn-primary" type="button" @click="set">Set</button>
    </div>
    <div class="text-center mt-4" v-else>
      <button class="btn btn-primary" type="button" @click="set">Set</button>
      <router-link to="/" class="btn btn-secondary" v-show="this.folder && this.saving">Back</router-link><br>
      <button class="btn btn-danger" type="reset" @click="reset">Reset Data</button>
    </div>
  </form>
</div>
</template>
<script>
export default {
  name: 'setting-card',
  props: ['buttons'],
  data: () => {
    return {
      saving: null,
      folder: null,
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
        this.saving = this.inputs.saving
        localStorage.setItem('saving', this.saving)
        if (this.$fs.existsSync(this.inputs.folder)) {
          this.folder = this.inputs.folder
          localStorage.setItem('folder', this.folder)
          this.notify('success', 'Your settings have been saved.')
          this.showbuttons = true
          this.$parent.$emit('saved')
        } else {
          this.folder = null
          localStorage.removeItem('folder')
          this.notify('error', 'Folder does not seem to exist. Please double check.')
        }
      }
    },
    reset () {
      this.saving = this.inputs.saving = null
      localStorage.removeItem('saving')
      this.folder = this.inputs.folder = null
      localStorage.removeItem('folder')
      this.showbuttons = false
    }
  },
  mounted () {
    this.saving = this.inputs.saving = (localStorage.getItem('saving')) ? localStorage.getItem('saving') : 'season'
    this.folder = this.inputs.folder = (localStorage.getItem('folder')) ? localStorage.getItem('folder') : null
    this.showbuttons = this.buttons
  }
}
</script>
