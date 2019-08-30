<template>
  <div>
    <div class="headr-bg"></div>
    <div class="public-content">
      <api-detail :itemData="pageData"></api-detail>
    </div>
  </div>
</template>

<style>
.headr-bg {
  height: 80px;
  background: #000;
}

.public-content {
  width: 1200px;
  margin: auto;
  background: #fff;
}

.public-content > div {
  margin: 0;
  padding: 20px;
}
</style>

<script>
import apiDetail from '../Manager/apiManager/apiDetails'

export default {
  components: {
    apiDetail
  },
  data() {
    return {
      pageData: ''
    }
  },
  mounted() {
    let pageData = this.$route.params || {}
    this.pageData = pageData
  }
}
</script>
