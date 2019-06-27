<template>
    <div>
        <banner-component></banner-component>
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
    import BannerComponent from '@/components/BannerComponent.vue'
    export default {
        name: "qiwi-component",
        components: {
            BannerComponent
        },
        data () {
            return {
                visible: true,
                title_page: '',
                description_page: ''
            }
        },
        metaInfo() {
            return {
                title: this.title_page,
                meta: [
                { name: 'description', content: this.description_page }
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
                        this.title_page = $response.data[5].title_page
                        this.description_page = $response.data[5].description
                    }
                })
                .catch((e) => console.log(e))
            }
        }
    }
</script>

<style scoped>

</style>