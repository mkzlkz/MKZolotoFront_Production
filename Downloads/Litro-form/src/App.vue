<template>
  <div id="app">
  <headerComponent  />
    <router-view />
    <footerComponent  />
  </div>
</template>

<script>
import headerComponent from "@/components/headerComponent.vue";
import footerComponent from "@/components/footerComponent.vue";
export default {
  name: 'App',
  components: {
      headerComponent,
      footerComponent
  },
  created () {
    this.Bitrix ()
  },
  methods: {
    Bitrix() {
        (function(w,d,u){
                var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://cdn-ru.bitrix24.ru/b13284914/crm/site_button/loader_1_69sg77.js');
    }
  }
}
</script>

<style>
  @import './assets/css/bootstrap.min.css';
  @import './assets/css/style.css';
  @import './assets/css/media.css';
  @import 'vue-lazy-youtube-video/dist/style.css';
</style>
