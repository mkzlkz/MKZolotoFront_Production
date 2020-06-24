// The Vue build version to load with the import command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import LangRU from './lang/ru'
import LangKZ from './lang/kz'
import LangQAZ from './lang/qaz'
import AuthFunction from './functions/Auth'
import VueMaskedInput from 'vue-masked-input'
import * as jquery from './assets/js/jquery-1.12.1.min.js'
import * as bootstrapjs from './assets/js/bootstrap.min.js'
import * as malihu from './assets/js/jquery.mCustomScrollbar.concat.min.js'
import * as slick from './assets/slick/slick.min.js'
import * as common from './assets/js/common.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueSmoothScroll from 'vue-smooth-scroll'
import VueLodash from 'vue-lodash'
import VueImg from 'v-img';
import Meta from 'vue-meta'
import VueTheMask from 'vue-the-mask'
import ToggleButton from 'vue-js-toggle-button'
import moment from 'moment'
 Vue.prototype.moment = moment
Vue.use(require('vue-moment'));
Vue.use(ToggleButton)
Vue.use(VueI18n)
Vue.use(VueTheMask)
Vue.use(Meta)
Vue.use(VueImg);
import { directive as onClickOutside } from 'vue-on-click-outside'
Vue.directive('on-click-outside', onClickOutside)
import * as VueGoogleMaps from 'vue2-google-maps'
const options = { name: '_' }
Vue.use(VueLodash, options)
Vue.use(vueSmoothScroll)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$auth = new AuthFunction()
Vue.use(VueAxios, axios)
Vue.use(VueMaskedInput)
Vue.use(malihu)
import money from 'v-money'

const AppLang = () => {
    return AuthFunction().getLanguage()
}

Vue.use(money, {precision: 4})
// axios.defaults.baseURL = 'https://mk-zoloto-lombard.kz/api/' + AppLang()
axios.defaults.baseURL = 'https://mk-backend.mars.studio/api/' + AppLang()
if (AuthFunction().getToken()) {
  axios.defaults.headers.common['Authorization'] = AuthFunction().getToken()
}
const messages = {
    ru: LangRU,
    kz: LangKZ,
    qaz: LangQAZ
}

const i18n = new VueI18n({
    locale: AppLang(),
    messages
})

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBJru0N9z4lHuv1zYtWkMucVAvH8G_0bxI'
    }
})


/* eslint-disable no-new */
new Vue({
    i18n,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})