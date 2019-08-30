<template>
  <el-form ref="form"
           label-width="80px"
           :rules="rules"
           :model="form">
    <el-form-item label="组名："
                  prop="groupName">
      <el-input v-model="form.groupName"
                placeholder="请输入组名"></el-input>
    </el-form-item>
    <el-row class="tool-bar">
      <el-button type="primary"
                 @click="group && Object.keys(group).length > 0 ? modifyGroup() : onConfirm()">确认</el-button>
      <el-button @click="$emit('closeGroup')">取消</el-button>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: ['group'],
  watch: {
    group: {
      handler(curData, oldData) {
        if (curData && Object.keys(curData).length > 0) {
          this.form.groupName = curData.name
        } else {
          this.groupName = ''
        }
      },
      deep: true
    }
  },
  data() {
    return {
      groupName: '',
      form: {},
      rules: {
        groupName: [
          { required: true, message: '请输入组名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('/api/group?name=' + this.form.groupName, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              // 刷新
              // this.$emit('refreshGroupList')
              // this.$message.success('分组添加成功！')
              // 关闭弹窗
              // this.$emit('closeGroup')
              this.$emit('assignMainUser')
            }
          })
        }
      })
    },
    modifyGroup() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let param = {
            name: this.groupName,
            groupId: this.group.groupId
          }
          this.$http.put(`/api/group`, param, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              // 刷新
              this.$emit('refreshGroupList')
              this.$message.success('修改成功！')
              // 关闭弹出框
              this.$emit('closeGroup')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    validationForm() {
      let data = this.groupName
      if (!data) {
        this.$message.warning('请填写组名！')
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    let group = this.group
    if (group && Object.keys(group).length > 0) {
      this.form.groupName = group.name
    }
  }
}
</script>
