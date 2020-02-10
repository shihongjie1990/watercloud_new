<template>
  <div>
    <div class="header-g">
      <div class="head-top">
        <div class="head-g">
          <img src="static/images/50.jpg"
               alt=""
               class="gov-image">
          <img src="static/images/bg_title.png"
               alt=""
               class="bg-title">
        </div>
      </div>
      <div class="user-logo">
        <img src="static/images/ui/logo.png"
             alt="水利云"
             @click="$router.push({name: 'overviewIndex', params: {isLogin: false}})">
      </div>
      <div class="user-head">
        <div class="logout-icon">
          <div class="head-type">
            <a @click.prevent="changeHeadType">政府版</a>
          </div>
          <el-dropdown class="dropdown-file"
                       trigger="click">
            <span class="el-dropdown-link">
              平台文档<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in systemFiles"
                                :key="item.code">
                <a :href="`static/file/${item.url}`"
                   class="system-file-download">{{ item.fileName }}</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-tooltip class="item"
                      effect="dark"
                      content="待办"
                      placement="bottom">
            <el-badge :value="commissionCount"
                      class="item"
                      @click.native="expandCommission">
              <i class="iconfont icon-tixing1"></i>
            </el-badge>
          </el-tooltip>
          <div>
            <i class="iconfont icon-zhanghao"></i>
            <span :title="$store.state.USER.name"
                  class="user-name">{{ $store.state.USER.name }}</span>
          </div>
          <el-tooltip class="item"
                      effect="dark"
                      content="系统控制台"
                      placement="bottom">
            <!-- 系统管理入口（仅对管理人员开放） -->
            <i class="iconfont icon-navicon-xtgl system-manager-icon"
               v-if="$store.state.IS_MANAGER"
               @click="$router.push('/users')"></i>
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="注销"
                      placement="bottom">
            <img src="static/images/ui/logout.png"
                 alt="退出"
                 @click="logout">
          </el-tooltip>
        </div>
      </div>
      <!-- <div class="head-type">
        <a @click.prevent="changeHeadType">政府版</a>
      </div> -->
    </div>
    <div class="user-menu">
      <div>
        <ul>
          <li v-for="(node, index) in menuNodes.data"
              :key="index">
            <a @click="hrefTo(node.url, node.id)"
               :class="(menuNodes.activeNode === node.id) ? 'active' : ''">{{ node.node }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commissionCount: {
      type: Number,
      required: true
    }
  },
  watch: {
    '$store.state.LOGGED_MENU': {
      handler(curData, oldData) {
        this.menuNodes = JSON.parse(JSON.stringify(curData))
      },
      deep: true
    }
  },
  data() {
    return {
      menu: this.$store.state.LOGGED_MENU || [],
      type: '',
      menuNodes: [],
      systemFiles: [{
        code: 0,
        fileName: '基于水利云的平台应用接入标准.docx',
        url: '基于水利云的平台应用接入标准.docx'
      }]
    }
  },
  methods: {
    hrefTo(url, id) {
      // this.menuNodes.activeNode = id
      if (url === '#') {
        this.$message({
          type: 'info',
          showClose: true,
          message: '正在建设中，敬请期待！'
        })
      }
      this.$router.push(url)
      window.localStorage.CURRENT_NODE = this.base64.encode(id)
    },
    expandCommission() {
      this.$emit('expandCommission')
    },
    logout() {
      window.localStorage.clear()
      location.href = location.origin + '/api/logout'
    },
    changeHeadType() {
      this.$emit('getHeadType', false)
    }
  },
  mounted() {
    this.menuNodes = JSON.parse(JSON.stringify(this.menu))
    this.menuNodes = {
      data: [{
        node: '首页',
        url: '/home/user',
        id: 'my_home'
      }, {
        node: '应用商店',
        url: '/home/appShop',
        id: 'app_shop'
      }, {
        node: '水利数据库',
        url: '/home/staticData',
        id: 'data_source'
      }, {
        node: '水利一张图',
        url: '/home/oneMap',
        id: 'one_map'
      }, {
        node: '平台总览',
        url: '/home/stageStatics',
        id: 'system_overview'
      }, {
        node: '公告',
        url: '/home/notice',
        id: 'system_notice'
      }],
      activeNode: 'my_home'
    }
  }
}
</script>

<style lang="scss" scoped>
.user-head {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.3rem;
  line-height: 0.3rem;
  display: flex;
  align-items: center;
  box-shadow: none;
  margin-right: 20px;
  .logout-icon {
    // width: 1.8rem; // 49px;
    color: #f5ba0d;
    & > div {
      display: inline-block;
      margin: 0 10px;
      span.user-name {
        color: #fff;
        width: 60px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: top;
        text-overflow: ellipsis;
      }
    }
    & > div.el-badge {
      display: inline;
      &:hover {
        cursor: pointer;
      }
    }
    img:hover {
      cursor: pointer;
    }
    .system-manager-icon {
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    .dropdown-file {
      color: #ddd;
    }
  }
}
.system-file-download {
  color: #337ab7;
}
.header-g {
  height: 1rem;
  width: 100%;
  position: relative;
}
.head-top {
  position: absolute;
  width: 100%;
  z-index: -1;
  .head-g {
    position: relative;
    height: 1rem;
    width: 100%;
    & > img:first-child {
      width: 100%;
    }
    & > img:last-child {
      position: absolute;
      top: 50%;
      right: 10%;
      height: 20%;
      transform: translateY(-50%);
    }
  }
}
.user-logo {
  height: 0.3rem;
  transform: translateY(-50%);
  /* margin-top: 0.5rem; */
  padding-top: 1rem;
  padding-left: 0.6rem;
  img {
    // width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
}
.user-menu {
  background: #3b6871;
  // background: #c62222;
  margin-top: -14px;
  & > div {
    display: inline-block;
    margin-left: 50%;
    transform: translateX(-50%);
    ul {
      display: flex;
      height: 0.4rem;
      line-height: 0.4rem;
      li {
        padding: 0 0.2rem;
        font-size: 0.14rem;
        & > a {
          color: #fff;
          // color: #c8e9ff;
        }
        &:hover {
          background: #0d515c;
          // background: #b70505;
          border-radius: 5px;
          cursor: pointer;
          & > a {
            color: #c8e9ff;
            // color: #fff;
            text-decoration: none;
          }
        }
      }
    }
  }
}
.head-type {
    font-size: 14px;
    & > a {
        color: #ddd;
        text-decoration: underline;
        &:hover {
            color: #3b6871;
        }
    }
}
</style>
