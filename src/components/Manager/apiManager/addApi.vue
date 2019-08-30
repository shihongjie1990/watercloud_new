<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="100px">
    <el-form-item label="API名称："
                  prop="apiName">
      <el-input v-model="form.apiName"
                placeholder="请输入API名称，长度为2~32位。"></el-input>
    </el-form-item>
    <el-form-item label="域："
                  prop="url">
      <el-input v-model="form.url"
                placeholder='如：http://xxx.com/api的， "http://xxx.com"。'></el-input>
    </el-form-item>
    <el-form-item label="接口："
                  prop="path">
      <el-input v-model="form.path"
                placeholder='如：http://xxx.com/api的， "/api"。'></el-input>
    </el-form-item>
    <el-form-item label="更新频率"
                  prop="freshFrequency">
      <el-select v-model="form.freshFrequency"
                 placeholder="每天/每周/每月/每年">
        <el-option v-for="item in dateOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述："
                  prop="apiDesc">
      <el-input v-model="form.apiDesc"
                placeholder="请针对该API进行说明，包括其中的意义、数据和内容。"
                type="textarea"
                :rows="5"></el-input>
    </el-form-item>
    <el-form-item label="所属应用："
                  prop="clientId">
      <!-- <el-input v-model="form.clientId"
                placeholder="创建应用后，系统分配的应用ID。"></el-input> -->
      <el-select v-model="form.clientId"
                 placeholder="请选择应用">
        <el-option v-for="item in clientOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数据提供方："
                  prop="provider">
      <el-input v-model="form.provider"
                placeholder="数据的提供者。"></el-input>
    </el-form-item>
    <el-form-item label="公开范围："
                  prop="openLevel">
      <!-- <el-input v-model="form.openLevel"
                placeholder="对外全公开或对指定IP公开。"></el-input> -->
      <el-select v-model="form.openLevel"
                 placeholder="对外全公开/对指定IP公开。"
                 @change="changeOpenLevel">
        <el-option v-for="item in openLevelOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="指定IP："
                  prop="openIps"
                  v-if="showIps">
      <el-input v-model="form.openIps"
                type="textarea"
                :rows="5"
                placeholder='若多个IP，则用 ; 隔开，如：192.168.100.01;192.168.100.02。'></el-input>
    </el-form-item>
    <el-form-item label="请求方式："
                  prop="method">
      <el-input v-model="form.method"
                placeholder="GET/POST/PUT/DELETE等。"></el-input>
    </el-form-item>
    <el-form-item label="交互格式："
                  prop="format">
      <!-- <el-input v-model="form.format"
                placeholder="JSON/XML"></el-input> -->
      <el-select v-model="form.format"
                 placeholder="JSON/XML">
        <el-option v-for="item in formatOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请求参数："
                  prop="requestParam">
      <el-input v-model="form.requestParam"
                type="textarea"
                :rows="5"
                placeholder='如：{ "a": xxx, "b": xxx}'></el-input>
    </el-form-item>
    <el-form-item label="返回参数："
                  prop="responseParam">
      <el-input v-model="form.responseParam"
                type="textarea"
                :rows="5"
                placeholder='如：{ "code": 1 "msg":消息, "data": {}}'></el-input>
    </el-form-item>
    <div class="tool-bar">
      <el-button type="primary"
                 @click="api && Object.keys(api).length > 0 ? modifyApp() : onSubmit()">确定</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  props: ['api'],
  data() {
    return {
      form: {},
      rules: {
        apiName: [
          { required: true, message: '请输入API名称', trigger: 'blur' }
        ],
        apiDesc: [
          { required: true, message: '请输入API描述', trigger: 'blur' }
        ],
        webServerRedirectUri: [
          { required: true, message: '请输入API地址', trigger: 'blur' }
        ]
      },
      showIps: false,
      clientOptions: [],
      openLevelOptions: [
        { label: '对外完全公开', value: 0 },
        { label: '对指定IP公开', value: 1 }
      ],
      formatOptions: [
        { label: 'JSON', value: 0 },
        { label: 'XML', value: 1 }
      ],
      dateOptions: [
        { label: '每天', value: 'day' },
        { label: '每周', value: 'week' },
        { label: '每月', value: 'month' },
        { label: '每年', value: 'year' }
      ]
    }
  },
  /*  watch: {
     api: {
       handler(curData, oldData) {
         this.form = JSON.parse(JSON.stringify(curData))
       },
       deep: true
     }
   }, */
  methods: {
    getAllApps() {
      this.$http.get('/api/client/list').then(res => {
        if (res.code === 1002) {
          let data = res.data
          let options = []
          data.map(item => {
            options.push({
              label: item.clientName,
              value: item.clientId
            })
          })
          this.clientOptions = options
        }
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // let file = this.$refs.upload.uploadFiles[0]
          // this.form.icon = file
          this.$http.post('/api/api', this.form, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              this.$emit('getAllApis')
              this.$emit('closeApi')
              this.$message.success('创建成功!')
            } else if (res.code === 9997) {
              this.$message.warning('同一应用下不能有重复的API名称或接口地址！')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    modifyApp() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // let file = this.$refs.upload.uploadFiles[0]
          // this.form.icon = file
          this.$http.put('/api/client', this.form, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              this.$emit('getAllApis')
              this.$emit('closeApi')
              this.$message.success('修改成功!')
            } else if (res.code === 9997) {
              this.$message.warning('同一应用下不能有重复的API名称或接口地址！')
            } else {
              this.$message.error(res.msg)
            }
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
    changeOpenLevel(value) {
      if (value) {
        this.showIps = true
      } else {
        this.showIps = false
      }
    }
  },
  mounted() {
    this.getAllApps()
    if (this.api && Object.keys(this.api).length > 0) {
      this.form = this.api
    }
  }
}
</script>
