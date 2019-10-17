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
                    <router-link :to="{ name: 'Home' }"><img :src="require('@/assets/img/logo.svg')" alt="" class="logo"></router-link>
<!--                     <div class="add-photo">
                        <img :src="require('@/assets/img/user.svg')" alt="" class="img">
                        <button class="ad-ph" data-toggle="modal" data-target="#modalAvatar"><img :src="require('@/assets/img/icon/photo.svg')" alt=""></button>
                    </div> -->
                </div>
                <div class="name">{{user.name}}</div>
            </div>
            <div class="menu deskk-menu">
                <ul class="nav nav-pills nav-stacked">
                    <li><router-link to="/admin/my-loans">{{$t('my_loans')}}</router-link></li>
                    <li><router-link to="/admin/express-extension">{{$t('express_renewal')}}</router-link></li>
                    <li><router-link to="/admin/my-last-operations">{{$t('my_last_operations')}}</router-link></li>
                    <li><router-link to="/admin/valuation-my-capital">{{$t('valuation_capital')}}</router-link></li>
                    <li><router-link to="/admin/notification-history">{{$t('notification_history')}}</router-link></li>
                    <li><router-link to="/admin/change-my-data">{{$t('change_details')}}</router-link></li>
                    <li><router-link to="/admin/change-password">{{$t('change_password')}}</router-link></li>
                </ul>
            </div>
            <div class="mobb-menu" v-bind:class="{ mapMenu : this.$route.path === '/admin/map'}">
                <div class="dropdown">
                    <button class="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="open()">
                        <span v-if="$route.path == '/admin/my-loans'">{{$t('my_loans')}}</span>
                        <span v-if="$route.path == '/admin/express-extension'">{{$t('express_renewal')}}</span>
                        <span v-if="$route.path == '/admin/my-last-operations'">{{$t('my_last_operations')}}</span>
                        <span v-if="$route.path == '/admin/valuation-my-capital'">{{$t('valuation_capital')}}</span>
                        <span v-if="$route.path == '/admin/notification-history'">{{$t('notification_history')}}</span>
                        <span v-if="$route.path == '/admin/change-my-data'">{{$t('change_details')}}</span>
                        <span v-if="$route.path == '/admin/change-password'">{{$t('change_password')}}</span>
                        <span class="carets"><img :src="require('@/assets/img/icon/drop2.svg')" alt=""></span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2" v-if="showPopover" v-on-click-outside="close">
                        <li><router-link to="/admin/my-loans">{{$t('my_loans')}}</router-link></li>
                        <li><router-link to="/admin/express-extension">{{$t('express_renewal')}}</router-link></li>
                        <li><router-link to="/admin/my-last-operations">{{$t('my_last_operations')}}</router-link></li>
                        <li><router-link to="/admin/valuation-my-capital">{{$t('valuation_capital')}}</router-link></li>
                        <li><router-link to="/admin/notification-history">{{$t('notification_history')}}</router-link></li>
                        <li><router-link to="/admin/change-my-data">{{$t('change_details')}}</router-link></li>
                        <li><router-link to="/admin/change-password">{{$t('change_password')}}</router-link></li>
                        <li><a href="#" @click="UserLogout()" class="logout"><img :src="require('@/assets/img/icon/exit.svg')" alt=""> {{$t('exit')}}</a></li>
                    </div>
                </div>
            </div>
            <div class="exit" @click="UserLogout()"><img :src="require('@/assets/img/icon/exit.svg')" alt=""> {{$t('exit')}}</div>
        </aside>
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
                showPopover: false
            }
        },
        watch:{
            $route (to, from){
                this.showPopover = false;
            }
        },
        created () {
            this.getLangList();
            this.GetLangWeb();
            this.getUser();
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
                    } else {
                        this.user = $response.data
                    }
                })
                .catch((e) => {
                    this.errorLog = e.response.status;
                    if(this.errorLog == 401){
                        localStorage.clear()
                        window.location.reload()
                    }
                    console.log(e)
                })
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
