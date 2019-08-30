<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      pageData: {},
      ajaxUrl: { url: '/resource/shared', type: 'protected' }
    }
  },
  methods: {
    getPermissionStaticDataMenu(nodeId) {
      this.$http.get('/api/resource/shared', { params: { nodeId: nodeId } }).then(res => {
      })
    }
  },
  mounted() {
    this.getPermissionStaticDataMenu()
  }
}
</script>
