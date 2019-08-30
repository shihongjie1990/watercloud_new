<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    location.href = 'http://222.85.224.95:6444/ConserDemo/'
    // let fullPath = this.$route.fullPath
    // let paramString = fullPath.substring(fullPath.indexOf('?') + 1)
    // let params = JSON.parse(this.base64.decode(decodeURIComponent(paramString)))
    // params.password = 'E10ADC3949BA59ABBE56E057F20F883E'
    // this.$http.post('/conservationApi/security/authentication', params).then(res => {
    //   if (res.data.valid) {
    //     window.open(`http://222.85.224.98:280/#/free/valid/${res.data.token}`, '_slef')
    //     this.$router.push({ path: '/home/user' })
    //   }
    // })
  }
}
</script>
