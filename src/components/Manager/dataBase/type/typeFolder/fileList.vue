<template>
  <div class="databse-file-list">
    <ul>
      <li v-for="item in fileList"
          :key="item.id">
        <div :title="item.nodeName"
             class="file-operation">
          <img src="static/images/ui/wendang.png"
               alt="文档"
               @click="download(item.id)">
          <i class="iconfont"
             :class="checkList.indexOf(item.id) > -1 ? 'icon-check' : 'icon-check05'"
             @click="handlerSelect(item)"
             v-if="isEdit"></i>
        </div>
        <span :titl="item.name">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    isSelectAll: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      checkList: [],
      isChecked: false
    }
  },
  watch: {
    files: {
      handler(curData, oldData) {
        this.fileList = JSON.parse(JSON.stringify(curData))
      },
      deep: true
    },
    isSelectAll(curValue, oldValue) {
      if (curValue) {
        let files = this.files
        let ids = []
        files.map(item => {
          ids.push(item.id)
        })
        this.checkList = ids
      } else {
        this.checkList = []
      }
    }
  },
  methods: {
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
    },
    handlerSelect(data) {
      this.checkList.push(data.id)
      //   this.$set(this.checkList, data.id, true)
    }
  },
  created() {
    this.fileList = JSON.parse(JSON.stringify(this.files))
  }
}
</script>

<style lang="scss" scoped>
.databse-file-list {
  ul {
    display: flex;
    flex-wrap: wrap;
    max-height: 100%;
    overflow: auto;
    li {
      margin: 10px;
      div {
        margin: 10px 10px 2px;
        position: relative;
        img:hover {
          cursor: pointer;
        }
        i {
          position: absolute;
          right: 12px;
          color: #409eff;
          &.icon-check05 {
            color: #666;
          }
        }
      }
      span {
        width: 100px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
