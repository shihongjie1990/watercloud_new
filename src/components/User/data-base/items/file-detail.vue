<template>
  <div class="padding-page">
    <el-row :gutter="20"
            class="overview-data-detail">
      <div class="top-title">
        <span>{{ itemData.name }}</span>
      </div>
      <el-col :span="24">
        <span>领域</span>
        <p><span>{{ itemData.field }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>数据提供方</span>
        <p><span>{{ itemData.owner }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>公开范围</span>
        <p><span>{{ itemData.type | filterType }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>摘要</span>
        <p><span>{{ itemData.desc }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>最后更新时间</span>
        <p><span>{{ itemData.updateTime }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>文件</span>
        <p>
          <span>{{ itemData.name }}</span>
          <a @click="downloadFile(itemData.id)">下载</a>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  filters: {
    filterType(value) {
      let text = ''
      if (value === 'public') {
        text = '公开'
      } else {
        text = '私有'
      }
      return text
    }
  },
  data() {
    return {
      // 下载文件
      downloadFile(id) {
        this.$http.get(`/api/resource/getRelativePaths/${id}`).then(res => {
          console.log('下载资源', res)
          let data = res.data
          let key = Object.keys(data)[0]
          let value = data[key]
          let param = this.base64.encode(this.base64.encode(`${key}|${value}`))
          window.open(`${location.origin}/api/resource/download/${param}`, '_blank')
        })
        // /resource/downloads
      }
    }
  }
}
</script>

<style>
</style>
