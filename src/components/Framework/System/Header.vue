<template>
  <div>
    <div class="logo-block"
         @click="$router.push({name: 'overviewIndex', params: {isLogin: false}})">
      <img src="static/images/logo.png"
           alt="">
      <span>贵州·水利云</span>
    </div>
    <div class="user-operation">
      <!-- <el-button size="mini"
                 class="overview-button"
                 @click="$router.push({path: '/home'})"
                 v-if="$store.state.IS_CONSOLE">管理控制台</el-button>
      <el-button size="mini"
                 class="overview-button"
                 @click="$router.push({path: '/users'})"
                 v-else>系统控制台</el-button> -->
      <i class="iconfont icon-yonghu"></i>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ $store.state.USER.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-tooltip class="item"
                    effect="dark"
                    content="管理控制台"
                    placement="bottom">
          <!-- 主体功能/业务功能入口（仅对管理人员开放） -->
          <i class="iconfont icon-yewuguanli console-manager-icon"
             @click="$router.push('/home/user')"></i>
        </el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        /* this.$http.get('/api/logout').then(res => {
          this.$router.push({ path: '/' })
          window.localStorage.clear()
          window.location.reload()
        }) */
        window.localStorage.clear()
        location.href = location.origin + '/api/logout'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.console-manager-icon:hover {
  cursor: pointer;
}
</style>
