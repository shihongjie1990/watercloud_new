<template>
  <div id="app">
    <!-- <el-collapse-transition> -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- </el-collapse-transition> -->
    <transition name="el-fade-in-linear">
      <a class="view-full-pic"
         @click="closeImgShow"
         v-if="$store.state.SHOW_IMG.flag">
        <img :src="$store.state.SHOW_IMG.url"
             alt="">
      </a>
    </transition>
    <user-valid></user-valid>
  </div>
</template>

<script>
import userValid from './Load-Module/user-valid'

export default {
  name: 'App',
  components: {
    userValid
  },
  /* watch: {
    '$store.state.LOGIN_CODE'(curValue, oldValue) {
      if (curValue === 1006) {
        this.$alert('登录超时，请重新登录！', '提示', {
          confirmButtonText: '确定',
          type: 'info',
          callback: action => {
            if (action === 'confirm') {
              this.$router.push({
                path: '/'
              })
            } else {
              this.$store.dispatch('setLoginCode', 0)
            }
          }
        })
      }
    }
  }, */
  watch: {
    '$store.state.IS_LOGIN'(curValue, oldValue) {
      if (curValue) {
        // 获取用户信息
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
        }, thisErr => {
          this.$message.error('身份认证失败！')
        })
      } else {
        window.localStorage.clear()
        this.$router.push('/')
      }
    }
  },
  methods: {
    closeImgShow() {
      this.$store.dispatch('setShowImg', { flag: false, url: '' })
    },
    pageResize() {
      // 按照ui设计1366px宽度等比缩放，根节点字体大小为100px
      let fontSize = (document.documentElement.offsetWidth * 100) / 1366
      // 按照UI设计得高度76等比缩放7
      // let fontSize = (document.documentElement.clientHeight * 100) / 767
      document.documentElement.style.fontSize = fontSize + 'px'
    }
  },
  created() {
    // 按照ui设计1366px宽度等比缩放，根节点字体大小为100px
    // let fontSize = (document.documentElement.offsetWidth * 100) / 1366;
    let _this = this
    _this.pageResize()
    window.onresize = function() {
      _this.pageResize()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  font-size: 14px;
  font-family: 'Microsoft YaHei';
}
#app > div {
  height: 100vh;
  overflow-y: auto;
}
</style>

<style lang="scss">
@import './assets/theme.scss';
</style>
