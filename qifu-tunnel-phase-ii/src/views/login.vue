<template>
  <div class="login">
    <!-- <div class="lpic"></div> -->
    <!-- <svg-icon iconClass="logo_login" class="WJlogo"></svg-icon> -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div style="margin-bottom: 42px;">
        <h3 :class="switchType === 'login'?'title':'active title'" style="margin-right: 19px;" @click="tabSwitch('login')">用户登录</h3>
        <div style="vertical-align: top;display: inline-block;width: 1px;height: 26px;border: 1px solid #FFFFFF;"></div>
        <h3 :class="switchType === 'login'?'active title':'title'" class="title" style="margin-left: 19px;" @click="tabSwitch('sqlSet')">数据库设置</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin-bottom: 35px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;margin:0;">
        <el-button
          :loading="loading"
          size="medium"
          style="width:100%;height:60px;background: #2FB3FF;font-size: 24px;color:#FFFFFF;border-radius:4px;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      switchType: "login",
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    tabSwitch(type) {
      this.switchType = type
    },
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            this.getCode();
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  position: relative;
  height: 100%;
  background-image: url("../assets/images/loginBj.png") ;
  background-size: 100% 100%;
}
.WJlogo{
  position: absolute;
  left: 28px;
  top: 40px;
  width: 1200px !important;
  height: 3em !important;
}
.title {
  display: inline-block;
  font-size: 24px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: #FFFFFF;
  cursor: pointer;
}
.active {
  opacity: 0.6;
  font-weight: 400;
}
.login-form {
  position: absolute;
  top: 440px;
  right: 905px;
  background: url('../assets/images/loginFormBg.png') no-repeat;
  width: 585px;
  height: 469px;
  padding: 50px 101px 80px;
  color: #FFFFFF;
  // box-shadow: 0px 3px 23px 0px rgba(240,241,242,.8);
  .el-input {
    height: 48px;
    input {
      height: 48px;
    }
  }
  .el-button {
    border: none;
  }
  .input-icon {
    height: 48px;
    width: 24px;
    margin-left: 16px;
  }
  .el-input__inner{
    padding-left: 62px;
    border: none;
    color: #FFFFFF;
    background-color: rgba(216, 216, 216, 0.6)
  }
  .el-form-item {
    margin-bottom: 30px;
  }
  /* 改变input框背景颜色 */
 input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
	-webkit-text-fill-color: rgba(255,255,255,1)!important; 
	-webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
  	background-color:transparent;
  	background-image: none;
  /* //背景色透明  生效时长  过渡效果  启用时延迟的时间 */
  transition: background-color 50000s ease-in-out 0s; 
}
 input {
  background-color:transparent;
  font-size: 18px;
}
 input:-webkit-autofill {
  /* //transparent 即设置背景色为透明-可改为其他颜色 */
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  -webkit-text-fill-color: rgba(255,255,255,1)!important; 
} 

  .el-checkbox__label{
    color: #87888b;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 17px;
  line-height: 17px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #000000;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 40px;
}
.login-code-img {
  height: 48px;
}
</style>
