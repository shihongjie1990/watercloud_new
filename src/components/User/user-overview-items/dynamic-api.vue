<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      pageData: []
    }
  },
  methods: {
    getDynamicApi() {
      this.$http.get('/api/api/list').then(res => {
      })
    }
  },
  mounted() {
  }
}
</script>
