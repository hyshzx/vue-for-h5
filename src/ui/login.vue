<template>
  <div class="content">
    <div class="p_logo_area">
      <img src="../../static/img/common/logo.png" alt="">
    </div>
    <form class="login_form" @submit='submitForm'>
      <div class="p_username">
        <span class="p_label">手机号</span>
        <input type="text" v-model="username" placeholder="请输入用户名">
      </div>
      <div class="p_password">
        <span class="p_label">密码</span>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <div class="p_submit">
        <a class="submit_btn" @click="submitForm">登录</a>
      </div>
    </form>
    <div class="p_other_oper flex">
      <a class="p_forget_password">忘记密码？</a>
      <a class="p_fast_register">立即注册</a>
    </div>
    <div class="p_service_logo">
      <img src="../../static/img/common/oneyearback.png" alt="">
    </div>
  </div>
</template>
<script>
import {
  ajax
} from "../lib/axios.js"
import {
  Store
} from "../lib/vuex.js"
import {
  storage
} from "../lib/storage.js"
export default {
  data() {
      return {
        username: '',
        password: '',
      }
    },
    mounted() {
      this.username = "";
      this.password = "";
    },
    methods: {
      submitForm() {
        var self = this;
        if (!this.username.trim()) {
          return
        }
        if (!this.password.trim()) {
          return
        }
        if (this.username && this.password) {
          var paramsData = {
            username: this.username,
            password: this.password
          };
          ajax.user.login(paramsData).then(function(response) {
            console.log(response);
            if (response.status == 200 && response.data.api_code == 200) {
              Store.commit('updateToken', response.data.token);
              storage.set('token', response.data.token);
              if (response.data.user) {
                response.data.user.avatar = "http://116.62.222.82:8082" + response.data.user.avatar;
              }
              Store.commit('updateUserInfo', response.data.user);
              storage.set('userInfo', JSON.stringify(response.data.user));
              self.$router.go(-1);
            } else if (response.status == 200 && response.data.api_code != 200) {
              self.$Message.error({
                content: response.data.message
              })
            } else {
              self.$Message.error({
                content: "登录有误，请重试~"
              })
            }
          })
        }
      }
    }
}
</script>
<style lang="sass" scoped>
html {
  height: 100%;
  body {
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    #app {
      height: 100%;
      .content {
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        background: -webkit-linear-gradient(180deg, #00c7e9, #09B8F9);
        background: -o-linear-gradient(180deg, #00c7e9, #09B8F9);
        background: -moz-linear-gradient(180deg, #00c7e9, #09B8F9);
        background: linear-gradient(180deg, #00c7e9, #09B8F9);
        .p_logo_area {
          width: 100%;
          padding-top: 170px;
          margin-bottom: 140px;
          img {
            margin: 0 auto;
          }
        }
        .login_form {
          width: 100%;
          .p_username,
          .p_password {
            width: 550px;
            margin: 0 auto;
            border-bottom: 1px solid #fff;
            // padding: 10px 0px;
            .p_label {
              float: left;
              width: 100px;
              color: #e6e6e6;
              font-size: 30px;
              text-align: left;
              // margin-right: 20px;
            }
            input {
              width: 400px;
              font-size: 30px;
              line-height: 50px;
              color: #fff;
            }
          }
          .p_password {
            margin-top: 60px;
          }
        }
        .p_submit {
          width: 100%;
          .submit_btn {
            display: block;
            width: 550px;
            height: 70px;
            line-height: 70px;
            border-radius: 35px;
            background-color: #fff;
            font-size: 30px;
            color: #17c0ff;
            margin: 0 auto;
            margin-top: 100px;
          }
        }
        .p_other_oper {
          width: 550px;
          margin: 20px auto 0px;
          justify-content: space-between;
          .p_forget_password {
            color: #e6e6e6;
            font-size: 24px;
          }
          .p_fast_register {
            color: #fff;
            font-size: 24px;
          }
        }
        .p_service_logo {
          width: 100%;
          margin-top: 100px;
          img {
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>
