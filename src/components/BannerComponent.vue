<template>
  <div class="desktop-banner">
    <slick ref="slick" :options="slickOptions" class="slider_banner">
      <div class="banner" v-for="banner in banners">
        <a v-if="banner.link" :href="banner.link" target="_blank" class="banner-flex">
          <div class="text">
            <div class="text1">{{banner.text1}}</div>
            <div class="text2">{{banner.text2}}</div>
            <div class="text3">{{banner.text3}}</div>
            <div class="text4">{{banner.text4}}</div>
          </div>
          <div class="img">
            <img :src="banner.desktop" alt="" class="img-deck_i">
            <img :src="banner.mobile" alt="" class="img-mob_b">
          </div>
        </a>
        <div v-else class="banner-flex">
          <div class="text">
            <div class="text1">{{banner.text1}}</div>
            <div class="text2">{{banner.text2}}</div>
            <div class="text3">{{banner.text3}}</div>
            <div class="text4">{{banner.text4}}</div>
          </div>
          <div class="img">
            <img :src="banner.desktop" alt="" class="img-deck_i">
            <img :src="banner.mobile" alt="" class="img-mob_b">
          </div>
        </div>
      </div>
    </slick>
  </div>
</template>

<script>
  import Slick from 'vue-slick'
  export default {
    name: 'BannerComponent',
    components: {
      Slick
    },
    data () {
      return {
        slickOptions: {
          dots: true,
          arrows: false,
          fade: false,
          autoplay: false,
          infinite: true,
          autoplaySpeed: 5000
        },
        banners: {}
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
      this.GetBanners()
      this.GetAutoscrolling()
    },
    methods: {
      GetBanners () {
        this.$axios.get('/banners')
        .then((response) => {
          let $response = response.data
          if ($response.code === 0) {
            console.log($response)
          } else {
            this.banners = $response.data
          }
        })
        .catch((e) => console.log(e))
      },
      GetAutoscrolling () {
        this.$axios.get('/autoscrolling')
        .then((response) => {
          let $response = response.data
          if ($response.code === 0) {
            console.log($response)
          } else {
            this.scroll = $response.data
            this.slickOptions.autoplaySpeed = $response.value
          }
        })
        .catch((e) => console.log(e))
      }
    }
  }
</script>

<style scoped>

</style>
