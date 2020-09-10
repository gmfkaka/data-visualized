<template>
  <div class="hg-login-view" id="login">
    <div>
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="0"
        class="login-form">
        <div class="login-logo"></div>
        <div class="login-title">吉林融媒-移动指挥系统</div>
        <el-form-item prop="account">
          <el-input type="text"
                    auto-complete="off"
                    v-model="form.username"
                    @keyup.enter.native="onSubmit"
                    placeholder="用户名">
          </el-input>
          <span class="tip sys-flex sys-flex-center"><div class="icon username-icon"></div>用户名</span>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input type="password"
                    auto-complete="off"
                    v-model="form.password"
                    @keyup.enter.native="onSubmit"
                    placeholder="密码">
          </el-input>
          <span class="tip sys-flex sys-flex-center"><div class="icon psw-icon"></div>密码</span>
        </el-form-item>
        <el-form-item class="loginAction">
          <el-button class="btn-full" type="primary" @click="onSubmit">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="hg-footer">©吉林广播电视台  版权所有</div>
  </div>
</template>

<script>
import { storage } from '@/utils/storage'
import {doLogin} from '@/servers/api'
export default {
  name: 'login',
  data () {
    return {
      form: {
        // 默认的账户名和密码
        username: '',
        password: ''
      }
    }
  },
  mounted () {
    this.setFontsize('login')
  },
  methods: {
    onSubmit () {
      if (!this.form.username || !this.form.password) {
        this.$message.error('账号和密码不能为空')
      } else {
        doLogin({
          password: this.form.password,
          user_name: this.form.username
        }).then(res => {
          if (res.data.code !== 200) {
            this.$message.error(res.data.msg)
            return
          }
          if (res.data && res.data.data) {
            this.$message.success('登录成功')
            storage.set('access_token', res.data.data.access_token)
            let _this = this
            setTimeout(function () {
              _this.$router.push('/commandSystem')
            }, 3000)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
.hg-login-view{
  width: 100vw;
  height: 100vh;
  background:url(./assets/bg_login@2x.png) no-repeat center center;
  background-size: 100% 100%;
  .el-form{
    text-align: center;
    padding: 100px 0 0;
    .login-logo{
      margin: 0 auto;
      width: 110px;
      height: 110px;
      background:url(./assets/logo_login_big@2x.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .login-title{
      margin: 15px 0 20px;
      font-size: 18px;
      color: #fff;
      font-weight: 700;
    }
    .el-form-item{
      width: 250px;
      position: relative;
      margin: 0 auto 12px;
      .tip{
        top: 1px;
        left: 8px;
        position: absolute;
        font-size: 12px;
        color: #999;
        .icon{
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
        .username-icon{
          background:url(./assets/icon_login_user@2x.png) no-repeat center center;
          background-size: 100% 100%;
        }
        .psw-icon{
          background:url(./assets/icon_login_password@2x.png) no-repeat center center;
          background-size: 100% 100%;
        }
      }
    }
    .el-input{
      width: 250px;
      input{
        font-size: 10px;
        height: 30px;
        line-height: 30px;
        padding: 8px 0 8px 72px;
      }
    }
    .btn-full{
      padding: 0;
      width: 250px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #fff;
    }
  }
  .hg-footer{
    font-size: 10px;
    position: absolute;
    text-align: center;
    bottom: 12px;
    color: #fff;
    width: 100%;
  }
}
</style>
