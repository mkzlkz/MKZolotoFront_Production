<template>
<div class="admin-wrapper" v-bind:class="{'padding-0' : this.$route.path == '/cabinet/express-extension'}">
    <router-view />
</div>
</template>

<script>
  export default {
    name: 'admin'
  }
</script>

<style scoped>

</style>
