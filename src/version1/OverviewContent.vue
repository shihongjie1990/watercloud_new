<template>
  <div class="no-left">
    <div class="header">
      <page-header></page-header>
    </div>
    <div>
      <router-view v-if="!$store.state.VALID_USER_FLAG" />
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
import header from './Header'
import completePerson from './components/Manager/appManager/completeUserInfo'

export default {
  name: 'overviewContent',
  components: {
    'page-header': header,
    'complete-person': completePerson
  },
  data() {
    return {
      personVisible: false,
      url: ''
    }
  },
  watch: {
    '$store.state.VALID_USER_FLAG'(curValue, oldValue) {
      this.personVisible = curValue
      this.url = this.$store.state.THIS_URL
      console.log('本次访问接口：', this.url)
      console.log('完善信息弹出框：', curValue)
    }
  },
  mounted() {
    this.$http.get('/api/user/me').then(res => {
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
    })
  }
}
</script>
