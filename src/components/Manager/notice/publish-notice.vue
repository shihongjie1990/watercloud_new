<template>
  <div class='publish-notice'>
    <div>
      <span>发布公告</span>
    </div>
    <el-form ref="form"
             :model="form"
             label-width="120px"
             :rules="rules">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="form.title"
                  class="form-item"></el-input>
      </el-form-item>
      <!-- <el-form-item label="关键字">
        <el-input v-model="form.keyword"
                  class="form-item"></el-input>
      </el-form-item> -->
      <el-form-item label="内容"
                    prop="content">
        <!-- <el-input type="textarea" :rows='10' v-model="form.content"></el-input> -->
        <div id='editor_content'
             class="form-item"></div>
      </el-form-item>
      <el-form-item label="上传附件">
        <el-upload class="upload-demo"
                   action=""
                   ref="fileUpload"
                   multiple
                   :auto-upload="false"
                   :file-list="fileList">
          <el-button size="small"
                     type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitAll">{{ old?'修改':'发布' }}</el-button>
        <el-button type='success'
                   @click='preview'>预览</el-button>
      </el-form-item>
    </el-form>
    <transition name="el-fade-in">
      <div class="self-dialog"
           v-if="previewVisible">
        <div class="dialog-area">
          <i class="el-icon-close"
             @click.stop="previewVisible = false"></i>
          <notice-preview :noticeData="form"></notice-preview>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import E from 'wangeditor'
import noticePreview from './notice-preview'

export default {
  components: {
    noticePreview
  },
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      editor: '',
      fileList: [],
      old: false,
      loadHtml: '',
      rules: {
        title: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      previewVisible: false
    }
  },
  methods: {
    getFormData() {
      let formData = this.form
      let curDate = new Date()
      formData.time = curDate.toISOString().substring(0, 10) + ' ' + curDate.toTimeString().substring(0, 8)
      return formData
    },
    submitAll() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 上传
          let files = this.$refs.fileUpload.uploadFiles
          this.$common.uploadFile(files).then(id => {
            this.form.tempFolderRelativePath = id
            if (this.old) {
              this.modify()
            } else {
              this.publish()
            }
          })
        }
      })
    },
    publish() {
      // 提交
      this.$http.post('/api/announcement', this.form).then(res => {
        if (res.code === 1002) {
          this.$message({
            type: 'success',
            message: '发布成功！'
          })
          this.form = {} // 清空数据
          this.editor.txt.html('') // 清空富文本
          this.$refs.fileUpload.clearFiles() // 清空上传组件
          this.$router.push('/notice')
        }
      })
    },
    modify() {
      this.$http.put('/api/announcement', this.form).then(res => {
        if (res.code === 1002) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.form = {} // 清空数据
          this.editor.txt.html('') // 清空富文本
          this.$refs.fileUpload.clearFiles() // 清空上传组件
          this.$router.push({ name: '公告管理' })
        }
      })
    },
    preview() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let files = this.$refs.fileUpload.uploadFiles
          let fileList = []
          files.map(item => {
            fileList.push({name: item.name})
          })
          this.form.fileList = fileList
          this.$nextTick(() => {
            this.previewVisible = true
          })
          /* let files = this.$refs.fileUpload.uploadFiles
          let formData = this.getFormData()
          formData.fileList = files */
        }
      })
    },
    newImport(data) {
      let thisRequest = this.$http.post('http://localhost:8080/api/file/uploadtempfiles', data).then((res) => { // 成功后回调
        if (res.code === 1002) {
          this.form.attachment = res.data
        }
      }, (thisErr) => {
        console.log(thisErr.msg)
      })
      return thisRequest
    }
  },
  mounted() {
    let _this = this
    // 富文本编辑器初始化
    let editor = new E('#editor_content')
    editor.customConfig.uploadImgServer = this.$store.state.BASE_URL + '/api/file/editor/uploads'
    editor.customConfig.customAlert = (info) => {
      // info 是需要提示的内容
      _this.$message.info(info)
    }
    editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result, editor) => {
        if (result.code === 1002) {
          let url = []
          let data = result.data.data
          data.map(item => {
            url.push(this.$store.state.BASE_URL + '/api' + item)
          })
          insertImg(url)
        } else {
          _this.$message.error(result.msg || result.content)
        }
      }
    }
    editor.customConfig.uploadFileName = 'image'
    editor.customConfig.onchange = (html) => {
      this.form.content = html
    }
    editor.create()
    this.editor = editor
  }
}
</script>
