<template>
  <div class="stage-measure">
    <!-- <div v-for="node in 2"
         :key="node"> -->
    <div>
      <div class="progress-block">
        <span>CPU占用率：</span>
        <span class="cpu-value">{{ system.cpu | formatFloat }}</span>
        <progress :value="system.cpu"
                  max="100"></progress>
      </div>
      <div class="pie-block">
        <span>{{ system.chart.name }}：</span>
        <div class="node-status">
          <simple-pie v-bind="system.chart"></simple-pie>
        </div>
      </div>
      <div class="node-items">
        <div v-for="item in system.nodes"
             :key="item.name">
          <img :src="`static/images/overview/system/${item.icon}`"
               alt="图标">
          <span>{{ item.name }}</span>
          <span class="item-number">{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import simplePie from '../items/simple-pie'

export default {
  components: {
    simplePie
  },
  props: {
    system: {
      type: Object,
      default: function() {
        return { cpu: 0, nodes: [], chart: {} }
      }
    }
  },
  filters: {
    formatFloat(value) {
      return `${value.toFixed(1)}%`
    }
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.stage-measure {
  width: 4rem;
  display: flex;
  color: #fff;
  padding: 0.1rem 0.4rem 0 0.4rem;
  box-shadow: 0px 0px 20px 1px #607c80;
  border-radius: 10px;
  color: #c8e0eb;
  & > div > div {
    padding: 0.1rem 0;
    border-bottom: 1px solid #999;
  }
  .progress-block {
    .cpu-value {
      color: #f5ba0d;
      font-size: 0.16rem;
      font-weight: bold;
    }
  }
  .pie-block {
    .node-status {
      width: 100%;
      height: 1.5rem;
    }
  }
  .node-items {
    display: flex;
    flex-wrap: wrap;
    border: none;
    padding: 0;
    & > div:nth-child(odd) {
      width: 60%;
    }
    & > div:nth-child(even) {
      width: 40%;
    }
    & > div {
      //   width: 50%;
      //   transform: scale(0.8);
      & > span {
        margin: 0 0.06rem;
      }
      & > span:nth-of-type(1) {
        width: 0.6rem;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: middle;
      }
      & > span:last-child {
        color: #f5ba0d;
        font-size: 0.18rem;
        font-weight: bold;
      }
    }
  }
  progress {
    color: #4a9ce9;
    background: #09475a;
    border-radius: 0.5rem;
    width: calc(100% - 1.8rem);
    margin-left: 0.3rem;
  }
  progress::-webkit-progress-bar {
    background-color: #09475a;
    border-radius: 0.5rem;
  }
  progress::-webkit-progress-value {
    background: #4a9ce9;
    border-radius: 0.5rem;
  }
}
</style>
