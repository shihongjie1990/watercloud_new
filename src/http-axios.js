import axios from 'axios'
import store from './vuex/store'

// 自定义公用方法
import common from './common/common'

axios.defaults.withCredentials = true
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
  store.dispatch('setBaseUrl', '')
}

/* let serverRelated = {
  beforeRequest(data) {
    // 设置全局loading
    let loadObj = data.loading
    if (loadObj && Object.keys(loadObj).length > 0) {
      data.loadmask = base64.Base64.encode(common.loading.buildLoading(loadObj))
    } else {
      let withoutLoading = data.headers.withoutLoading
      if (!withoutLoading) {
        data.loadingMark = base64.Base64.encode(new Date())
        store.dispatch('plusAxiosNum', true)
      }
    }
    // 每次请求服务都+1服务数
    common.requestServer.plusAxiosNum()
  },
  afterReponse(data) {
    // 关闭全局loading
    let config = data.config
    if (config) {
      if (config.loadmask) {
        let loadmask = base64.Base64.decode(config.loadmask)
        common.loading.closeLoading(loadmask)
      } else if (config.loadingMark) {
        store.dispatch('plusAxiosNum', false)
      }
    }
    let errResponse = data.response
    if (errResponse && errResponse.status === 500) {
      common.requestServer.storageInfo('网络出错，请稍后再试！')
    }
    // 每次回调都-1服务数
    common.requestServer.minusAxiosNum()
  }
} */

// axios拦截器
axios.interceptors.request.use(config => {
  common.requestServer.beforeRequest(config)
  // 发送请求报文信息
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  // 设置是否跳转到首页，判断登录与否，跳转
  let data = res.data
  if (data && data.code === 1006) {
    store.dispatch('setIsLogin', false)
  }
  common.requestServer.afterReponse(res)
  // 返回回调结果
  return data
}, err => {
  common.requestServer.afterReponse(err)
  // 返回错误结果
  let errorMsg = Promise.reject(err.response)
  return errorMsg
})

export default axios
