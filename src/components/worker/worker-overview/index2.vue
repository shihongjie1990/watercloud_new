<template>
  <div class="worker-overview">
    <div class="overview-api-list">
      <div class="title">
        <span>动态数据接口</span>
      </div>
      <ul>
        <li v-for="item in apis"
            :key="item.id"
            @click="hrefTo(item)">
          <div>
            <div><span>{{ item.apiName }}</span>
              <div>提供方：<span>{{ item.provider }}</span></div>
            </div>
            <div><span>{{ item.url }}</span>
              <div>更新时间：<span>{{ item.updateTime }}</span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="stage-detail">
      <stage-measure :system="system1"></stage-measure>
      <stage-measure :system="system2"></stage-measure>
      <div class="detail-dialog"
           :class="{'active': isActive}">
        <i @click="closeDetailDialog">x</i>
        <api-detail :data="apiDetail"></api-detail>
      </div>
    </div>
  </div>
</template>

<script>
import stageMeasure from './blocks/stage-measure'
import apiDetail from './items/api-detail'

export default {
  components: {
    stageMeasure,
    apiDetail
  },
  data() {
    return {
      apis: [],
      isActive: false,
      system1: {
        cpu: 7,
        chart: {
          percent: 7,
          name: '节点状态'
        },
        nodes: [
          {
            name: '部署',
            icon: 'deploy1.png',
            count: 34
          }, {
            name: '守护进程集',
            icon: 'guard1.png',
            count: 11
          }, {
            name: '容器组',
            icon: 'Container1.png',
            count: 69
          }, {
            name: '储存卷',
            icon: 'Storage1.png',
            count: 11
          }
        ]
      },
      system2: {
        cpu: 36,
        chart: {
          percent: 37,
          name: '本地储存'
        },
        nodes: [
          {
            name: '账号管理',
            icon: 'icon_user1.png',
            count: 9
          }, {
            name: '企业空间',
            icon: 'appwarehouse1.png',
            count: 8
          }, {
            name: '应用路由',
            icon: 'route1.png',
            count: 0
          }, {
            name: '项目',
            icon: 'app1.png',
            count: 21
          }
        ]
      },
      menu: {
        data: [{
          node: '首页',
          url: '/home/developer',
          id: 'my_home'
        }, {
          node: '动态数据接口',
          url: '#',
          id: 'dynamic_api'
        }, {
          node: '平台总览',
          url: '/home/stageStatics',
          id: 'system_overview'
        }],
        activeNode: 'my_home'
      },
      apiDetail: {}
    }
  },
  methods: {
    getApis() {
      this.$http.get('/api/api/listPublic').then(res => {
        let data = res.data
        this.apis = data
      })
    },
    hrefTo(data) {
      let apiDetail = this.apiDetail
      let keys = Object.keys(apiDetail)
      let isSame = true
      for (let key in data) {
        if (keys.indexOf(key) === -1 || apiDetail[key] !== data[key]) {
          isSame = false
          break
        }
      }
      this.isActive = false
      if (!isSame) {
        let _this = this
        setTimeout(function() {
          _this.apiDetail = data
          _this.isActive = true
        }, 350)
      }
    },
    closeDetailDialog() {
      this.isActive = false
    }
  },
  mounted() {
    this.getApis()
    this.$store.dispatch('setLoggedMenu', this.menu)
  }
}
</script>

<style lang="scss" scoped>
.worker-overview {
  display: flex;
  width: 100%;
  .stage-detail {
    position: relative;
    & > div {
      transform: scale(0.85);
    }
    & > .detail-dialog {
      position: absolute;
      top: -0.29rem;
      background: rgba(21, 30, 38, 0.9);
      box-shadow: 0px 0px 20px 1px #607c80;
      right: 0;
      height: 7.25rem;
      border-radius: 0.1rem;
      overflow: hidden;
      width: 0;
      transition: all 0.3s ease;
      overflow: hidden;
      &.active {
        width: 100%;
      }
      & > div {
        width: 4.8rem;
      }
      & > i {
        font-size: 0.2rem;
        color: #fff;
        font-style: normal;
        position: absolute;
        top: 0;
        right: 0.15rem;
        cursor: pointer;
      }
    }
  }
  .overview-api-list {
    margin-top: 0.25rem;
    width: calc(100% - 4.8rem);
    .title {
      font-size: 0.24rem;
      text-align: center;
      width: 100%;
      color: #2ac1db;
      margin: 0.1rem 0;
    }
    ul {
      height: 5.4rem;
      overflow-y: auto;
    }
    li > div {
      padding: 0.08rem 0.2rem;
      background: rgba(19, 96, 131, 0.3);
      margin-bottom: 0.06rem;
      color: #ccc;
      &:hover {
        cursor: pointer;
      }
      & > div:first-child {
        height: 0.3rem;
        line-height: 0.3rem;
        & > span:first-child {
          font-size: 0.15rem;
          color: #57adcf;
          text-shadow: 2px 1px 1px #000;
        }
        & > div > span {
          color: #f5ba0d;
        }
      }
      & > div:last-child > span:first-child {
        color: #c8e0eb;
      }
      & > div > div:last-child {
        float: right;
      }
    }
  }
}
</style>
