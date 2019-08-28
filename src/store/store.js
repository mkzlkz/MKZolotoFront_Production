import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
  menus: null,
  second_menus: null,
  keycon: null,
  banners: null,
  scroll: null,
  autoscrolling: null
  },
  mutations: {
    set (state, {type, data}) {
      state[type] = data
    }
  },
  getters: {
    getState: state => data => {
      return state[data]
    }
  },
  actions: {
async LayoutData ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/layout-data')
        .then((response) => {
          let $response = response.data
          if ($response.code === 0) {
            reject($response)
          } else {
            commit('set', { type: 'menus', data: $response.data.menus })
            commit('set', { type: 'second_menus', data: $response.data.second_menus })
            commit('set', { type: 'keycon', data: $response.data.keywords.keywords })
            commit('set', { type: 'banners', data: $response.data.banners })
            commit('set', { type: 'scroll', data: $response.data.autoscrolling })
            commit('set', { type: 'autoscrolling', data: $response.data.autoscrolling.value })
            resolve('success')
          }
        })
        .catch((e) => console.log(e))
    })

  }
  }
})