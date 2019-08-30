<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="140px">
    <el-form-item label="请选择分组："
                  v-if="options.length > 0"
                  prop="groupId">
      <el-select v-model="form.groupId"
                 placeholder="请选择分组">
        <el-option v-for="item in options"
                   :key="item.groupId"
                   :label="item.name"
                   :value="item.groupId">
        </el-option>
      </el-select>
      <el-button icon="el-icon-plus"
                 @click="$emit('addGroup')"
                 title="新增分组"></el-button>
    </el-form-item>
    <el-form-item label="请选择上一级账号："
                  v-if="userOptions.length > 0">
      <el-select v-model="form.parentId"
                 placeholder="请选择上一级账号">
        <el-option v-for="item in userOptions"
                   :key="item.userId"
                   :label="item.username"
                   :value="item.userId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="用户名："
                  prop="username">
      <el-input v-model="form.username"
                placeholder="例如：test"></el-input>
    </el-form-item>
    <el-form-item label="密码："
                  v-if="!user || Object.keys(user) < 1"
                  prop="password">
      <el-input v-model="form.password"
                placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码："
                  v-if="!user || Object.keys(user) < 1"
                  prop="rePassword">
      <el-input v-model="form.rePassword"
                placeholder="请再次确认密码"></el-input>
    </el-form-item>
    <el-row class="tool-bar">
      <el-button type="primary"
                 @click="user && Object.keys(user).length > 0 ? modifyConfirm() : addConfirm()">确认</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: ['user', 'modifyFlag'],
  computed: {
    isModify() {
      return this.user && Object.keys(this.user)
    }
  },
  watch: {
    user: {
      handler(curData, oldData) {
        if (curData) {
          this.form = JSON.parse(JSON.stringify(curData))
          if (Object.keys(curData) > 0) {
          }
        }
      },
      deep: true
    },
    'form.groupId'(CurValue, oldValue) {
      let param
      if (this.isModify) {
        param = { type: 'manager', group: CurValue, userId: this.user.userId }
      } else {
        param = { type: 'manager', group: CurValue }
      }
      this.$http
        .get('/api/user/list', { params: param })
        .then(res => {
          if (res.code === 1002) {
            let data = res.data
            this.userOptions = data
            this.form.parentId = data[0].userId
          }
        })
    }
  },
  data() {
    return {
      form: {},
      options: [],
      userOptions: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请再次确认密码', trigger: 'blur' }
        ],
        groupId: [
          { required: true, message: '请选择分组', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getGroup() {
      this.$http.get('/api/group/list').then(res => {
        if (res.code === 1002) {
          this.options = res.data
        }
      })
    },
    getManager() {
      this.$http
        .get('/api/user/list', { params: { type: 'manager' } })
        .then(res => {
          if (res.code === 1002) {
            this.userOptions = res.data
          }
        })
    },
    addConfirm() {
      // let username = this.form.username
      // let groupId = this.form.groupId
      // let parentId = this.form.parentId
      // let valid = this.validateForm
      this.$refs.form.validate(valid => {
        if (valid) {
          let password = this.form.password
          let reassword = this.form.rePassword
          if (password === reassword) {
            this.$http.post('/api/user', this.form, { loading: { operation: true } }).then(
              res => {
                if (res.code === 1002) {
                  this.closeDialog()
                  this.$message.success('添加成功！')
                  this.$emit('getAllUsers')
                  this.form = {}
                } else {
                  this.$message.error(res.msg)
                }
              },
              errMsg => {
                this.$message.error('添加失败！' + errMsg)
              }
            )
          } else {
            this.$message.error('两次密码输入不一致，请重新输入')
            this.form.repassword = ''
          }
        }
      })
    },
    modifyConfirm() {
      // let valid = this.validateForm
      this.$refs.form.validate(valid => {
        if (valid) {
          let form = this.form
          let params = {
            userId: form.userId,
            username: form.username,
            groupId: form.groupId,
            parentId: form.parentId
          }
          this.$http.put('/api/user', params, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              this.$message.success('修改成功！')
              // 关闭弹出框
              this.closeDialog()
              // 刷新
              this.$emit('getAllUsers')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    validateForm() {
      let form = this.form
      if (!form || Object.keys(form).length < 5) {
        this.$messge.warning('请填写完整！')
        return false
      } else {
        return true
      }
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  },
  mounted() {
    let data = JSON.parse(JSON.stringify(this.user))
    if (data && Object.keys(data).length > 0) {
      this.form = data
    }
    this.getGroup()
    // this.getManager()
  }
}
</script>
