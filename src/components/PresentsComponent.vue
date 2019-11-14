<template>
    <div>
        <banner-component></banner-component>
        <div class="tab-pane1 new-class-presents">
            <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
            <div class="tab-text height-mob">
                <div class="dflex-title">
                    <div class="title-mb">{{textLoc.mob_title}}</div>
                    <div>
                        <h1 class="title">{{textLoc.title}} </h1>
                        <div class="title-text new-ult">{{textLoc.subtitle}} <button @click="open1"><span>{{textLoc.subtitle_1}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button> <div class="hint-ult" v-if="seens" v-on-click-outside="close1">{{textLoc.step2_4}}</div> {{textLoc.subtitle_2}}</div>
                    </div>
                </div>
                <div class="content_block">
                    <div class="block1">
                        <div class="block1-1">
                            <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/tab3.png')" alt="" class="img">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/tab3k.png')" alt="" class="img">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/tab3q.png')" alt="" class="img">
                            <div class="block1-text">
                                <div class="b1"><p v-html="textLoc.step1"></p></div>

                                <div class="b1" v-if="this.$auth.getLanguage() === 'ru'"><p>{{textLoc.step2_1}} <button @click="open"><span>{{textLoc.step2_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p><div class="hint" v-if="showPopover" v-on-click-outside="close">{{textLoc.step2_4}}</div></div>
                                <div class="b1" v-else><p>{{textLoc.step2_1}} <button @click="open"><span>{{textLoc.step2_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button> {{textLoc.step2_3}}</p><div class="hint" v-if="showPopover" v-on-click-outside="close">{{textLoc.step2_4}}</div></div>

                                <div class="b1"><p v-html="textLoc.step3"></p></div>
                                <div class="b1"><p v-html="textLoc.step4"></p></div>
                                <div class="b1"><p v-html="textLoc.step5"></p></div>

                            </div>
                        </div>
                        <div class="block1-4">
                            <img :src="require('@/assets/img/t3.png')" alt="">
                        </div>
                    </div>
                    <div class="block1-mobile">
                        <div class="bm-img">
                            <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/m3.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/m3k.png')" alt="">
                            <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/m3q.png')" alt="">
                        </div>
                        <div class="bm-text">
                            <div class="b1"><p v-html="textLoc.step1"></p></div>

                            <div class="b1" v-if="this.$auth.getLanguage() === 'ru'"><p>{{textLoc.step2_1}} <button @click="open"><span>{{textLoc.step2_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p><div class="hint hint11 mt-12" v-if="showPopover" v-on-click-outside="close">{{textLoc.step2_4}}</div></div>
                                <div class="b1" v-else><p>{{textLoc.step2_1}} <button @click="open"><span>{{textLoc.step2_2}}</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button> {{textLoc.step2_3}}</p><div class="hint hint11 mt-12" v-if="showPopover" v-on-click-outside="close">{{textLoc.step2_4}}</div></div>

                            <div class="b1"><p v-html="textLoc.step3"></p></div>
                            <div class="b1"><p v-html="textLoc.step4"></p></div>
                            <div class="b1"><p v-html="textLoc.step5"></p></div>
                        </div>
                    </div>
                    <div class="block1-mobile-img">
                        <img :src="require('@/assets/img/t3.png')" alt="">
                    </div>
                    <Social> </Social>
                </div>
                <div class="box box4" v-if="visible">
                    <div class="closes_box closes_box4" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')" alt="" ></div>
                    <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/4.png')" alt="" class="img">
                    <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/4k.png')" alt="" class="img">
                    <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/4q.png')" alt="" class="img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BannerComponent from '@/components/BannerComponent.vue'
    import Social from '@/components/Social.vue'
    export default {
        name: "presents-component",
        components: {
            BannerComponent,
            Social
        },
        data() {
            return {
                showPopover: false,
                seens: false,
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
                        this.title_page = $response.data[4].title_page
                        this.description_page = $response.data[4].description
                        this.opengraph_image = $response.data[4].opengraph_image
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
                        this.textLoc = $response.data.presents
                    }
                })
                .catch((e) => console.log(e))
            },
            open() {
                this.showPopover = true
            },
            close() {
                this.showPopover = false
            },
            open1() {
                this.seens = true
            },
            close1() {
                this.seens = false
            }
        }
    }
</script>

<style scoped>

</style>
