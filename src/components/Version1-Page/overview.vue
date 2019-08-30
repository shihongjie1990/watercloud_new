<template>
  <div class="overview-index">
    <!----------------------------------------------------- 顶部header ----------------------------------------------------------------->
    <!---------------------------------------------------- banner图及内容 --------------------------------------------------------------->
    <div class="overview-banner">
      <el-carousel height="500px"
                   class="banner-scroll">
        <el-carousel-item v-for="(item, index) in banners"
                          :key="index">
          <img :src="item.url"
               alt="banner">
        </el-carousel-item>
      </el-carousel>
      <!-- <img src="static/images/overview/1290X800.jpg"
           alt="banner"> -->
    </div>
    <!------------------------------------------------------ 通知公告 ------------------------------------------------------------------->
    <div class="overview-notice">
      <div class="notice-scroll">
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
            <li v-for="(item, index) in notices"
                :key="index + 'second'">
              <a @click.stop.prevent="hrefTo(item.url)">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!------------------------------------------------------- 主体内容 ------------------------------------------------------------------>
    <div class="overview-content">
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
                <li v-for="(item, index) in notices"
                    :key="index"
                    :title="item.title">
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
              </ul>
              <div class="bg">
                <div class="notice-mask">
                </div>
                <div>
                  <img src="static/images/overview/datawordicon.png"
                       alt="新闻">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 平台服务 -->
      <div class="platform-service">
        <div class="title">平台服务</div>
        <ul @mouseleave="changeContent('', 0)">
          <!-- <ul> -->
          <li v-for="item in 5"
              :key="item + 'first'">
            <div @mouseover="changeContent(services[item-1].content, 1, item)">
              <div>
                <img :src="services[item-1].img"
                     :alt="services[item-1].title"
                     style="width:40px;height:40px;">
              </div>
              <span>{{services[item-1].title}}</span>
            </div>
          </li>
          <li class="content-box">
            <i :class="position"
               v-if="contentNum === 1"></i>
            <div :class="(contentNum === 1?'active':'')">
              <span>{{ content[0] }}</span>
            </div>
          </li>
          <li v-for="item in 5"
              :key="item + 'second'">
            <div @mouseover="changeContent(services[item+4].content, 2, item)">
              <div>
                <img :src="services[item+4].img"
                     :alt="services[item+4].title"
                     style="width:40px;height:40px;">
              </div>
              <span>{{services[item+4].title}}</span>
            </div>
          </li>
          <li class="content-box">
            <i :class="position"
               v-if="contentNum === 2"></i>
            <div :class="(contentNum === 2?'active':'')">
              <span>{{ content[1] }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 数据目录 -->
      <data-menu :ajaxUrl="ajaxUrl"></data-menu>
      <api-menu></api-menu>
      <!---站点轮播 -->
      <div class="site-area"
           @click="skipToLogin">
        <div class="site-loop">
          <div class="title">部<br>署<br>站<br>点</div>
          <div class="site-area">
            <div :style="'width:' + 580*apps.length + 'px'">
              <ul>
                <li v-for="(item, index) in apps"
                    :key="index">
                  <div>
                    <img :src="item.url"
                         alt="">
                  </div>
                  <div>{{ item.name }}</div>
                </li>
                <li v-for="(item, index) in apps"
                    :key="index + 'site'">
                  <div>
                    <img :src="item.url"
                         alt="">
                  </div>
                  <div>{{ item.name }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------------------------------------------------------- 页脚 ------------------------------------------------>
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
import dataMenu from './overview/data-menu'
import apiMenu from './overview/api-menu2'

export default {
  components: {
    dataMenu,
    apiMenu
  },
  data() {
    return {
      content: ['', ''],
      position: '',
      contentNum: 0,
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
      banners: [
        {
          url: 'static/images/overview/1290X800.jpg'
        }, {
          url: 'static/images/overview/wallpaper.jpg'
        }],
      apps: [
        {
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
        }
      ],
      dataMenus: [
        {
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
        }
      ],
      notices: [
        {
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
        }/* , {
        title: '省水利厅副厅长级干部李晋检查 “贵州水利云”工程建设情况',
        url: '#'
      } */
      ],
      news: [
        {
          title: '热烈祝贺智慧水利公司自主研发平台入选2018年贵州省政府大数据应用典型示范项目',
          url: '#'
        }, {
          title: '省水利厅副厅长级干部李晋检查 “贵州水利云”工程建设情况',
          url: '#'
        }, {
          title: '全国绿色小水电 贵州有8座上榜',
          url: '#'
        }
      ],
      professionInfo: {
        title: '全国绿色小水电 贵州有8座上榜',
        img: 'static/images/overview/service',
        content: '近日，水利部公布了＂2018年度绿色小水电站＂名单，全国共121座小水电站获此称号，其中贵州有8座，约占全国总数的6.6%。'
      },
      services: [
        {
          title: '数据储存服务',
          img: 'static/images/overview/service/sjccfw.png',
          content: '基础服务平台提供了机构化和非结构化数据的存储服务，结构化数据存储主要提供了SQL Server、MySQL、PostgreSQL的服务，非结构化数据存储提供了MongoDb的服务。平台构建了基于以上四种存储服务的相应的集群，提供高效、安全的存储服务。'
        }, {
          title: '数据共享和开放服务',
          img: 'static/images/overview/service/sjgxhkffu.png',
          content: '基础服务平台从各业务应用系统模块中提供或发布访问数据服务，采用分层次的方法对各类用户或应用设置权限，使不同用户或应用既能获得各自所需要的数据，又能确保数据传输过程的安全性及共享数据的互操作性和互用性。'
        }, {
          title: '数据库备份服务',
          img: 'static/images/overview/service/sjkbffw.png',
          content: '基础服务平台提供的数据存储服务的数据库集群提供了数据备份服务，保证了数据存储的安全可靠。'
        }, {
          title: '统一门户服务',
          img: 'static/images/overview/service/tymhfw.png',
          content: '基础服务平台提供一个统一入口的服务，用户根据角色的定义得到相应的服务。统一门户平台将分散的、异构的信息资源进行集成，提供一个支持信息访问、传递的集成环境。向用户提供个性化服务支持。同时，登录后用户可以享受到所提供的私有、个性化信息服务。'
        }, {
          title: '微服务',
          img: 'static/images/overview/service/wfw.png',
          content: '基础服务平台提供微服务架构，微服务架构是一种将单应用程序作为一套小型服务开发的方法，每种应用程序都在其自己的进程中运行，并与轻量级机制（通常是HTTP资源的API）进行通信。这些服务是围绕业务功能构建的，可以通过全自动部署机制进行独立部署。这些服务的集中化管理已经是最少的，它们可以用不同的编程语言编写，并使用不同的数据存储技术。'
        }, {
          title: 'SSO',
          img: 'static/images/overview/service/SSO.png',
          content: '基础服务平台上集中管理所有应用系统的用户，包括用户整个生命周期的管理、用户账号的统一管理以及用户属性的统一管理。随着基础服务平台的部署实施，各业务应用系统模块的不断增加，用户需要在不同的业务功能上多次登录认证，将导致最终用户在使用性上的不方便，进而影响信息系统的推广使用，因此提供了单点登录服务功能，即用户完成一次系统登录认证后，即可以访问许可范围之内的应用系统模块，从而减少用户的操作复杂，提高业务操作效率。'
        }, {
          title: '应用系统运行环境服务',
          img: 'static/images/overview/service/yyxtyxhjfw.png',
          content: '基础服务平台提供常用的应用系统部署环境，能将应用需求映射为物理的IT资源和基础设施的具体配置和拓扑结构，通过高级配置满足个性化需求，并进行快速部署。例如：Web应用程序和微服务的部署，支持Tomcat、Java、Python、NodeJS、Go、PHP、Ruby等语言。再不向传统模式先申请ECS（虚拟机），ECS上部署运行环境，部署应用软件，现在在平台上可采用一键部署方式，方便快捷高效。'
        }, {
          title: '资源弹性扩展服务',
          img: 'static/images/overview/service/zytxkzfw.png',
          content: '基础服务平台将应用需求映射为运行策略，在运行时，根据系统运行的实际状况，例如负载状况，动态地对物理的IT资源和基础设施进行调整，例如调整负载分配或增减计算资源，使其具备足够的弹性和灵活性，以实时动态地满足应用需求。'
        }, {
          title: '容器架构',
          img: 'static/images/overview/service/rqjg.png',
          content: '基础服务平台提供容器技术虚拟化技术，这是一种被大家广泛认可的容器技术服务器资源共享方式，容器技术可以在按需构建容器技术操作系统实例的过程当中为系统管理员提供极大的灵活性。最为重要的是，容器技术可以同时将操作系统镜像和应用程序加载到内存当中。还可以从网络磁盘进行加载，因为同时启动几十台镜像不会对网络和存储带来很大负载。之后的镜像创建过程只需要指向通用镜像，大大减少了所需内存。'
        }, {
          title: 'GIS服务',
          img: 'static/images/overview/service/gis.png',
          content: '基础服务平台提供GIS服务,GIS功能服务是通过网络向外提供GIS处理功能的Web服务，与传统的GIS服务相比，它的数据可以来源于网络，经过功能服务的处理后，将结果数据通过网络发送给用户。因此GIS功能服务的特点是服务处理的数据既可以来自本地数据，也可以来自网络或者其它GIS数据服务。'
        }
      ],
      showLogin: true,
      ajaxUrl: { url: '/resource/shared/public', type: 'public' }
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
    changeContent(content, num, postionNum) {
      this.content[num - 1] = content
      if (!content) {
        this.contentNum = 0
        return
      }
      this.contentNum = num
      this.position = `triangle triangle-position${postionNum}`
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
    skipToLogin() {
      let flag = this.$store.state.IS_CONSOLE
      if (flag) {
        this.$router.push({ path: '/home' })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  },
  beforeCreate() {
    console.group('------beforeCreate创建前状态------')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  created() {
    console.group('------created创建完毕状态------')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  beforeMount() {
    console.group('------beforeMount挂载前状态------')
    console.log('%c%s', 'color:red', 'el     : ' + (this.$el))
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  mounted() {
    console.group('------mounted 挂载结束状态------')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  beforeUpdate() {
    console.group('beforeUpdate 更新前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  updated() {
    console.group('updated 更新完成状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  beforeDestroy() {
    console.group('beforeDestroy 销毁前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  destroyed() {
    console.group('destroyed 销毁完成状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  }
}
</script>
