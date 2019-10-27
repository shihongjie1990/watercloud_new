import Vue from 'vue'
import Router from 'vue-router'
import Store from '../vuex/store'
import Login from '@/components/login'
// 测试页面
import TestJs from './test'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 用户界面
// import User from './permissionRouter/console-user'

Vue.use(Router)

// 进度条
NProgress.configure({
  easing: 'ease', //  动画方式
  speed: 500, //  递增进度条的速度
  showSpinner: false, //  是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 //  初始化时的最小百分比
})

const router = new Router({
  routes: [
    {
      path: '',
      name: 'waterCloudIndex',
      redirect: '/home/overview'
    },
    {
      path: '/',
      name: 'overviewIndex',
      redirect: '/home/overview'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    ...TestJs,
    // ...User,
    {
      path: '/home/overview',
      name: 'HomeOverview',
      component: () => import('@/components/Index/overview.vue')
    },
    {
      // 贵州省水库预测预报系统
      path: '/reservoirForecast',
      name: 'reservoirForecast',
      component: () => import('@/ThreePartyIndex/reservoir-forecast.vue')
    }, {
      // 贵阳市智慧防汛决策系统
      path: '/floodPrevention',
      name: 'floodPrevention',
      component: () => import('@/ThreePartyIndex/flood-prevention.vue')
    }, {
      // 贵州水土保持大数据平台
      path: '/waterSolid',
      name: 'waterSolid',
      component: () => import('@/ThreePartyIndex/water-solid.vue')
    }, {
      // 防汛抗旱态势分析系统
      path: '/floodDrought',
      name: 'floodDrought',
      component: () => import('@/ThreePartyIndex/flood-drought.vue')
    }, {
      path: '/govermentIndex',
      name: 'govermentIndex',
      component: () => import('@/components/GovIndex/index.vue')
    }
  ]
})

/**
 * 对用户首页菜单节点的监控
 *
 */
function hrefToClient(netxUrl) {
  let menu = Object.assign({}, Store.state.LOGGED_MENU)
  if (menu && Object.keys(menu).length > 0) {
    let menuNode = menu.data.find(item => {
      return item.url === netxUrl
    })
    if (menuNode && Object.keys(menuNode).length > 0) {
      menu.activeNode = menuNode.id
      Store.dispatch('setLoggedMenu', menu)
    }
  }
}

router.beforeEach((to, from, next) => {
  // let token = store.state.TOKEN
  let path = ''
  /* if (to.name) {
    let info = Store.state.IS_LOGIN
    if (!info && to.name !== 'HomeOverview') {
      path = '/'
    } else {
      hrefToClient(to.path)
    }
  } else {
    path = from.path
  } */
  NProgress.start()
  path ? next(path) : next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
