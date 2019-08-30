<template>
  <div class="login-div">
    <div>
      <div class="overview-logo">
        <p>水利云</p>
      </div>
      <el-form ref="form"
               :model="form"
               label-width="40px"
               class="login-block">
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
      </el-form>
      <div v-show="errorFlag"
           class="message-div">
        <el-alert :title="errorText"
                  :closable="false"
                  type="error"
                  show-icon>
        </el-alert>
      </div>
      <div class="overview-remember-me">
        <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
      </div>
      <div class="login-btn">
        <el-button type="primary"
                   @click="onSubmit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import buildWebsocket from '@/Load-Module/application-websocket'
import administerPermission from '@/Load-Module/permission-administer'

export default {
  data() {
    return {
      rememberMe: false,
      form: {},
      imgSrc: this.$store.state.BASE_URL + '/api/common/defaultKaptcha',
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
      this.$http({
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
          /* // 存入用户信息
          let userInfo = { name: userData.username, id: userData.userId }
          this.$store.dispatch('setUser', userInfo)
          window.localStorage.USER_INFO = this.base64.encode(JSON.stringify(userData))
          // 设置是否登录的标识key
          this.$store.dispatch('setIsLogin', true)
          window.localStorage.IS_LOGIN = this.base64.encode(JSON.stringify({flag: true}))
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
          window.localStorage.APP_INFOMATION = this.base64.encode(JSON.stringify({ user: userInfo, role: role })) */
          // 登记用户信息
          administerPermission(userData)
          if (process.env.NODE_ENV !== 'development') {
            // websocket连接
            buildWebsocket(userData)
          }
          this.$emit('closeLogin')
          // 跳转首页
          this.$router.push({ path: '/home/user' })
        } else {
          this.errorText = res.msg || res.error
          this.errorFlag = true
          this.changePic()
        }
      }, thisErr => {
        if (thisErr.data && thisErr.data.code === 1003) {
          this.errorText = '账号或密码错误，请重新输入！'
          this.errorFlag = true
          this.changePic()
        } else {
          this.$message.error('网络出错，请稍后再试！')
        }
      })
    }
  }
}
</script>

<style>
.notify-btn-a {
  color: #000;
  margin-right: 6px;
}
</style>

<style lang="scss" scoped>
.login-div {
  width: 0;
  // height: 5rem;
  // padding: 0 30px;
  box-shadow: none;
  border-radius: 30px;
  transition: all 0.3s ease;
  overflow: hidden;
  &.active {
    width: 360px;
    box-shadow: #1c6d8e 1px 1px 25px 1px;
  }
  & > div {
    margin: 0 30px;
    position: relative;
  }
  .overview-logo > p {
    margin: 0;
    font-size: 36px;
    text-align: center;
    padding: 30px 0;
    color: #fff;
    text-shadow: 2px 2px 6px #1698f4;
    font-style: italic;
    min-width: 200px;
  }
  .login-block {
    div > i {
      position: absolute;
      font-size: 18px;
      left: -40px;
      width: 42px;
      height: 40px;
      text-align: center;
      background: #5f6a75;
      color: #fff;
      z-index: 1;
      border-radius: 4px 0 0 4px;
      background: #e2e2e2;
      box-sizing: border-box;
    }
  }
  .message-div {
    position: absolute;
    width: 100%;
  }
  .overview-remember-me {
    margin: 20px 10px;
    margin-top: 75px;
  }
  .login-btn {
    padding-bottom: 30px;
    button {
      width: 100%;
      border-radius: 30px;
    }
  }
  .valid-img {
    img {
      vertical-align: top;
    }
  }
}
</style>
