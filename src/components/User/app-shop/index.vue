<template>
  <div class="app-shop">
    <div class="app-search">
      <!-- <el-input placeholder="请输入应用名称"
                v-model.trim="appName"
                @keyup.native.enter="searchApp">
        <i slot="suffix"
           class="el-input__icon el-icon-search input-search-icon"
           @click="searchApp"></i>
      </el-input> -->
      <el-input placeholder="请输入应用名称"
                v-model.trim="appName"
                class="search-input"
                :class="{active: showSearch}"
                @keyup.native.enter="searchApp"></el-input>
      <i class="el-icon-search"
         @click="showSearchPanel"></i>
    </div>
    <div class="apps-module">
      <ul v-if="apps.length > 0">
        <li v-for="(item, index) in apps"
            :key="index" class="el-app">
          <div class="app-icon">
            <div :class="{'app-owned': item.webServerRedirectUri, 'app-application': !item.clientId}">
              <a v-if="item.webServerRedirectUri"
                 @click="deleteApp(item)"
                 class="delete-app-btn">删除</a>
              <a v-else
                 @click="applicateApp(item)">申请</a>
              <img :src="`/api/files/${item.icon}`"
                   alt="图标"
                   @click="openAppUrl(item)">
            </div>
            <span @click="openAppUrl(item)">{{ item.clientName }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 展示应用
      apps: [],
      appName: '',
      // 所有应用
      allApps: [],
      showSearch: false
    }
  },
  methods: {
    getAllApps() {
      return this.$http.get('/api/client/public/list')
    },
    getMyApps() {
      return this.$http.get('/api/client/list')
    },
    openAppUrl(data) {
      let name = data.clientBriefName
      let url = data.webServerRedirectUri
      if (url) {
        if (name.indexOf('wcd_') > -1) {
          let specificName = name.substring(4)
          let index = url.indexOf('?')
          let dataJSON = url.substring(index + 1)
          let userArr = this.base64.decode(dataJSON).split('-')
          if (userArr.length === 1) {
            userArr = this.base64.decode(dataJSON).split('/')
          }
          let user = {
            username: userArr[0].trim().substring(2),
            password: userArr[1].trim().substring(3)
          }
          this.hrefSpecificApp(specificName, user)
        } else {
          window.open(data.webServerRedirectUri)
        }
      } else {
        let dataStr = encodeURIComponent(this.base64.encode(JSON.stringify(data)))
        window.open('#/appdetail?app=' + dataStr)
      }
    },
    hrefSpecificApp(name, data) {
      let href = ''
      switch (name) {
        case 'skycyb':
          // 贵州省水库预测预报系统
          href = 'reservoirForecast'
          break
        case 'fxkhqsfx':
          // 防汛抗旱态势分析系统
          href = 'floodDrought'
          break
        case 'gyzhfxjc':
          // 贵阳市智慧防汛决策系统
          href = 'floodPrevention'
          break
        case 'gzstbcdsj':
          // 贵州水土保持大数据平台
          href = 'waterSolid'
          break
        default:
          break
      }
      let routerData = this.$router.resolve({ path: `/${href}?${encodeURIComponent(this.base64.encode(JSON.stringify(data)))}` })
      window.open(routerData.href, '_blank')
      // this.$router.push({ name: href, params: data })
    },
    handlerApps() {
      Promise.all([this.getAllApps(), this.getMyApps()]).then(reses => {
        let allApps = reses[0].data
        let myApps = reses[1].data
        let apps = allApps.map(item => {
          let findMyApp = myApps.find(app => {
            return item.clientId === app.clientId || item.clientName === app.clientName
          })
          return findMyApp || item
        })
        this.allApps = apps
        this.apps = apps
      })
    },
    deleteApp(data) {
      console.log('删除应用', data)
      this.$http.post('/api/client/unassign', { clientIds: [data.clientId] }).then(res => {
        if (res.code === 1002) {
          this.$message.success('已删除访问权限！')
          this.handlerApps()
        }
      })
    },
    applicateApp(data) {
      console.log('申请应用', data)
      this.$http.get(`/api/client/getApp/${data.clientId}`).then(res => {
        if (res.code === 1002) {
          this.$message.success('申请已提交，请耐心等管理员审批！')
          this.handlerApps()
        }
      })
    },
    searchApp() {
      let condition = this.appName
      if (!condition) {
        this.apps = this.allApps
        return
      }
      let allApps = this.allApps
      let apps = allApps.filter(item => {
        return item.clientName.indexOf(condition) > -1
      })
      this.apps = apps
    },
    showSearchPanel() {
      this.showSearch = !this.showSearch
    }
  },
  mounted() {
    this.handlerApps()
  }
}
</script>

<style lang="scss" scoped>
.app-search {
  width: 100%;
  text-align: right;
  margin: 30px 0;
  position: relative;
  & > div {
    width: 0;
    // margin-right: 60px;
    margin-right: -30px;
    overflow: hidden;
    vertical-align: initial;
    transition: width 0.2s ease;
    &.active {
      width: 350px;
    }
  }
}
.apps-module {
  width: 100%;
  height: calc(100vh - 2rem);
  overflow: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      // width: 260px;
      margin: 25px 0;
    }
  }
  .app-icon {
    & > div {
      width: 80px;
      height: 80px;
      padding: 12px;
      border-radius: 18px;
      margin: auto;
      box-shadow: #0c4e6d 0px 0px 1px inset;
      background: #fff;
      position: relative;
      &.app-owned {
        background: none;
      }
      &.app-application {
        filter: grayscale(1);
        &:hover {
          box-shadow: none;
          animation: none;
        }
        a {
          display: none;
        }
        & + span {
          filter: opacity(0.6);
        }
      }
      &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 18px 2px #b6cbe6;
        animation: change-shadow 1.8s ease-in infinite;
        & + span {
          filter: opacity(0.6);
        }
        a {
          top: -25px;
          z-index: 0;
        }
      }
      a {
        position: absolute;
        top: 0;
        color: #fff;
        background: #b4cbd8;
        padding: 3px 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        text-align: center;
        border-radius: 6px 6px 0 0;
        box-shadow: 0 0 5px 0 #c4e4f6 inset;
        transition: all 0.2s ease;
        z-index: -2;
        &:hover {
          background: #42afef;
        }
        &.delete-app-btn {
          &:hover {
            background: #f5ba0d;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    & > span {
      width: 100px;
      overflow: hidden;
      display: block;
      margin: 10px auto;
      text-align: center;
      color: #fff;
      &:hover {
        cursor: pointer;
        filter: opacity(0.6);
      }
    }
  }
}
</style>

<style lang="scss">
@media screen and (min-width:992px) {
  .el-app {
    width: 25%;
  }
}
@media screen and (min-width:1200px) {
  .el-app {
    width: 20%;
  }
}
@media screen and (min-width:1920px) {
  .el-app {
    width: 16.66%;
  }
}
.input-search-icon {
  &:hover {
    cursor: pointer;
  }
}
.search-input {
  input {
    background: transparent;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
  }
}
.app-shop {
  .app-search {
    .el-icon-search {
      font-size: 18px;
      color: #fff;
      position: absolute;
      top: 10px;
      z-index: 20;
    }
  }
}
</style>
