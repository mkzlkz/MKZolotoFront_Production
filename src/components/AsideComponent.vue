<template>
  <div class="block-left" v-if="this.$route.query.from !== 'app'">
    <aside>
      <div class="dflex-lang">
        <div v-if="langList.qaz === true" :class="{activeLng : this.$auth.getLanguage() === 'qaz'}" @click="selectLang('qaz')">QAZ</div>
        <div v-if="langList.ru === true" :class="{activeLng : this.$auth.getLanguage() === 'ru'}" @click="selectLang('ru')">РУС</div>
        <div v-if="langList.kz === true" class="menu-kz-lg" :class="{activeLng : this.$auth.getLanguage() === 'kz'}" @click="selectLang('kz')">ҚАЗ</div>
      </div>

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

      <div class="auth">
        <a href="#tab1" data-toggle="modal" data-target="#modalAuth">{{$t('login')}}</a>
        <span>|</span>
        <a href="#tab2" data-toggle="modal" data-target="#modalAuth">{{$t('signup')}}</a>
      </div>
      <div class="menu-2">
        <ul class="nav nav-pills">
          <li v-for="menuk in menul" :key="menuk.id"><router-link :to="menuk.path" class="vnone"><img :src="menuk.icon" alt=""> <span>{{ menuk.popup }}</span></router-link></li>
        </ul>
      </div>
      <div class="express-extension">
        <button data-toggle="modal" data-target="#modalExtension" class="button-yellow button-ex">{{ $t('expressExtension') }}</button>
        <button data-toggle="modal" data-target="#contract" class="button-yellow button-ex">{{ $t('check_contract2') }}</button>
      </div>
      <div class="menu">
        <ul class="nav nav-pills nav-stacked">
          <li v-for="menu in menus" :key="menu.id"><router-link :to="menu.path" v-bind:class="{disable : menu.clickable == false}" >{{ menu.title }}
            <span v-if="menu.icon"><img :src="menu.icon" alt=""></span></router-link></li>
          </ul>
        </div>
      </aside>
      <div class="mobile">
        <div class="mobile-banner" v-if="this.$route.path !== '/animation'">

          <div class="desktop-banner">
            <slick ref="slick" :options="slickOptions" class="slider_banner">
              <div class="banner" v-for="banner in banners">
                <a v-if="banner.link" :href="banner.link" target="_blank" class="banner-flex">
                  <div class="text">
                    <div class="text1" v-if="banner.text1">{{banner.text1}}</div>
                    <div class="text2" v-if="banner.text2">{{banner.text2}}</div>
                    <div class="text3" v-if="banner.text3">{{banner.text3}}</div>
                    <div class="text4" v-if="banner.text4">{{banner.text4}}</div>
                  </div>
                  <div class="img">
                    <img :src="banner.desktop" alt="" class="img-deck_i">
                    <img :src="banner.mobile" alt="" class="img-mob_b">
                  </div>
                </a>
                <div v-else class="banner-flex">
                  <div class="text">
                    <div class="text1" v-if="banner.text1">{{banner.text1}}</div>
                    <div class="text2" v-if="banner.text2">{{banner.text2}}</div>
                    <div class="text3" v-if="banner.text3">{{banner.text3}}</div>
                    <div class="text4" v-if="banner.text4">{{banner.text4}}</div>
                  </div>
                  <div class="img">
                    <img :src="banner.desktop" alt="" class="img-deck_i">
                    <img :src="banner.mobile" alt="" class="img-mob_b">
                  </div>
                </div>
              </div>
            </slick>
          </div>
        </div>
        <div class="mobile-header-mobil">
          <div class="ddflex">
            <router-link :to="{ name: 'Home' }"><img :src="require('@/assets/img/logo.svg')" alt="" class="logo"></router-link>
            <router-link :to="{ name: 'Home' }" v-if="this.$route.path !== '/animation'"><img :src="require('@/assets/img/ds.png')" alt="" class="ds"></router-link>
          </div>
          <div class="auth">
            <a href="#tab1" data-toggle="modal" data-target="#modalAuth">{{$t('login')}}</a>
            <span>|</span>
            <a href="#tab2" data-toggle="modal" data-target="#modalAuth">{{$t('signup')}}</a>
          </div>
          <div class="express-extension" v-if="this.$route.path !== '/animation'" >
            <button data-toggle="modal" data-target="#modalExtension" class="button-yellow button-ex">{{ $t('expressExtension') }}</button>
            <button data-toggle="modal" data-target="#contract" class="button-yellow button-ex">{{ $t('check_contract2') }}</button>
          </div>
          <div class="dflex-lang">
            <div v-if="langList.qaz === true" :class="{activeLng : this.$auth.getLanguage() === 'qaz', dnone : langList.qaz === false }" @click="selectLang('qaz')">QAZ</div>
            <div v-if="langList.ru === true" :class="{activeLng : this.$auth.getLanguage() === 'ru', dnone : langList.ru === false }" @click="selectLang('ru')">РУС</div>
            <div v-if="langList.kz === true" class="menu-kz-lg" :class="{activeLng : this.$auth.getLanguage() === 'kz', dnone : langList.kz === false }" @click="selectLang('kz')">ҚАЗ</div>
          </div>
        </div>
        <transition name="slide-fade">
          <div v-if="showPopover" v-on-click-outside="close" class="menu-mob">

            <ul>
              <li v-for="menu in menus" :key="menu.id"><router-link :to="menu.path" v-bind:class="{disable : menu.clickable == false}" >{{ menu.title }}
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

<modalContract></modalContract>

      </div>
    </template>

    <script>
      import modalContract from '@/components/modalContract.vue'
      import Slick from 'vue-slick'
      import ClickOutside from 'vue-click-outside'
      export default {
        name: 'aside-component',
        components: {
          Slick,
          modalContract
        },
        data () {
          return {
            menus: '',
            menul: '',
            showPopover: false,
            selected: this.$auth.getLanguage(),
            lang: [],
            langList: '',
            slickOptions: {
              dots: true,
              arrows: false,
              fade: false,
              autoplay: true,
              infinite: true,
              autoplaySpeed: 5000
            },
            banners: {},
            keycon: '',
            loader: false
          }
        },
        metaInfo() {
          return {
            meta: [{name: 'keywords', content: this.keycon}]
          }
        },
        watch:{
          $route (to, from){
            this.showPopover = false;
          }
        },
        beforeUpdate() {
          if (this.$refs.slick) {
            this.$refs.slick.destroy();
          }
        },
        updated() {
          if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
            this.$refs.slick.create();
          }
        },
        created () {
          this.getLayout();
          this.getLangList()
          this.GetLangWeb()
        },
        methods: {
          selectLang(lng) {
            if (lng === 'ru') {
              this.$auth.setLanguage(lng);
              location.reload();
            } else if (lng === 'kz') {
              this.$auth.setLanguage(lng)
              location.reload();
            } else if (lng === 'qaz') {
              this.$auth.setLanguage(lng)
              location.reload();
            }
          },
          GetLangWeb() {
            if(this.$route.query.from === 'app'){
              if (localStorage.app_lang !== this.$route.query.lang){
                location.reload();
              }
            }
            if (this.$route.query.from === 'app' & this.$route.query.lang === 'ru') {
              this.$auth.setLanguage('ru');
            } else if (this.$route.query.from === 'app' & this.$route.query.lang === 'kz') {
              this.$auth.setLanguage('kz');
            } else if (this.$route.query.from === 'app' & this.$route.query.lang === 'qaz') {
              this.$auth.setLanguage('qaz');
            }
          },
          setLanguage() {
            this.$auth.setLanguage(this.selected);
            location.reload();
          },
          getLangList () {
            this.$axios.get('/languages')
            .then((response) => {
              let $response = response.data
              if ($response.code === 0) {
                console.log($response)
              } else {
                this.langList = $response.data
              }
            })
            .catch((e) => console.log(e))
          },
          getLayout () {
            this.$axios.get('/layout-data')
            .then((response) => {
              let $response = response.data
              if ($response.code === 0) {
                console.log($response)
              } else {
                this.menus = $response.data.menus
                this.menul = $response.data.second_menus
                this.banners = $response.data.banners
                this.scroll = $response.data.autoscrolling
                this.slickOptions.autoplaySpeed = $response.data.autoscrolling.value
                this.keycon = $response.data.keywords.keywords
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
    .slide-fade-enter, .slide-fade-leave-to {
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
