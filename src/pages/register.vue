<template>
  <div class="public">
     <van-nav-bar title="注册" left-text="" left-arrow @click-left="back" />
    <!-- logo -->
    <div class="d_logo">
      <img src="../assets/img/logo.png" alt>
    </div>
    <div class="content">
      <div class="login_info">
        <div class="log_pwd">
          <van-field v-model="user_phone" maxlength="11" clearable placeholder="请输入手机号" />
        </div>
        <div class="log_pwd">
          <van-field v-model="verify_code" maxlength="4" placeholder="请输入验证码" />
          <a @click="sendVerifyCode">{{codeMsg}}</a>
        </div>

        <div class="log_pwd">
          <van-field  v-model="invite_code"  clearable placeholder="请输入邀请码（选填）" />
        </div>
         <div class="log_pwd">
          <van-field type="password" v-model="login_pwd" maxlength="20" @blur="hintPassFun" clearable placeholder="请输入密码（6-16数字字母组合）" />
        </div>
        <div class="log_pwd">
          <van-field type="password"  v-model="re_login_pwd" maxlength="20"  @blur="hintRepassFun" clearable placeholder="请再次输入密码" />
        </div>

        <van-button type="primary" @click="register" size="large">注册</van-button>
        <div class="footer">
          <span>已有账号? &nbsp;</span>
          <span @click="goLogin">点击登录</span>
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
        verify_code: '',//验证码
        invite_code: '',//邀请码
        login_pwd: '', //登录密码
        re_login_pwd: '', //确认登录密码
        codeMsg: "获取验证码",
        time: 60, //验证码倒计时
      }
    },
    components: {
      XDialog,
    },
    methods: {
      back() {
        this.$router.back();
      },
      hintPassFun() {
        let that = this;
        if (that.login_pwd !== "") {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(that.login_pwd)) { // 密码包含大小写字母数字不能纯字母纯数字
            that.$toast("密码格式错误！请输入密码（6-16数字字母组合）");
          }
        }
      },
      hintRepassFun() {
        let that = this;
        if (that.re_login_pwd !== "") {
          if (that.login_pwd !== that.re_login_pwd) {
            that.$toast("两次输入的密码不一样");
          }
        }
      },
      //注册
      register() {
        let that = this;
        let user_phone = that.user_phone;
        let verify_code = that.verify_code;
        let invite_code = that.invite_code;
        let login_pwd = that.login_pwd;
        let re_login_pwd = that.re_login_pwd;
        if (!user_phone || user_phone == null) {
          that.$toast("请输入手机号");
        } else if (
          user_phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(user_phone)
        ) {
          that.$toast("手机号格式错误");
        } else if (!verify_code || verify_code == null) {
          that.$toast("请输入验证码");
        } else if (!login_pwd || login_pwd == null) {
          that.$toast("请输入密码");
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(login_pwd)) { // 密码包含大小写字母数字不能纯字母纯数字
          that.$toast("密码格式不正确");
        } else if (!re_login_pwd || re_login_pwd == null) {
          that.$toast("请输入确认密码");
        } else if (login_pwd !== re_login_pwd) {
          that.$toast("两次输入的密码不一样");
        } else {
          that.$toast.loading({
            mask: true,
            message: "提交中..."
          });
          that.$http
            .post("User/userReg", {
              user_phone: user_phone,
              verify_code: verify_code,
              invite_code: invite_code,
              login_pwd: login_pwd,
              re_login_pwd: re_login_pwd
            })
            .then(function(res) {
              that.$toast.clear();
              let code = res.data.code;
              if (code == 1) {
                that.$toast.success("注册成功");
                that.$router.push({
                  path: "/"
                });
              } else {
                that.$toast(res.data.msg);
              }
            })
            .catch(function(err) {});
        }
      },
      //	发送验证码
      sendVerifyCode() {
        let that = this;
        var user_phone = that.user_phone;
        var verify_code = that.verify_code;
        let login_pwd = that.login_pwd;
        let re_login_pwd = that.re_login_pwd;
        if (!user_phone || user_phone == null) {
           that.$toast("请输入手机号");
        } else if (
          user_phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(user_phone)
        ) {
           that.$toast("手机号格式错误");
        }  else if (login_pwd !== re_login_pwd) {
          that.$toast("两次输入的密码不一样");
        }  else {
          if (that.codeMsg != "获取验证码" && that.codeMsg != "重新发送") return;
          var time = that.time;
          console.log(time)
          that.$http
            .post("User/sendSmsVerify", {
              phone: user_phone,
              type: 1
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.code == 1) {
                that.$toast.success("发送成功");
                verify_code = res.data.data;
                var interval = setInterval(function() {
                  time--;
                  that.codeMsg = time + "s";
                  if (time <= 0) {
                    clearInterval(interval);
                    that.codeMsg = "重新发送";
                  }
                }, 1000);
              } else {
                that.$toast(res.data.msg);
              }
            })
            .catch(function(err) {});
        }
      },
      goLogin() {
        let that = this;
        that.$router.push({
          path: '/'
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .d_logo {
      margin-top: 0.8rem;
      overflow: hidden;
      padding-bottom: 0.8rem;
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

          a {
            display: block;
            width: 34%;
            padding: 0.24rem 0.12rem;
            text-align: center;
            margin-left: 0.12rem;
            background:#34A8FF;
            color: #fff;
            border-radius: 0.08rem;
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
          justify-content: flex-end;

          span {
            font-size: 0.28rem;
            font-family: PingFang SC;
            // font-weight: bold;
            line-height: 0.4rem;
          }

          span:nth-child(1) {
            color: #fff;
          }

          span:nth-child(2) {
            color: #4163C7;
          }
        }
      }
    }
  }
</style>
