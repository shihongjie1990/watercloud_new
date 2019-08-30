export const userState = (state, currentUser) => {
  state.currentUser = currentUser
}
// 监听完善信息弹出框
export const VALID_USER_FLAG_STATE = (state, flag) => {
  state.VALID_USER_FLAG = flag
}
// 监听本次事件的url
export const THIS_URL_STATE = (state, url) => {
  state.THIS_URL = url
}

// 更改token
export const TOKEN_STATE = (state, token) => {
  state.TOKEN = token
}

// 刷新token
export const REFRESH_TOKEN_STATE = (state, token) => {
  state.REFRESH_TOKEN = token
}

// 更新用户名
export const USER_NAME_STATE = (state, user) => {
  state.USER_NAME = user
}

// 存储用户信息
export const USER_STATE = (state, user) => {
  state.USER = user
}

// 存储角色信息
export const ROLE_STATE = (state, role) => {
  state.ROLE = role
}

// 基础url
export const BASE_URL_STATE = (state, url) => {
  state.BASE_URL = url
}

export const SHOW_IMG_STATE = (state, obj) => {
  state.SHOW_IMG = obj
}

// 是否是管理控制台
export const IS_CONSOLE_STATE = (state, flag) => {
  state.IS_CONSOLE = flag
}

// 是否全局loading
export const AXIOS_NUMBER_STATE = (state, flag) => {
  if (flag) {
    state.AXIOS_NUMBER++
  } else {
    if (state.AXIOS_NUMBER > 0) {
      state.AXIOS_NUMBER--
    }
  }
}

// 监听登录超时
export const LOGIN_CODE_STATE = (state, code) => {
  state.LOGIN_CODE = code
}

// 登录后的控台台菜单
export const LOGGED_MENU_STATE = (state, menu) => {
  state.LOGGED_MENU = menu
}

// 登录标识符
export const IS_LOGIN_STATE = (state, isLogin) => {
  state.IS_LOGIN = isLogin
}

// 是否为管理员
export const IS_MANAGER_STATE = (state, isManager) => {
  state.IS_MANAGER = isManager
}

export const MANAGER_MENU_STATE = (state, menus) => {
  state.MANAGER_MENU = menus
}

// 设置一张图地址
export const ONE_MAP_STATE = (state, url) => {
  state.ONE_MAP = url
}
