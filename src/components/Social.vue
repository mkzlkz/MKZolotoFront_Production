<template>
    <div class="social">
        <ul v-if="this.$route.path == '/'">
            <li v-for="social in socials" :key="social.id" v-bind:class="{appl : social.isApplication == true}">
                <a href="social.link" target="_blank"><img :src="social.img_white" alt=""></a>
            </li>
        </ul>
                <ul v-else>
            <li v-for="social in socials" :key="social.id" v-bind:class="{appl : social.isApplication == true}">
                <a href="social.link" target="_blank"><img :src="social.img_dark" alt=""></a>
            </li>
        </ul>
<!--         <ul>
            <li class="appl"><a href="#"><img :src="require('@/assets/img/social/google_white.svg')" alt=""></a></li>
            <li class="appl"><a href="#"><img :src="require('@/assets/img/social/ios_white.svg')" alt=""></a></li>
            <li><a href="#"><img :src="require('@/assets/img/social/fb_white.svg')" alt=""></a></li>
            <li><a href="#"><img :src="require('@/assets/img/social/ins_white.svg')" alt=""></a></li>
            <li><a href="#"><img :src="require('@/assets/img/social/twitter_white.svg')" alt=""></a></li>
        </ul> -->
    </div>
</template>

<script>
    export default {
        name: 'Social',
        data () {
            return {
                socials: ''
            }
        },
        created() {
            this.getSocial();
        },
        methods: {
            getSocial () {
                this.$axios.get('/social')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.socials = $response.data
                    }
                })
                .catch((e) => console.log(e))
            },
        }
    }
</script>

<style scoped>

</style>
