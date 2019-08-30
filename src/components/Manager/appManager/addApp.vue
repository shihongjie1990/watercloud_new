<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="100px">
    <el-form-item label="英文简称："
                  prop="clientBriefName">
      <el-input v-model="form.clientBriefName"
                placeholder="英文简称，由4~14位英文字母，数字和下划线组成"></el-input>
    </el-form-item>
    <el-form-item label="中文名称："
                  prop="clientName">
      <el-input v-model="form.clientName"
                placeholder="中文名称，由4~16个中文、英文字母和数字组成"></el-input>
    </el-form-item>
    <el-form-item label="地址："
                  prop="webServerRedirectUri">
      <el-input v-model="form.webServerRedirectUri"
                placeholder="回调地址，如：http://www.baidu.com"></el-input>
    </el-form-item>
    <el-form-item label="授权分组："
                  v-if="isAdmin"
                  prop="groupId">
      <el-select v-model="form.groupId"
                 placeholder="请选择分组">
        <el-option v-for="item in options"
                   :key="item.groupId"
                   :label="item.name"
                   :value="item.groupId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述"
                  prop="clientDesc">
      <el-input v-model="form.clientDesc"
                type="textarea"
                :rows="5"
                placeholder="描述简介由10~500个中文、英文字母、数字组成"></el-input>
    </el-form-item>
    <el-form-item label="图标：">
      <el-upload class="dialog-upload"
                 ref="upload"
                 list-type="picture-card"
                 action=""
                 :on-preview="$common.showFullScreenPic"
                 :limit='2'
                 :auto-upload="false"
                 :on-change="changeFiles">
        <i class="el-icon-plus"></i>
        <!-- <el-button slot="trigger"
                   size="small"
                   type="primary">选取文件</el-button> -->
        <!-- <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </el-form-item>
    <el-row class="tool-bar">
      <el-button type="primary"
                 @click="appInfo && Object.keys(appInfo).length > 0 ? onSubmit() : modifyApp()">确定</el-button>
      <!-- <el-button type="primary"
                 @click="$emit('closeGroup')">取消</el-button> -->
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: ['appInfo'],
  data() {
    let validUrl = (rule, value, callback) => {
      let reg = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/  // eslint-disable-line
      if (reg.test(value)) {
        return callback()
      } else {
        return callback(new Error('地址格式有误!'))
      }
    }
    let validEnName = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_]{4,14}$/
      if (reg.test(value)) {
        return callback()
      } else {
        return callback(new Error('英文简称格式有误！'))
      }
    }
    let validCnName = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{4,16}$/
      if (reg.test(value)) {
        return callback()
      } else {
        return callback(new Error('中文名称格式有误！'))
      }
    }
    let validDesc = (rule, value, callback) => {
      let flag = value.length > 9 && value.length < 501
      if (flag) {
        return callback()
      } else {
        return callback(new Error('描述文字长度不满足条件！'))
      }
    }
    return {
      form: {},
      options: [],
      rules: {
        clientBriefName: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
          { validator: validEnName, trigger: 'blur' }
        ],
        clientName: [
          { required: true, message: '请输入中文名称', trigger: 'blur' },
          { validator: validCnName, trigger: 'blur' }
        ],
        clientDesc: [
          { required: true, message: '请输入应用描述', trigger: 'blur' },
          { validator: validDesc, trigger: 'blur' }
        ],
        webServerRedirectUri: [
          { required: true, message: '请输入应用访问地址', trigger: 'blur' },
          { validator: validUrl, trigger: 'blur' }
        ],
        groupId: [
          { required: true, message: '请选择需要授权的分组', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.USER === 'admin'
    }
  },
  watch: {
    appInfo: {
      handler(curData, oldData) {
        this.form = JSON.parse(JSON.stringify(curData))
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      let _this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          // let file = this.$refs.upload.uploadFiles[0]
          let files = this.$refs.upload.uploadFiles
          this.$common.uploadFile(files).then(id => {
            this.form.tempFolderRelativePath = id
            this.$http.post('/api/client', this.form, { loading: { operation: true } }).then(res => {
              if (res.code === 1002) {
                let data = res.data
                this.$alert(`您的应用密码是<span style="color:#ff5555;font-size: 18px;">${data.clientSecret}</span>，请牢记！`, '提示', {
                  confirmButtonText: '确定',
                  dangerouslyUseHTMLString: true,
                  callback: action => {
                    _this.$emit('getApps')
                    _this.$emit('closeGroup')
                    _this.$message.success('创建成功!')
                  }
                })
              } else {
                this.$message.error(res.msg || res.content || res.error)
              }
            })
          })
        }
      })
    },
    modifyApp() {
      /* let files = this.$refs.upload.uploadFiles
      this.$common.uploadFile(files).then(id => { debugger }) */
      this.$refs.form.validate(valid => {
        if (valid) {
          // let file = this.$refs.upload.uploadFiles[0]
          let files = this.$refs.upload.uploadFiles
          this.$common.uploadFile(files).then(id => {
            this.form.tempFolderRelativePath = id
            this.$http.put('/api/client', this.form, { loading: { operation: true } }).then(res => {
              if (res.code === 1002) {
                this.$emit('getApps')
                this.$emit('closeGroup')
                this.$message.success('修改成功!')
              } else {
                this.$message.error(res.msg || res.content || res.error)
              }
            })
          })
        }
      })
    },
    changeFiles(thisFile, files) {
      let upload = this.$refs.upload
      if (files.length > 1) {
        upload.handleRemove(files[0])
      }
    },
    getGroup() {
      this.$http.get('/api/group/list').then(res => {
        if (res.code === 1002) {
          this.options = res.data
        }
      })
    }
  },
  mounted() {
    this.form = this.appInfo
    this.getGroup()
  }
}
</script>
