import LoggedOverview from '@/components/Framework/Client/Logged-Main'
// 对外门户页与介绍页
import publicContent from '@/version1/publicContent'
import appDetail from '@/components/Version1-Page/apps/reservoir'

const routes = [
  {
    path: '/useroverview',
    name: 'useroverview',
    component: () => import('@/components/User/user-overview/index2.vue')
  },
  {
    path: '/home',
    name: 'homePage',
    component: LoggedOverview,
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/components/User/user-overview/index.vue')
    }, {
      path: 'staticData',
      name: 'staticData',
      component: () => import('@/components/User/data-base/index2.vue')
    }, {
      path: 'appShop',
      name: 'appShop',
      component: () => import('@/components/User/app-shop/index.vue')
    }, {
      path: 'oneMap',
      name: 'oneMap',
      component: () => import('@/components/User/one-map/index.vue')
    }, {
      path: 'developer',
      name: 'developer',
      component: () => import('@/components/worker/worker-overview/index2.vue')
    }, {
      path: 'systemStage',
      name: 'systemStage',
      component: () => import('@/components/worker/system-stage/index.vue')
    }, {
      path: 'stageStatics',
      name: 'stageStatics',
      component: () => import('@/components/worker/system-stage/index2.vue')
    }, {
      path: 'notice',
      name: 'notice',
      component: () => import('@/components/User/notices/index.vue')
    }, {
      path: 'dataDetail',
      name: 'dataDetail',
      component: () => import('@/components/User/data-base/detail.vue')
    }]
  }, {
    path: '/',
    name: 'publicContent',
    component: publicContent,
    children: [
      {
        path: 'appDetail',
        name: 'appDetail',
        component: appDetail
      }
    ]
  }
]

export default routes
