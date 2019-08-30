<template>
  <div>
    <iframe src=""
            frameborder="0"
            width="100vw"
            height="100vh"
            id="testIFrame"></iframe>
  </div>
</template>

<script>
export default {
  mounted() {
    /* let data = this.$route.params
    let username = data.username
    let password = data.password */
    /* let username = 'gzsfb3'
    let password = 'gzsfb333'
    this.$http.post('/reservoirApi/login', { username: username, password: password }).then(res => {
      console.log(res)
      document.getElementById('testIFrame').setAttribute('src', 'http://gzres.dfsjcloud.com:8081')
    }) */
    let fullPath = this.$route.fullPath
    let paramString = fullPath.substring(fullPath.indexOf('?') + 1)
    let params = JSON.parse(this.base64.decode(decodeURIComponent(paramString)))
    this.$http.post('/reservoirApi/free/login', params).then(res => {
      if (res.flag) {
        location.href = `http://gzres.dfsjcloud.com:8081/free/valid/${res.result.data}`
        // this.$router.push({ path: '/home/user' })
      }
    })
  }
}
</script>

<style>
#testIFrame {
  width: 100vw;
  height: 100vh;
}
</style>
