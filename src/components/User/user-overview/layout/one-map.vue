<template>
  <div class="one-map">
    <div class="title">
      <div><span @click="$router.push('/home/oneMap')">水利一张图</span></div>
      <div></div>
    </div>
    <!-- <div class="content">
    </div> -->
    <div class="map-all">
      <img src="static/images/ui/one-map.svg"
           alt="地图">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.one-map {
  .title {
    & > div {
      & > span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
