<template>
  <div class="my-app">
    <div class="title">
      <div>我的应用</div>
      <div>
        <span>可访问应用数</span>
        共<span>{{ count }}</span>个
      </div>
    </div>
    <div class="content">
      <el-carousel indicator-position="outside"
                   height="100%">
        <el-carousel-item v-for="(items, index) in apps"
                          :key="index">
          <ul v-if="items.length >= 0">
            <li v-for="(item, i) in items"
                :key="i"
                :class="!item.clientId ? 'not-access' : ''">
              <div @click="openAppUrl(item)">
                <img :src="`${$store.state.BASE_URL}/api/files/${item.icon}`"
                     :alt="item.clientName">
              </div>
              <a @click.prevent="openAppUrl(item)"
                 v-if="item.clientId">{{ item.clientName }}</a>
              <a v-else>{{ item.clientName }}</a>
              <!-- <div><i></i>角色： <span>{{ item.role || '' }}</span></div> -->
              <div style="height:0.2rem;"> </div>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    haveBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      apps: [],
      count: 0
    }
  },
  methods: {
    getMyApps() {
      this.$http.get('/api/client/list').then(res => {
        if (res.code === 1002) {
          // this.apps = res.data
          let data = res.data
          this.count = data.length
          // 重组数据,把还未审批的应用放在后面
          let accessApps = []
          let notAccessApps = []
          data.map(item => {
            if (item.clientId) {
              accessApps.push(item)
            } else {
              notAccessApps.push(item)
            }
          })
          // 重组为每5个为一组的数据
          let apps = this.handler5Apps(accessApps.concat(notAccessApps))
          this.apps = apps
        } else {
          this.$message.error(res.msg || res.content)
        }
      })
    },
    handler5Apps(data) {
      let apps = []
      for (let i = 0; i < data.length; i += 5) {
        let app = []
        for (let j = i; j < i + 5; j++) {
          if (!data[j]) {
            break
          }
          app.push(data[j])
        }
        apps.push(app)
      }
      return apps
    },
    openAppUrl(data) {
      let name = data.clientBriefName
      if (name.indexOf('wcd_') > -1) {
        let specificName = name.substring(4)
        let url = data.webServerRedirectUri
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
    }
  },
  mounted() {
    this.getMyApps()
  }
}
</script>

<style lang="scss" scoped>
.content {
  .not-access {
    img {
      filter: grayscale(1);
    }
    a {
      color: #999;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
