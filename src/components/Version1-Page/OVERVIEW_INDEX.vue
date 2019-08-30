<template>
  <div class="overview-index">
    <!----------------------------------------------------- 顶部header ----------------------------------------------------------------->
    <div class="overview-header">
      <div class="logo">
        <img src="static/images/overview/logo.png"
             alt="logo">
        <div>水利云</div>
      </div>
      <div class="user">
        <img src="static/images/overview/loginuser.png"
             alt="user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ $store.state.USER.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="menu">
        <ul>
          <li>首页</li>
          <li>公告新闻</li>
          <li>平台服务</li>
          <li>行业动态</li>
          <li>政策法规</li>
          <li>平台总揽</li>
          <li>数据共享</li>
        </ul>
      </div>
    </div>
    <!---------------------------------------------------- banner图及内容 --------------------------------------------------------------->
    <div class="overview-banner">
      <img src="static/images/overview/1290X800.jpg"
           alt="banner">
      <div class="statistic-content">
        <div>
          <span>可访问应用数：</span>
          <span>{{ statistics.appNum }}</span>
        </div>
        <div>
          <span>已授权数据目录：</span>
          <span>{{ statistics.dataNum }}</span>
        </div>
      </div>
    </div>
    <!------------------------------------------------------ 通知公告 ------------------------------------------------------------------->
    <div class="overview-notice">
      <div>
        <img src="static/images/overview/bell.png"
             alt="notice">
        <span>通知公告</span>
      </div>
      <div class="overview-notice-content">
        <ul>
          <li v-for="(item, index) in notices"
              :key="index">
            <a @click.stop.prevent="hrefTo(item.url)">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!----------------------------------------------------- 动态基础统计信息 ------------------------------------------------------------->
    <div class="statistic-pic">
      <div class="shadow-in waterbackgroundimg">
        <!--background-image: url(./images/waterbackgroundimg.png); background-size: 100% 100%;-->
        <div class="col-md-1"></div>
        <div class="col-md-2">
          <p style="margin-left: 60px; margin-top: 14px;">雨量站</p>
          <div id="loading-center-absolute">
            <div class="object"
                 id="object_four"></div>
          </div>
          <div style="margin-left: 63px; margin-top: 26px;"><img src="static/images/overview/rainfall.png"
                 style="margin-left: 9px;">
            <p>{{ baseInfo.rainFall }}</p>
          </div>
        </div>
        <div class="col-md-2">
          <p style="margin-left: 60px; margin-top: 14px;">电站</p>
          <div id="loading-center-absolute">
            <div class="object"
                 id="object_four"></div>
            <div class="object"
                 id="object_three"></div>
          </div>
          <div style="margin-left: 63px; margin-top: 26px;"><img src="static/images/overview/power.png"
                 style="margin-left: 9px;">
            <p>{{ baseInfo.electric }}</p>
          </div>
        </div>
        <div class="col-md-2">
          <p style="margin-left: 60px; margin-top: 14px;">水文站</p>
          <div id="loading-center-absolute">
            <div class="object"
                 id="object_four"></div>
            <div class="object"
                 id="object_three"></div>
            <div class="object"
                 id="object_two"></div>
          </div>
          <div style="margin-left: 63px; margin-top: 28px;"><img src="static/images/overview/platform.png"
                 style="margin-left: 9px;">
            <p style="margin-left: 10px;">{{ baseInfo.hydrology }}</p>
          </div>
        </div>
        <div class="col-md-2">
          <p style="margin-left: 60px; margin-top: 14px;">河流</p>
          <div id="loading-center-absolute">
            <div class="object"
                 id="object_four"></div>
            <div class="object"
                 id="object_three"></div>
          </div>
          <div style="margin-left: 63px; margin-top: 26px;"><img src="static/images/overview/river.png"
                 style="margin-left: 9px;">
            <p>{{ baseInfo.river }}</p>
          </div>
        </div>
        <div class="col-md-2">
          <p style="margin-left: 60px; margin-top: 14px;">水库</p>
          <div id="loading-center-absolute">
            <div class="object"
                 id="object_four"></div>
          </div>
          <div style="margin-left: 63px; margin-top: 26px;"><img src="static/images/overview/reservoir.png"
                 style="margin-left: 9px;">
            <p>{{ baseInfo.reservoir }}</p>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
    <!------------------------------------------------------- 主体内容 ------------------------------------------------------------------>
    <div class="overview-content">
      <div class="uesr-detail row">
        <div class="col-md-6">
          <div class="row">
            <div class="my-app col-md-9">
              <div>我的应用</div>
              <div>
                <ul class="app-list">
                  <li v-for="(item, index) in apps"
                      :key="index"
                      :title="item.clientName">
                    <div @click="hrefToApp(item.webServerRedirectUri)">
                      <img :src="$store.state.BASE_URL + '/api/files/' + item.icon"
                           :alt="item.clientName">
                    </div>
                    <span>{{ item.clientName }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-3 user-img"
                 style="padding:0">
              <img src="static/images/overview/TB19Jz6LXXXXXacaXXXXXXXXXXX-576-840.jpg"
                   alt="">
              <div class="background-mask"></div>
              <div class="background-text">
                <div>
                  <img src="static/images/overview/TB1SLzALXXXXXaFXFXXXXXXXXXX-144-144.png"
                       alt="">
                </div>
                <div><i></i></div>
                <span>应用信息</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="data-menu col-md-9">
              <div>数据目录</div>
              <div>
                <ul class="data-list">
                  <li v-for="(item, index) in dataMenus"
                      :key="index">
                    <a @click.stop.prevent="showDataMenu(item.url)">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-3 user-img"
                 style="padding:0">
              <img src="static/images/overview/TB1ty_YLXXXXXX4apXXXXXXXXXX-576-840.jpg"
                   alt="">
              <div class="background-mask"></div>
              <div class="background-text">
                <div>
                  <img src="static/images/overview/TB10trmLXXXXXc1XVXXXXXXXXXX-144-144.png"
                       alt="">
                </div>
                <div><i></i></div>
                <span>数据列表</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 行业动态和公告 -->
      <div class="notice-area">
        <div class="notice-board row">
          <div class="trends col-md-8">
            <div class="title">
              <div>行业动态</div>
              <div></div>
              <div>
                <a>更多</a>
              </div>
            </div>
            <div class="row">
              <div class="img-area col-md-6">
                <img src="static/images/overview/W020190201550071653389.png"
                     alt="">
              </div>
              <div class="trends-detail col-md-6">
                <div class="title">{{ professionInfo.title }}</div>
                <div class="trends-content">
                  {{ professionInfo.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="notice-list">
              <div class="title">
                <span>公<br>告</span>
              </div>
              <ul>
                <!-- <li><a>水利部办公厅关于组织开展2019年“世界水日”“中国水周”宣传活动的通知</a></li>
                <li><a>水利部办公厅关于组织开展2019年“世界水日”“中国水周”宣传活动的通知</a></li>
                <li><a>水利部办公厅关于组织开展2019年“世界水日”“中国水周”宣传活动的通知</a></li>
                <li><a>水利部办公厅关于组织开展2019年“世界水日”“中国水周”宣传活动的通知</a></li> -->
                <li v-for="(item, index) in notices"
                    :key="index">
                  <a @click.stop.prevent="hrefTo(item.url)">{{ item.title }}</a>
                </li>
              </ul>
              <div class="bg">
                <div class="notice-mask">
                </div>
                <div>
                  <img src="static/images/overview/system/sign1.png"
                       alt="公告">
                </div>
              </div>
            </div>
            <div class="new-list">
              <div class="title">
                <span>新<br>闻</span>
              </div>
              <ul>
                <li v-for="(item, index) in news"
                    :key="index">
                  <a @click.stop.prevent="hrefToNews(item.url)">{{ item.title }}</a>
                </li>
                <!-- <li>
                  <a>热烈祝贺智慧水利公司自主研发平台入选2018年贵州省政府大数据应用典型示范项目</a>
                </li>
                <li>
                  <a>省水利厅副厅长级干部李晋检查 “贵州水利云”工程建设情况</a>
                </li>
                <li>
                  <a>全国绿色小水电 贵州有8座上榜</a>
                </li> -->
              </ul>
              <div class="bg">
                <div class="notice-mask">
                </div>
                <div>
                  <img src="static/images/overview/datawordicon.png"
                       alt="新闻">
                  <!-- <span>更多...</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 一张图 -->
      <div class="chart-area"
           style="width: 100%;">
        <div>水利云生态系统</div>
        <div class="chart-content">
          <div id="one-chart"
               name="shuiliyun"
               style="width: 1200px;height: 800px;margin:auto;">
          </div>
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
      <!-- 系统管理 -->
      <div class="system-area">
        <div class="system-manager">
          <div class="title">
            <span>系统管理</span>
          </div>
          <div class="system-content">
            <ul>
              <li>
                <a class="app">
                  <div>
                    <!-- <img src="./images/system/app2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>数据目录</span>
                </a>
              </li>
              <li>
                <a class="appsv">
                  <div>
                    <!-- <img src="./images/system/icon_appsv2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>应用服务</span>
                </a>
              </li>
              <li>
                <a class="auth">
                  <div>
                    <!-- <img src="./images/system/icon_auth2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>权限管理</span>
                </a>
              </li>
              <li>
                <a class="user-manager">
                  <div>
                    <!-- <img src="./images/system/icon_user2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>用户管理</span>
                </a>
              </li>
              <li>
                <a class="user-manager">
                  <div>
                    <!-- <img src="./images/system/icon_user2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>角色管理</span>
                </a>
              </li>
              <li>
                <a class="ct">
                  <div>
                    <!-- <img src="./images/system/icon_ct2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>内容编辑</span>
                </a>
              </li>
              <li>
                <a class="ddoc">
                  <div>
                    <!-- <img src="./images/system/icon_ddoc2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>数据文档</span>
                </a>
              </li>
              <li>
                <a class="env">
                  <div>
                    <!-- <img src="./images/system/icon_env2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>投诉建议</span>
                </a>
              </li>
              <li>
                <a class="dshare">
                  <div>
                    <!-- <img src="./images/system/icon_dshare2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>接口申请</span>
                </a>
              </li>
              <li>
                <a class="dshare">
                  <div>
                    <!-- <img src="./images/system/icon_dshare2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>接口审批</span>
                </a>
              </li>
              <li>
                <a class="appsv">
                  <div>
                    <!-- <img src="./images/system/icon_appsv2.png" alt=""> -->
                    <div></div>
                  </div>
                  <span>系统设置</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 内存信息和一张图 -->
    </div>
    <!---------------------------------------------------- 页脚 ------------------------------------------------>
    <footer>
      <div>
        <div class="col-md-9 footer-info">
          <div>
            <span>技术支持：</span>
            <span>贵州省贵阳市观山湖区湖滨路10号翔明大厦</span>
          </div>
          <div>
            <span>联系电话：</span>
            <span>0851-84111096</span>
          </div>
          <div>
            <span>地址：</span>
            <span>贵州省贵阳市观山湖区湖滨路10号翔明大厦1801</span>
          </div>
        </div>
        <div class="col-md-3">
          <div>
            <span>隐私条款</span>
            <span>|</span>
            <span>用户协议</span>
          </div>
          <div>
            <span>备案号：</span>
            <span>黔ICP备17003900号-1</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statistics: {
        appNum: 5,
        dataNum: 20
      },
      baseInfo: {
        rainFall: 3378,
        electric: 1503,
        hydrology: 877,
        river: 10180,
        reservoir: 2659
      },
      apps: [{
        url: 'static/images/overview/app/jianguanyun.png',
        name: '中小骨干水源工程监管云（项目前期&建设期模块）'
      }, {
        url: 'static/images/overview/app/yinshuianquan.png',
        name: '饮水安全'
      }, {
        url: 'static/images/overview/app/nongcunshuidian.png',
        name: '贵州省农村水电信息网'
      }, {
        url: 'static/images/overview/app/fanghongduxun.png',
        name: '防洪度汛电子信息看板'
      }, {
        url: 'static/images/overview/app/shuichengzhihuishuili.png',
        name: '贵州水城智慧水利平台'
      }, {
        url: 'static/images/overview/app/shuitubaochi.png',
        name: '贵州水土保持大数据'
      }, {
        url: 'static/images/overview/app/zhihuifangxun.png',
        name: '贵阳市智慧防汛决策系统'
      }, {
        url: 'static/images/overview/app/shuiligongchengyunxingguanli.png',
        name: '水利工程标准化运行管理云平台'
      }, {
        url: 'static/images/overview/app/xiaokangshui.png',
        name: '小康水'
      }, {
        url: 'static/images/overview/app/nongcunshuidianxinxiguanli.png',
        name: '贵州省农村水电信息管理系统'
      }],
      dataMenus: [{
        name: '中小型骨干水源工程',
        url: '#'
      }, {
        name: '中小型骨干水源工程',
        url: '#'
      }, {
        name: '中小型骨干水源工程',
        url: '#'
      }, {
        name: '中小型骨干水源工程',
        url: '#'
      }, {
        name: '中小型骨干水源工程',
        url: '#'
      }, {
        name: '中小型骨干水源工程',
        url: '#'
      }, {
        name: '中小型骨干水源工程',
        url: '#'
      }, {
        name: '中小型骨干水源工程',
        url: '#'
      }],
      notices: [{
        title: '子公司动态|云上贵州公司召开2018年度党员领导干部民主生活会',
        url: '#'
      }, {
        title: '集团公司召开2018年度党员领导干部民主生活会',
        url: '#'
      }, {
        title: '集团公司召开党委扩大会学习贯彻全省重要会议、文件精神',
        url: '#'
      }, {
        title: '水利部办公厅关于组织开展2019年“世界水日”“中国水周”宣传活动的通知',
        url: '#'
      }],
      news: [{
        title: '热烈祝贺智慧水利公司自主研发平台入选2018年贵州省政府大数据应用典型示范项目',
        url: '#'
      }, {
        title: '省水利厅副厅长级干部李晋检查 “贵州水利云”工程建设情况',
        url: '#'
      }, {
        title: '全国绿色小水电 贵州有8座上榜',
        url: '#'
      }],
      professionInfo: {
        title: '全国绿色小水电 贵州有8座上榜',
        content: '近日，水利部公布了＂2018年度绿色小水电站＂名单，全国共121座小水电站获此称号，其中贵州有8座，约占全国总数的6.6%。'
      }
    }
  },
  methods: {
    getMyApps() {
      this.$http.get('/api/client/list').then(res => {
        if (res.code === 1002) {
          this.apps = res.data
        } else {
          this.$message.error(res.msg || res.content)
        }
      })
    },
    getAllNotices() {
      this.$http.get('/api/announcement').then(res => {
      })
    },
    hrefToApp(url) {
      window.open(url)
    },
    hrefTo(urlData) {
      // this.$router.push({name: '', params: {data: urlData}})
    },
    hrefToNews(urlData) {
      // this.$router.push({name: '', params: {data: urlData}})
    },
    showDataMenu(urlData) {
      // this.$router.push({name: '', params: {data: urlData}})
    },
    initFlowerChart() {
      var centerOption = {
        // backgroundColor: '#1a3847',
        tooltip: {
          show: false
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
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
              color: '#000'
            }
          },
          data: [{
            name: '水利云',
            x: 530,
            y: 240,
            symbolSize: 120,
            symbol: 'image:// static/images/overview/shuiliyun.png',
            itemStyle: {
              normal: {

              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }, {
            name: '水资源',
            x: 496,
            y: 140,
            symbolSize: 80,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '农村水电',
            x: 530,
            y: 180,
            symbolSize: 70,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '智慧防汛',
            x: 668,
            y: 160,
            symbolSize: 80,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '河长制',
            x: 400,
            y: 170,
            symbolSize: 80,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '智慧水库',
            x: 400,
            y: 285,
            symbolSize: 80,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '水土保持',
            x: 450,
            y: 350,
            symbolSize: 80,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '饮水安全',
            x: 650,
            y: 350,
            symbolSize: 80,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '党政',
            x: 450,
            y: 170,
            symbolSize: 60,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '纪检',
            x: 590,
            y: 160,
            symbolSize: 60,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '人事',
            x: 620,
            y: 210,
            symbolSize: 60,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '规划计划',
            x: 420,
            y: 240,
            symbolSize: 70,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '政策法规',
            x: 470,
            y: 295,
            symbolSize: 70,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '安全监督',
            x: 535,
            y: 340,
            symbolSize: 70,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '灌溉工程',
            x: 580,
            y: 310,
            symbolSize: 70,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '烟水',
            x: 620,
            y: 270,
            symbolSize: 60,
            itemStyle: {
              normal: {

              }
            }
          }, {
            name: '运行管理',
            x: 670,
            y: 250,
            symbolSize: 70,
            itemStyle: {
              normal: {

              }
            }
          }],
          // links: [],
          links: [{
            source: '水利云',
            target: '农村水电'
          }, {
            source: '水利云',
            target: '智慧防汛',
            lineStyle: {
              normal: {
                width: 3,
                color: '#FFF',
                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
              }
            }
          }, {
            source: '水利云',
            target: '河长制',
            lineStyle: {
              normal: {
                width: 3,
                color: '#FFF',
                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
              }
            }
          }, {
            source: '水利云',
            target: '建管',
            lineStyle: {
              normal: {
                width: 3,
                color: '#FFF',
                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
              }
            }
          }, {
            source: '水利云',
            target: '运行管理'
          }, {
            source: '水利云',
            target: '水土保持',
            lineStyle: {
              normal: {
                width: 3,
                color: '#FFF',
                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
              }
            }
          }, {
            source: '水利云',
            target: '饮水安全',
            lineStyle: {
              normal: {
                width: 3,
                color: '#FFF',
                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
              }
            }
          }, {
            source: '水利云',
            target: '党政'
          }, {
            source: '水利云',
            target: '纪检'
          }, {
            source: '水利云',
            target: '人事'
          }, {
            source: '水利云',
            target: '规划计划'
          }, {
            source: '水利云',
            target: '政策法规'
          }, {
            source: '水利云',
            target: '安全监督'
          }, {
            source: '水利云',
            target: '灌溉工程'
          }, {
            source: '水利云',
            target: '烟水'
          }, {
            source: '水利云',
            target: '智慧水库'
          }, {
            source: '水利云',
            target: '水资源',
            lineStyle: {
              normal: {
                width: 3,
                color: '#FFF',
                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
              }
            }
          }]
        }]
      }
      let styleJson = {
        'borderColor': [{
          'code': '#fff',
          'name': ['水利云']
        },
        /* {
                       'code': '#3fff41',
                       'name': ['水资源', '智慧防汛', '河长制', '智慧水库', '水土保持', '饮水安全']
                   },
                   {
                       'code': '#e9ee37',
                       'name': ['农村水电', '党政', '纪检', '人事', '规划计划', '政策法规', '安全监督', '灌溉工程', '烟水', '运行管理']
                   } */
        {
          'code': '#fff',
          'name': ['水资源', '智慧防汛', '河长制', '智慧水库', '水土保持', '饮水安全']
        },
        {
          'code': '#86d3f1',
          'name': ['农村水电', '党政', '纪检', '人事', '规划计划', '政策法规', '安全监督', '灌溉工程', '烟水', '运行管理']
        }
        ],
        'shadowColor': [{
          'code': 'rgba(128, 128, 128, 0.5)',
          'name': ['水利云']
        }, {
          'code': '#86d3f1',
          'name': ['水资源', '智慧防汛', '河长制', '智慧水库', '水土保持', '饮水安全']
        }],
        'shadowBlur': [{
          'code': 10,
          'name': ['水利云']
        }, {
          'code': 20,
          'name': ['水资源', '智慧防汛', '河长制', '智慧水库', '水土保持', '饮水安全']
        }],
        'color': [{
          'code': '#fff',
          'name': ['水利云']
        }],
        'borderWidth': [{
          'code': 1,
          'name': ['水利云']
        }]
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
      myChart1.setOption(centerOption)
    },
    logout() {
      window.localStorage.clear()
      window.location.href = location.origin + '/api/logout'
    }
  },
  mounted() {
    // 创建水利云生态系统图
    this.initFlowerChart()
    // 获取我的应用
    this.getMyApps()
    // 请求自我身份信息
    this.$http.get('/api/user/me').then(res => {
      if (res.code === 9987) {
        this.$store.dispatch('setUserFlag', true)
        this.$store.dispatch('setUserName', '')
        window.localStorage.USER = this.base64.encode('')
      } else {
        this.$store.dispatch('setUserFlag', false)
        this.$store.dispatch('setUserName', res.username)
        window.localStorage.USER = this.base64.encode(res.username)
      }
    }, thisErr => {
      this.$message.error('身份认证失败！')
    })
  }
}
</script>
