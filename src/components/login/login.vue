<template>
  <div class="login">
    <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginRules">
      <h2 class="title">校园贴吧后台管理系统</h2>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="off" placeholder="账号" v-model="loginForm.adminName">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 67%"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <el-button type="success" class="codeBtn" :disabled="this.loginForm.username===''||this.loginForm.password===''||loading" @click.prevent="getCode">{{computerTime>0?`已发送(${computerTime}s)`:'获取验证码'}}</el-button>
        </div>
      </el-form-item>
      <el-link style="margin:0px 0px 25px 0px;" @click="$router.replace({path:'/forgetPWD'})">忘记密码</el-link>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          :disabled="this.loginForm.username===''||this.loginForm.password===''||this.loginForm.code===''"
          @click.native.prevent="adminLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2019-2020 CampusPosBar All Rights Reserved.</span>
    </div>
  </div>
</template>


<script>
  import {reqValidateCode,reqAdminLogin,reqAdminInfo } from "../../api/login";
  import {mapActions, mapState} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          adminName: "",
          password: "",
          code: "",
        },
        loginRules: {
          adminName: [
            { required: true, trigger: "blur", message: "用户名不能为空" }
          ],
          password: [
            { required: true, trigger: "blur", message: "密码不能为空" }
          ],
          code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
        },
        loading: false,
        computerTime:0,
      };
    },
    mounted() {

    },
    methods:{
      //获取验证码
      async getCode(){
        //如果当前没有计时
        if(!this.computerTime) {
          //启动倒计时
          this.computerTime = 120
          this.intervalId = setInterval(() => {
            this.computerTime--
            if (this.computerTime <= 0) {
              //停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)
          //发送请求
          const result = await reqValidateCode(this.loginForm.adminName, this.$md5(this.loginForm.password))  //返回结果为true或false
          if (result.data === false) {
            //停止倒计时
            if (this.computerTime) {
              this.computerTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
            this.$message.error('用户名或密码不正确')
          }
          if (result.data.status === 220000) {
            //停止倒计时
            if (this.computerTime) {
              this.computerTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
            let msg = result.data.message
            this.$message.warning(msg.split('-')[0])
          }
        }
      },
      async adminLogin() {
        this.loading = true;
        //停止倒计时
        if(this.computerTime){
          this.computerTime=0
          clearInterval(this.intervalId)
          this.intervalId=undefined
        }
        const result = await reqAdminLogin(this.loginForm.adminName, this.$md5(this.loginForm.password), this.loginForm.code)
        if (result.data === "") {
          //将user保存到vuex的state
          const admin={adminName:this.loginForm.adminName}
          this.$store.dispatch('recordAdmin',admin)
          //成功，跳转到首页，提示登陆成功

          this.$message.success('登录成功')
          this.$router.push({name:'home'})
        } else if (result.data.status === 220000) {
          //失败，提示失败
          let msg = result.data.message
          this.$message.error(msg.split('-')[0])
          this.loading = false
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: url("../../assets/img/bg1.jpg");
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 29%;
    height: 38px;
    float: right;
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #03041b;
    font-family: Arial;
    font-size: 16px;
    letter-spacing: 1px;
  }
</style>

