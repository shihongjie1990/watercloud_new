<template>
  <div>
    <div id="line_chart"
         style="width:3rem;height:3rem;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    initChart() {
      let option = {
        title: {
          text: 'Awesome Chart'
        },
        xAxis: {
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {},
        series: [{
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
        }]
      }
      let myChart = this.$echarts.init(document.getElementById('line_chart'))
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>
