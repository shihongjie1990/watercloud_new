<template>
  <div class="data-menu">
    <div class="title">
      <div><span v-if="showTitle"
              @click="$router.push('/home/staticData')">数据目录</span></div>
      <div>
        <span>已授权数据目录</span>
        共<span>{{ datas.length }}</span>条
      </div>
    </div>
    <div class="content">
      <div>
        <ul>
          <li v-for="item in datas"
              :key="item.id">
            <div @click="downloadFile(item.id)">
              <img src="static/images/ui/wendang.png"
                   alt="文档"
                   :title="item.name">
              <div :title="item.name">{{ item.name }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      datas: []
    }
  },
  methods: {
    getDataMenu() {
      this.$http.get('/api/resource/public/hotRanking/8/desc').then(res => {
        this.datas = res.data
      })
    },
    viewFile(node) {
      // window.open(`https://view.officeapps.live.com/op/view.aspx?src=http://watercloud.natapp1.cc/portal-server/`)
    },
    downloadFile(id) {
      this.$http.get(`/api/resource/getRelativePaths/${id}`).then(res => {
        console.log('下载资源', res)
        let data = res.data
        let key = Object.keys(data)[0]
        let value = data[key]
        let param = this.base64.encode(this.base64.encode(`${key}|${value}`))
        window.open(`${location.origin}/api/resource/download/${param}`, '_blank')
      })
    }
  },
  created() {
    this.getDataMenu()
  }
}
</script>

<style lang="scss" scoped>
.data-menu {
  .title {
    & > div {
      & > span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
