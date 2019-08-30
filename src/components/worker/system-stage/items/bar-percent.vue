<template>
  <div class="bar-chart">
    <div class="bar-percent">
      <div v-for="item in 50"
           :key="item">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="percent-color"
         :style="`height: ${colorHeight}px`"></div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
      validator: function(value) {
        return value <= 100 && value >= 0
      }
    }
  },
  data() {
    return {
      /* colorHeight: {
        height: 0
      } */
      colorHeight: 0
    }
  },
  watch: {
    percent(curValue, oldValue) {
      this.setColorHeight(curValue)
    }
  },
  methods: {
    setColorHeight(value) {
      let barHeight = document.getElementsByClassName('bar-percent')[0].offsetHeight
      this.colorHeight = barHeight * value / 100
    }
  },
  mounted() {
    this.setColorHeight(this.percent)
  }
}
</script>

<style lang="scss" scoped>
.bar-chart {
  position: relative;
  .bar-percent {
    border: 3px solid #fff;
    box-sizing: border-box;
    width: 1rem;
    & > div {
      display: flex;
      div {
        height: 0.06rem;
        width: 50%;
        border-bottom: 1px solid #fff;
        box-sizing: border-box;
      }
      & > div:first-child {
        border-right: 1px solid #fff;
      }
    }
  }
  .percent-color {
    height: 2rem;
    width: 1rem;
    position: absolute;
    bottom: 0;
    z-index: -1;
    transition: all 0.3s ease;
    background: -webkit-linear-gradient(
      bottom,
      rgb(20, 53, 81) 0px,
      rgb(60, 184, 220) 100%
    );
    /* background: -o-linear-gradient(
      bottom,
      rgb(20, 53, 81) 0px,
      rgb(60, 184, 220) 100%
    );
    background: -moz-linear-gradient(
      bottom,
      rgb(20, 53, 81) 0px,
      rgb(60, 184, 220) 100%
    );
    background: linear-gradient(
      bottom,
      rgb(20, 53, 81) 0px,
      rgb(60, 184, 220) 100%
    ); */
  }
}
</style>
