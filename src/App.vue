<template>
  <div id="app" v-bind:class="{'webapp' : this.$route.query.from !== 'app', 'mobileapp' : this.$route.query.from === 'app', 'lg-kz' : this.$auth.getLanguage() === 'kz', 'lg-qaz' : this.$auth.getLanguage() === 'qaz'}">
    <div class="block">
      <AsideComponent v-if="this.cabinet === false"></AsideComponent>
      <AsideAdmin v-if="this.cabinet === true"> </AsideAdmin>
      <div class="block-right">
        <router-view />
      </div>
    </div>
    <ExpressExtension></ExpressExtension>
    <Auth></Auth>
    <!-- <AvatarChange></AvatarChange> -->
  </div>
</template>


<script>
  import AsideComponent from "@/components/AsideComponent.vue";
  import AsideAdmin from "@/components/admin/AsideAdmin.vue";
  import ExpressExtension from "@/components/ExpressExtension.vue";
  import Auth from "@/components/Auth.vue";
  // import AvatarChange from "@/components/admin/AvatarChange.vue";
  export default {
    name: 'App',
    components: {
      AsideComponent,
      AsideAdmin,
      ExpressExtension,
      Auth,
      // AvatarChange
    },
    data(){
      return{
        cabinet: false,
        get url() {
        return localStorage.getItem('url') || 0;
      },
      set url(value) {
        localStorage.setItem('url', value);
      }
      }
    },
    created(){
      this.pageReload();
      this.cabinetRouter();
    },
    methods: {
      pageReload(){
        let cabinet = this.$route.path.split('/')[1]
        if( cabinet == "cabinet" ){
          this.cabinet = true
        } else{
          this.cabinet = false
        }
      },
      cabinetRouter(){
        this.Idreceipt = this.$route.query.id
        if(this.$route.query.status == 'successful' && this.url == '/cabinet/express-extension' &&  this.$auth.isLoggedIn()){
          this.$router.push({ path: 'cabinet/express-extension', query: { status: 'successful', id: this.Idreceipt} })
          this.cabinet = true
        }
        if(this.$route.query.status == 'successful' && this.url == '/cabinet/my-loans' &&  this.$auth.isLoggedIn()){
          this.$router.push({ path: 'cabinet/my-loans', query: { status: 'successful', id: this.Idreceipt} })
          this.cabinet = true
        }
        if(this.$route.query.status == 'fail' && this.url == '/cabinet/express-extension' &&  this.$auth.isLoggedIn()){
          this.$router.push({ path: 'cabinet/express-extension', query: { status: 'fail' } })
          this.cabinet = true
        }
        if(this.$route.query.status == 'fail' && this.url == '/cabinet/my-loans' &&  this.$auth.isLoggedIn()){
          this.$router.push({ path: 'cabinet/my-loans', query: { status: 'fail' } })
          this.cabinet = true
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
