<template>
  <div class="project-detail">
    <div class="app-detail">
      <div class="app-title">{{ appData.clientName }}</div>
      <div class="detail-content">{{ appData.clientDesc }}</div>
      <el-button type="primary"
                 @click="applicatePromission">申请权限</el-button>
    </div>
    <div class="app-content">
      <el-carousel type="card"
                   height="500px">
        <el-carousel-item v-for="(item, index) in pageData"
                          :key="index">
          <img :src="item.url"
               :alt="item.name"
               style="width:100%">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    pageData() {
      let appData = this.appData
      let pageData = []
      if (Object.keys(appData).length > 0) {
        for (let i = 0; i < 3; i++) {
          pageData.push({
            name: appData.clientName,
            url: `static/images/apps/${appData.clientId}/${i + 1}.png`
          })
        }
      } else {
        pageData = this.imgData
      }
      return pageData
    }
  },
  data() {
    return {
      imgData: [{
        url: 'static/images/login.jpg',
        name: 'test1'
      }, {
        url: 'static/images/Starry.jpg',
        name: 'test2'
      }, {
        url: 'static/images/timg8.jpg',
        name: 'test3'
      }]
    }
  },
  methods: {
    getUrl(id) {
      this.$http.post('/api/client/checkAvailable?id=' + id).then(res => {
        if (res.code === 1002) {
          let data = res.data
          if (data) {
            this.buttonFlag = true
          }
          this.bannerData.url = data
        }
      })
    },
    applicatePromission() {
      let app = this.appData
      this.$http.get(`/api/client/getApp/${app.clientId}`).then(res => {
        if (res === 1002) {
          this.$message.success('申请已提交，请耐心等管理员审批！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content {
  width: 100%;
  float: none !important;
}

.app-content .el-carousel {
  width: 1200px;
  padding: 30px 0;
  margin: auto;
  /* height: 500px; */
}
.project-detail {
  .app-detail {
    text-align: center;
    color: #fff;
    .app-title {
      font-size: 32px;
      padding: 0.2rem 0;
    }
    .detail-content {
      width: 1200px;
      margin: auto;
      height: 1.1rem;
      overflow: hidden;
    }
  }
}
</style>
