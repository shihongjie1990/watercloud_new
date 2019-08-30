<template>
  <div class="system-detail">
    <div class="system-icon">
      <img :src="`static/images/overview/system/${system.icon}`"
           alt="图片">
    </div>
    <div class="system-desc">
      <p>{{ system.name }}</p>
      <div class="desc-item">
        <div>运行时间：{{ system.runTime }}</div>
        <div>服务组件数：{{ system.serveNum }}</div>
        <div :title="system.server">服务组件：{{ system.server }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    system: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.system-detail {
  display: flex;
  align-items: center;
  width: 3rem;
  padding: 0.1rem 0;
  border: 1px solid #fff;
  color: #fff;
  .system-icon {
    margin: 0 0.1rem;
  }
  .system-desc {
    margin: 0 0.1rem;
    p {
      font-size: 0.2rem;
      color: #1dc3e2;
    }
    div > div {
      margin: 0.06rem 0;
    }
    div > div:last-child {
      height: 0.6rem;
      overflow: hidden;
      line-height: 0.15rem;
    }
  }
}
</style>
