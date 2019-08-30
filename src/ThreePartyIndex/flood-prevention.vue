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
    this.$http.post('/floodApi/free/login', params).then(res => {
      if (res.flag) {
        location.href = `http://gywfc.dfsjcloud.com:8081/free/valid/${res.result.data}`
        // this.$router.push({ path: '/home/user' })
      }
    })
  }
}
</script>
