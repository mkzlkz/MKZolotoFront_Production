<template>
    <div class="block-left aside-admin" v-if="this.$route.query.from !== 'app'">
        <aside>
            <div class="dflex-lang">
                <div v-if="langList.qaz === true" :class="{activeLng : this.$auth.getLanguage() === 'qaz'}" @click="selectLang('qaz')">QAZ</div>
                <div v-if="langList.ru === true" :class="{activeLng : this.$auth.getLanguage() === 'ru'}" @click="selectLang('ru')">РУС</div>
                <div v-if="langList.kz === true" class="menu-kz-lg" :class="{activeLng : this.$auth.getLanguage() === 'kz'}" @click="selectLang('kz')">ҚАЗ</div>
            </div>
            <div class="mobile-header-decktop">
                <div class="ddflex">
                    <img :src="require('@/assets/img/logo.svg')" alt="" class="logo">
                    <div class="add-photo">
                        <img :src="user.avatar ? imgMin : require('@/assets/img/user.svg')" alt="" class="img">
                        <button class="ad-ph" data-toggle="modal" data-target="#modalAvatar" v-if="!errorsServer"><img :src="require('@/assets/img/icon/photo.svg')" alt=""></button>
                    </div>
                </div>
                <div class="name">{{user.name}}</div>
            </div>
            <div class="menu deskk-menu">
                <ul class="nav nav-pills nav-stacked">
                    <li><router-link to="/cabinet/my-loans">{{$t('my_loans')}}</router-link></li>
                    <li><router-link to="/cabinet/express-extension">{{$t('express_renewal')}}</router-link></li>
                    <li><router-link to="/cabinet/my-last-operations">{{$t('my_last_operations')}}</router-link></li>
                    <li><router-link to="/cabinet/valuation-my-capital">{{$t('valuation_capital')}}</router-link></li>
                    <li><router-link to="/cabinet/notification-history">{{$t('notification_history')}}</router-link></li>
                    <li><router-link to="/cabinet/change-my-data">{{$t('change_details')}}</router-link></li>
                    <li><router-link to="/cabinet/change-password">{{$t('change_password')}}</router-link></li>
                </ul>
            </div>
            <div class="mobb-menu" v-bind:class="{ mapMenu : this.$route.path === '/cabinet/map'}">
                <div class="dropdown">
                    <button class="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="open()">
                        <span v-if="$route.path == '/cabinet/my-loans'">{{$t('my_loans')}}</span>
                        <span v-if="$route.path == '/cabinet/express-extension'">{{$t('express_renewal')}}</span>
                        <span v-if="$route.path == '/cabinet/my-last-operations'">{{$t('my_last_operations')}}</span>
                        <span v-if="$route.path == '/cabinet/valuation-my-capital'">{{$t('valuation_capital')}}</span>
                        <span v-if="$route.path == '/cabinet/notification-history'">{{$t('notification_history')}}</span>
                        <span v-if="$route.path == '/cabinet/change-my-data'">{{$t('change_details')}}</span>
                        <span v-if="$route.path == '/cabinet/change-password'">{{$t('change_password')}}</span>
                        <span class="carets"><img :src="require('@/assets/img/icon/drop2.svg')" alt=""></span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2" v-if="showPopover" v-on-click-outside="close">
                        <li><router-link to="/cabinet/my-loans">{{$t('my_loans')}}</router-link></li>
                        <li><router-link to="/cabinet/express-extension">{{$t('express_renewal')}}</router-link></li>
                        <li><router-link to="/cabinet/my-last-operations">{{$t('my_last_operations')}}</router-link></li>
                        <li><router-link to="/cabinet/valuation-my-capital">{{$t('valuation_capital')}}</router-link></li>
                        <li><router-link to="/cabinet/notification-history">{{$t('notification_history')}}</router-link></li>
                        <li><router-link to="/cabinet/change-my-data">{{$t('change_details')}}</router-link></li>
                        <li><router-link to="/cabinet/change-password">{{$t('change_password')}}</router-link></li>
                        <li><a href="#" @click="UserLogout()" class="logout"><img :src="require('@/assets/img/icon/exit.svg')" alt=""> {{$t('exit')}}</a></li>
                    </div>
                </div>
            </div>
            <div class="exit" @click="UserLogout()"><img :src="require('@/assets/img/icon/exit.svg')" alt=""> {{$t('exit')}}</div>
        </aside>
        <div class="avatarChange">
            <div id="modalAvatar" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="av-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/close.svg')" alt=""></button>
                                <div class="modal-title">{{$t('avatar_change')}}</div>
                            </div>
                            <div class="av-change">
                                <div class="img">
                                    <img :src="user.avatar ? user.avatar.url : require('@/assets/img/user.svg')" alt="" v-if="user.avatar !== null" class="img-g1">
                                    <img :src="imgMest ? imgMest : require('@/assets/img/user.svg')" alt="" class="img-g2" v-else>
                                </div>
                                <div class="img-button">
                                    <input ref="file" type="file" accept="image/*" @change="onChange" id="img-file" />
                                    <label for="img-file">{{$t('upload_image')}}</label>
                                    <div class="text" v-if="mbError">{{$t('mbErrorText')}}</div>
                                </div>
                            </div>
                            <div class="av2-change">
                                <div class="title">{{$t('take_avatars')}} <img :src="require('@/assets/img/icon/avatar.svg')" alt=""></div>
                                <div class="av-list">
                                    <div v-for="(avatar, index) in avatarList" :key="avatar.id" @click="changeImage(avatar)">
                                        <img :src="avatar.image" alt="">
                                    </div>
                                </div>
                                <button :class="(this.img!='') ? 'button-orange':'button-orange disabled'" @click="changeAvatar()" data-dismiss="modal" aria-hidden="true">{{$t('save')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AsideAdmin',
        data () {
            return {
                selected: this.$auth.getLanguage(),
                lang: [],
                langList: '',
                user: '',
                showPopover: false,

                avatarList: '',
                file : {},
                mbError : false,
                avatarId: '',
                img: '',
                imgMin: '',
                imgMest: "",
                errorsServer: ''
            }
        },
        watch:{
            $route (to, from){
                this.showPopover = false;
            }
        },
        mounted () {
            var obj = this;
            $('#modalAvatar').on('hidden.bs.modal', function () {
                obj.file = {};
                obj.mbError = false;
                obj.avatarId = '';
                obj.img = '';
                obj.imgMest = "";
                obj.getUser();
            });
        },
        created () {
            this.getLangList();
            this.GetLangWeb();
            this.getUser();
            this.getAvatarList();
        },
        methods: {
            selectLang(lng) {
                if (lng === 'ru') {
                    this.$auth.setLanguage(lng);
                    location.reload();
                } else if (lng === 'kz') {
                    this.$auth.setLanguage(lng)
                    location.reload();
                } else if (lng === 'qaz') {
                    this.$auth.setLanguage(lng)
                    location.reload();
                }
            },
            GetLangWeb() {
                if(this.$route.query.from === 'app'){
                    if (localStorage.app_lang !== this.$route.query.lang){
                        location.reload();
                    }
                }
                if (this.$route.query.from === 'app' & this.$route.query.lang === 'ru') {
                    this.$auth.setLanguage('ru');
                } else if (this.$route.query.from === 'app' & this.$route.query.lang === 'kz') {
                    this.$auth.setLanguage('kz');
                } else if (this.$route.query.from === 'app' & this.$route.query.lang === 'qaz') {
                    this.$auth.setLanguage('qaz');
                }
            },
            setLanguage() {
                this.$auth.setLanguage(this.selected);
                location.reload();
            },
            getLangList () {
                this.$axios.get('/languages')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.langList = $response.data
                    }
                })
                .catch((e) => console.log(e))
            },
            getUser () {
                this.$axios.post('/auth/me')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                        this.errorsServer = $response.error
                    } else {
                        this.user = $response.data
                        if(this.user.avatar != null){
                            this.imgMin = this.user.avatar.url
                        }
                    }
                })
                .catch((e) => console.log(e))
            },
            getAvatarList () {
                this.$axios.get('/auth/avatar-list')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.avatarList = $response.data
                    }
                })
                .catch((e) => console.log(e))
            },
            changeImage(avatar){
                this.avatarId = avatar.id
                this.img = 'server'
                this.$refs.file.value = ''
                if(this.user.avatar != null){
                    this.user.avatar.url = avatar.image
                }else{
                    this.imgMest = avatar.image
                }
            },
            onChange() {
                this.file = this.$refs.file.files[0];
                if (this.file.size > 1024 * 10000) {
                    this.mbError = true
                    this.img = ''
                    return;
                }else {
                    this.mbError = false
                    this.img = 'site'
                    if(this.user.avatar != null){
                        this.user.avatar.id = 0
                        this.user.avatar.url = URL.createObjectURL(this.file)
                    } else{
                        this.imgMest = URL.createObjectURL(this.file)
                    }
                }
            },
            changeAvatar(){
                let obj = {}
                let formData = new FormData();
                if ( this.img == 'server') {
                    obj['avatar'] = this.avatarId
                    this.$axios.post('/auth/change-avatar', obj)
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response.error)
                        } else {
                            this.getUser();
                        }
                    })
                    .catch((e) => console.log(e))
                } else if (this.img == 'site') {
                    formData.append('image', this.file);
                    this.$axios.post('/auth/avatar-upload', formData)
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response.error)
                        } else {
                            this.getUser();
                        }
                    })
                    .catch((e) => console.log(e))
                }
            },
            UserLogout () {
                localStorage.clear()
                window.location.reload()
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
.ddflex{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
