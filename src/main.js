// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'
import axios from './http-axios'
import VueCookies from 'vue-cookies'
import store from './vuex/store'
import base64 from 'js-base64'
import echarts from 'echarts'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入jquery
// import $ from 'jquery'
// ie兼容
import 'babel-polyfill'
import 'es6-promise/auto'
// 引入时间格式化工具
import moment from 'moment'
// 自定义公用方法
import common from './common/common'
// websocket连接
import buildWebSocket from './Load-Module/application-websocket'
// 个人权限处理
import administerPermission from './Load-Module/permission-administer'

if (Number.parseInt === undefined) Number.parseInt = window.parseInt
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat

Vue.use(Element)

Vue.use(VueCookies)

// 进度条 ----------------  ||************ 暂时放入router里面，代表页面跳转时出现进度条 *************||
NProgress.configure({
  easing: 'ease', //  动画方式
  speed: 500, //  递增进度条的速度
  showSpinner: false, //  是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 //  初始化时的最小百分比
})

// 全局引用axios
Vue.prototype.$http = axios

// 全局引入时间格式化工具
moment.locale('zh-cn')
Vue.prototype.$moment = moment

// 引用base64
Vue.prototype.base64 = base64.Base64

// 引入echarts
Vue.prototype.$echarts = echarts

Vue.prototype.$common = common

Vue.config.productionTip = false

Vue.filter('formatDate', (value) => {
  return moment(value).format('YYYY-MM-DD')
})

Vue.filter('formatTime', (value) => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

// 处理刷新后，websocket长连接
if (process.env.NODE_ENV !== 'development') {
  let userString = window.localStorage.USER_INFO
  if (userString) {
    let userData = JSON.parse(base64.Base64.decode(userString))
    buildWebSocket(userData)
  }
}

// 设置登录标识符
let loginFlag = window.localStorage.IS_LOGIN
if (loginFlag) {
  let isLoginObj = JSON.parse(base64.Base64.decode(loginFlag))
  let isLogin = isLoginObj.flag
  if (isLogin) {
    store.dispatch('setIsLogin', true)
  }
} else {
  store.dispatch('setIsLogin', false)
  window.localStorage.clear()
}

// 登记用户信息，设置权限
let userInfo = window.localStorage.USER_INFO
if (userInfo) {
  let userData = JSON.parse(base64.Base64.decode(userInfo))
  administerPermission(userData)
} else {
  store.dispatch('setIsLogin', false)
}

axios.get('static/someExternalReference.json').then(res => {
  store.dispatch('setOneMap', res.oneMap)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
