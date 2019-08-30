<template>
  <div class="chart-flower">
    <div class="chart-content">
      <div id="one-chart"
           name="shuiliyun">
      </div>
      <div>
        <!-- 圈圈 -->
        <!-- <div class="bazhu hechangzhi"></div>
        <div class=" bazhu shuiziyuan"></div>
        <div class=" bazhu guangaigongcheng"></div>
        <div class=" bazhu guihuajihua"></div>
        <div class=" bazhu dangzheng"></div>
        <div class=" bazhu nongcunshuidian"></div>
        <div class=" bazhu jijian"></div>
        <div class=" bazhu renshi"></div>
        <div class=" bazhu yanshui"></div>
        <div class=" bazhu yunxingguanli"></div>
        <div class=" bazhu yinshuianquan"></div>
        <div class=" bazhu anquanjiandu"></div>
        <div class=" bazhu shuitubaochi"></div>
        <div class=" bazhu zecefagui"></div>
        <div class=" bazhu zhihuishuiku"></div>
        <div class=" bazhu zhihuifaxun"></div>
        <div class=" bazhulogo"></div> -->
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
    buildFlowerData() {
      let bigNode = ['智慧防汛', '水资源', '河长制', '智慧水库', '水土保持', '饮水安全']
      let middleNode = ['运行管理', '农村水电', '规划计划', '政策法规', '安全监督', '灌溉工程']
      // let smallNode = ['人事', '纪检', '党政', '烟水']
      let nodes = ['运行管理', '人事', '智慧防汛', '纪检', '农村水电', '水资源', '党政', '河长制', '规划计划', '智慧水库', '政策法规', '水土保持', '安全监督', '灌溉工程', '饮水安全', '烟水']
      let angle = {}
      for (let i = 0; i < nodes.length; i++) {
        angle[nodes[i]] = (360 / nodes.length * i)
      }
      let data = []
      let lineData = []
      nodes.map(item => {
        let value = 1
        let symbolSize = 50
        if (bigNode.indexOf(item) > -1) {
          value = 2
          symbolSize = 82
        } else if (middleNode.indexOf(item) > -1) {
          value = 1.5
          symbolSize = 66
        }
        data.push({
          name: item,
          value: [value, angle[item]],
          symbolSize: symbolSize,
          symbol: 'image:// static/images/overview/flower.png'
        })
        lineData.push([
          { coord: [value, angle[item]] },
          { coord: [0, 0] }
        ])
      })
      data.push({
        name: '水利云',
        value: [0, 0],
        symbolSize: 100,
        symbol: 'image:// static/images/overview/shuiliyun.png',
        label: {
          normal: {
            show: false
          }
        }
      })
      return {
        data: data,
        lineData: lineData
      }
    },
    initRunFlowerChart(data) {
      let option = {
        polar: {
          radius: '95%'
        },
        radiusAxis: {
          show: false
        },
        angleAxis: {
          type: 'value',
          show: false,
          clockwise: false
          // scale: true,
          // symbolSize: [200, 200],
          // symbolOffset: [20, 20]
          // boundaryGap: ['80%', '80%']
          // startAngle: 0
        },
        grid: {
          top: '10px'
        },
        series: [{
          type: 'graph',
          hoverAnimation: false,
          coordinateSystem: 'polar',
          label: {
            normal: {
              show: true,
              position: 'inside',
              fontSize: 12,
              color: '#666'
            },
            emphasis: {
              // fontSize: 16
            }
          },
          data: data.data,
          silent: false,
          zlevel: 2
        },
        {
          type: 'lines',
          coordinateSystem: 'polar',
          lineStyle: {
            color: '#f2f2f2',
            width: 1,
            opacity: 0.9,
            curveness: 0.15
          },
          effect: {
            show: true,
            symbol: 'circle',
            symbolSize: [3, 8],
            color: '#49afff',
            trailLength: 0.3,
            label: {
              show: false
            }
          },
          data: data.lineData,
          label: {
            show: false
          },
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          zlevel: 1
        }
        ]
      }
      var myChart1 = this.$echarts.init(document.getElementById('one-chart'))
      // myChart.setOption(centerOption)
      myChart1.on('click', (param) => {
      })
      myChart1.setOption(option, true)
    },
    initFlowerChart() {
      var centerOption = {
        // backgroundColor: '#1a3847',
        tooltip: {
          show: false
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 60,
            roam: false, // 禁止用鼠标滚轮缩小放大效果
            edgeSymbol: ['circle', 'circle'],
            edgeSymbolSize: 1,
            // 连接线上的文字
            edgeLabel: {
              normal: {
                show: false,
                textStyle: {
                  fontSize: 20
                }
              }
            },
            lineStyle: {
              normal: {
                type: 'dotted',
                opacity: 1,
                width: 2,
                curveness: 0.1
              }
            },
            // 圆圈内的文字
            label: {
              normal: {
                show: true,
                color: '#666'
              }
            },
            data: [
              {
                name: '水利云',
                x: 530,
                y: 240,
                symbolSize: 120,
                symbol: 'image:// static/images/overview/shuiliyun.png',
                itemStyle: {
                  normal: {}
                },
                label: {
                  normal: {
                    show: false
                  }
                }
              },
              {
                name: '水资源',
                x: 496,
                y: 140,
                symbolSize: 80,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '农村水电',
                x: 530,
                y: 180,
                symbolSize: 70,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '智慧防汛',
                x: 668,
                y: 160,
                symbolSize: 80,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '河长制',
                x: 400,
                y: 170,
                symbolSize: 80,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '智慧水库',
                x: 400,
                y: 285,
                symbolSize: 80,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '水土保持',
                x: 450,
                y: 350,
                symbolSize: 80,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '饮水安全',
                x: 650,
                y: 350,
                symbolSize: 80,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '党政',
                x: 450,
                y: 170,
                symbolSize: 60,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '纪检',
                x: 590,
                y: 160,
                symbolSize: 60,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '人事',
                x: 620,
                y: 210,
                symbolSize: 60,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '规划计划',
                x: 420,
                y: 240,
                symbolSize: 70,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '政策法规',
                x: 470,
                y: 295,
                symbolSize: 70,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '安全监督',
                x: 535,
                y: 340,
                symbolSize: 70,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '灌溉工程',
                x: 580,
                y: 310,
                symbolSize: 70,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '烟水',
                x: 620,
                y: 270,
                symbolSize: 60,
                itemStyle: {
                  normal: {}
                }
              },
              {
                name: '运行管理',
                x: 670,
                y: 250,
                symbolSize: 70,
                itemStyle: {
                  normal: {}
                }
              }
            ],
            links: [
              {
                source: '水利云',
                target: '农村水电'
              },
              {
                source: '水利云',
                target: '智慧防汛',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#18bdff',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              },
              {
                source: '水利云',
                target: '河长制',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#18bdff',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              },
              {
                source: '水利云',
                target: '建管',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#18bdff',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              },
              {
                source: '水利云',
                target: '运行管理'
              },
              {
                source: '水利云',
                target: '水土保持',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#18bdff',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              },
              {
                source: '水利云',
                target: '饮水安全',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#18bdff',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              },
              {
                source: '水利云',
                target: '党政'
              },
              {
                source: '水利云',
                target: '纪检'
              },
              {
                source: '水利云',
                target: '人事'
              },
              {
                source: '水利云',
                target: '规划计划'
              },
              {
                source: '水利云',
                target: '政策法规'
              },
              {
                source: '水利云',
                target: '安全监督'
              },
              {
                source: '水利云',
                target: '灌溉工程'
              },
              {
                source: '水利云',
                target: '烟水'
              },
              {
                source: '水利云',
                target: '智慧水库',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#18bdff',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              },
              {
                source: '水利云',
                target: '水资源',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#18bdff',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              }
            ]
          }
        ]
      }
      let allName = [
        '水资源',
        '农村水电',
        '智慧防汛',
        '河长制',
        '智慧水库',
        '水土保持',
        '饮水安全',
        '党政',
        '纪检',
        '人事',
        '规划计划',
        '政策法规',
        '安全监督',
        '灌溉工程',
        '烟水',
        '运行管理'
      ]
      console.log(allName)
      let styleJson = {
        borderColor: [
          {
            code: '#fff',
            name: ['水利云']
          },
          {
            code: '#fff',
            name: [
              '水资源',
              '智慧防汛',
              '河长制',
              '智慧水库',
              '水土保持',
              '饮水安全'
            ]
          },
          {
            code: '#86d3f1',
            name: [
              '农村水电',
              '党政',
              '纪检',
              '人事',
              '规划计划',
              '政策法规',
              '安全监督',
              '灌溉工程',
              '烟水',
              '运行管理'
            ]
          }
        ],
        shadowColor: [
          {
            code: 'rgba(128, 128, 128, 0.5)',
            name: ['水利云']
          },
          {
            code: '#86d3f1',
            name: [
              '水资源',
              '智慧防汛',
              '河长制',
              '智慧水库',
              '水土保持',
              '饮水安全'
            ]
          }
        ],
        shadowBlur: [
          {
            code: 10,
            name: ['水利云']
          },
          {
            code: 20,
            name: [
              '水资源',
              '智慧防汛',
              '河长制',
              '智慧水库',
              '水土保持',
              '饮水安全'
            ]
          }
        ],
        color: [
          {
            code: '#fff',
            name: ['水利云']
          }
        ],
        borderWidth: [
          {
            code: 1,
            name: ['水利云']
          }
        ]
      }
      var chartData = centerOption.series[0].data
      chartData.map(item => {
        item.itemStyle.normal.color = 'rgba(128, 128, 128, 0)'
        item.itemStyle.normal.borderWidth = 2
      })
      Object.keys(styleJson).map(key => {
        var keyStyle = styleJson[key]
        keyStyle.map(codeItem => {
          chartData.map(item => {
            if (codeItem.name.indexOf(item.name) > -1) {
              item.itemStyle.normal[key] = codeItem.code
              return item
            }
          })
        })
      })

      // var myChart = echarts.init(document.getElementById('center-chart'))
      var myChart1 = this.$echarts.init(document.getElementById('one-chart'))
      // myChart.setOption(centerOption)
      myChart1.setOption(centerOption, true)
    }
  },
  mounted() {
    // this.initFlowerChart()
    this.initRunFlowerChart(this.buildFlowerData())
  }
}
</script>
