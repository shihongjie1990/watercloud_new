<template>
  <div class="manager-content">
    <!-- <img src="static/images/logo.png"> -->
    <div class="header">
      <page-header></page-header>
    </div>
    <div class="left-menu">
      <div class="nav-tip">|||</div>
      <left-menu></left-menu>
    </div>
    <div class="mai-area"
         v-loading="pageLoading"
         element-loading-text="加载中，请稍等...">
      <div class="main">
        <keep-alive>
          <router-view v-if="!$store.state.VALID_USER_FLAG || false" />
        </keep-alive>
      </div>
    </div>
    <el-dialog title="请完善个人身份信息"
               :visible.sync="$store.state.VALID_USER_FLAG"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               width="50%">
      <complete-person v-if="$store.state.VALID_USER_FLAG"></complete-person>
    </el-dialog>
  </div>
</template>

<script>
import aside from './Aside'
import header from './Header'
import completePerson from '@/components/Manager/appManager/completeUserInfo'

export default {
  name: 'mainContent',
  components: {
    'left-menu': aside,
    'page-header': header,
    'complete-person': completePerson
  },
  data() {
    return {
      personVisible: false,
      url: '',
      pageLoading: false
    }
  },
  watch: {
    '$store.state.VALID_USER_FLAG'(curValue, oldValue) {
      this.personVisible = curValue
      this.url = this.$store.state.THIS_URL
      console.log('本次访问接口：', this.url)
      console.log('完善信息弹出框：', curValue)
    },
    '$store.state.AXIOS_NUMBER'(curValue, oldValue) {
      this.pageLoading = curValue !== 0
    }
  },
  mounted() {
    /* this.$http.get('/api/user/me').then(res => {
      if (res.code === 9987) {
        this.$store.dispatch('setUserFlag', true)
        this.$store.dispatch('setUserName', '')
        window.localStorage.USER = this.base64.encode('')
      } else {
        this.$store.dispatch('setUserFlag', false)
        this.$store.dispatch('setUserName', res.username)
        window.localStorage.USER = this.base64.encode(res.username)
      }
    }, thisErr => {
      this.$message.error('身份认证失败！')
    }) */
    this.$store.dispatch('isConsole', true)
  }
}
</script>
