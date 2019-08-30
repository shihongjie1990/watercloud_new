<template>
  <div>
    <api-detail :itemData="itemData"
                v-if="isApiShow"></api-detail>
    <file-detail :itemData="itemData"
                 v-else></file-detail>
  </div>
</template>

<script>
import apiDetail from './items/api-detail'
import fileDetail from './items/file-detail'

export default {
  components: {
    apiDetail,
    fileDetail
  },
  computed: {
    isApiShow() {
      let isApiShow = false
      let params = this.$route.params || {}
      if (Object.keys(params).indexOf('clientId') > -1) {
        isApiShow = true
      }
      return isApiShow
    },
    itemData() {
      let params = this.$route.params || {}
      return params
    }
  },
  data() {
    return {
      isApiList: true,
      data: {}
      // isApiShow: false,
      // itemData: {}
    }
  },
  mounted() {
    /* let params = this.$route.params
    this.data = params
    if (params.clientId) {
      this.isApiList = true
    } else {
      this.isApiList = false
    } */
  }
}
</script>

<style lang="scss">
.overview-data-detail {
  width: 60%;
  margin: auto !important;
  color: #fff;
  background: rgba(19, 96, 131, 0.3);
  font-size: 16px;
  .top-title {
    font-size: 24px;
    padding: 16px 10px;
    border-bottom: 2px solid #999;
  }
  & > div:nth-child(even) {
    background: rgba(0, 0, 0, 0.2);
  }
  & > div:not(.top-title) {
    display: flex;
    & > span {
      width: 160px;
      margin: 16px 0;
    }
    & > p,
    & > div {
      width: calc(100% - 200px);
      margin: 0;
      margin: 16px 0;
      & > a {
        color: #337ab7;
        margin-left: 16px;
      }
    }
    & > div {
      line-height: 28px;
    }
  }
}
</style>
