<template>
    <div>
        <banner-component></banner-component>
        <div class="tab-pane1 rules-new">
<!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt="">
</router-link> -->
<div class="tab-text">
    <h1 class="title">Без правил никуда!</h1>
    <div class="content_block">
        <div class="block3">
            <div class="block3-flex" id="rules">
                <div class="block3-1">
                    <ul id="menu">
                        <li v-for="(link, index) in links" :key="link.id"><a :href="link.anchor"><span>{{ link.order }}.</span>{{ link.title
                        }}</a></li>
                    </ul>
                </div>
                <div class="block3-2" id="rule-block">
                    <div id="rule-content" v-html="content"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="box box8" v-if="visible">
        <div class="closes_box closes_box8" @click="visible = !visible"><img
            :src="require('@/assets/img/close.svg')" alt=""></div>
            <img :src="require('@/assets/img/8.png')" alt="" class="img">
        </div>
    </div>
</div>
</div>
</template>

<script>
    import BannerComponent from '@/components/BannerComponent.vue'
    export default {
        name: 'rules-component',
        components: {
            BannerComponent
        },
        data () {
            return {
                visible: true,
                links: '',
                content: '',
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
            $(".block3-2").mCustomScrollbar({
                autoHideScrollbar:true,
                theme:"rounded"
            });

            $("#menu").on("click","a", function (event) {
                event.preventDefault()
                var id  = $(this).attr('href')
                $(".block3-2").mCustomScrollbar("scrollTo",id,{
                    scrollInertia:1500
                })
            });
        },
        created () {
            this.getLayout();
        },
        methods: {
            getLayout () {
                this.$axios.get('/layout-data')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.links = $response.data.rules_link
                        this.content = $response.data.rules_content
                        this.title_page = $response.data.menus[9].title_page
                        this.description_page = $response.data.menus[9].description
                        this.opengraph_image = $response.data.menus[9].opengraph_image
                    }
                })
                .catch((e) => console.log(e))
            }
        }
    }
</script>

<style scoped>
#rule-block {
    position: relative;
}
</style>
