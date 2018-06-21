<template>
<div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Please set your iRacing folder and saving</h4>
      <setting-card :buttons="true"></setting-card>
    </div>
  </div>
  <div class="card mt-4">
    <div class="card-body">
      <h4 class="card-title">About</h4>
      <p class="card-body">
        Made by <a class="text-primary" @click="external('https://gelmar.app')">Julien Gelmar</a><br>
        Version 0.1
      </p>
    </div>
  </div>
</div>
</template>

<script>
  import SettingCard from './partials/SettingCard.vue'
  const {shell} = require('electron')
  export default {
    name: 'settings',
    components: { SettingCard },
    methods: {
      external (url) {
        shell.openExternal(url)
      }
    }
  }
</script>