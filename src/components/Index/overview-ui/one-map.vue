<template>
  <div class="map-area">
    <div class="overview-title">
      <div class="title">信息集显，水利领域的地图导航</div>
      <p class="sub-title">水利一张图，集合了水利信息及地图信息的可视化展现</p>
    </div>
    <div class="content">
      <!-- <img src="static/images/ui/guizhoumap.svg"
           alt="地图"> -->
      <img src="static/images/water-river1.png"
           alt="地图">
      <!-- <div class="region-name">
        <p class="guiyang">贵阳市</p>
        <p class="zunyi">遵义市</p>
        <p class="tongren">铜仁市</p>
        <p class="qiandongnan">黔东南苗族侗族自治州</p>
        <p class="qiannan">黔南布依族苗族自治州</p>
        <p class="qianxinan">黔西南布依族苗族自治州</p>
        <p class="anshun">安顺市</p>
        <p class="bijie">毕节地区</p>
      </div> -->
      <div class="reservoir-position">
        <!-- <i v-for="item in 11"
           :key="item"
           :class="`reservoir${item}`"></i> -->
        <div v-for="item in 11"
             :key="item"
             :class="`reservoir${item}` + ' point-area'">
          <a class="point point-dot"></a>
          <div class="point point-10"></div>
          <div class="point point-70"></div>
        </div>
        <div class="point-area"
             v-for="item in 11"
             :key="`blue${item}`"
             :class="`blue${item}`">
          <a class="point point-dot"></a>
          <!--  <div class="point point-10"></div>
          <div class="point point-70"></div> -->
        </div>
        <div class="point-area green"
             v-for="item in 10"
             :key="`green${item}`"
             :class="`green${item}`">
          <a class="point point-dot"></a>
        </div>
        <div class="point-area green"
             v-for="item in 5"
             :key="`greenBlink${item}`"
             :class="`green${item}-blink`">
          <a class="point point-dot"></a>
          <div class="point point-10"></div>
          <div class="point point-70"></div>
        </div>
        <div class="point-area yellow"
             v-for="item in 10"
             :key="`yellow${item}`"
             :class="`yellow${item}`">
          <a class="point point-dot"></a>
        </div>
        <div class="point-area yellow"
             v-for="item in 5"
             :key="`yellowBlink${item}`"
             :class="`yellow${item}-blink`">
          <a class="point point-dot"></a>
          <div class="point point-10"></div>
          <div class="point point-70"></div>
        </div>
        <div class="point-area splashes"
             v-for="(item, index) in position"
             :key="`splashes${index}`" :style="item">
          <a class="point small point-dot"></a>
        </div>
      </div>
    </div>
    <div class="block-bg">
      <img src="static/images/ui/shuibg.png"
           alt="背景图">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    position() {
      let position = []
      for (let i = 0; i < 30; i++) {
        let left = 1.3 * Math.random() + 1.2
        let top = 1.6 * Math.random() + 1.4
        position.push({
          left: left + 'rem',
          top: top + 'rem'
        })
      }
      return position
    }
  }
}
</script>

<style lang="scss" scoped>
.map-area {
  height: 6.58rem; // 658px;
  position: relative;
  .content {
    width: 7.21rem;
    height: 4.48rem;
    margin: auto;
    position: relative;
    img {
      width: 100%;
    }
  }
  .block-bg {
    width: 4.78rem;
    height: 3.23rem;
  }
  .region-name {
    font-size: 0.16rem;
    & > p {
      position: absolute;
    }
    .guiyang {
      left: 3.26rem;
      top: 1.99rem;
    }
    .zunyi {
      left: 3.65rem;
      top: 0.84rem;
    }
    .tongren {
      left: 5.26rem;
      top: 1.08rem;
    }
    .qiandongnan {
      left: 5.1rem;
      top: 2.4rem;
    }
    .qiannan {
      left: 3.37rem;
      top: 3.07rem;
    }
    .qianxinan {
      left: 1.45rem;
      top: 3.56rem;
    }
    .anshun {
      left: 2.29rem;
      top: 2.99rem;
    }
    .bijie {
      left: 2.15rem;
      top: 1.91rem;
    }
  }
  .reservoir-position {
    & > .point-area {
      position: absolute;
      width: 80px;
      height: 80px;
      visibility: visible;
      // background: url('/static/images/ui/reservoir.png');
      // background: #000;
      // border-radius: 30px;
      .point {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        margin: auto;
        border-radius: 50%;
        background-clip: padding-box;
        background: transparent;
        &.small {
          width: 6px;
          height: 6px;
          border: 0.5px solid rgba(0, 205, 236, 0.37);
        }
      }
      .point-dot {
        z-index: 1;
        background-color: #6ad7e9;
        border: 1px solid rgba(0, 205, 236, 0.37);
      }
      .point-10,
      .point-70 {
        width: 100%;
        height: 100%;
        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 50%;
          border: 2px solid #00cdec;
          opacity: 0;
        }
      }
      .point-10::after {
        animation: ripple 4500ms ease-out 225ms infinite;
      }
      .point-70::after {
        animation: ripple 4500ms ease-out 1575ms infinite;
      }
    }
    .point-area.green {
      .point-dot {
        z-index: 1;
        background-color: #45ff45;
        border: 1px solid rgba(22, 189, 51, 0.4);
      }
      .point-10::after,
      .point-70::after {
        border-color: #31ee31;
      }
    }
    .yellow.point-area {
      .point-dot {
        z-index: 1;
        background-color: #ffeb00;
        border: 1px solid rgba(236, 220, 0, 0.37);
      }
      .point-10::after,
      .point-70::after {
        border-color: #d7da20;
      }
    }
    .reservoir1 {
      left: 3.89rem;
      top: 1.88rem;
    }
    .reservoir2 {
      left: 4.34rem;
      top: 0.99rem;
    }
    .reservoir3 {
      left: 4.7rem;
      top: 0.78rem;
    }
    .reservoir4 {
      left: 5.75rem;
      top: 1.31rem;
    }
    .reservoir5 {
      left: 5.48rem;
      top: 1.81rem;
    }
    .reservoir6 {
      left: 4.55rem;
      top: 2.21rem;
    }
    .reservoir7 {
      left: 4.19rem;
      top: 2.98rem;
    }
    .reservoir8 {
      left: 2.83rem;
      top: 3.37rem;
    }
    .reservoir9 {
      left: 3.13rem;
      top: 2.4rem;
    }
    .reservoir10 {
      left: 2.3rem;
      top: 2.21rem;
    }
    .reservoir11 {
      left: 2.98rem;
      top: 1.38rem;
    }
    .blue1 {
      left: 0.4rem;
      top: 2rem;
    }
    .blue2 {
      left: 3rem;
      top: 0.6rem;
    }
    .blue3 {
      left: 1.2rem;
      top: 1.7rem;
    }
    .blue4 {
      left: 1.2rem;
      top: 3rem;
    }
    .blue5 {
      left: 2.6rem;
      top: 1.6rem;
    }
    .blue6 {
      left: 4rem;
      top: 3rem;
    }
    .blue7 {
      left: 3.1rem;
      top: 1rem;
    }
    .blue8 {
      left: 1.9rem;
      top: 2.2rem;
    }
    .blue9 {
      left: 3.5rem;
      top: 0.6rem;
    }
    .blue10 {
      left: 1.4rem;
      top: 3.8rem;
    }
    .blue11 {
      left: 1.7rem;
      top: 3.3rem;
    }
    .green1 {
      left: 5rem;
      top: 0.3rem;
    }
    .green2 {
      left: 6rem;
      top: 1.1rem;
    }
    .green3 {
      left: 4.3rem;
      top: 0.8rem;
    }
    .green4 {
      left: 4.9rem;
      top: 1.3rem;
    }
    .green5 {
      left: 5.8rem;
      top: 2.1rem;
    }
    .green6 {
      left: 5.9rem;
      top: 0.7rem;
    }
    .green7 {
      left: 5.2rem;
      top: 1.1rem;
    }
    .green8 {
      left: 4.6rem;
      top: 1.8rem;
    }
    .green9 {
      left: 5.3rem;
      top: 1.5rem;
    }
    .green10 {
      left: 4.3rem;
      top: 0.3rem;
    }
    .green1-blink {
      left: 4.5rem;
      top: 1.5rem;
    }
    .green2-blink {
      left: 4rem;
      top: 0.6rem;
    }
    .green3-blink {
      left: 3.6rem;
      top: 1rem;
    }
    .green4-blink {
      left: 5.8rem;
      top: 2.7rem;
    }
    .green5-blink {
      left: 5rem;
      top: 2.7rem;
    }
    .yellow1 {
      left: 0.7rem;
      top: 1.8rem;
    }
    .yellow2 {
      left: 2rem;
      top: 1.5rem;
    }
    .yellow3 {
      left: 1.5rem;
      top: 2.1rem;
    }
    .yellow4 {
      left: 1.3rem;
      top: 2.6rem;
    }
    .yellow5 {
      top: 3rem;
      left: 1.8rem;
    }
    .yellow6 {
      left: 2.5rem;
      top: 2rem;
    }
    .yellow7 {
      left: 2rem;
      top: 2.6rem;
    }
    .yellow8 {
      left: 3.4rem;
      top: 3.2rem;
    }
    .yellow9 {
      left: 3rem;
      top: 2.9rem;
    }
    .yellow10 {
      left: 2.3rem;
      top: 3.5rem;
    }
    .yellow1-blink {
      left: 2.4rem;
      top: 3rem;
    }
    .yellow2-blink {
      left: 3.7rem;
      top: 2.7rem;
    }
    .yellow3-blink {
      left: 1rem;
      top: 2rem;
    }
    .yellow4-blink {
      left: 3.1rem;
      top: 1.9rem;
    }
    .yellow5-blink {
      left: 1.5rem;
      top: 3.2rem;
    }
  }
}

@keyframes ripple {
  0% {
    opacity: 0;
    transform: scale(0.1, 0.1);
  }
  5% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
