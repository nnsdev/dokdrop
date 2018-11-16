<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      Please set your iRacing folder and saving
    </div>
    <div>
      <setting-card :buttons="true"></setting-card>
    </div>
  </el-card>
  <el-card class="box-card">
    <div class="clearfix" slot="header">About</div>
    <div>
        Made by <a class="text-primary" @click="external('https://gelmar.app')">Julien Gelmar</a><br>
        Version 0.2
    </div>
  </el-card>
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