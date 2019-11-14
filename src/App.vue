<template>
  <div id="app" v-bind:class="{'webapp' : this.$route.query.from !== 'app', 'mobileapp' : this.$route.query.from === 'app', 'lg-kz' : this.$auth.getLanguage() === 'kz', 'lg-qaz' : this.$auth.getLanguage() === 'qaz'}">
    <div class="block">
      <aside-component></aside-component>
      <div class="block-right">
        <router-view />
      </div>
    </div>
    <ExpressExtension></ExpressExtension>
  </div>
</template>


<script>
  import AsideComponent from "@/components/AsideComponent.vue";
  import ExpressExtension from "@/components/ExpressExtension.vue";
  export default {
    name: 'App',
    components: {
      AsideComponent,
      ExpressExtension
    }
    }
</script>

<style>
  @import './assets/css/bootstrap.min.css';
  @import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
  @import './assets/css/jquery.mCustomScrollbar.css';
  @import './assets/slick/slick.css';
  @import './assets/slick/slick-theme.css';
  @import './assets/css/fonts.css';
  @import './assets/css/style.css';
  @import './assets/css/media.css';
  @import './assets/css/mobileApp2.css';
  @import './assets/css/language.css';

</style>
