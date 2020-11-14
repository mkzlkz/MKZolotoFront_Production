import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import ServiceList from '@/views/ServiceList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/serviceList',
      name: 'ServiceList',
      component: ServiceList
    }
  ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})
