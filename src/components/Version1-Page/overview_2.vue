<template>
  <div class="overview-page">
    <!-- banner图区域 -->
    <div class="banner-area">
      <div class="banner">
        <video src="static/video/banner.mp4"
               width="100%"
               height="600"
               loop
               muted
               autoplay></video>
      </div>
      <div class="text-desc">
        <p>水利云</p>
        <div>
          <p>水在云端涌 ● 云水泽神州</p>
          <p>Shuizaiyunduanyong, Yunshuizeshenzhou</p>
        </div>
      </div>
      <div class="notice-area">
        <div>
          <div class="desc-icon">
            通知公告
          </div>
          <div class="notice-item">
            集团公司召开党委扩大会学习贯彻全省重要会议、文件精神
          </div>
        </div>
      </div>
    </div>
    <!-- 应用区域 -->
    <App-Market></App-Market>
    <!-- 静态数据目录 -->
    <data-menu></data-menu>
    <!-- 水利一张图 -->
    <One-Map></One-Map>
    <!-- 页脚 -->
    <overview-footer></overview-footer>
  </div>
</template>

<script>
import AppMarket from './overview-ui/app-market'
import DataMenu from './overview-ui/data-menu'
import OneMap from './overview-ui/one-map'
import OverviewFooter from '../overview/footer'

export default {
  components: {
    AppMarket,
    DataMenu,
    OneMap,
    OverviewFooter
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
video {
  object-fit: fill;
  height: 700px;
}
.overview-page {
  background: #fff;
}
.banner-area {
  position: relative;
  .text-desc {
    position: absolute;
    top: 2.24rem; // 224px;
    color: #fff;
    left: 1.6rem; // 160px;
    & > p {
      font-size: 36px;
      margin-bottom: 20px;
      line-height: 50px;
    }
    div > p:first-child {
      font-size: 24px;
    }
    div > p:last-child {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
.notice-area {
  padding: 0;
  background: rgba(40, 130, 127, 0.3);
  position: absolute;
  bottom: 4px;
  width: 100%;
  color: #fff;
  height: 60px;
  line-height: 60px;
  & > div {
    display: flex;
    width: 80%;
    margin: auto;
    .desc-icon {
      font-size: 24px;
      width: 200px;
      text-align: center;
    }
    .notice-item {
      width: calc(100% - 200px); // calc(100% - 200px);
      font-size: 20px;
    }
  }
}
</style>

<style lang="scss">
.overview-title {
  text-align: center;
  padding: 0.6rem 0 0.5rem 0; // 60px 0 50px 0;
  .title {
    font-size: 0.26rem; // 26px;
    color: #333;
    display: block;
  }
  p.sub-title {
    font-size: 0.2rem; // 20px;
    color: #999;
    margin-top: 0.04rem; // 4px;
    margin-bottom: 0;
  }
}
.data-area {
  height: 6.38rem; // 638px;
  background: #e2e2e2;
  & > div > div {
    color: #fff !important;
  }
}

.app-area .block-bg,
.map-area .block-bg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  // text-align: center;
  img {
    width: 100%;
  }
}
</style>
