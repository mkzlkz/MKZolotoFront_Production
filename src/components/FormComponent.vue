<template>
    <div>
        <banner-component></banner-component>
        <div class="tab-pane1">
            <div class="tab-text tab-text-form">
                <h1 class="title">{{ $t('qa_title') }}</h1>

                <div class="dflex-faq">
                    <div class="qa-content" id="rule-block">
                        <div class="panel-group" id="accordion">
                            <div class="panel panel-default" v-for="(qa, index) in faq" :key="qa.id">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordion"
                                        v-bind:class="[(index === currentIndex ? '' : 'collapsed')]"
                                        v-bind:href="'#collapse' + qa.order">
                                        <span>{{ qa.order }}.</span>
                                        {{ qa.question }}
                                        <i class="active"></i>
                                    </a>
                                </h4>
                            </div>
                            <div v-bind:id="'collapse' + qa.order"
                            v-bind:class="['panel-collapse collapse', (index === 0 ? 'in' : '')]">
                            <div class="panel-body" v-html="qa.answer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="title title-none">{{ $t('form_title') }}</div>
            <div class="form-main">
                <div class="form-1">
                    <div class="flex-smile">
                        <span>{{ $t('contact_you') }}</span>
                        <button @click="getRandomName()" class="button-bgnone"><span class="it">
                            <span class="img"></span>
                            <span class="it-1">{{ $t('nickname_yourself') }}</span></span></button>
                        </div>
                        <input v-model="name" type="text" :placeholder="$t('nickname')">
                    </div>
                    <div class="form-1">
                        <span>{{ $t('call_you') }}</span>
                        <masked-input type="tel" v-model="phone" mask="\+\7 (111) 111-11-11" placeholder="+7 (___) ___-__-__"
                        @input="rawVal = arguments[1]" />
                    </div>
                    <div class="form-1">
                        <span>{{ $t('write_me') }}</span>
                        <input type="email" placeholder="E-mail" v-model="email">
                        <textarea v-model="text" :placeholder="$t('message_text')"></textarea>
                    </div>
                    <button class="button-blue-line modal_calc button-yellow" data-target="#modal-calc-inf" data-toggle="modal" @click="sendForm()">{{ $t('send') }} </button>
                </div>
            </div>
            <div class="box box11" v-if="visible">
                <div class="closes_box closes_box11" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')"
                    alt=""></div>
                    <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/11.png')" alt="" class="img">
                    <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/11k.png')" alt="" class="img">
                    <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/11q.png')" alt="" class="img">
                </div>
            </div>
            <div class="modal-form">
                <div id="modal-calc-inf" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="afterModal()">X</button>
                            </div>
                            <div class="modal-body">
                                <div class="title">
                                    <h2 v-if="error">{{error}}</h2>
                                    <h2 v-if="modalText">{{modalText}}</h2>
                                    <div v-if="(!error) && !modalText"><img :src="require('@/assets/img/loader.gif')" alt="" class="loader"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BannerComponent from '@/components/BannerComponent.vue'
    import MaskedInput from 'vue-masked-input'
    import {
        error
    } from 'util'

    export default {
        name: 'form-component',
        components: {
            MaskedInput,
            BannerComponent
        },
        data() {
            return {
                currentIndex:0,
                visible: true,
                name: '',
                phone: '',
                email: '',
                text: '',
                error: '',
                modalText: '',
                faq: '',
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
            $(".qa-content").mCustomScrollbar({
                autoHideScrollbar:true,
                theme:"rounded"
            });
        },
        created () {
            this.getFaq();
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
                        this.title_page = $response.data[13].title_page
                        this.description_page = $response.data[13].description
                        this.opengraph_image = $response.data[13].opengraph_image
                    }
                })
                .catch((e) => console.log(e))
            },
            setCurrentIndex(i) {
                this.currentIndex=i;
            },
            getRandomName() {
                this.$axios.get('/random_name')
                .then(response => {
                    this.name = response.data.data
                })
            },
            getFaq () {
                this.$axios.get('/faq')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.faq = $response.data
                    }
                })
                .catch((e) => console.log(e))
            },
            afterModal() {
                this.modalText = ''
            },
            validEmail(email) {
                var re =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            sendForm() {
                this.modalText = ''
                let obj = {}
                if (this.name) {
                    obj.name = this.name
                    this.error = ''
                } else {
                    this.error = this.$t('modal_error1')
                    return
                }

                if (this.phone && this.phone.length == 18 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) {
                    obj.phone = this.phone
                    this.error = ''
                } else if(!this.phone){
                    this.error = ''

                }else {
                    return this.error = this.$t('modal_error2')
                }
                if (!this.phone && !this.email) {
                    this.error = this.$t('modal_error3')
                    return
                }
                if (!this.phone && this.email) {
                    if (!this.validEmail(this.email)) {
                        this.error = this.$t('modal_error4')
                        return
                    } else {
                        obj.email = this.email
                        this.error = ''
                        if (this.text) {
                            obj.text = this.text
                            this.error = ''
                        } else {
                            this.error = this.$t('modal_error5')
                            return
                        }
                    }
                }
                if (this.phone && this.email) {
                    obj.email = this.email
                    this.error = ''
                }
                this.modalText = ''
                if (obj.name && (obj.phone || (obj.email && obj.text))) {
                    if (this.email) {
                        if (!this.validEmail(this.email)) {
                            this.error = this.$t('modal_error4')
                            return
                        } else {
                            if (this.text) {
                                obj.text = this.text
                                this.error = ''
                            } else {
                                this.error = this.$t('modal_error5')
                                return
                            }
                            obj.email = this.email
                            this.error = ''
                            this.$axios.post('/feedback', obj)
                            .then(response => {
                                console.log(response, '=========')
                                if (response) {
                                    this.name = ''
                                    this.phone = ''
                                    this.email = ''
                                    this.text = ''
                                    this.modalText = this.$t('modal_error6')
                                }
                                let $response = response.data.data
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    }else{
                        this.$axios.post('/feedback', obj)
                        .then(response => {
                            console.log(response, '=========')
                            if (response) {
                                this.name = ''
                                this.phone = ''
                                this.email = ''
                                this.text = ''
                                this.modalText = this.$t('modal_error6')
                            }
                            let $response = response.data.data
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>
#rule-block {
    position: relative;
}
</style>

