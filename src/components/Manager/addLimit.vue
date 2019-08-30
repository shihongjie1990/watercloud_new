<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="140px">
    <el-form-item label="请选择父节点："
                  prop="parentId">
      <el-select v-model="form.parentId"
                 placeholder="请选择父节点">
        <el-option v-for="item in options"
                   :key="item.permissionId"
                   :label="item.name"
                   :value="item.permissionId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="权限点："
                  prop="name">
      <el-input v-model="form.name"
                placeholder="例如：XX权限"></el-input>
    </el-form-item>
    <el-form-item label="权限接口："
                  prop="permission">
      <el-input v-model="form.permission"
                placeholder="例如：/test"></el-input>
    </el-form-item>
    <el-form-item label="请求方式"
                  prop="requestMethod">
      <el-input v-model="form.requestMethod"
                placeholder="例如：POST"></el-input>
    </el-form-item>
    <el-row class="tool-bar">
      <el-button type="primary"
                 @click="modifyFlag ? modifyPermission() : onConfirm()">确认</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: ['permission'],
  data() {
    return {
      form: {},
      options: [],
      rules: {
        parentId: [
          { required: true, message: '请选择父节点', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        permission: [
          { required: true, message: '请输入权限接口', trigger: 'blur' }
        ],
        requestMethod: [
          { required: true, message: '请输入请求方式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    modifyFlag() {
      return this.permission && Object.keys(this.permission).length > 0
    }
  },
  watch: {
    permission: {
      handler(curData, oldData) {
        this.form = JSON.parse(JSON.stringify(curData))
      },
      deep: true
    }
  },
  methods: {
    getManager() {
      this.$http.get('/api/permission/listNodes').then(res => {
        if (res.code === 1002) {
          this.options = res.data
        }
      })
    },
    onConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('/api/permission', this.form, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              this.closeDialog()
              this.$message.success('添加成功！')
              this.$emit('getAllLimits')
              this.form = {}
            } else {
              this.$message.error(res.msg)
            }
          }, errMsg => {
            this.$message.error('添加失败！' + errMsg)
          })
        }
      })
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    modifyPermission() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.put('/api/permission', this.form).then(res => {
            if (res.code === 1002) {
              this.$message.success('修改成功！')
              // 关闭弹窗
              this.$emit('closeDialog')
              // 刷新
              this.$emit('getAllLimits')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  },
  mounted() {
    if (this.modifyFlag) {
      this.form = JSON.parse(JSON.stringify(this.permission))
    }
    this.getManager()
  }
}
</script>
