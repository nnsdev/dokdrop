<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Pick correct information</h4>
      <router-link to="/">Back</router-link>

      <form @submit.prevent="update">
        <label for="car">Car</label>
        <multiselect  v-model="form.car" track-by="search" label="name" value="search" :options="response.cars"></multiselect>
        <div v-if="saving !== 'car'" class="mt-2">
          <label for="track">Track</label>
          <multiselect  v-model="form.track" track-by="search" label="name" value="search" :options="response.tracks"></multiselect>
        </div>
        <div v-if="saving === 'season'" class="mt-2">
          <label for="season">Season</label>
          <multiselect  v-model="form.season" track-by="search" label="name" value="search" :options="response.seasons"></multiselect>
        </div>
        <button class="btn btn-block btn-primary mt-2" type="submit">Save and Move File</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    name: 'fix',
    components: { Multiselect },
    data: () => {
      return {
        path: null,
        filename: null,
        response: null,
        form: {car: null, track: null, season: null},
        saving: null
      }
    },
    methods: {
      update () {
        if (!this.form.car) {
          this.notify('error', 'Please set a car.')
          return false
        }
        if (this.saving !== 'car' && !this.form.track) {
          this.notify('error', 'Please set a track.')
          return false
        }
        if (this.saving === 'season' && !this.form.season) {
          this.notify('error', 'Please set a season.')
          return false
        }
        let path = this.createFolders(this.form.car.folder, this.form.track.search, this.form.season.search)
        this.$fs.copy(this.path, path + this.name).then(() => {
          this.notify('success', 'File successfully copied')
          this.$router.push('landing-page')
        }).catch(err => {
          console.log(err)
          this.notify('error', 'Some kind of error happened')
        })
      }
    },
    mounted () {
      this.saving = localStorage.getItem('saving')
      console.log(this.$route.query)
      this.path = this.$route.query.path
      this.filename = this.$route.query.filename
      this.$axios.get(this.$backend + 'data').then(res => {
        this.response = res.data
      }).catch(err => {
        console.log(err)
        this.notify('error', 'Error while fetching information')
      })
    }
  }
</script>
<style>
@import "../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>