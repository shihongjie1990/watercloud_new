<template>
  <div class="data-area">
    <div class="desc-block">
      <div class="overview-title">
        <div class="title">数据共享，水利行业的数据宝典</div>
        <p class="sub-title">水利数据宝典，收集了水利及相关行业的数据和资源</p>
      </div>
      <div class="content">
        <div id="graph"></div>
      </div>
    </div>
    <div class="block-bg">
      <img src="static/images/ui/sjgxbg.png"
           alt="背景图">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apps: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      targetCoord: [50, 10],
      items1: [{
        name: '饮水安全',
        category: 0,
        active: true,
        value: [20, 60],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '农村水电',
        category: 0,
        active: true,
        value: [5, 70],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '河长',
        category: 0,
        value: [10, 80],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '水库管理',
        category: 0,
        value: [25, 90],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '水土保持',
        category: 0,
        value: [12, 100],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '水资源',
        category: 0,
        value: [21, 110],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '防汛抗旱',
        category: 0,
        value: [28, 120],
        image: 'static/images/ui/ysaq.png'
      }],
      items2: [{
        name: '国土',
        category: 1,
        active: true,
        value: [75, 70],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '林业',
        category: 1,
        active: true,
        value: [95, 80],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '环保',
        category: 1,
        value: [85, 90],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '气象',
        category: 1,
        value: [90, 100],
        image: 'static/images/ui/ysaq.png'
      }, {
        name: '农业',
        category: 1,
        value: [80, 110],
        image: 'static/images/ui/ysaq.png'
      }],
      curveness: 0.5
    }
  },
  methods: {
    handlerNode(item) {
      let curveness = this.curveness
      // 处理图形数据函数，添加辅助点
      let handerData = function(nodes, targetCoord, flag) {
        // let endTargetCoord = this.targetCoord
        for (let i = 0, l = nodes.length; i < l; i++) {
          let { x, defaultValue } = ''
          if (flag === 'left') {
            x = targetCoord[0] - (l - i) * 2 / 3
            defaultValue = x - 4
          } else {
            x = targetCoord[0] + (l - i) * 2 / 3
            defaultValue = x + 4
          }
          // nodes[4 * i].label = {position: flag}
          // nodes[4 * i].symbol = `image://${nodes[4 * i].image}`
          let node1 = {
            name: nodes[4 * i].name + 'A' + new Date().getTime(),
            category: 0,
            symbolSize: 0,
            value: [defaultValue, nodes[4 * i].value[1]]
          }
          let node2 = {
            name: nodes[4 * i].name + 'B' + new Date().getTime(),
            category: 0,
            symbolSize: 0,
            value: [x, nodes[4 * i].value[1] - 10]
          }
          let node3 = {
            name: nodes[4 * i].name + 'C' + new Date().getTime(),
            category: 0,
            symbolSize: 0,
            value: [x, 10]
          }
          nodes.splice(4 * i + 1, 0, node1, node2, node3)
        }
        return nodes
      }

      // 处理动态线图数据
      let handlerLinesData = function(items, targetCoord, flag) {
        let [linesData1, linesData2, linesData3] = [[], [], []]
        let colors = ['rgba(10, 164, 152, 0.5)', 'rgba(143, 231, 211, 0.5)', 'rgba(247, 181, 0, 0.5)', 'rgba(185, 234, 133, 0.5)', 'rgba(207, 194, 255, 0.5)', 'rgba(63, 149, 248, 0.5)', 'rgba(185, 234, 133, 0.5)']
        let lineCurveness = flag === 'left' ? curveness : -curveness
        for (let i = 0; i < items.length; i += 4) {
          let el1 = items[i]
          let el2 = items[i + 1]
          let el3 = items[i + 2]
          let el4 = items[i + 3]
          let color = colors[Math.floor(Math.random() * 7)]
          linesData1.push([{
            coord: el1.value,
            lineStyle: {
              color: color
            }
          }, {
            coord: el2.value
          }])
          linesData2.push([{
            coord: el2.value,
            lineStyle: {
              color: color,
              curveness: lineCurveness
            }
          }, {
            coord: el3.value
          }])
          linesData3.push([{
            coord: el3.value,
            lineStyle: {
              color: color
            }
          }, {
            coord: el4.value
          }])
        }
        return { linesData1, linesData2, linesData3 }
      }

      // 处理关系图形数据
      let handlerGraphData = function(items, item, flag) {
        let links = []
        for (let i = 0, l = items.length; i < l; i += 4) {
          let link1 = {
            source: items[i].name,
            target: items[i + 1].name,
            speed: items[i].speed,
            lineStyle: {
            }
          }
          let link2 = {
            source: items[i + 1].name,
            target: items[i + 2].name,
            lineStyle: {
              normal: {
                curveness: flag === 'left' ? curveness : -curveness
              }
            }
          }
          let link3 = {
            source: items[i + 2].name,
            target: items[i + 3].name,
            lineStyle: {
            }
          }
          links.push(link1, link2, link3)
        }
        return links
      }

      // 处理数据
      let items1 = this.items1
      let items2 = this.items2
      let targetCoord = this.targetCoord
      handerData(items1, targetCoord, 'left')
      handerData(items2, targetCoord, 'right')
      //   总数据
      let items = items1.concat(items2)
      // 线数据
      let lineData1 = handlerLinesData(items1, targetCoord, 'left')
      let lineData2 = handlerLinesData(items2, targetCoord, 'right')
      let linesData = []
      for (let key in lineData1) {
        linesData[key] = lineData1[key].concat(lineData2[key])
      }
      // 关系数据
      let link1 = handlerGraphData(items1, item, 'left')
      let link2 = handlerGraphData(items2, item, 'right')
      let links = link1.concat(link2)
      return {
        items,
        linesData,
        links
      }
    },
    initChart() {
      let targetCoord = this.targetCoord
      const echarts = this.$echarts
      const categories = [{
        name: '应用',
        itemStyle: {
          normal: {
            color: 'transparent'
          },
          emphasis: {
            color: 'transparent'
          }
        },
        label: {
          normal: {
            fontSize: '22',
            color: '#fff',
            position: 'left'
          }
        }
      }, {
        name: '行业',
        itemStyle: {
          normal: {
            color: 'transparent'
          },
          emphasis: {
            color: 'transparent'
          }
        },
        label: {
          normal: {
            fontSize: '22',
            color: '#fff',
            position: 'right'
          }
        }
      }]

      const item = {
        name: '水利云',
        value: targetCoord,
        symbol: 'image://static/images/cloud-server-third.png',
        symbolSize: [220, 180],
        label: {
          normal: {
            fontSize: '32',
            position: 'inside',
            color: '#fff',
            fontWeight: 'bold',
            textShadowColor: '#000',
            textShadowBlur: 3,
            textShadowOffsetX: 2
          }
        }
      }

      // 修改的地方
      let handlerData = this.handlerNode(item)
      let items = handlerData.items
      let linesData1 = handlerData.linesData.linesData1
      let linesData2 = handlerData.linesData.linesData2
      let linesData3 = handlerData.linesData.linesData3
      let links = handlerData.links
      const data = items.concat([item])
      let option = {
        legend: [{
          formatter: function(name) {
            return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…')
          },
          show: false,
          tooltip: {
            show: true
          },
          textStyle: {
            color: '#999'
          },
          selectedMode: false,
          right: 0,
          data: categories.map(function(el) {
            return el.name
          })
        }],
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          type: 'graph',
          layout: 'none',
          coordinateSystem: 'cartesian2d',
          symbol: 'rect',
          symbolSize: 1,
          z: 3,
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 14
              },
              formatter: function(params) {
                let txt = ''
                if (params.data.speed !== undefined) {
                  txt = params.data.speed
                }
                return txt
              }
            }
          },
          label: {
            normal: {
              show: true,
              color: '#5e5e5e',
              position: 'bottom'
            }
          },
          itemStyle: {
            normal: {
              shadowColor: 'none'
            },
            emphasis: {

            }
          },
          lineStyle: {
            normal: {
              width: 1,
              opacity: 0.5,
              color: 'transparent',
              shadowColor: 'none'
            }
          },
          edgeSymbol: ['none', 'none'],
          edgeSymbolSize: 8,
          data: data,
          links: links,
          categories: categories
        }, {
          name: 'A',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          z: 1,
          effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'arrow',
            color: '#5fb1f3',
            symbolSize: 10
          },
          lineStyle: {
            normal: {
              width: 4,
              opacity: 0.8
            }
          },
          data: linesData1
        }, {
          name: 'B',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          z: 1,
          effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'arrow',
            color: '#5fb1f3',
            symbolSize: 10
          },
          lineStyle: {
            normal: {
              width: 4,
              opacity: 0.8
            }
          },
          data: linesData2
        }, {
          name: 'C',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          z: 1,
          effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'arrow',
            color: '#5fb1f3',
            symbolSize: 10
          },
          lineStyle: {
            normal: {
              width: 4,
              opacity: 0.8
            }
          },
          data: linesData3
        }]
      }
      let myChart = echarts.init(document.getElementById('graph'))
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
    /* let apps = this.apps
    let data = apps
    let items = []
    for (let i = 0; i < 8; i++) {
      let value = [Math.random() * 25, 60 + 20 * i]
      items.push({
        name: data[i].clientName,
        category: 0,
        value: value,
        image: `${this.$store.state.BASE_URL}/api/files/${data[i].icon}`
      })
    }
    this.items1 = items
    this.$nextTick(() => {
      this.initChart()
    }) */
  }
}
</script>

<style lang="scss" scoped>
.data-area {
  position: relative;
  .desc-block {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .content {
    color: #fff;
    height: calc(100% - 2rem);
    #graph {
      width: 100%;
      height: 100%;
    }
  }
}
.block-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
