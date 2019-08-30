<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="140px">
    <!-- <el-form-item label="请选择父角色：">
      <el-select v-model="form.parentId"
                 placeholder="请选择">
        <el-option v-for="item in roleOptions"
                   :key="item.roleId"
                   :label="item.role"
                   :value="item.roleId">
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="角色名："
                  prop="description">
      <el-input v-model="form.description"
                placeholder="例如：访客"></el-input>
    </el-form-item>
    <el-form-item label="角色："
                  prop="role">
      <el-input v-model="form.role"
                placeholder="例如：GUEST"></el-input>
    </el-form-item>
    <el-form-item label="角色权重："
                  prop="weight">
      <el-input v-model="form.weight"
                placeholder="例如：2002"></el-input>
    </el-form-item>
    <el-row class="tool-bar">
      <el-button type="primary"
                 @click="Object.keys(role).length > 0 ? modifyRole() : onConfirm()">确认</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: ['role'],
  watch: {
    role: {
      handler(curData, oldData) {
        this.form = JSON.parse(JSON.stringify(curData))
      },
      deep: true
    }
  },
  data() {
    let validWeight = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error('请填写数字！'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        description: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请输入角色简称', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入角色权重', trigger: 'blur' },
          { validator: validWeight, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('/api/role', this.form, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              this.closeDialog()
              this.$message.success('添加成功！')
              this.$emit('getAllRoles')
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
    modifyRole() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.put('/api/role', this.form).then(res => {
            if (res.code === 1002) {
              this.$message.success('修改成功！')
              // 关闭弹窗
              this.$emit('closeDialog')
              // 刷新
              this.$emit('getAllRoles')
            }
          })
        }
      })
    }
  },
  mounted() {
    let role = this.role
    if (role && Object.keys(role).length > 0) {
      this.form = role
    }
  }
}
</script>
