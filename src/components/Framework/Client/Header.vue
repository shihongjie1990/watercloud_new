<template>
  <div class="user-head">
    <div class="user-logo">
      <img src="static/images/ui/logo.png"
           alt="水利云" @click="$router.push({name: 'overviewIndex', params: {isLogin: false}})">
    </div>
    <div class="user-menu">
      <ul>
        <li v-for="(node, index) in menuNodes.data"
            :key="index">
          <a @click="hrefTo(node.url, node.id)"
             :class="(menuNodes.activeNode === node.id) ? 'active' : ''">{{ node.node }}</a>
        </li>
      </ul>
    </div>
    <div class="logout-icon">
      <el-dropdown class="dropdown-file" trigger="click">
        <span class="el-dropdown-link">
          平台文档<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in systemFiles"
                            :key="item.code">
            <a :href="`static/file/${item.url}`" class="system-file-download">{{ item.fileName }}</a>
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
      /* this.$http.get('/api/logout').then(res => {
        window.localStorage.clear()
        this.$router.push({ path: '/' })
        window.location.reload()
      }) */
      window.localStorage.clear()
      location.href = location.origin + '/api/logout'
    }
  },
  mounted() {
    this.menuNodes = JSON.parse(JSON.stringify(this.menu))
  }
}
</script>

<style lang="scss" scoped>
.user-head {
  height: 0.7rem; // 70px;
  line-height: 0.7rem;
  display: flex;
  align-items: center;
  box-shadow: 0px -3px 30px 3px #0d75a7 inset;
  .user-logo {
    margin-left: 0.35rem; // 35px;
    img {
      width: 100%;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .user-menu {
    width: calc(100% - 4rem); // calc(100% - 201px);
    display: flex;
    ul {
      display: flex;
      margin: auto;
      a {
        margin: 0 0.2rem; // 0 20px;
        color: #53e8f9;
        font-size: 0.16rem; // 16px;
        &.active {
          color: #f5ba0d;
        }
      }
    }
  }
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
</style>
