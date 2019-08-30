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
    <!------------------------------------------------------ 应用商店 ------------------------------------------------------------------->
    <div class="app-shop overview-panel">
      <div class="overview-title">
        <h1>海纳百川，水利系统的应用商店</h1>
        <span class="sub-title">汇聚水利各行业应用于此</span>
      </div>
      <app-flower></app-flower>
    </div>
    <!------------------------------------------------------ 数据目录 ------------------------------------------------------------------->
    <div class="data-source overview-panel">
      <div class="overview-title">
        <h1>数据共享，水利行业的绿色共享平台</h1>
        <span class="sub-title">静态数据目录，动态API接口，不同用户或应用可获得各自所需要的数据</span>
      </div>
      <div class="content">
        <div class="static-data">
          <div class="panel-title">
            <h3>静态数据目录</h3>
            <span class="sub-title">集合水利各业开放文档，提供浏览、查询业务</span>
          </div>
          <div class="desc"></div>
        </div>
        <div class="dynamic-api">
          <div class="panel-title">
            <h3>动态API接口</h3>
            <span class="sub-title">整合、归纳各业公开数据接口，实现资源共享</span>
          </div>
          <div class="desc"></div>
        </div>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>

<style scoped>
@import '../../assets/overview.css';
</style>

<script>
import appFlower from '../overview/app-flower'
import footerView from '../overview/footer'

export default {
  components: {
    appFlower,
    footerView
  },
  data() {
    return {
      banners: [
        {
          url: 'static/images/overview/1290X800.jpg'
        }, {
          url: 'static/images/overview/wallpaper.jpg'
        }],
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
      ]
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
    hrefTo(urlData) {
      // this.$router.push({name: '', params: {data: urlData}})
    }
  }
}
</script>
