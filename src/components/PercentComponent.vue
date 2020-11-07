<template>
    <div>
        <banner-component></banner-component>

        <div class="tab-pane1 new-class-percent">
            <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
            <div class="tab-text height-mob">
                <div class="dflex-title">
                    <!-- <div class="title-mb">Новичкам на пробу</div> -->
                    <div>
                        <h1 class="title">{{textLoc.title}}</h1>
                        <div class="title-text">{{textLoc.subtitle}}</div>
                    </div>
                </div>
                <div class="content_block">
                    <div class="block1">
                        <div class="block1-1">
                            <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/tab6.png')" alt="" class="img">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/tab6k.png')" alt="" class="img">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/tab6q.png')" alt="" class="img">

                            <div class="block1-text">
                                <div class="b1" v-if="this.$auth.getLanguage() === 'ru'"><p>{{textLoc.step1_1}} <button @click="open"><span>{{textLoc.step1_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p><div class="hint" v-if="showPopover" v-on-click-outside="close">{{textLoc.step1_3}}</div></div>
                                <div class="b1" v-else><p><button @click="open"><span>{{textLoc.step1_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button> {{textLoc.step1_1}}</p><div class="hint" v-if="showPopover" v-on-click-outside="close">{{textLoc.step1_3}}</div></div>
                                <div class="b1"><p v-html="textLoc.step2"></p></div>
                            <div class="b1"><p v-html="textLoc.step3"></p></div>
                            <div class="b1"><p v-html="textLoc.step4"></p></div>
                            <div class="b1"><p v-html="textLoc.step5"></p></div>
                            </div>
                        </div>
                        <div class="block1-7">
                            <img :src="require('@/assets/img/t6.png')" alt="">
                        </div>
                    </div>
                    <div class="block1-mobile">
                        <div class="bm-img">
                            <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/m6.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/m6k.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/m6q.png')" alt="">
                        </div>
                        <div class="bm-text">
                            <div class="b1" v-if="this.$auth.getLanguage() === 'ru'"><p>{{textLoc.step1_1}} <br> <button @click="open"><span>{{textLoc.step1_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p><div class="hint" v-if="showPopover" v-on-click-outside="close">{{textLoc.step1_3}}</div></div>

                            <div class="b1" v-else><p><button @click="open"><span>{{textLoc.step1_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button> <br> {{textLoc.step1_1}} </p><div class="hint" v-if="showPopover" v-on-click-outside="close">{{textLoc.step1_3}}</div></div>

                            <div class="b1"><p v-html="textLoc.step2"></p></div>
                            <div class="b1"><p v-html="textLoc.step3"></p></div>
                            <div class="b1"><p v-html="textLoc.step4"></p></div>
                            <div class="b1"><p v-html="textLoc.step5"></p></div>
                        </div>
                    </div>
                    <div class="block1-mobile-img">
                        <img :src="require('@/assets/img/t6.png')" alt="">
                    </div>
                    <Social> </Social>
                </div>
                <div class="box box7" v-if="visible">
                    <div class="closes_box closes_box7" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')" alt="" ></div>
                    <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/7.png')" alt="" class="img">
          <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/7k.png')" alt="" class="img">
          <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/7q.png')" alt="" class="img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BannerComponent from '@/components/BannerComponent.vue'
    import Social from '@/components/Social.vue'
    export default {
        name: "percent-component",
        components: {
            BannerComponent,
            Social
        },
        data () {
            return {
                showPopover: false,
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
                        this.title_page = $response.data[8].title_page
                        this.description_page = $response.data[8].description
                        this.opengraph_image = $response.data[8].opengraph_image
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
                            this.textLoc = $response.data.percent
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