<template>
  <div class="overview-page"
       id="home_overview">
    <!-- header区域 -->
    <home-header @showLogin="showLogin = !showLogin"></home-header>
    <!-- banner图区域 -->
    <div class="banner-area anchor">
      <div class="banner">
        <video src="static/video/banner.mp4"
               poster="static/images/banner.png"
               loop
               muted
               autoplay></video>
      </div>
      <div class="desc-block">
        <div class="text-desc">
          <p>水利云</p>
          <div>
            <p>水在云端涌 ● 云水泽神州</p>
            <p>Shuizaiyunduanyong, Yunshuizeshenzhou</p>
          </div>
        </div>
      </div>
      <div class="notice-area">
        <div>
          <div class="desc-icon">
            通知公告
          </div>
          <div class="notice-item">
            <ul>
              <li v-for="item in notices"
                  :key="item.id">
                <a @click.prevent="hrefToNotice(item)">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 应用区域 -->
    <App-Market class="anchor"
                :apps="apps"
                v-if="apps.length > 0"></App-Market>
    <!-- 静态数据目录 -->
    <data-menu class="anchor"></data-menu>
    <!-- 水利一张图 -->
    <One-Map class="anchor"></One-Map>
    <!-- 页脚 -->
    <overview-footer class="anchor"
                     id="overview_footer"></overview-footer>
    <v-login class="login-content"
             :class="{active: showLoginFlag }"></v-login>
    <!-- <a class="login-access"
       @click="showLoginPanel">
      <i class="iconfont icon-zhanghao"></i>
      <span>登录</span>
    </a> -->
  </div>
</template>

<script>
import homeHeader from './overview-ui/home-header.vue'
import AppMarket from './overview-ui/app-market2'
import DataMenu from './overview-ui/data-menu'
import OneMap from './overview-ui/one-map'
import OverviewFooter from './overview-ui/footer'
import VLogin from './overview-ui/login.vue'

export default {
  components: {
    AppMarket,
    DataMenu,
    OneMap,
    OverviewFooter,
    VLogin,
    homeHeader
  },
  data() {
    return {
      anchor: 0,
      isNext: true,
      apps: [],
      showLogin: false,
      notices: []
    }
  },
  computed: {
    showLoginFlag() {
      let flag = this.showLogin
      if (this.$store.state.IS_LOGIN) {
        flag = false
      }
      return flag
    }
  },
  methods: {
    hrefTo(flag, dom, callback) {
      let anchor = this.anchor
      let totalAnchor = document.querySelectorAll('.anchor')
      // 本模块距页面顶部的距离
      let currentTop = totalAnchor[anchor].offsetTop
      // 向下+1，向上-1
      // let flag = calculate === '+'
      let nextAnchor = flag ? anchor + 1 : anchor - 1
      // 判断超界
      if (!totalAnchor[nextAnchor]) {
        callback && callback()
        return
      }
      this.anchor = nextAnchor
      // 下一木块距顶部的距离
      let nextTop = totalAnchor[nextAnchor].offsetTop
      // 预计移动距离，本屏高度
      let distance = nextTop - currentTop
      // 移动最大距离
      let maxDistance = totalAnchor[nextAnchor].clientHeight
      // 实际最大距页面顶部高度
      let finalTop = flag ? Math.min(currentTop + distance, currentTop + maxDistance) : Math.min(currentTop - distance, currentTop - maxDistance)
      // 每10ms移动一次，共30次，过程300ms
      let step = distance / 50
      this.pageAnimate(finalTop, step, flag, dom, callback)
    },
    pageAnimate(finalTop, step, flag, dom, callback) {
      // 统一取值
      let max = flag ? 0 : 10000
      let min = flag ? -10000 : 0
      // 用时间迭代
      let times = null
      // clearInterval(times)
      times = setInterval(function() {
        let nextScrollTop = dom.scrollTop + step
        if (nextScrollTop - finalTop < max && nextScrollTop - finalTop > min) {
          dom.scrollTop += step
        } else {
          dom.scrollTop = finalTop
          clearInterval(times)
          callback && callback()
        }
      }, 10)
    },
    getApps() {
      return this.$http.get('/api/client/public/list').then(res => {
        this.apps = res.data
      })
    },
    showLoginPanel() {
      this.showLogin = !this.showLogin
    },
    closeLogin() {
      this.showLogin = false
    },
    pageMousewheel(e, dom) {
      let _this = this
      if (_this.isNext) {
        _this.isNext = false
        let flag = (e.wheelDelta || (-e.detail * 24)) < 0
        setTimeout(function() {
          _this.hrefTo(flag, dom, function() {
            _this.isNext = true
          })
        }, 100)
      }
      e.preventDefault()
    },
    getAllNotices() {
      let param = {
        pageNum: 1,
        pageSize: 5
      }
      this.$http.get('/api/announcement/page', { params: param }).then(res => {
        if (res.code === 1002) {
          this.notices = res.data.list
        } else {
          this.$message.error(res.msg || res.content || res.error)
        }
      })
    },
    hrefToNotice(data) {
      let _this = this
      let isLogin = this.$store.state.IS_LOGIN
      if (isLogin) {
        this.$router.push({ name: 'notice', params: { announcementId: data.id } })
      } else {
        this.$notify({
          title: '提示',
          message: '<span>请您先<a class="please-register">登录</a>！</span>',
          dangerouslyUseHTMLString: true,
          onClick: function() {
            _this.showLogin = true
          }
        })
      }
    }
  },
  mounted() {
    let _this = this
    let dom = document.getElementById('home_overview')
    // chrome/IE
    dom.addEventListener('mousewheel', function(e) {
      _this.pageMousewheel(e, dom)
    })
    // firefox
    dom.addEventListener('DOMMouseScroll', function(e) {
      _this.pageMousewheel(e, dom)
    })
    this.getApps()
    this.getAllNotices()
    this.showLogin = false
  }
}
</script>

<style lang="scss" scoped>
video {
  object-fit: fill;
  height: 100%;
  width: 100%;
}
.overview-page {
  background: #fff;
  overflow-x: hidden;
  & > div:not(.login-content):not(.overview-header) {
    height: 100vh !important;
  }
  .login-content {
    position: fixed;
    top: 20%;
    right: 2rem;
    z-index: 999;
    // transform: translateY(-70%);
  }
  .login-access {
    position: fixed;
    top: 20%;
    right: 0;
    z-index: 900;
    padding: 0.04rem;
    background: #fff;
    color: #999;
    border-radius: 0.04rem 0 0 0.04rem;
    border: 0.02rem solid #e2e2e2;
    border-right: none;
    text-align: center;
    width: 0.4rem;
    height: 0.4rem;
    &:hover {
      color: #fff;
      text-decoration: none;
      background: #409eff;
      border: 0.02rem solid transparent;
      border-right: none;
    }
    i {
      display: block;
      text-align: center;
      font-size: 0.18rem;
    }
  }
}
.banner-area {
  position: relative;
  .banner {
    position: absolute;
    height: 132vh;
    width: 100%;
    video {
      margin-top: -16vh;
    }
  }
  .desc-block {
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    .text-desc {
      // top: 2.24rem; // 224px;
      color: #fff;
      margin-left: 1.6rem;
      // left: 1.6rem; // 160px;
      & > p {
        font-size: 0.36rem;
        margin-bottom: 0.2rem;
        line-height: 0.5rem;
      }
      div > p:first-child {
        font-size: 0.24rem;
      }
      div > p:last-child {
        font-size: 0.18rem;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
.notice-area {
  padding: 0;
  // background: rgba(40, 130, 127, 0.3);
  background: rgba(45, 110, 146, 0.3);
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fff;
  height: 0.6rem;
  line-height: 0.6rem;
  & > div {
    display: flex;
    width: 80%;
    margin: auto;
    .desc-icon {
      font-size: 0.24rem;
      width: 2rem;
      text-align: center;
    }
    .notice-item {
      width: calc(100% - 2rem); // calc(100% - 200px);
      font-size: 0.2rem;
      overflow: hidden;
      ul {
        display: flex;
        line-height: 0.18rem;
        white-space: nowrap;
        height: 100%;
        align-items: center;
        animation: notice-scroll 25s linear infinite;
        li {
          line-height: 0.6rem;
          margin-right: 0.5rem;
          a {
            color: #ddd;
            width: 6rem;
            display: inline-block;
          }
        }
      }
    }
  }
}

@keyframes notice-scroll {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -32.5rem;
  }
}
</style>

<style lang="scss">
.overview-title {
  text-align: center;
  padding: 0.6rem 0 0.5rem 0; // 60px 0 50px 0;
  .title {
    font-size: 0.26rem; // 26px;
    color: #333;
    display: block;
  }
  p.sub-title {
    font-size: 0.2rem; // 20px;
    color: #999;
    margin-top: 0.04rem; // 4px;
    margin-bottom: 0;
  }
}
.data-area {
  height: 6.38rem; // 638px;
  background: #e2e2e2;
  & > div div.title {
    color: #fff !important;
  }
}

.app-area .block-bg,
.map-area .block-bg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 0;
  // text-align: center;
  img {
    width: 100%;
  }
}

.app-area {
  position: relative;
  z-index: 1;
  background: #fff;
}

.please-register {
  color: #409eff;
  text-decoration: none;
}
</style>
