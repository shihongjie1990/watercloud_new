<template>
  <div class="overview-header">
    <div class="logo"
         @click="$router.push({path: '/'})">
      <img src="static/images/overview/logo.png"
           alt="logo">
      <div>贵州·水利云</div>
    </div>
    <div class="user">
      <div class="logged-in"
           v-if="!showLogin">
        <el-button size="mini"
                   class="overview-button"
                   @click="$router.push({path: '/home/user'})">管理控制台</el-button>
        <img src="static/images/overview/loginuser.png"
             alt="user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link head-user-name">
            {{ $store.state.USER.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="not-log-in"
           v-else>
        <a @click="$router.push({path: '/login'})">登录</a>
      </div>
    </div>
    <div class="menu">
      <ul>
        <!-- <li>首页</li>
        <li>公告新闻</li>
        <li>平台服务</li>
        <li>行业动态</li>
        <li>政策法规</li>
        <li>平台总揽</li>
        <li>数据共享</li> -->
        <li @mouseenter="showAppPanel = true">应用商店</li>
      </ul>
    </div>
    <div :class="{'all-app-panel':true, 'panel-triangle-position': !showLogin}"
         v-if="showAppPanel"
         @mouseleave="showAppPanel = false">
      <p>水利云</p>
      <ul>
        <li v-for="(item, index) in appData"
            :key="index">
          <a @click.prevent="skipTo(item)">{{ item.clientName }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      appData: [],
      showAppPanel: false
    }
  },
  methods: {
    getUserInfo() {
      this.$http.get('/api/user/me', { isIndex: true }).then(res => {
        if (res.code === 9987) {
          this.$store.dispatch('setUserFlag', true)
          this.$store.dispatch('setUserName', '')
          window.localStorage.USER = this.base64.encode('')
        } else if (res.userId) {
          this.showLogin = false
          this.$store.dispatch('setUserFlag', false)
          this.$store.dispatch('setUserName', res.username)
          window.localStorage.USER = this.base64.encode(res.username)
        }
      })
    },
    skipTo(itemData) {
      //   this.$router.push({ name: 'appDetail', params: itemData })
      // let dataStr = encodeURIComponent(JSON.stringify(itemData))
      let dataStr = encodeURIComponent(this.base64.encode(JSON.stringify(itemData)))
      window.open('#/appdetail?app=' + dataStr)
    },
    getAllApps() {
      this.$http.get('/api/client/public/list').then(res => {
        if (res.code === 1002) {
          this.appData = res.data
        }
      })
    },
    logout() {
      /* this.$http.get('/api/logout').then(res => {
        this.$router.push({ path: '/' })
        window.location.reload()
      }) */
      window.localStorage.clear()
      location.href = location.origin + '/api/logout'
    }
  },
  mounted() {
    // 请求自我身份信息
    this.getUserInfo()
    // 获取所有应用信息
    this.getAllApps()
  }
}
</script>

<style lang="scss" scoped>
.head-user-name {
  width: 60px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
