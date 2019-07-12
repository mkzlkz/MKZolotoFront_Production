<template>
  <div>
    <banner-component></banner-component>
    <div class="tab-pane1">
      <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
      <div class="tab-text height-mob">
        <div class="dflex-title">
          <div class="title-mb">Взвесим?</div>
          <div>
            <h1 class="title">ПОЛУЧИ БОЛЬШЕ!</h1>
            <div class="title-text">Узнай точный вес</div>
          </div>
        </div>
        <div class="content_block">
          <div class="block1">
            <div class="block1-1">
              <img :src="require('@/assets/img/tab1.png')" alt="" class="img">
              <div class="block1-text">
                <div class="b1"><p>Выясни дискретность весов. 0,01 гораздо точнее, чем 0,05.</p></div>
                <div class="b1"><p>Убедись закрыты ли <button @click="open"><span>УмныеВесы</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button>  от колебаний воздуха.</p> <div class="hint hint11" v-if="showPopover" v-on-click-outside="close">Ты получишь больше денег за свое украшение, если взвесишь его до 0,01 грамма на наших точных весах. Без участия сотрудника вес автоматически отразится в программе.</div></div>
                <div class="b1"><p>Узнай вес украшения до 0,01 грамма.</p></div>
                <div class="b1"><p>Убедись, что весы соединены с компьютером и вес автоматически попадает в программу.</p></div>
                <div class="b1"><p>И пойми, наконец-то, сколько же весит твой капитал ;)</p></div>
              </div>
            </div>
            <div class="block1-2">
              <img :src="require('@/assets/img/t1.png')" alt="">
            </div>
          </div>
          <div class="block1-mobile">
            <div class="bm-img"><img :src="require('@/assets/img/m1.png')" alt=""></div>
            <div class="bm-text">
              <div class="b1"><p>Выясни дискретность весов. 0,01 гораздо точнее, чем 0,05.</p></div>
              <div class="b1"><p>Убедись закрыты ли <button @click="open"><span>УмныеВесы</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button>  от колебаний воздуха.</p> <div class="hint hint11" v-if="showPopover" v-on-click-outside="close">Ты получишь больше денег за свое украшение, если взвесишь его до 0,01 грамма на наших точных весах. Без участия сотрудника вес автоматически отразится в программе.</div></div>
              <div class="b1"><p>Узнай вес украшения до 0,01 грамма.</p></div>
              <div class="b1"><p>Убедись, что весы соединены с компьютером и вес автоматически попадает в программу.</p></div>
              <div class="b1"><p>И пойми, наконец-то, сколько же весит твой капитал ;)</p></div>
            </div>
          </div>
          <div class="block1-mobile-img">
            <img :src="require('@/assets/img/t1.png')" alt="">
          </div>
          <Social> </Social>
        </div>
        <div class="box box2" v-if="visible">
          <div class="closes_box closes_box2" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')" alt="" ></div>
          <img :src="require('@/assets/img/2.png')" alt="" class="img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BannerComponent from '@/components/BannerComponent.vue'
  import Social from '@/components/Social.vue'
  export default {
    name: "smart-scales-component",
    components: {
      BannerComponent,
      Social
    },
    data () {
      return {
        visible: true,
        showPopover: false,
        title_page: '',
        description_page: '',
        opengraph_image: ''
      }
    },
    metaInfo() {
      return {
        title: this.title_page,
        meta: [
        { 'property': 'og:title', 'content': this.title_page, 'vmid': 'og:title'},
        { name: 'description', content: this.description_page },
        { 'property': 'og:description', 'content': this.description_page, 'vmid': 'og:description'},
         { 'property': 'og:image', 'content': this.opengraph_image, 'vmid': 'og:image'},
        { 'property': 'og:image:secure_url', 'content': this.opengraph_image, 'vmid': 'og:image:secure_url'}
        ]
      }
    },
    created() {
      this.getMenus();
    },
    methods: {
      getMenus () {
        this.$axios.get('/menus')
        .then((response) => {
          let $response = response.data
          if ($response.code === 0) {
            console.log($response)
          } else {
            this.title_page = $response.data[2].title_page
            this.description_page = $response.data[2].description
            this.opengraph_image = $response.data[2].opengraph_image
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

</style>