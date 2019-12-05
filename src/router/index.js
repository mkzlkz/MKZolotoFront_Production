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
      path: '/location/:city_name',
      name: 'OneCityPage',
      component: MapComponent
    },
  {
    path: '/location/aktau',
    name: 'aktau',
    component: MapComponent
  },
  {
    path: '/location/aktobe',
    name: 'aktobe',
    component: MapComponent
  },
  {
    path: '/location/almaty',
    name: 'almaty',
    component: MapComponent
  },
  {
    path: '/location/atyrau',
    name: 'atyrau',
    component: MapComponent
  },
  {
    path: '/location/burunday',
    name: 'burunday',
    component: MapComponent
  },
  {
    path: '/location/esik',
    name: 'esik',
    component: MapComponent
  },
  {
    path: '/location/zhanaozen',
    name: 'zhanaozen',
    component: MapComponent
  },
  {
    path: '/location/kandyagash',
    name: 'kandyagash',
    component: MapComponent
  },
  {
    path: '/location/kapchagay',
    name: 'kapchagay',
    component: MapComponent
  },
  {
    path: '/location/kaskelen',
    name: 'kaskelen',
    component: MapComponent
  },
  {
    path: '/location/kosshy',
    name: 'kosshy',
    component: MapComponent
  },
  {
    path: '/location/kulsary',
    name: 'kulsary',
    component: MapComponent
  },
  {
    path: '/location/kyzylorda',
    name: 'kyzylorda',
    component: MapComponent
  },
  {
    path: '/location/merke',
    name: 'merke',
    component: MapComponent
  },
  {
    path: '/location/nur-sultan',
    name: 'nur-sultan',
    component: MapComponent
  },
  {
    path: '/location/otegen-batyr',
    name: 'otegen-batyr',
    component: MapComponent
  },
  {
    path: '/location/semey',
    name: 'semey',
    component: MapComponent
  },
  {
    path: '/location/talgar',
    name: 'talgar',
    component: MapComponent
  },
  {
    path: '/location/taraz',
    name: 'taraz',
    component: MapComponent
  },
  {
    path: '/location/uzynagash',
    name: 'uzynagash',
    component: MapComponent
  },
  {
    path: '/location/uralsk',
    name: 'uralsk',
    component: MapComponent
  },
  {
    path: '/location/ust-kamenogorsk',
    name: 'ust-kamenogorsk',
    component: MapComponent
  },
  {
    path: '/location/shymkent',
    name: 'shymkent',
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
