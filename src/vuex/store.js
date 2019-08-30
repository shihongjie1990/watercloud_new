import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null,
    VALID_USER_FLAG: false,
    THIS_URL: '',
    TOKEN: '',
    REFRESH_TOKEN: '',
    USER_NAME: '',
    USER: '',
    ROLE: '',
    SHOW_IMG: '',
    BASE_URL: '',
    IS_CONSOLE: true,
    AXIOS_NUMBER: 0,
    LOGIN_CODE: 0,
    LOGGED_MENU: {},
    // 登录标识符
    IS_LOGIN: false,
    IS_MANAGER: false,
    MANAGER_MENU: [],
    ONE_MAP: ''
  },
  getters,
  mutations,
  actions
})

export default store
