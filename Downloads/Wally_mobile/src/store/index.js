import Vue from 'vue'
import Vuex from 'vuex'
import test from './test'
import fileModule from './modules/fileModule'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    test,
    fileModule
  }
})
