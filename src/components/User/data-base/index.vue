<template>
  <div class="data-base">
    <el-form ref="form"
             :gutter="20">
      <el-form-item>
        <el-radio-group v-model="form.type"
                        @change="handleSelect($event, 0)">
          <el-radio-button v-for="item in types"
                           :key="item.nodeId"
                           :label="item.nodeId">
            {{ item.nodeName }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-for="(items, index) in datas"
                    :key="index">
        <el-radio-group v-model="form.data[index]"
                        @change="handleSelect($event, index + 1)">
          <el-radio v-for="item in items"
                    :key="item.nodeId"
                    :label="item.nodeId"
                    border
                    size="small">
            {{ item.nodeName }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="data-file-list">
          <ul>
            <li v-for="item in list"
                :key="item.nodeId">
              <div :title="item.nodeName" @click="showFile(item.nodePath)">
                <img src="static/images/ui/wendang.png"
                     alt="文档">
              </div>
              <span :titl="item.nodeName">{{ item.nodeName }}</span>
            </li>
          </ul>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      form: {
        type: '',
        data: []
      },
      nodeId: '',
      types: [],
      datas: [],
      list: [],
      rootPath: []
    }
  },
  methods: {
    getApis(params) {
      return this.$http.get('/api/resource/shared', { params: params })
    },
    handleSelect(nodeId, key) {
      //   清空当前展示的选择项
      this.datas.splice(key)
      this.rootPath.splice(key + 1)
      this.list = []
      //   重新获取选择项
      let datas = this.datas
      this.$nextTick(() => {
        this.getApis({ nodeId: nodeId }).then(res => {
          let data = res.data
          let listData = data.subNodes
          this.rootPath.push(data.nodePath)
          // 判断是否有子节点
          if (listData && listData.length > -1) {
            // 判断是否是文件
            let firstData = listData[0]
            if (firstData.nodePath.indexOf('.') > 0) {
              this.list = listData
            } else {
              datas.push(listData)
            }
          } else {
            this.$message.warning('这是一个文件')
          }
          //   this.datas = datas
          // 初始化选择值
          this.form.data.splice(key)
          this.nodeId = ''
        })
      })
    },
    showFile(path) {
      window.open(location.origin + this.$store.state.BASE_URL + '/api' + this.rootPath.join('') + path)
    }
  },
  mounted() {
    this.getApis().then(res => {
      let data = res.data
      this.types = data.subNodes
      this.rootPath.push(data.nodePath)
    })
  }
}
</script>

<style lang="scss" scoped>
.data-base {
  .el-radio {
    color: #fff;
    margin-right: 0.1rem;
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }
  .data-file-list {
    margin: 0.5rem 0;
    height: calc(100vh - 4rem);
    overflow: auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      color: #fff;
      li {
        width: 100px;
        text-align: center;
        padding: 0 0.1rem;
        span {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          display: block;
          text-overflow: ellipsis;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
            color: #f5ba0d;
          }
        }
        img:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
