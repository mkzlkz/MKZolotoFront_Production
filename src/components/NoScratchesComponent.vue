<template>
    <div>
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
        <div class="tab-pane1">
            <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
            <div class="tab-text height-mob">
                <div class="dflex-title">
                    <div class="title-mb">С трепетом и без царапин</div>
                    <div>
                        <h1 class="title">БЕРЕЖНО!</h1>
                        <div class="title-text">Узнай пробу украшений без повреждений</div>
                    </div>
                </div>
                <div class="content_block">
                    <div class="block1">
                        <div class="block1-1">
                            <img :src="require('@/assets/img/tab2.png')" alt="" class="img">
                            <div class="block1-text">
                                <div class="b1"><p>Принеси украшения <br> в мк-ЗОЛОТО.</p></div>
                                <div class="b1"><p>Проверь пробу золота на <button @click="open"><span>СпектроМетре</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p> <div class="hint mt-12" v-if="showPopover" v-on-click-outside="close">Ты проверишь свои украшения  БЕЗ ПОВРЕЖДЕНИЙ. Мы точно определим  из каких металлов оно состоит на нашем специальном аппарате.</div></div>
                                <div class="b1"><p>Узнай из каких основных металлов состоит твое украшение.</p></div>
                                <div class="b1"><p>Получи документ о результатах спектрального анализа.</p></div>
                                <div class="b1"><p>И, наконец-то, ближе познакомься со своим украшением :)</p></div>
                            </div>
                        </div>
                        <div class="block1-3">
                            <img :src="require('@/assets/img/t2.png')" alt="">
                        </div>
                    </div>
                    <div class="block1-mobile">
                        <div class="bm-img"><img :src="require('@/assets/img/m2.png')" alt=""></div>
                        <div class="bm-text">
                            <div class="b1"><p>Принеси украшения <br> в мк-ЗОЛОТО.</p></div>
                            <div class="b1"><p>Проверь пробу золота на <button @click="open"><span>СпектроМетре</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p> <div class="hint hint11 mt-12" v-if="showPopover" v-on-click-outside="close">Ты проверишь свои украшения  БЕЗ ПОВРЕЖДЕНИЙ. Мы точно определим  из каких металлов оно состоит на нашем специальном аппарате.</div></div>
                            <div class="b1"><p>Узнай из каких основных металлов состоит твое украшение.</p></div>
                            <div class="b1"><p>Получи документ о результатах спектрального анализа.</p></div>
                            <div class="b1"><p>И, наконец-то, ближе познакомься со своим украшением :)</p></div>
                        </div>
                    </div>
                    <div class="block1-mobile-img">
                        <img :src="require('@/assets/img/t2.png')" alt="">
                    </div>
                    <div class="social">
                        <ul v-if="this.$route.path == '/'">
                            <li v-for="social in socials" :key="social.id" v-bind:class="{appl : social.isApplication == true}">
                                <a :href="social.link" target="_blank"><img :src="social.img_white" alt=""></a>
                            </li>
                        </ul>
                        <ul v-else>
                            <li v-for="social in socials" :key="social.id" v-bind:class="{appl : social.isApplication == true}">
                                <a :href="social.link" target="_blank"><img :src="social.img_dark" alt=""></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box3" v-if="visible">
                    <div class="closes_box closes_box3" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')" alt="" ></div>
                    <img :src="require('@/assets/img/3.png')" alt="" class="img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Slick from 'vue-slick'
    export default {
        name: "no-scratches-component",
        components: {
            Slick
        },
        data () {
            return {
                showPopover: false,
                visible: true,
                title_page: '',
                description_page: '',
                opengraph_image: '',
                slickOptions: {
                    dots: true,
                    arrows: false,
                    fade: false,
                    autoplay: false,
                    infinite: true,
                    autoplaySpeed: 5000
                },
                banners: {},
                socials: ''
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
        created() {
            this. getLayout();
        },
        methods: {
            getLayout () {
                this.$axios.get('/layout-data')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.title_page = $response.data.menus[3].title_page
                        this.description_page = $response.data.menus[3].description
                        this.opengraph_image = $response.data.menus[3].opengraph_image
                        this.socials = $response.data.social
                        this.banners = $response.data.banners
                        this.scroll = $response.data.autoscrolling
                        this.slickOptions.autoplaySpeed = $response.data.autoscrolling.value
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