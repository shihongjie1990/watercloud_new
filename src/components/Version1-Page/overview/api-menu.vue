<template>
  <div style="height:auto;display:block;width: 1200px;">
    <div class="type-operation">
      <!-- <el-button type="primary"
                 @click.stop="list = true">change</el-button>
      <el-button type="primary"
                 @click.stop="list = false">reset</el-button> -->
      <div>
        <a @click.stop="list = true"
           :class="list?'active':''"><i class="icon iconfont icon-blocks"></i></a>
        <a @click.stop="list = false"
           :class="!list?'active':''"><i class="icon iconfont icon-List "></i></a>
      </div>
    </div>
    <div :class="list?'api-menu change list-animation':'api-menu block-animation'">
      <div v-for="(node, index) in pageData"
           :key="index+'first'"
           @click.stop="">
        <div class="cell-block"
             v-for="(item, itemIndex) in node"
             :key="itemIndex">
          <div class="title">
            <span @click.stop="skipTo(item)">{{ item.apiName }}</span>
            <span>{{ item.openLevel | level }}</span>
          </div>
          <div class="sub-title">{{ item.provider }}</div>
          <div class="desc">{{ item.apiDesc }}</div>
          <div class="date">{{ item.updateTime | formatDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageData: [],
      list: false
    }
  },
  filters: {
    level: value => {
      return value ? '对指定IP公开' : '对外完全公开'
    }
  },
  methods: {
    skipTo(rowData) {
      this.$router.push({ name: 'apiDetail', params: rowData })
    },
    getAllApis() {
      this.$http.get('/api/api/list').then(res => {
        if (res.code === 1002) {
          let data = res.data
          let pageData = []
          for (let i = 0; i < data.length; i += 3) {
            let arrThree = [data[i]]
            data[i + 1] && arrThree.push(data[i + 1])
            data[i + 2] && arrThree.push(data[i + 2])
            pageData.push(arrThree)
          }
          this.pageData = pageData
        }
      })
    }
  },
  mounted() {
    this.getAllApis()
  }
}
</script>
