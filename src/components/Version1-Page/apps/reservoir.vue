<template>
  <div>
    <div class="item-index">
      <div>
        <div class="desc-content">
          <div class="desc-area">
            <div class="text-desc">
              <div class="title">
                {{ bannerData.clientName }}
              </div>
              <div class="text-content">
                {{ bannerData.clientDesc }}
              </div>
            </div>
            <!-- <div class="operation-desc">
              <a @click.prevent="skipTo(bannerData.url)"
                 v-if="buttonFlag">立即进入</a>
              <span v-else>申请进入</span>
            </div> -->
          </div>
        </div>
        <div class="img-area">
          <img :src="bannerData.icon | getImg"
               alt="">
          <div></div>
        </div>
      </div>
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

<style>
/* .app-desc {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.app-desc > .desc-area {
  position: absolute;
  top: 180px;
  right: 150px;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.desc-area > .text-desc {
  padding: 20px;
  width: 300px;
}

.desc-area > .text-desc > .title {
  font-size: 22px;
  color: #fff;
  text-align: center;
}

.desc-area > .text-desc > .text-content {
  height: 300px;
  color: #e2e2e2;
  padding: 14px 0;
}

.operation-desc {
  display: flex;
  justify-content: center;
}

.operation-desc > a {
  background: #00c1de;
  padding: 6px 40px;
  color: #fff;
  font-size: 16px;
  margin: 20px;
}

.desc-area > .bg-img {
  width: 200px;
  height: 200px;
  position: absolute;
  top: -50px;
  right: -50px;
  opacity: 0.4;
} */

.item-index {
  background: #000;
  float: none !important;
}

.item-index > div {
  width: 1200px;
  height: 480px;
  margin: auto;
  float: none !important;
  position: relative;
}

.desc-content {
  position: absolute;
  top: 50%;
  width: 40%;
  transform: translateY(-30%);
}

.img-area {
  position: absolute;
  right: 20px;
  top: 60%;
  transform: translateY(-50%);
}

.item-index .bg-banner {
  width: 100vw;
  height: 400px;
  background: #000;
  position: relative;
}

.item-index .img-area {
  /* position: absolute;
  right: 180px;
  bottom: 30px; */
  width: 150px;
  height: 170px;
  display: flex;
  flex-wrap: wrap;
}

.item-index .img-area > img {
  width: 110px;
  height: 130px !important;
  height: auto;
  filter: grayscale(70%);
}

.item-index .img-area > div {
  width: 111px;
  height: 8px;
  border-radius: 90%;
  background: #fff;
  box-shadow: 6px -5px 90px 50px #fff;
  filter: blur(0px);
}

.item-index .desc-content > .desc-area {
  /* position: absolute;
  left: 300px;
  top: 120px; */
}

.item-index .desc-area > .text-desc {
  overflow: hidden;
}

.item-index .desc-area > .text-desc > .title {
  font-size: 36px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-index .desc-area > .text-desc > .text-content {
  height: 120px;
  color: #e2e2e2;
  margin: 16px 0;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  /* text-indent: 24px; */
}

.item-index .operation-desc > a {
  background: #00c1de;
  padding: 10px 40px;
  font-size: 16px;
  display: inline-block;
  color: #fff;
}

.item-index .operation-desc > span {
  background: #ececec;
  padding: 10px 40px;
  font-size: 16px;
  display: inline-block;
  color: #000;
}

.item-index .operation-desc > a:hover {
  cursor: pointer;
  text-decoration: none;
}

.app-content {
  width: 100%;
  float: none !important;
}

.app-content .el-carousel {
  width: 1200px;
  margin: 30px auto;
  /* height: 500px; */
}
</style>

<script>
export default {
  filters: {
    getImg: value => {
      return `/api/files/${value}`
    }
  },
  data() {
    return {
      pageData: [
        { name: '管理端首页', url: 'static/images/apps/49cf7fd9644f4cb2b841430b3d167a3c/1.png' },
        { name: '业主首页', url: 'static/images/apps/49cf7fd9644f4cb2b841430b3d167a3c/2.png' },
        { name: '水库详情', url: 'static/images/apps/49cf7fd9644f4cb2b841430b3d167a3c/3.png' }
      ],
      bannerData: {},
      buttonFlag: false
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
    skipTo(url) {
      window.location.href = url
    }
  },
  mounted() {
    /*  let bannerData = this.$route.params || {}
     this.bannerData = bannerData */
    let dataStr = this.$route.query.app
    let data = JSON.parse(this.base64.decode(decodeURIComponent(dataStr)))
    this.bannerData = data
    if (data && Object.keys(data).length > 0) {
      this.getUrl(data.clientId)
    }
    let pageData = []
    for (let i = 0; i < 3; i++) {
      pageData.push({
        name: data.clientName,
        url: `static/images/apps/${data.clientId}/${i + 1}.png`
      })
    }
    this.pageData = pageData
  }
}
</script>
