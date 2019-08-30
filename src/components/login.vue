<template>
  <div class="login">
    <div class="background-img"></div>
    <div class="content">
      <el-form ref="form"
               :model="form"
               label-width="40px">
        <div class="login-nav">
          <span>欢迎来到水利云</span>
        </div>
        <el-form-item>
          <i class="iconfont icon-zhanghao"></i>
          <el-input v-model="form.username"
                    placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <i class="iconfont icon-password"></i>
          <el-input v-model="form.password"
                    type="password"
                    placeholder="请输入密码"
                    @keyup.native.enter.stop="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label=""
                      class="valid-code">
          <i class="iconfont icon-yanzhengma2"></i>
          <el-input v-model="verifyCode"
                    placeholder="请输入验证码"></el-input>
          <div class="valid-img">
            <img :src="imgSrc"
                 alt="验证码"
                 @click="changePic">
          </div>
        </el-form-item>
        <!-- <div class="valid-code">
          <div>

          </div>
          <div>
            <img :src="imgSrc"
                 alt="验证码"
                 style="height:100%">
          </div>
        </div> -->
        <div v-show="errorFlag">
          <el-alert :title="errorText"
                    :closable="false"
                    type="error"
                    show-icon>
          </el-alert>
        </div>
        <div class="remember-me">
          <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
        </div>
        <el-form-item class="tool-bar">
          <el-button @click="onSubmit"
                     type="primary">登陆</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="完善信息"
               :visible.sync="personVisible"
               width="50%">
      <complete-person></complete-person>
    </el-dialog>
  </div>
</template>

<script>
import completePerson from './Manager/appManager/completeUserInfo'

export default {
  components: {
    'complete-person': completePerson
  },
  data() {
    return {
      form: {},
      personVisible: false,
      imgSrc: this.$store.state.BASE_URL + '/api/common/defaultKaptcha',
      // imgSrc: '',
      rememberMe: false,
      verifyCode: '',
      errorFlag: false,
      errorText: '账号或密码错误'
    }
  },
  methods: {
    changePic() {
      this.imgSrc = this.$store.state.BASE_URL + '/api/common/defaultKaptcha?id=' + new Date().getTime()
    },
    onSubmit() {
      let verifyCode = this.verifyCode
      if (!verifyCode.trim()) {
        this.errorText = '验证码为空！'
        this.errorFlag = true
        return
      }
      let username = this.form.username
      let password = this.form.password
      /* let str = '18fe7afa4b4b4bfd862e373d7c353a01:123456'
      let key = this.base64.encode(str) */
      this.$http({
        // url: '/api/oauth/token',
        url: '/api/authentication/form',
        method: 'post',
        data: {
          username: username,
          password: password,
          verifyCode: this.verifyCode,
          'remember-me': this.rememberMe
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          // Authorization: 'Basic ' + key
        },
        transformRequest: [
          data => {
            let ret = ''
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ]
      }).then(res => {
        if (res.code === 1002) {
          let userData = res.data
          // 存入用户信息
          let userInfo = { name: userData.username, id: userData.userId }
          this.$store.dispatch('setUser', userInfo)
          // 获取并存入最高角色信息
          let roles = userData.roles
          if (roles.length > 0) {
            roles.sort((param1, param2) => {
              return param2.weight - param1.weight
            })
          } else {
            this.$message.error('该用户没有角色，请给其分配合理的角色！')
            return
          }
          let role = roles[0]
          this.$store.dispatch('setRole', role)
          window.localStorage.APP_INFOMATION = this.base64.encode(JSON.stringify({ user: userInfo, role: role }))
          // 跳转首页
          this.$router.push({ path: '/' })
        } else {
          // this.$message.error(res.msg || res.error)
          this.errorText = res.msg || res.error
          this.errorFlag = true
        }
      }, thisErr => {
        this.$message.error('网络出错，请稍后再试')
      })
    }
  }
}
</script>
