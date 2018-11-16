<template>
  <el-card style="height: 90vh;">
    <div class="clearfix" slot="header">Pick correct information</div>
    <router-link to="/">Back</router-link>

    <el-form style="margin-top: 10px;">
      <div>
        <label for="car">Car</label>
        <multiselect  v-model="form.car" track-by="search" label="name" value="search" :options="cars"></multiselect>
      </div>
      <div v-if="saving !== 'car'" style="margin-top: 10px; margin-bottom: 10px;">
        <label for="track">Track</label>
        <multiselect  v-model="form.track" track-by="search" label="name" value="search" :options="tracks"></multiselect>
      </div>
      <div v-if="saving.startsWith('season') || saving === 'year'" style="margin-bottom: 10px;">
        <label for="season">Season</label>
        <multiselect  v-model="form.season" track-by="search" label="name" value="search" :options="seasons"></multiselect>
      </div>
      <div>
        <el-button type="primary" @click="update()">Save and Move</el-button>
        <router-link to="/"><el-button type="default">Back</el-button></router-link>
      </div>
    </el-form>
  </el-card>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import { mapGetters } from 'vuex'
  export default {
    name: 'fix',
    components: { Multiselect },
    data: () => {
      return {
        path: null,
        filename: null,
        cars: [],
        tracks: [],
        seasons: [],
        form: {car: null, track: null, season: null}
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
        if ((this.saving === 'year' || this.saving.startsWith('season')) && !this.form.season) {
          this.notify('error', 'Please set a season.')
          return false
        }
        let season = (!this.form.season) ? null : this.form.season.name
        console.log(this.form)
        console.log(this.path)
        this.copySetup(
          this.path,
          this.createFolders(this.form.car.folder, this.form.track.folder, season) + this.filename
        )
      }
    },
    created () {
      this.filename = this.$route.query.filename
      this.path = this.$route.query.path
      this.$axios.get(this.$backend + 'data').then(res => {
        this.cars = res.data.cars
        this.tracks = res.data.tracks
        this.seasons = res.data.seasons
      }).catch(err => {
        console.log(err)
        this.notify('error', 'Error while fetching information')
      })
    },
    computed: {
      ...mapGetters({
        saving: 'getSaving'
      })
    }
  }
</script>
<style>
@import "../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>