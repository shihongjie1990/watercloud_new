<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="100px">
    <el-form-item label="姓名："
                  prop="name">
      <el-input v-model="form.name"
                placeholder="例：张三"></el-input>
    </el-form-item>
    <el-form-item label="身份证号："
                  prop="idNum">
      <el-input v-model="form.idNum"
                placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="性别："
                  prop="gender">
      <el-radio v-model="form.gender"
                :label="0">女</el-radio>
      <el-radio v-model="form.gender"
                :label="1">男</el-radio>
    </el-form-item>
    <el-form-item label="手机号："
                  prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <!-- <el-form-item label="出生年月：">
      <el-date-picker v-model="form.birthday"
                      type="date"
                      value-format="yyyyMMdd"
                      format="yyyyMMdd"
                      placeholder="选择日期">
      </el-date-picker>
    </el-form-item> -->
    <el-form-item label="企业名称："
                  prop="orgName">
      <el-input v-model="form.orgName"></el-input>
    </el-form-item>
    <el-form-item label="所在部门："
                  prop="department">
      <el-input v-model="form.department"></el-input>
    </el-form-item>
    <el-form-item label="职位："
                  prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <div class="tool-bar">
      <el-button type="primary"
                 @click="onSubmit">确认</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    let validIdNum = (rule, value, callback) => {
      let regExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))((\d{4})|\d{3}[Xx])$)$/
      let flag = regExp.test(value)
      if (flag) {
        callback()
      } else {
        callback(new Error('身份证号码不正确，请重新输入！'))
      }
    }
    let validPhone = (rule, value, callback) => {
      let regExp = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)[0-9]{8}/
      let flag = regExp.test(value)
      if (!flag) {
        callback(new Error('手机号不正确，请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        gender: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validIdNum, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('/api/person', this.form).then(res => {
            if (res.code === 1002) {
              this.$emit('colseCompletePerson')
              this.$emit('getApps')
              this.$store.dispatch('setUserFlag', false)
              window.location.reload()
            } else {
              this.$message.error(res.msg)
            }
          }, thisErr => {
            this.$message.error(thisErr.content || thisErr.message)
          })
        }
      })
    },
    validFrom() {
      let form = this.form
      let flag = false
      if (!form.name || !form.idNum) {
        flag = false
        this.$message.warning('必须输入姓名和身份证号')
      } else {
        flag = true
      }
      return flag
    }
  }
}
</script>
