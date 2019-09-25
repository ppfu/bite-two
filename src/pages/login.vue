<template>
  <div class="public">
    <div class="top">


    </div>
    <!-- logo -->
    <div class="d_logo">
      <img src="../assets/img/logo.png" alt>
    </div>
    <div class="content">
      <div class="login_info">
        <div class="log_pwd">
          <van-field v-model="user_phone" clearable maxlength="11" placeholder="请输入手机号" />
        </div>
        <div class="log_pwd">
          <van-field v-model="login_pwd" type="password" maxlength="20" placeholder="请输入密码" />
          <a class="iconfont icon-tabbiyan1" @touchstart="eyepwd($event)"></a>
        </div>
        <van-button type="primary" size="large" @click="login">登录</van-button>
        <div class="footer">
          <span @click="register">注册账号</span>
          <span @click="goForgetPwd">忘记密码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        user_phone: '',//手机号
        login_pwd: '',//登录密码
      }
    },
    components: {
      XDialog,
    },
    methods: {
      register() {
        let that = this;
        that.$router.push({
          path: '/register'
        })
      },
      goForgetPwd() {
        let that = this;
        that.$router.push({
          path: '/forgetpwd'
        })
      },
      //登录
     login() {
       let that = this;
       let user_phone = that.user_phone;
       let login_pwd = that.login_pwd;
       if (!user_phone || user_phone == null) {
         that.$toast("请输入手机号");
       } else if (
         user_phone.trim().length != 11 ||
         !/^[1]([3-9])[0-9]{9}$/.test(user_phone)
       ) {
        that.$toast("手机号格式错误");
       } else if (!login_pwd || login_pwd == null) {
         that.$toast("请输入密码");
       } else {
         that.$toast.loading({
           mask: true,
           message: "登录中..."
         });
         that.$http
           .post("User/userLogin", {
             user_phone: user_phone,
             login_pwd: login_pwd,
           })
           .then(function(res) {
             that.$toast.clear();
             if (res.data.code == 1) {
               // that.$store.state.user_info = res.data.data;
               window.localStorage.setItem("token", res.data.data);
               // that.$toast.success("登录成功");
               that.$router.push({
                 path: "/home"
               });
             } else {
              that.$toast.fail(res.data.msg);
             }
           })
           .catch(function(err) {
           });
       }
     },

      //密码展示隐藏
      eyepwd(e) {
        $(e.target)
          .toggleClass("icon-tabbiyan1")
          .toggleClass("icon-tabzhengyan");
        if (
          $(e.target)
          .parents(".log_pwd")
          .find("input")
          .attr("type") == "password"
        ) {
          $(e.target)
            .parents(".log_pwd")
            .find("input")
            .attr("type", "text");
        } else {
          $(e.target)
            .parents(".log_pwd")
            .find("input")
            .attr("type", "password");
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .top {
      box-shadow: none;

    }

    .d_logo {
      margin-top: 2rem;
      overflow: hidden;
      padding-bottom:0.8rem;
      text-align: center;
      img {
        width: 3.86rem;
        height: 1.44rem;
      }
    }

    .content {
      .login_info {
        width: 100%;
          .van-cell:not(:last-child)::after {
          border: none;
        }
        .log_pwd {
          display: flex;
          position: relative;

          a {
            position: absolute;
            right: 0.14rem;
            font-size: 0.28rem;
          }
        }

        .van-button--primary {
          background: #34A8FF;
          font-size: 0.28rem;
          color: #fff;
          border: none;
          border-radius: 0.08rem;
        }

        .footer {
          margin-top: 0.12rem;
          display: flex;
          justify-content: space-between;

          span {
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #A9A9A9;
          }
        }
      }
    }
  }
</style>
