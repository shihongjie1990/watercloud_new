<template>
  <div>
    <div class="node-statics">
      <p class="title">节点在线状态</p>
      <div id="node_chart"></div>
      <div class="info-detail">
        <div>
          <p>在线节点：<span>{{ nodesStatus.healthyNodes }}</span></p>
          <p>全部节点：<span>{{ nodesStatus.totalNodes }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nodesStatus: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  watch: {
    nodesStatus: {
      handler(curData, oldData) {
        this.initChart(curData)
      },
      deep: true
    }
  },
  methods: {
    initChart(nodesData) {
      // 重组图形数据
      let value = nodesData.totalNodes !== 0 ? parseFloat((nodesData.healthyNodes / nodesData.totalNodes * 100).toFixed(1)) : 0
      let data = { name: '节点在线状态', value: value }
      // 设置饼图图形属性
      let option = {
        series: {
          name: data.name,
          type: 'pie',
          radius: [65, 85],
          startAngle: 180,
          itemStyle: {
            normal: {
              color: '#4a9ce9',
              shadowColor: '#4a9ce9',
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: data.value,
            label: {
              normal: {
                formatter: function(params) {
                  // return params.value + '/100'
                  return nodesData.totalNodes !== 0 ? `${nodesData.healthyNodes} / ${nodesData.totalNodes}` : 0
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: '#4a9ce9'
                }
              }
            }
          }, {
            value: 100 - data.value,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: '#09475a'
              },
              emphasis: {
                color: '#09475a'
              }
            }
          }]
        }
      }
      let myChart = this.$echarts.init(document.getElementById('node_chart'))
      myChart.setOption(option, true)
    }
  },
  mounted() {
    this.initChart(this.nodesStatus)
  }
}
</script>

<style lang="scss" scoped>
.node-statics {
  // display: flex;
  position: relative;
  width: 2.8rem;
  height: 2rem;
  p.title {
    font-size: 0.14rem;
    margin: 0.06rem;
    position: absolute;
    top: 0;
    left: 0;
  }
  #node_chart {
    width: 100%;
    height: 100%;
  }
  .info-detail {
    position: absolute;
    bottom: 0;
    right: 0.2rem;
    /* width: 45%;
    align-items: center;
    display: flex; */
  }
}
</style>
