<template>
    <div class="qiwi">
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
        <div  class="tab-pane1">
            <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
            <div class="tab-text height-mob">
                <div class="dflex-title">
                    <div class="title-mb">Qiwi тут, Qiwi там</div>
                    <div>
                        <h1 class="title">УДОБНО!</h1>
                        <div class="title-text">Оплати по пути % в любом QiWi терминале</div>
                    </div>
                </div>
                <div class="content_block">
                    <div class="block1">
                        <div class="block1-1">
                            <img :src="require('@/assets/img/tab4.png')" alt="" class="img">
                            <div class="block1-text">
                                <div class="b1"><p>Найди ближайший  QiWi терминал.</p></div>
                                <div class="b1"><p>Выбери раздел: Оплата услуг/Погашение кредитов/Ломбарды.</p></div>
                                <div class="b1"><p>Нажми <br> мк-ЗОЛОТО.</p></div>
                                <div class="b1"><p>Набери номер залогового билета и ИИН.</p></div>
                                <div class="b1"><p>И, наконец-то, похвали себя за то, что ты все делаешь вовремя. Ты - лучший клиент :)</p></div>
                            </div>
                            <div class="text_p">Легко оплати % по займу <a href="https://qiwi.com/payment/form/34330" target="_blank">на сайте QIWI</a>.</div>
                        </div>
                        <div class="block1-5">
                            <div class="title1">Через сайт или приложение Qiwi:</div>
                            <img :src="require('@/assets/img/t4.png')" alt="">
                        </div>
                    </div>
                    <div class="block1-mobile">
                        <div class="bm-img"><img :src="require('@/assets/img/m4.png')" alt=""></div>
                        <div class="bm-text">
                            <div class="b1"><p>Найди ближайший  QiWi терминал.</p></div>
                            <div class="b1"><p>Выбери раздел: Оплата услуг/Погашение кредитов/Ломбарды.</p></div>
                            <div class="b1"><p>Нажми <br> мк-ЗОЛОТО.</p></div>
                            <div class="b1"><p>Набери номер залогового билета и ИИН.</p></div>
                            <div class="b1"><p>И, наконец-то, похвали себя за то, что ты все делаешь вовремя. Ты - лучший клиент :)</p></div>
                        </div>
                    </div>
                    <div class="text_p1">Легко оплати % по займу <a href="https://qiwi.com/payment/form/34330" target="_blank">на сайте QIWI</a>.</div>
                    <div class="block1-mobile-img">
                        <div class="titlem1">Через сайт или приложение Qiwi:</div>
                        <img :src="require('@/assets/img/t4.png')" alt="">
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
                <div class="box box5" v-if="visible">
                    <div class="closes_box closes_box5" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')" alt="" ></div>
                    <img :src="require('@/assets/img/5.png')" alt="" class="img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Slick from 'vue-slick'
    export default {
        name: "qiwi-component",
        components: {
            Slick
        },
        data () {
            return {
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
                        this.title_page = $response.data.menus[5].title_page
                        this.description_page = $response.data.menus[5].description
                        this.opengraph_image = $response.data.menus[5].opengraph_image
                        this.socials = $response.data.social
                        this.banners = $response.data.banners
                        this.scroll = $response.data.autoscrolling
                        this.slickOptions.autoplaySpeed = $response.data.autoscrolling.value
                    }
                })
                .catch((e) => console.log(e))
            }
        }
    }
</script>

<style scoped>

</style>