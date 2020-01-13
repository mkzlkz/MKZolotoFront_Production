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
import admin from '@/components/admin/admin'
import myLoans from '@/components/admin/myLoans'
import ExpressExtensionPage from '@/components/admin/ExpressExtensionPage'
import myLastOperations from '@/components/admin/myLastOperations'
import checkContract from '@/components/admin/checkContract'
import valuationCapital from '@/components/admin/valuationCapital'
import notificationHistory from '@/components/admin/notificationHistory'
import editMyData from '@/components/admin/editMyData'
import changePassword from '@/components/admin/changePassword'
import mapAdmin from '@/components/admin/mapAdmin'
import Auth from '@/components/Auth'
import AuthFunction from '@/functions/Auth'

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
    },
  {
    path: "/cabinet",
    // component:admin,
    component: AuthFunction().isLoggedIn() ? admin : Auth,
    redirect: '/cabinet/my-loans',
    children: [
    {
      path: 'my-loans',
      component: AuthFunction().isLoggedIn() ? myLoans : Auth,
          beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
        {
      path: 'map',
      component: AuthFunction().isLoggedIn() ? mapAdmin : Auth,
          beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
        {
      path: 'express-extension',
      component: AuthFunction().isLoggedIn() ? ExpressExtensionPage : Auth,
                beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
    {
      path: 'my-last-operations',
      component: AuthFunction().isLoggedIn() ? myLastOperations : Auth,
                beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
        {
      path: 'check-contract',
      component: AuthFunction().isLoggedIn() ? checkContract : Auth,
                beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
    {
      path: 'valuation-my-capital',
      component: AuthFunction().isLoggedIn() ? valuationCapital : Auth,
                beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
    {
          path: 'notification-history',
      component: AuthFunction().isLoggedIn() ? notificationHistory : Auth,
                beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
    {
      path: 'change-my-data',
      component: AuthFunction().isLoggedIn() ? editMyData : Auth,
                beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    },
    {
          path: 'change-password',
      component: AuthFunction().isLoggedIn() ? changePassword : Auth,
                beforeEnter: (to, from, next) => {
            let redirect = AuthFunction().verifiedUser()
            if (redirect) {
              next(redirect)
            } else {
              next()
            }
          }
    }
    ]
  }
  ]
})
