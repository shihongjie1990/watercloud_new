<template>
  <div class="no-left">
    <page-header></page-header>
    <router-view />
  </div>
</template>

<script>
import header from './Header-overview.vue'

export default {
  name: 'overviewContent',
  components: {
    'page-header': header
  },
  data() {
    return {
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
  }
}
</script>
