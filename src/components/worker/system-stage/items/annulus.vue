<template>
  <div>
    <div id='annulus_chart'
         style="width: 3rem;height: 3rem;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    initChart() {
      let data = 400
      let option = {
        /* title: {
          text: '-AQI-',
          top: '40%',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 18
          }
        }, */
        backgroundColor: '#fff',
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['48%', '50%'],
          hoverAnimation: false,
          data: [{
            name: '进度',
            value: data,
            label: {
              show: true,
              position: 'center',
              color: '#000',
              fontSize: 28,
              fontWeight: 'bold',
              formatter: function(o) {
                return data
              }
            },
            itemStyle: {
              normal: {
                color: { //  渐变颜色处理
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#ff6e00' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#ffff00' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }, {
            name: ' ',
            value: 2000,
            itemStyle: {
              normal: {
                color: '#edf1f4'
              }
            }
          }]
        }]
      }
      let myChart = this.$echarts.init(document.getElementById('annulus_chart'))
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>
