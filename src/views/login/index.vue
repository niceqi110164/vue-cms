<template>
  <div class="login-container">
    <!-- :model="ruleForm" 是绑定我们form表单中需要提交给后台的一个对象
         :rules="rules" 是动态绑定的rules，表单验证规则
    ref="ruleForm" 是我们绑定的对象-->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 标题 -->
      <div class="title-container">
        <h3 class="title">系统登录</h3>
        <!-- <lang-select class="set-language"/> -->
      </div>

      <!-- 用户名    prop="username" 是我们要验证的地方-->
      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user"/> -->
          <i class="el-icon-message"></i>
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          placeholder="输入用户名"
          auto-complete="on"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user"/> -->
          <i class="el-icon-message"></i>
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          :type="passwordType"
          placeholder="输入密码"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-message"></i>
        </span>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click="onSubmit('loginForm')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
/** @ 表示 ../ */
//import { isvalidUsername } from "@/utils/validate";
import store from "../../vuex/store1.js";
window.console.log(store);
export default {
  props: {},
  store,
  data() {
    //对应rules里面的验证方法
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };

    return {
      //
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        /**   
          require:是否必填，如不设置，则会根据校验规则自动生成;
          message:是提示的内容;
          trigger：是什么事件触发;
          validator:对整个表单进行校验的方法，参数为一个回调函数。
                    该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。
                    若不传入回调函数，则会返回一个 promise;
                 */
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword
          }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined
    };
  },
  methods: {
    //显示与隐藏密码
    showPwd() {
      //当点击时type类型为 password 时,把type类型为空 让密码显示
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        //否则让type类型我password  让密码隐藏
        this.passwordType = "password";
      }
    },

    //提交事件
    onSubmit(formName) {
      //elementUI 表单验证方法  valid 返回 boolean 值
      this.$refs[formName].validate(valid => {
        //window.console.log(valid);
        if (!valid) {
          // 验证不通过禁止提交
          window.console.log("验证不通过");
          return false;
        } else {
          window.console.log("验证通过");
          //window.console.log(this.loginForm);
          /**
           * dispatch：含有异步操作，例如向后台提交数据，
           * 写法： this.$store.dispatch('mutations方法名',值)
           */
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(data => {
              window.console.log("后台返回数据" + data);
              this.$router.push({
                path: this.redirect || "/home"
              });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    }
  },
  components: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
        box-shadow: 0 0 0px 1000px $bg inset !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    height: 47px;
    display: inline-block;

    i {
      font-size: 20px;
      line-height: 47px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>