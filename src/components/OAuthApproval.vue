<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$http({
      url: '/api/oauth/authorize',
      method: 'post',
      data: {
        user_oauth_approval: true
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        // Authorization: 'Basic ' + key
      },
      transformRequest: [
        data => {
          let ret = ''
          for (let it in data) {
            ret +=
              encodeURIComponent(it) +
              '=' +
              encodeURIComponent(data[it]) +
              '&'
          }
          return ret
        }
      ]
    }).then(res => {
      console.log('登陆')
    })
  }
}
</script>
