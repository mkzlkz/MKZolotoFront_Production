<template>
  <div id="app" v-bind:class="{'webapp' : this.$route.query.from !== 'app', 'mobileapp' : this.$route.query.from === 'app', 'lg-kz' : this.$auth.getLanguage() === 'kz', 'lg-qaz' : this.$auth.getLanguage() === 'qaz'}">
    <div class="block">
      <AsideComponent v-if="!this.$auth.isLoggedIn()"></AsideComponent>
      <AsideAdmin v-if="this.$auth.isLoggedIn()"> </AsideAdmin>
      <div class="block-right">
        <router-view />
      </div>
    </div>
    <ExpressExtension></ExpressExtension>
    <Auth></Auth>
    <AvatarChange></AvatarChange>
  </div>
</template>


<script>
  import AsideComponent from "@/components/AsideComponent.vue";
  import AsideAdmin from "@/components/admin/AsideAdmin.vue";
  import ExpressExtension from "@/components/ExpressExtension.vue";
  import Auth from "@/components/Auth.vue";
  import AvatarChange from "@/components/admin/AvatarChange.vue";
  export default {
    name: 'App',
    components: {
     AsideComponent,
      AsideAdmin,
      ExpressExtension,
      Auth,
      AvatarChange
    },
    created(){
this.pageReload();
    },
methods: {
  pageReload(){
          let admin = this.$route.path.split('/')[1]
      if( admin !== "admin" ){
localStorage.clear();
      }
  }
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
