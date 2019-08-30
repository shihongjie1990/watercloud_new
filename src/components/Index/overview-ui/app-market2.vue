<template>
  <div class="app-area">
    <div class="overview-title">
      <div class="title">海纳百川，水利系统的应用魔方</div>
      <p class="sub-title">应用商店，汇聚了水利各行业的应用</p>
    </div>
    <app-part :apps="apps"
              @showAppDetail="showAppDetail"></app-part>
    <div class="block-bg">
      <img src="static/images/ui/hnbcbg.png"
           alt="背景图">
    </div>
    <!-- 弹出应用详情 -->
    <transition name="el-zoom-in-top">
    <div class="show-app-detail"
         :class="{active: detailFlag}">
      <!-- @click="detailFlag = false" -->
      <el-carousel trigger="click"
                   arrow="always"
                   :autoplay="false"
                   height="100%"
                   v-if="detailFlag">
        <i class="close-operation"
           @click="closeDialog">×</i>
        <el-carousel-item v-for="item in appsData"
                          :key="item.clientId">
          <app-detail :appData="item"
                      class="detail-item"></app-detail>
        </el-carousel-item>
      </el-carousel>
    </div>
    </transition>
  </div>
</template>

<script>
import AppPart from './app-3d'
import AppDetail from './app-detail.vue'

export default {
  props: {
    apps: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    AppPart,
    AppDetail
  },
  data() {
    return {
      detailFlag: false,
      appsData: []
    }
  },
  methods: {
    hrefTo(itemData) {
      let dataStr = encodeURIComponent(this.base64.encode(JSON.stringify(itemData)))
      window.open('#/appdetail?app=' + dataStr)
    },
    showAppDetail(appData) {
      let apps = JSON.parse(JSON.stringify(this.apps))
      let index = -1
      apps.find((item, i) => {
        index = i
        return item.clientId === appData.clientId
      })
      let startArr = apps.splice(index, apps.length - index)
      let sortArr = startArr.concat(apps)
      this.appsData = sortArr
      this.$nextTick(() => {
        this.detailFlag = true
        // this.$set(this.appsData, sortArr)
      })
    },
    closeDialog() {
      this.detailFlag = false
    }
  },
  mounted() {
    /* let apps = this.apps
    let iframe = document.getElementById('app_market').contentWindow
    setTimeout(function() {
      iframe.postMessage({ apps: apps }, location.origin)
    }, 800) */
  }
}
</script>

<style lang="scss" scoped>
.app-area {
  height: 6.8rem; // 680px;
  position: relative;
  iframe {
    width: 100%;
    height: 5.85rem;
    position: relative;
    z-index: 1;
  }
}
.show-app-detail {
  position: fixed;
  width: 100%;
  // height: 100%;
  height: 0;
  top: 0;
  left: 0;
  z-index: 999;
  // background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: height 0.3s ease;
  .close-operation {
    position: absolute;
    top: 0;
    font-size: 0.16rem;
    color: #fff;
    font-style: normal;
    right: 0;
    z-index: 3;
    &:hover {
      cursor: pointer;
    }
  }
  & > div {
    width: 80%;
    height: 0;
    background: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    transition: all 0.5s ease;
  }
  &.active {
    height: 100%;
    & > div {
      height: 80%;
      padding: 0.3rem;
    }
  }
}
</style>

<style>
.show-app-detail .el-carousel > ul.el-carousel__indicators {
  display: none;
}
</style>
