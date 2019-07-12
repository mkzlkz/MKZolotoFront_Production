<template>
    <div>
        <banner-component></banner-component>
        <div class="tab-pane1">
            <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
            <div class="tab-text height-mob">
                <div class="dflex-title">
                    <div class="title-mb">Любишь подарки?</div>
                    <div>
                        <h1 class="title">БЛЕСТЯЩЕ!</h1>
                        <div class="title-text new-ult">Получи В ПОДАРОК <button @click="open1"><span>УльтраЧистку</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button> <div class="hint-ult" v-if="seens" v-on-click-outside="close1">Ты получишь назад свое украшение как новенькое.  Мы бережно почистим его на нашем профессиональном оборудовании.</div> украшений!</div>
                    </div>
                </div>
                <div class="content_block">
                    <div class="block1">
                        <div class="block1-1">
                            <img :src="require('@/assets/img/tab3.png')" alt="" class="img">
                            <div class="block1-text">
                                <div class="b1"><p>Оформи заем <br> в мк-ЗОЛОТО.</p></div>
                                <div class="b1"><p>Прояви заботу и закажи <button @click="open"><span>УльтраЧистку</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p><div class="hint mt-12" v-if="showPopover" v-on-click-outside="close">Ты получишь назад свое украшение как новенькое.  Мы бережно почистим его на нашем профессиональном оборудовании.</div></div>
                                <div class="b1"><p>Передай украшение в наши бережные руки и доверься профессиональному оборудованию.</p></div>
                                <div class="b1"><p>Возвращайся за своими ценностями.</p></div>
                                <div class="b1"><p> И, наконец-то,  снова порадуйся красоте своих украшений :)</p></div>
                            </div>
                        </div>
                        <div class="block1-4">
                            <img :src="require('@/assets/img/t3.png')" alt="">
                        </div>
                    </div>
                    <div class="block1-mobile">
                        <div class="bm-img"><img :src="require('@/assets/img/m3.png')" alt=""></div>
                        <div class="bm-text">
                            <div class="b1"><p>Оформи заем <br> в мк-ЗОЛОТО.</p></div>
                            <div class="b1"><p>Прояви заботу и закажи <button @click="open"><span>УльтраЧистку</span> <img :src="require('@/assets/img/icon/point.png')" alt="" class="point"></button></p><div class="hint hint11 mt-12" v-if="showPopover" v-on-click-outside="close">Ты получишь назад свое украшение как новенькое.  Мы бережно почистим его на нашем профессиональном оборудовании.</div></div>
                            <div class="b1"><p>Передай украшение в наши бережные руки и доверься профессиональному оборудованию.</p></div>
                            <div class="b1"><p>Возвращайся за своими ценностями.</p></div>
                            <div class="b1"><p> И, наконец-то,  снова порадуйся красоте своих украшений :)</p></div>
                        </div>
                    </div>
                    <div class="block1-mobile-img">
                        <img :src="require('@/assets/img/t3.png')" alt="">
                    </div>
                    <Social> </Social>
                </div>
                <div class="box box4" v-if="visible">
                    <div class="closes_box closes_box4" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')" alt="" ></div>
                    <img :src="require('@/assets/img/4.png')" alt="" class="img">
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
            this.getMenus()
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
