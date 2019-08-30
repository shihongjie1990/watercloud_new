<template>
  <div class="user-index">
    <div class="user-bg">
      <video src="static/video/mhbg.mp4"
             width="100%"
             height="600"
             loop
             muted
             autoplay></video>
    </div>
    <div class="user-overview">
      <user-head></user-head>
      <div class="user-content">
        <my-app></my-app>
        <one-map></one-map>
        <data-menu></data-menu>
        <user-notice></user-notice>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'user-head': () => import('../../visitor-index/header'),
    'my-app': () => import('./layout/my-app'),
    'data-menu': () => import('./layout/data-menu'),
    'user-notice': () => import('./layout/notice'),
    'one-map': () => import('./layout/one-map')
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.user-index {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.user-overview {
  height: 7.67rem;
  position: relative;
  .user-content {
    display: flex;
    flex-wrap: wrap;
    width: 12.3rem; // 1230px;
    margin: auto;
    margin-top: 0.1rem; // 10px;
  }
}
.user-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  video {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }
}
</style>

<style lang="scss">
@import '../../../assets/overview-ui/overview-ui.scss';

.title {
  display: flex;
  padding: 0.25rem 0.35rem 0; // 25px 35px 0;
  div:first-child {
    font-size: 0.2rem; // 20px;
    color: #2ac1db;
    width: 50%;
  }
  div:last-child {
    text-align: right;
    width: 50%;
    color: #e7e8e9;
    span:first-child {
      margin-right: 0.09rem; // 9px;
    }
    span:last-child {
      font-size: 0.2rem; // 20px;
      color: #f5ba0d;
      margin: 0 0.06rem; // 0 6px;
      font-weight: 700;
    }
  }
}
</style>
