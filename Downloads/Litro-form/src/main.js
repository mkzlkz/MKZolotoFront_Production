// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as jqueryjs from './assets/js/jquery-1.12.1.min.js'
import * as bootstrapjs from './assets/js/bootstrap.min.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueMask from 'v-mask'

var VueScrollTo = require('vue-scrollto')

Vue.use(VueScrollTo)
Vue.use(Vuex);
Vue.use(jqueryjs, bootstrapjs)
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueMask)



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
