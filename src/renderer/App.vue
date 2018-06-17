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
@import "../../node_modules/font-awesome/css/font-awesome.min.css";
@import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "../../node_modules/mdbootstrap/css/mdb.min.css";
.vue-notification {
  padding-top: 20px !important;
}
html, body {
  height: 100%;
}
</style>
