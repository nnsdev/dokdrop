<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Please set your iRacing folder and saving</h4>
      <p class="card-text">
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
          <div class="text-center mt-4">
            <button class="btn btn-primary" type="button" @click="set">Set</button>
            <router-link to="/" class="btn btn-secondary">Back</router-link>
          </div>
        </form>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    data: () => {
      return {
        folder: null,
        saving: null,
        inputs: { folder: null, saving: null }
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
          } else {
            this.folder = null
            localStorage.removeItem('folder')
            this.notify('error', 'Folder does not seem to exist. Please double check.')
          }
        }
      }
    },
    mounted () {
      this.saving = this.inputs.saving = (localStorage.getItem('saving')) ? localStorage.getItem('saving') : 'season'
      this.folder = this.inputs.folder = (localStorage.getItem('folder')) ? localStorage.getItem('folder') : null
    }
  }
</script>