<template>
  <div class="resource-panel">
    <!-- <div class="resource-chart">
      <div ref="resource"></div>
    </div> -->
    <div class="resource-detail">
      <div>
        <div><span>1.34</span>/40.00</div>
        <div class="detail-name">CPU core</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    initChart() {
      let data = { name: '装备制造', value: 54 }
      let option = {
        series: {
          name: data.name,
          type: 'pie',
          radius: [25, 35],
          itemStyle: {
            normal: {
              color: '#389af4',
              shadowColor: '#389af4',
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
                show: true,
                position: 'center',
                formatter: function(params) {
                  return params.value + '%'
                },
                textStyle: {
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#389af4'
                }
              }
            }
          }, {
            value: 100 - data.value,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: '#dfeaff'
              },
              emphasis: {
                color: '#dfeaff'
              }
            }
          }]
        }
      }
      let myChart = this.$echarts.init(this.$refs.resource)
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>

<style lang="scss" scoped>
.resource-panel {
  width: 2.5rem;
  height: 1.2rem;
  display: flex;
  box-shadow: 0px -3px 30px 3px #0d75a7 inset;
  .resource-detail {
    /* width: 100%;
      height: 100%; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        font-size: 0.24rem;
    }
    .detail-name {
        font-size: 0.14rem;
        color: #f5ba0d;
        margin-top: 0.1rem;
    }
  }
}
</style>
