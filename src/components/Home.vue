<template>
    <div>
        <router-link class="closes home-closes" :to="{ name: 'CalculateComponent' }"><img :src="require('@/assets/img/close.svg')" alt="">
        </router-link>
        <div class="currentClass">
            <slick ref="slicks" :options="slickOption" @afterChange="handleAfterChange" class="slider">
                <div class="s-img">
                    <video id="v0" width="100%" height="100%" autoplay autobuffer muted loop playsinline :poster="require('@/assets/mp4/0_000.jpg')">
                        <source v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/mp4/0.mp4')"  type="video/mp4" />
                        <source v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/mp4/0k.mp4')"  type="video/mp4" />
                        <source v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/mp4/0q.mp4')"  type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="s-img">
                    <video id="v1" width="100%" height="100%"   muted autobuffer loop playsinline  :poster="require('@/assets/mp4/1_000.jpg')">
                        <source :src="require('@/assets/mp4/1.mp4')" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="slide-text">
                        <div class="title" v-html="textLoc.video2_title"></div>
                        <div class="text" v-html="textLoc.video2_subtitle"></div>
                    </div>
                </div>
                <div class="s-img">
                    <video id="v2" width="100%" height="100%"   muted autobuffer loop playsinline  :poster="require('@/assets/mp4/2_000.jpg')">
                        <source :src="require('@/assets/mp4/2.mp4')" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="slide-text">
                        <div class="text" v-html="textLoc.video3_title"></div>
                        <div class="title" v-html="textLoc.video3_subtitle"></div>
                    </div>
                </div>
                <div class="s-img">
                    <video id="v3" width="100%" height="100%"  muted autobuffer loop playsinline  :poster="require('@/assets/mp4/3_000.jpg')">
                        <source :src="require('@/assets/mp4/3.mp4')" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="slide-text">
                        <div class="title" v-html="textLoc.video4_title"></div>
                        <div class="text" v-html="textLoc.video4_subtitle"></div>
                    </div>
                </div>
                <div class="s-img">
                    <video id="v4" width="100%" height="100%"   muted  autobuffer loop playsinline  :poster="require('@/assets/mp4/4_000.jpg')">
                        <source :src="require('@/assets/mp4/4.mp4')" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="slide-text">
                        <div class="title" v-html="textLoc.video5_title"></div>
                        <div class="text" v-html="textLoc.video5_subtitle"></div>
                    </div>
                </div>
                <div class="s-img">
                    <video id="v5" width="100%" height="100%"  muted autobuffer loop playsinline  :poster="require('@/assets/mp4/5_000.jpg')">
                        <source :src="require('@/assets/mp4/5.mp4')" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="slide-text">
                        <div class="text" v-html="textLoc.video6_title"></div>
                        <div class="title" v-html="textLoc.video6_subtitle"></div>
                    </div>
                </div>
                <div class="s-img">
                    <video id="v6" width="100%" height="100%"  autobuffer muted loop playsinline  :poster="require('@/assets/mp4/6_000.jpg')">
                        <source :src="require('@/assets/mp4/6.mp4')" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="slide-text">
                        <div class="title" v-html="textLoc.video7_title">Ух ты, как <br> новенькое!</div>
                        <div class="text" v-html="textLoc.video7_subtitle">Просто класс эта <br> УльтраЧистка…</div>
                    </div>
                </div>
                <div class="s-img">
                    <video id="v7" width="100%" height="100%"   autobuffer muted loop playsinline  :poster="require('@/assets/mp4/7_000.jpg')">
                        <source :src="require('@/assets/mp4/7.mp4')" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="slide-text">
                        <div class="title" v-html="textLoc.video8_title"></div>
                        <div class="text" v-html="textLoc.video8_subtitle"></div>
                    </div>
                </div>
            </slick>
        </div>
    </div>
</template>

<script>
    import Slick from 'vue-slick'
    import { setTimeout } from 'timers';

    export default {
        name: 'home',
        components: {Slick},
        data() {
            return {
                videos:[

                ],
                textLoc: '',
                slideIndex: 0,
                slickOption: {
                    dots: true,
                    arrows: false,
                    fade: true,
                    autoplay: false,
                    infinite: true,
                    speed: 300
                },
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
        mounted() {
            $('#v0').get(0).currentTime = 0
            $('#v0').get(0).play();
            $.get(require('@/assets/mp4/1.mp4'),function(data){
                $.get(require('@/assets/mp4/2.mp4'),function(data){
                    $.get(require('@/assets/mp4/3.mp4'),function(data){
                        $.get(require('@/assets/mp4/4.mp4'),function(data){
                            $.get(require('@/assets/mp4/5.mp4'),function(data){
                                $.get(require('@/assets/mp4/6.mp4'),function(data){
                                    $.get(require('@/assets/mp4/7.mp4'),function(data){

                                    })
                                })
                            })
                        })
                    })
                })
            })

            $(".slick-dots button").unbind("click")
            $('.slick-active button').bind("click",function () {
                $(".slick-slider").slick('slickNext');
            });
        },
        watch: {
            slideIndex: function (val) {

                $('#v0').get(0).pause()
                $('#v1').get(0).pause()
                $('#v2').get(0).pause()
                $('#v3').get(0).pause()
                $('#v4').get(0).pause()
                $('#v5').get(0).pause()
                $('#v6').get(0).pause()
                $('#v7').get(0).pause()

                $('#v0').get(0).currentTime = 0
                $('#v1').get(0).currentTime = 0
                $('#v2').get(0).currentTime = 0
                $('#v3').get(0).currentTime = 0
                $('#v4').get(0).currentTime = 0
                $('#v5').get(0).currentTime = 0
                $('#v6').get(0).currentTime = 0
                $('#v7').get(0).currentTime = 0
                setTimeout(function() {
                    if($('#v'+val).get(0).readyState < 3){
                        $('#v'+val).get(0).load();
                    }
                    $('#v'+val).get(0).play();
                },100)
                $(".slick-dots button").unbind("click")
                $('.slick-active button').bind("click",function () {
                    $(".slick-slider").slick('slickNext');
                });
            }
        },
        created() {
            this.GetKeyWords();
            this.GetText();
        },
        methods: {
            GetKeyWords() {
                this.$axios.get('/keywords')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
// console.log($response)
} else {
    this.title_page = $response.data.main_page_title
    this.description_page = $response.data.description
    this.opengraph_image = $response.data.opengraph_image
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
                            this.textLoc = $response.data.main
                        }
                    })
                    .catch((e) => console.log(e))
                },
            next() {
                this.$refs.slicks.next()
            },
            prev() {
                this.$refs.slicks.prev()
            },
            handleAfterChange(event, slick, currentSlide) {
                this.slideIndex = currentSlide
            }
        }
    }
</script>

<style scoped>

</style>
