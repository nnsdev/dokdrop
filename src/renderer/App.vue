<template>
  <div id="app">
    <router-view></router-view>
    <notifications group="main" />
  </div>
</template>

<script>
  export default {
    name: 'dokdrop'
  }
</script>
<style>
@import '../../node_modules/element-ui/lib/theme-chalk/index.css';
@import '../../node_modules/npm-font-open-sans/open-sans.css';
* {
  font-family: "Open Sans";
  font-size: 12px;
}
</style>
