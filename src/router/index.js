import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CalculateComponent from '@/components/CalculateComponent'
import SmartScalesComponent from '@/components/SmartScalesComponent'
import NoScratchesComponent from '@/components/NoScratchesComponent'
import PresentsComponent from '@/components/PresentsComponent'
import QiwiComponent from '@/components/QiwiComponent'
import VipComponent from '@/components/VipComponent'
import PercentComponent from '@/components/PercentComponent'
import RulesComponent from '@/components/RulesComponent'
import OnlineRulesComponent from '@/components/OnlineRulesComponent'
import MapComponent from '@/components/MapComponent'
import FormComponent from '@/components/FormComponent'
import PageNotFound from '@/components/PageNotFound'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'CalculateComponent',
      component: CalculateComponent
    },
        {
      path: '/animation',
      name: 'Home',
      component: Home
    },
    {
      path: '/location/:city_name',
      name: 'OneCityPage',
      component: MapComponent
    },
    {
      path: '/smartscales',
      name: 'SmartScalesComponent',
      component: SmartScalesComponent
    },
    {
      path: '/noscratches',
      name: 'NoScratchesComponent',
      component: NoScratchesComponent
    },
    {
      path: '/presents',
      name: 'PresentsComponent',
      component: PresentsComponent
    },
    {
      path: '/qiwi',
      name: 'QiwiComponent',
      component: QiwiComponent
    },
    {
      path: '/vipclub',
      name: 'VipComponent',
      component: VipComponent
    },
    {
      path: '/percent',
      name: 'PercentComponent',
      component: PercentComponent
    },
    {
      path: '/rules',
      name: 'RulesComponent',
      component: RulesComponent
    },
    {
      path: '/online-rules',
      name: 'OnlineRulesComponent',
      component: OnlineRulesComponent
    },
    {
      path: '/location',
      name: 'MapComponent',
      component: MapComponent
    },
    {
      path: '/form',
      name: 'FormComponent',
      component: FormComponent
    },
        {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
