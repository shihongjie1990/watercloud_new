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
           v-if="$store.state.IS_LOGIN">
        <el-button size="mini"
                   class="overview-button"
                   @click="$router.push({path: '/home/user'})">管理控制台</el-button>
        <img src="static/images/overview/loginuser.png"
             alt="user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ $store.state.USER.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="not-log-in"
           v-else>
        <a @click="$emit('showLogin')">登录</a>
      </div>
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
    logout() {
      /* this.$http.get('/api/logout').then(res => {
        window.localStorage.clear()
        this.$router.push({ path: '/' })
        window.location.reload()
      }) */
      window.localStorage.clear()
      location.href = location.origin + '/api/logout'
    }
  }
}
</script>
