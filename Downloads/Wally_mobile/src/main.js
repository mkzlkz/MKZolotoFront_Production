// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as jquery from './assets/js/jquery-1.12.1.min.js'
import * as bootstrapjs from './assets/js/bootstrap.min.js'
import * as common from './assets/js/common.js'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Paginate from 'vuejs-paginate'
import Multiselect from 'vue-multiselect'
import ProgressBar from 'vuejs-progress-bar'
import i18n from './i18n'
import TextareaAutosize from 'vue-textarea-autosize'
import moment from 'moment'

Vue.config.productionTip = false
// axios.baseURL = "http://localhost:8085"
axios.baseURL = 'https://cors-any-kz.herokuapp.com/http://138.68.103.82:8085'
axios.baseOriginURL = 'http://138.68.103.82:8085'
// axios.baseURL = 'http://127.0.0.1:8085'
// axios.baseOriginURL = 'http://127.0.0.1:8085'

axios.baseCors = 'https://cors-any-kz.herokuapp.com/'
// axios.baseCors = ''

let user = localStorage.getItem('user')
if (user) {
  let userParsed = JSON.parse(user)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + userParsed.Token // for all requests
}

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('hh:mm')
  }
})

Vue.filter('formatDate2', function (value) {
  if (value) {
    return moment(String(value)).format('MM.DD.YY')
  }
})

Vue.filter('formatDate3', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YY | hh:mm')
  }
})

Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.use(ProgressBar)
Vue.component('paginate', Paginate)
Vue.component('multiselect', Multiselect)
Vue.use(TextareaAutosize)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {App},
  template: '<App/>',
  store
})
