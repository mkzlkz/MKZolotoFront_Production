<template>
    <div class="qiwi">
        <banner-component></banner-component>
        <div  class="tab-pane1">
            <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
            <div class="tab-text height-mob">
                <div class="dflex-title">
                    <div class="title-mb">{{textLoc.mob_title}}</div>
                    <div>
                        <h1 class="title">{{textLoc.title}}</h1>
                        <div class="title-text">{{textLoc.subtitle}}</div>
                    </div>
                </div>
                <div class="content_block">
                    <div class="block1">
                        <div class="block1-1">
                            <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/tab4.png')" alt="" class="img">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/tab4k.png')" alt="" class="img">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/tab4q.png')" alt="" class="img">

                            <div class="block1-text">
                               <div class="b1"><p v-html="textLoc.step1"></p></div>
                                <div class="b1"><p v-html="textLoc.step2"></p></div>
                                <div class="b1"><p v-html="textLoc.step3"></p></div>
                                <div class="b1"><p v-html="textLoc.step4"></p></div>
                                <div class="b1"><p v-html="textLoc.step5"></p></div>
                            </div>
                            <div class="text_p" v-html="textLoc.link"></div>
                        </div>
                        <div class="block1-5">
                            <div class="title1">{{textLoc.text}}</div>
                            <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/t4.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/t4k.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/t4q.png')" alt="">
                        </div>
                    </div>
                    <div class="block1-mobile">
                        <div class="bm-img">
                            <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/m4.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/m4k.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/m4q.png')" alt="">
                        </div>
                        <div class="bm-text">
                            <div class="b1"><p v-html="textLoc.step1"></p></div>
                                <div class="b1"><p v-html="textLoc.step2"></p></div>
                                <div class="b1"><p v-html="textLoc.step3"></p></div>
                                <div class="b1"><p v-html="textLoc.step4"></p></div>
                                <div class="b1"><p v-html="textLoc.step5"></p></div>
                        </div>
                    </div>
                    <div class="text_p1" v-html="textLoc.link"></div>
                    <div class="block1-mobile-img">
                        <div class="titlem1">{{textLoc.text}}</div>
                        <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/t4.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/t4k.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/t4q.png')" alt="">
                    </div>
                    <Social> </Social>
                </div>
                <div class="box box5" v-if="visible">
                    <div class="closes_box closes_box5" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')" alt="" ></div>
                    <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/5.png')" alt="" class="img">
          <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/5k.png')" alt="" class="img">
          <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/5q.png')" alt="" class="img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BannerComponent from '@/components/BannerComponent.vue'
    import Social from '@/components/Social.vue'
    export default {
        name: "qiwi-component",
        components: {
            BannerComponent,
            Social
        },
        data () {
            return {
                visible: true,
                title_page: '',
                description_page: '',
                opengraph_image: '',
                textLoc: ''
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
            this.GetText();
        },
        methods: {
            getMenus () {
                this.$axios.get('/menus')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.title_page = $response.data[5].title_page
                        this.description_page = $response.data[5].description
                        this.opengraph_image = $response.data[5].opengraph_image
                    }
                })
                .catch((e) => console.log(e))
            },
                            GetText() {
                    this.$axios.get('/localization')
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                        } else {
                            this.textLoc = $response.data.qiwi
                        }
                    })
                    .catch((e) => console.log(e))
                }
        }
    }
</script>

<style scoped>

</style>