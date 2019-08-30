<template>
  <div class="home-index">
    <div class="black-bg"
         style="width:100%;height:100vh;">
      <img src="static/images/8716187_124602741000_2.jpg"
           alt=""
           style="height:calc(100% + 90px);width:100%;">
    </div>
    <!-- 左右按钮 -->
    <div>
      <!-- 按钮左 -->
      <div class="panel-button site-button"
           @click="siteActive = true"
           title="数据目录">
        <img src="static/images/overview/TB1SLzALXXXXXaFXFXXXXXXXXXX-144-144.png"
             alt=""
             style="height:100%;width:100%;"></div>
      <!-- 按钮右 -->
      <div class="panel-button ecosystem-button"
           @click="ecosystemActive = true"
           title="水利云生态系统">
        <img src="static/images/overview/TB10trmLXXXXXc1XVXXXXXXXXXX-144-144.png"
             alt=""
             style="height:100%;width:100%;"></div>
    </div>
    <!-- 左边面版 -->
    <div :class="siteActive?'left-panel animation-panel active':'left-panel animation-panel'"
         @click.stop="movePanel('leftDistance')">
      <div class="close-div">
        <i class="el-icon-close"
           @click.stop="siteActive=false"></i>
      </div>
      <div class="move-div"
           :style="'margin-left:-' + leftDistance + 'vw'">
        <div class="home-data-menu">
          <data-menu :ajaxUrl="ajaxUrl"></data-menu>
        </div>
        <div style="margin:auto;">
          <api-menu></api-menu>
        </div>
      </div>
    </div>
    <!-- 右边按钮面板 -->
    <div :class="ecosystemActive?'right-panel animation-panel active':'right-panel animation-panel'"
         @click.stop="movePanel('rightDistance')">
      <div class="close-div">
        <i class="el-icon-close"
           @click.stop="ecosystemActive=false"></i>
      </div>
      <div class="move-div"
           :style="'margin-left:-' + rightDistance + 'vw'">
        <div>
          <div class="ecosystem-chart">
            <div class="chart-content">
              <div id="one-chart"
                   name="shuiliyun"
                   style="width: 1200px;height: 800px;margin:auto;"
                   v-if="ecosystemActive">
              </div>
              <div v-if="showFlower">
                <!-- 圈圈 -->
                <div class="bazhu hechangzhi"></div>
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
                <div class=" bazhulogo"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="site-info">
            <div class="site-block">
              <div class="bg-color1">
                <div>
                  <img src="static/images/overview/rainfall.png"
                       alt="">
                  <span>雨量站</span>
                </div>
                <span>3378</span>
              </div>
              <div class="bg-color2">
                <div>
                  <img src="static/images/overview/power.png"
                       alt="">
                  <span>电站</span>
                </div>
                <span>1503</span>
              </div>
              <div class="bg-color3">
                <div>
                  <img src="static/images/overview/platform.png"
                       alt="">
                  <span>水文站</span>
                </div>
                <span>877</span>
              </div>
              <div class="bg-color4">
                <div>
                  <img src="static/images/overview/river.png"
                       alt="">
                  <span>河流</span>
                </div>
                <span>10180</span>
              </div>
              <div class="center-site">
                <div>
                  <img src="static/images/overview/reservoir.png"
                       alt="">
                  <span>水库</span>
                </div>
                <span>2659</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['my-app', 'animation-panel', {'disabled': notAnimation}]">
      <div class="move-button">
        <div @click="moveAppBlock(0)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div @click="moveAppBlock(1)">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="move-div"
           :style="'margin-left:' + leftPosition ">
        <div v-for="(list, listIndex) in allApps"
             :key="listIndex"
             @mousedown="dragMoveStart">
          <div class="app-block">
            <ul class="app-list">
              <li v-for="(item, index) in list"
                  :key="index"
                  :title="item.clientName">
                <div @click.stop="hrefToApp(item.webServerRedirectUri)">
                  <img :src="$store.state.BASE_URL + '/api/files/' + item.icon"
                       :alt="item.clientName">
                </div>
                <span>{{ item.clientName }}</span>
              </li>
              <!-- <li v-for="node in 12"
                  :key="node">
                <div>
                  <img src="static/images/overview/app/jianguanyun.png"
                       alt="">
                </div>
                <span>{{ item + '-' + node }}</span>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataMenu from './overview/data-menu'
import apiMenu from './overview/api-menu'

export default {
  components: {
    dataMenu,
    apiMenu
  },
  watch: {
    ecosystemActive(curValue, oldValue) {
      if (curValue) {
        setTimeout(() => {
          this.initFlowerChart()
          this.showFlower = true
        }, 1000)
      } else {
        this.showFlower = false
      }
    }
  },
  data() {
    return {
      apps: [
      ],
      allApps: [],
      ecosystemActive: false,
      showFlower: false,
      siteActive: false,
      rightDistance: 0,
      leftDistance: 0,
      ajaxUrl: { url: '/resource/shared', type: 'protected' },
      distance: 0,
      notAnimation: false
    }
  },
  computed: {
    leftPosition() {
      if (typeof (this.distance) === 'string') {
        return this.distance
      } else {
        return this.distance + 'vw'
      }
    },
    appLength() {
      return this.allApps.length
    }
  },
  methods: {
    getAllApps() {
      this.$http.get('/api/client/list').then(res => {
        if (res.code === 1002) {
          let apps = res.data
          this.apps = apps
          let allApps = []
          for (let i = 0; i < apps.length; i = i + 12) {
            let app = []
            for (let j = 0; j < 12; j++) {
              apps[i + j] && app.push(apps[i + j])
            }
            allApps.push(app)
          }
          this.allApps = allApps
        } else {
          this.$message.error(res.msg || res.content)
        }
      })
    },
    hrefToApp(url) {
      window.open(url)
    },
    initFlowerChart() {
      var centerOption = {
        // backgroundColor: '#1a3847',
        tooltip: {
          show: false
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
                color: '#fff'
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
            // links: [],
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
                    color: '#FFF',
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
                    color: '#FFF',
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
                    color: '#FFF',
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
                    color: '#FFF',
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
                    color: '#FFF',
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
                target: '智慧水库'
              },
              {
                source: '水利云',
                target: '水资源',
                lineStyle: {
                  normal: {
                    width: 3,
                    color: '#FFF',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                  }
                }
              }
            ]
          }
        ]
      }
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
    },
    movePanel(direction) {
      let index = this[direction] / 100
      if (index < 1) {
        this[direction] += 100
      } else {
        this[direction] = 0
      }
    },
    moveAppBlock(flag) {
      let distance = -this.distance
      let index = distance / 100
      if (flag) {
        if (index < this.appLength - 1) {
          distance = (parseInt(distance / 100) + 1) * 100
        } else {
          distance = 0
        }
      } else {
        if (index > 0) {
          distance -= 100
        } else {
          distance = (this.appLength - 1) * 100
        }
      }
      this.distance = -distance
    },
    dragMoveStart(e) {
      let _this = this
      _this.notAnimation = true
      let x = _this.distance
      let disX = e.clientX
      let distanceX = 0
      document.onmousemove = e => {
        distanceX = e.clientX - disX
        _this.distance = 'calc(' + distanceX + 'px + ' + x + 'vw)'
      }
      document.onmouseup = e => {
        _this.notAnimation = false
        if (Math.abs(distanceX) >= 600) {
          if (distanceX > 0 && x / 100 >= (1 - _this.appLength) && x < 0) {
            _this.distance = x + 100
          } else if (distanceX < 0 && x / 100 > (1 - _this.appLength) && x <= 0) {
            _this.distance = x - 100
          } else {
            _this.distance = x
          }
        } else {
          _this.distance = x
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  mounted() {
    this.$store.dispatch('isConsole', false)
    this.getAllApps()
  }
}
</script>
