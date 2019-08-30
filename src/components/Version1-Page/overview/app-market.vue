<template>
  <div class="app-area">
    <div class="overview-title">
      <div class="title">海纳百川，水利系统的应用魔方</div>
      <p class="sub-title">应用商店，汇聚了水利各行业的应用</p>
    </div>
    <ball-d3></ball-d3>
    <!-- <iframe src="static/html/css3d_periodictable.html"
            frameborder="0"
            style="width: 100%; height: 600px;"></iframe>
    <div class="block-bg">
      <img src="static/images/ui/hnbcbg.png"
           alt="背景图">
    </div> -->
  </div>
</template>

<script>
import BallD3 from './ball-3d'

export default {
  components: {
    BallD3
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-area {
  height: 6.8rem; // 680px;
  position: relative;
}
</style>
