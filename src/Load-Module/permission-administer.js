import Vue from 'vue'
import Store from '../vuex/store'
import router from '../router'
import base64 from 'js-base64'
// 权限点
import permissionComparison from '../Comparison-Table/permission'

const permission = {
  menu: {
    data: [{
      node: '首页',
      url: '/home/user',
      id: 'my_home'
    }, {
      node: '应用商店',
      url: '/home/appShop',
      id: 'app_shop'
    }, {
      node: '水利数据库',
      url: '/home/staticData',
      id: 'data_source'
    }, {
      node: '水利一张图',
      url: '/home/oneMap',
      id: 'one_map'
    }, {
      node: '平台总览',
      url: '/home/stageStatics',
      id: 'system_overview'
    }, {
      node: '公告',
      url: '/home/notice',
      id: 'system_notice'
    }],
    activeNode: 'my_home'
  },
  // 分辨角色信息
  distinguishRole(role) {
    // 设置菜单
    Store.dispatch('setLoggedMenu', this.menu)
    if ((role.role).toUpperCase().indexOf('ADMIN') === -1) {
      // 设置权限路由
      this.setClientPermission()
      // 设置管理员标识
      Store.dispatch('setIsManagerFlag', false)
    } else {
      let permissions = role.permissions
      // 超级管理员权限为空
      if (permissions && permissions.length === 0) {
        permissions = permissionComparison
      }
      // 获取所有的权限code
      let permissionCodes = this.getMyPermission(permissions)
      // 设置权限路由
      this.setManagerPermission(permissionCodes)
      // 设置管理员标识
      Store.dispatch('setIsManagerFlag', true)
    }
  },
  getMyPermission(permissions) {
    // 匹配后台权限点和前端权限列表
    let pagePermission = permissions.map(item => {
      let permissionData = permissionComparison.find(node => {
        return node.id === item.code
      })
      return permissionData && permissionData.code + ''
    })
    // 读取缺失权限点
    let lackPermissions = permissionComparison.filter(item => {
      return !item.id
    })
    let lackPermissionCodes = []
    if (lackPermissions && lackPermissions.length > 0) {
      lackPermissionCodes = lackPermissions.map(item => {
        return item.code
      })
    }
    Array.prototype.push.apply(pagePermission, lackPermissionCodes)
    pagePermission = pagePermission.concat(lackPermissions)
    Store.dispatch('setManagerMenu', pagePermission)
    return pagePermission
  },
  setManagerPermission(permissionCodes) {
    // 读取系统管理所有的页面路由
    let manager = require('../router/permissionRouter/console-manager')
    let managerRoutes = manager.default
    // 设置权限点的页面路由
    let managerPermissionRoutes = managerRoutes[1].children.filter(item => {
      return permissionCodes.indexOf(item.code) > -1
    })
    managerRoutes[1].children = managerPermissionRoutes
    // 读取业务功能的页面路由
    let client = require('../router/permissionRouter/console-user')
    let clientRoutes = client.default
    let routes = [...clientRoutes, ...managerRoutes]
    router.addRoutes(routes)
    Array.prototype.push.apply(router.options.routes, routes)
  },
  setClientPermission() {
    let client = require('../router/permissionRouter/console-user')
    let routes = client.default
    router.addRoutes(routes)
    Array.prototype.push.apply(router.options.routes, routes)
  }
}

const userInfo = {
  permission: permission,
  vueComp: Vue.prototype,
  hanlderUserInfo(userData) {
    // 存入用户信息
    let userInfo = { name: userData.username, id: userData.userId }
    Store.dispatch('setUser', userInfo)
    window.localStorage.USER_INFO = this.vueComp.base64.encode(JSON.stringify(userData))
    // 设置是否登录的标识key
    Store.dispatch('setIsLogin', true)
    window.localStorage.IS_LOGIN = this.vueComp.base64.encode(JSON.stringify({flag: true}))
    // 获取并存入最高角色信息
    let roles = userData.roles
    if (roles.length > 0) {
      roles.sort((param1, param2) => {
        return param2.weight - param1.weight
      })
    } else {
      this.vueComp.$message.error('该用户没有角色，请给其分配合理的角色！')
      return
    }
    let role = roles[0]
    Store.dispatch('setRole', role)
    window.localStorage.APP_INFOMATION = this.vueComp.base64.encode(JSON.stringify({ user: userInfo, role: role }))
    // 设置选中菜单节点
    this.setCurrentNode()
    // 分配角色访问权限
    permission.distinguishRole(role)
  },
  /**
   * 设置当前菜单选中节点
   */
  setCurrentNode() {
    let currentNode = window.localStorage.CURRENT_NODE
    if (currentNode) {
      permission.menu.activeNode = base64.Base64.decode(currentNode)
    }
  }
}

const registerUser = {
  //   登记用户信息
  setCurrentUser(data) {
    userInfo.hanlderUserInfo(data)
  }
}

export default registerUser.setCurrentUser
