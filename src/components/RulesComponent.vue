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
            this.GetRulesLink();
            this.GetRulesContent();
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
                        this.title_page = $response.data[9].title_page
                        this.description_page = $response.data[9].description
                    }
                })
                .catch((e) => console.log(e))
            },
            GetRulesLink () {
                this.$axios.get('/rules_link')
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response)
                        } else {
                            this.links = $response.data
                        }
                    })
                    .catch((e) => console.log(e))
            },
            GetRulesContent () {
                this.$axios.get('/rules_content')
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response)
                        } else {
                            this.content = $response.data
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
