<template>
  <div class="block-left" v-if="this.$route.query.from !== 'app'">
    <aside>
      <div class="top-menu">
        <div class="mob-menu">
          <div class="icon-menu">
            <div class="sw-topper"></div>
            <div class="sw-bottom"></div>
            <div class="sw-footer"></div>
          </div>
          <div class="mobile-header-decktop">
            <div class="ddflex">
              <router-link :to="{ name: 'Home' }"><img :src="require('@/assets/img/logo.svg')" alt="" class="logo"></router-link>
              <router-link :to="{ name: 'Home' }"><img :src="require('@/assets/img/ds.png')" alt="" class="ds-logo"></router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-2">
        <ul class="nav nav-pills">
          <li v-for="menuk in menul" :key="menuk.id"><router-link :to="menuk.path" class="vnone"><img :src="menuk.icon" alt=""> <span>{{ menuk.popup }}</span></router-link></li>
        </ul>
      </div>
      <div class="express-extension">
        <button data-toggle="modal" data-target="#modalExtension" class="button-yellow button-ex">Экспресс-продление</button>
      </div>
      <div class="menu">
        <ul class="nav nav-pills nav-stacked">
          <li v-for="menu in menus" :key="menu.id"><router-link :to="menu.path" v-bind:class="{disable : menu.clickable == 'no'}" >{{ menu.title }}
            <span v-if="menu.icon"><img :src="menu.icon" alt=""></span></router-link></li>
          </ul>
        </div>
      </aside>
      <div class="mobile">
        <div class="mobile-banner" v-if="this.$route.path !== '/animation'">
          <banner-component></banner-component>
        </div>
        <div class="mobile-header-mobil">
          <div class="ddflex">
            <router-link :to="{ name: 'Home' }"><img :src="require('@/assets/img/logo.svg')" alt="" class="logo"></router-link>
            <router-link :to="{ name: 'Home' }" v-if="this.$route.path !== '/animation'"><img :src="require('@/assets/img/ds.png')" alt="" class="ds"></router-link>
          </div>
          <div class="express-extension" v-if="this.$route.path !== '/animation'" >
        <button data-toggle="modal" data-target="#modalExtension" class="button-yellow button-ex">Экспресс-продление</button>
      </div>
        </div>
        <transition name="slide-fade">
          <div v-if="showPopover" v-on-click-outside="close" class="menu-mob">
            <ul>
              <li v-for="menu in menus" :key="menu.id"><router-link :to="menu.path" v-bind:class="{disable : menu.clickable == 'no'}" >{{ menu.title }}
                <span v-if="menu.icon"><img :src="menu.icon" alt=""></span></router-link></li>
              </ul>
            </div>
          </transition>
          <div class="menu-mobile">
            <ul>
              <li v-for="menuk in menul" :key="menuk.id"><router-link :to="menuk.path"><img :src="menuk.icon" alt=""></router-link></li>
              <li><a href="#" class="menu-b" @click="open"><img :src="require('@/assets/img/menu.png')" alt=""></a></li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <script>
      import BannerComponent from '@/components/BannerComponent.vue'
      import ClickOutside from 'vue-click-outside'
      export default {
        name: 'aside-component',
        components: {
          BannerComponent
        },
        data () {
          return {
            menus: '',
            menul: '',
            showPopover: false
          }
        },
        watch:{
          $route (to, from){
            this.showPopover = false;
          }
        },
        created () {
          this.getMenus()
          this.GetSecondMenus()
        },
        methods: {
          getMenus () {
            this.$axios.get('/menus')
            .then((response) => {
              let $response = response.data
              if ($response.code === 0) {
                console.log($response)
              } else {
                this.menus = $response.data
              }
            })
            .catch((e) => console.log(e))
          },
          GetSecondMenus () {
            this.$axios.get('/second_menus')
            .then((response) => {
              let $response = response.data
              if ($response.code === 0) {
                console.log($response)
              } else {
                this.menul = $response.data
              }
            })
            .catch((e) => console.log(e))
          },
          open() {
            this.showPopover = true
          },
          close() {
            this.showPopover = false
          }
        }
      }
    </script>

    <style scoped>
    .disable{
      pointer-events: none!important;
      font-size: 20px !important;
      margin: 0px 0 0 0;
      padding: 12px 15px 12px 85px;
      font-family: "stroke-medium";
      color: #000;
    }
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
    .ddflex{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ds{
      width: 50px;
    }
  </style>
