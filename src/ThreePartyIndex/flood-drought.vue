<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    let fullPath = this.$route.fullPath
    let paramString = fullPath.substring(fullPath.indexOf('?') + 1)
    let params = JSON.parse(this.base64.decode(decodeURIComponent(paramString)))
    // let params = this.$route.params
    this.$http.post('/preventionApi/free/login', params).then(res => {
      if (res.flag) {
        location.href = `http://58.42.247.176:8089/free/valid/${res.result.data}`
        // this.$router.push({ path: '/home/user' })
      }
    })
  }
  /* mounted() {
    let params = this.$route.params
    this.$http.post(`${params.url}`, params.account).then(res => {
      if (res.flag) {
        window.open(`${params.path}`, '_blank')
        this.$router.push('/home/user')
      }
    })
  } */
}
</script>
