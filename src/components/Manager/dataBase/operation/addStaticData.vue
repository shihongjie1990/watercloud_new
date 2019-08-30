<template>
  <div class="new-static-data">
    <el-form ref="form"
             :model="form"
             label-width="150px">
      <!-- <el-form-item label="资源名称："
                    prop="name">
        <el-input v-model="form.name"
                  placeholder="请输入文档标题，长度为2~32位。"></el-input>
      </el-form-item> -->
      <div class="form-item-basic">
        <el-form-item label="资源类型："
                      prop="type">
          <el-select v-model="form.type"
                     placeholder="公开/私有">
            <el-option v-for="item in typeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源分类："
                      prop="group">
          <el-select v-model="form.group"
                     placeholder="所属领域">
            <el-option v-for="item in groupOptions"
                       :key="item.code"
                       :label="item.desc"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="摘要："
                      prop="desc">
          <el-input v-model="form.desc"
                    placeholder="请输入内容摘要，0~250字符"></el-input>
        </el-form-item> -->
        <el-form-item label="提供方："
                      prop="owner">
          <el-input v-model="form.owner"
                    placeholder="资源提供者，单位/个人"></el-input>
        </el-form-item>
        <el-form-item label="资源挂载文件夹："
                      prop="parentId">
          <el-tree :load="loadNode"
                   :props="defaultProps"
                   :check-strictly="true"
                   ref="nodeTree"
                   node-key="id"
                   lazy
                   accordion
                   show-checkbox
                   @check="handlerChange">
          </el-tree>
        </el-form-item>
      </div>
      <div class="form-item-upload">
        <el-form-item label="文件：">
          <el-upload class="dialog-upload"
                     ref="upload"
                     list-type="picture-card"
                     action=""
                     multiple
                     :auto-upload="false"
                     :on-change="changeFiles"
                     :before-remove="handlerRemoveFile">
            <i class="el-icon-plus"></i>
            <!-- <el-button slot="trigger"
                   size="small"
                   type="primary">选取文件</el-button> -->
            <!-- <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <ul class="pic-desc">
            <li v-for="item in descLen" :key="item">
              <el-input placeholder="请输入摘要"
                        type="textarea"
                        :rows="2"
                        v-model="desc[item - 1]"></el-input>
            </li>
          </ul>
        </el-form-item>
      </div>
      <div class="tool-bar">
        <el-button type="primary"
                   @click="staticData && Object.keys(staticData).length > 0 ? modifyData() : onSubmitData()">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    staticData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    groupOptions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      form: {},
      typeOptions: [
        {
          label: '公共',
          value: 'public'
        }, {
          label: '私有',
          value: 'private'
        }],
      defaultProps: {
        label: 'name',
        children: 'subNodesName',
        isLeaf: 'leaf'
      },
      descLen: 0,
      desc: []
    }
  },
  methods: {
    // 文件选择
    changeFiles(thisFile, files) {
      this.descLen += 1
      // 更换上传文件的背景图
      let fileContent = thisFile.raw
      if (fileContent.type.indexOf('.sheet') > 0) {
        thisFile.url = 'static/images/excel.jpg?time=' + new Date().getTime()
      } else if (fileContent.type.indexOf('.document') > 0) {
        thisFile.url = 'static/images/word.jpg?time=' + new Date().getTime()
      }
    },
    handlerRemoveFile(thisFile, allFiles) {
      let index = allFiles.findIndex(item => {
        return item.uid === thisFile.uid
      })
      this.desc.splice(index, 1)
      this.descLen -= 1
    },
    // 树节点选择
    loadNode(node, resolve) {
      let data = []
      let param = node.data ? `/${node.data.id}` : ''
      this.$http.get(`/api/resource/folder${param}`).then(res => {
        if (res.code === 1002) {
          data = res.data
        }
        resolve(data)
      })
    },
    handlerChange(node, typeNodes) {
      console.log(arguments)
      this.$refs.nodeTree.setCheckedKeys([node.id])
    },
    getDesc() {
      let descLen = this.descLen
      let descs = this.desc
      for (let i = 0; i < descLen; i++) {
        if (!descs[i]) {
          descs[i] = ''
        }
      }
      return descs
    },
    // 提交数据
    onSubmitData() {
      let form = this.form
      // 加入每个文件的摘要数据
      form.descs = this.getDesc()
      // 获取从树结构中获取的挂载点
      let nodeTree = this.$refs.nodeTree
      form.parentId = nodeTree.getCheckedNodes()[0].id
      // 文件上传
      let files = this.$refs.upload.uploadFiles
      this.$common.uploadFile(files, 'resource').then(res => {
        Object.assign(form, res)
        this.$http.post('/api/resource', form).then(result => {
          this.$emit('closeDialog')
          this.$emit('getAllStaticData')
        })
      })
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.staticData))
    // this.getGroups()
  }
}
</script>

<style lang="scss">
.new-static-data {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10px;
    box-sizing: border-box;
    justify-content: space-between;
    .form-item-basic {
      width: 45%;
    }
    .form-item-upload {
      width: 50%;
      border-left: 1px dashed #999;
    }
    .tool-bar {
      width: 100%;
      margin-top: 20px;
    }
    .el-form-item__content {
      position: relative;
    }
    .dialog-upload {
      ul {
        display: block;
        li {
          display: block;
        }
      }
    }
    .pic-desc {
        position: absolute;
        top: 0;
        margin-left: 90px;
        width: calc(100% - 90px);
        li {
          height: 80px;
          margin-bottom: 8px;
          &>div {
            height: 100%;
            textarea {
              height: 100%;;
            }
          }
        }
      }
  }
}
</style>
