/* export const setUser = ({
  commit
}, user) => {
  commit('userState', user)
} */
// 设置完善信息弹出框是否弹出
export const setUserFlag = ({
  commit
}, flag) => {
  commit('VALID_USER_FLAG_STATE', flag)
}
// 设置本次接口url
export const setThisUrl = ({
  commit
}, url) => {
  commit('THIS_URL_STATE', url)
}

export const setToken = ({
  commit
}, token) => {
  commit('TOKEN_STATE', token)
}

export const setRefreshToken = ({
  commit
}, token) => {
  commit('REFRESH_TOKEN_STATE', token)
}

export const setUserName = ({
  commit
}, user) => {
  commit('USER_NAME_STATE', user)
}

export const setUser = ({
  commit
}, user) => {
  commit('USER_STATE', user)
}

export const setRole = ({
  commit
}, role) => {
  commit('ROLE_STATE', role)
}

export const setBaseUrl = ({
  commit
}, url) => {
  commit('BASE_URL_STATE', url)
}

export const setShowImg = ({
  commit
}, obj) => {
  commit('SHOW_IMG_STATE', obj)
}

export const isConsole = ({
  commit
}, flag) => {
  commit('IS_CONSOLE_STATE', flag)
}

export const plusAxiosNum = ({
  commit
}, num) => {
  commit('AXIOS_NUMBER_STATE', num)
}

export const setLoginCode = ({
  commit
}, code) => {
  commit('LOGIN_CODE_STATE', code)
}

export const setLoggedMenu = ({commit}, menu) => {
  commit('LOGGED_MENU_STATE', menu)
}

export const setIsLogin = ({commit}, isLogin) => {
  commit('IS_LOGIN_STATE', isLogin)
}

export const setIsManagerFlag = ({commit}, isManager) => {
  commit('IS_MANAGER_STATE', isManager)
}

export const setManagerMenu = ({commit}, menus) => {
  commit('MANAGER_MENU_STATE', menus)
}

export const setOneMap = ({commit}, url) => {
  commit('ONE_MAP_STATE', url)
}

// 组装树结构
export const buildTreeData = ({
  commit
}, payload) => {
  let data = payload.data
  let id = payload.id
  let parentId = payload.parentId
  // 寻找首数据
  var findFirstData = function(data) {
    let parents = []
    data.map((item, index) => {
      let haveParent = data.find(child => {
        return item[parentId] === child[id]
      })
      if (!haveParent) {
        parents.push(item)
      }
    })
    return parents
  }
  // 通过首数据组装树结构
  var treeData = function(data, parentData) {
    parentData.map(item => {
      let children = data.filter(child => {
        return child[parentId] === item[id]
      })
      item.children = children
      if (children.length > 0) {
        treeData(data, children)
      }
    })
  }
  if (data.length > 0) {
    let firstData = findFirstData(data)
    treeData(data, firstData)
    return firstData
  } else {
    return {
      code: 9001,
      msg: '非法数据'
    }
  }
}
