<template>
  <div class="parts-panel">
    <div class="parts-title">
      <div>{{ name }}</div>
      <div><span>{{ currentNum }}</span> / {{ totalNum }}</div>
    </div>
    <div class="parts-content">
      <div class="statics-num"><span>6</span> / 6</div>
      <div class="content-detail">
        coredns, metrics-server, tiller-deploy
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    currentNum: Number,
    totalNum: Number
  },
  data() {
    return {
      value: 6,
      totalValue: 6
    }
  }
}
</script>

<style lang="scss" scoped>
.parts-panel {
  // background: #000;
  box-shadow: #9a9a9a 0 0 3px 0px inset;
  border-radius: 4px;
  margin: 3px 0;
  .parts-title {
    display: flex;
    // width: 1.5rem;
    padding: 0.08rem 0.1rem;
    line-height: 0.18rem;
    & > div:first-child {
      width: 70%;
    }
    & > div:last-child {
      width: 30%;
      text-align: right;
    }
    /* span {
        font-size: 0.16rem;
    } */
  }
  .parts-content {
    display: none;
    .statics-num {
      display: none;
    }
  }
}
.parts-panel.active {
  height: 1rem;
  .parts-title {
    font-size: 0.16rem;
    padding: 0.1rem;
    line-height: normal;
    & > div:last-child {
      display: none;
    }
  }
  .parts-content {
    display: block;
    .statics-num {
      line-height: 0.5rem;
      text-align: right;
      margin-right: 0.16rem;
      span {
        font-size: 0.3rem;
      }
    }
  }
}
</style>
