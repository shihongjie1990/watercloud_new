<template>
  <div ref="simplePie"
       class="simple-pie"></div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
      validator: function(value) {
        return value >= 0 && value <= 100
      }
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    initChart() {
      let value = this.percent
      let name = this.name
      let option = {
        color: ['#4a9ce9', '#09475a'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          //   left: 'left',
          top: '35%',
          right: '10%',
          data: ['已使用', '未使用'],
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: name,
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['45%', '50%'],
            startAngle: 180,
            data: [
              { value: value, name: '已使用' },
              { value: 100 - value, name: '未使用' }
            ],
            label: {
              fontSize: 16,
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      let myChart = this.$echarts.init(this.$refs.simplePie)
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>

<style lang="scss" scoped>
.simple-pie {
  width: 100%;
  height: 100%;
}
</style>
