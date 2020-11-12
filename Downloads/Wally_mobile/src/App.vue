<template>
  <div id="app" class="mobile">
     <SidebarMenu v-if="this.$route.path!=='/' && this.$route.path!=='/test-list' && this.$route.path!=='/webinar-ask' && this.$route.path!=='/webinar-test' && this.$route.path!=='/webinar-media' && this.$route.path!=='/webinar-chat' && this.$route.path!=='/instructor-chat' && this.$route.path!=='/instructor-doc'&& this.$route.path!=='/webinar-chatquestions'"></SidebarMenu>
    <router-view/>
  </div>
</template>

<script>
    import SidebarMenu from "./components/SidebarMenu.vue";
export default {
  name: 'App',
  components: {
    SidebarMenu
  }
}
</script>

<style>
  @import './assets/css/bootstrap.min.css';
  @import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
  @import './assets/css/fonts.css';
  @import './assets/css/style.css';
  @import './assets/css/media.css';
 /* @import './assets/css/css/main.scss';*/
</style>
