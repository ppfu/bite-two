<template>
  <div class="public">
    <van-nav-bar title="登录密码" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field label="手机号" v-model="user_phone" maxlength="11" clearable placeholder="请输入手机号" />
        <div class="m-code">
         <van-field label="验证码" v-model="verify_code"  clearable maxlength="4" placeholder="请输入验证码" />
         <a @click="sendVerifyCode">{{codeMsg}}</a>
       </div>
        <van-field label="新密码" type="password" v-model="login_pwd" maxlength="16" @blur="hintPassFun" clearable placeholder="请输入登录密码" />
        <van-field label="新密码" type="password" v-model="re_login_pwd" maxlength="16"  @blur="hintRepassFun" placeholder="请再次输入登录密码" />
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
      <van-button type="primary" @click="changePass" size="large">确认</van-button>
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
        user_phone:'', //手机号
        login_pwd:'',//登录密码
        re_login_pwd:'',//再次输入密码
        verify_code:'', //验证码
        codeMsg:"获取验证码",//
        time: 60//倒计时时间
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      // that.getFudaInfo()
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      //input离开焦点验证
       hintPassFun() {
        let that = this;
        if (that.login_pwd !== "") {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(that.login_pwd)) { // 密码包含大小写字母数字不能纯字母纯数字
            that.$toast("密码格式错误！请输入密码（6-16数字字母组合）");
          }
        }
      },
      //input离开焦点验证
      hintRepassFun() {
        let that = this;
        if (that.re_login_pwd !== "") {
          if (that.login_pwd !== that.re_login_pwd) {
            that.$toast("两次输入的密码不一样");
          }
        }
      },
      //修改密码
      changePass() {
        let that = this;
        let user_phone = that.user_phone;
        let verify_code = that.verify_code;
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
            .post("User/changeUserPwd", {
              user_phone: user_phone,
              verify_code: verify_code,
              login_pwd: login_pwd,
              re_login_pwd: re_login_pwd,
            })
            .then(function(res) {
              // console.log(res)
              that.$toast.clear();
              let code = res.data.code;
              if (code == 1) {
                that.$toast.success("修改成功");
                that.$router.back(-1);
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
              type: 2
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

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar__right {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .van-nav-bar .van-icon {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .content {
      padding: 0;

      .login_info {
        width: 100%;
        background: rgba(98, 98, 98, 0.1);

        /deep/ .van-cell {
          width: 94% !important;
          margin: 0 auto !important;
          border-bottom: 1px solid #1F244F !important;
          border-radius: 0 !important;
          background: none !important;
          padding: 0.26rem 0.1rem !important;
        }

        /deep/ .van-cell:nth-child(3) {
          border: none !important;
        }

        .van-cell:not(:last-child)::after {
          display: none !important;
        }

        /deep/ .van-field__label {
          color: #fff !important;
        }

        input::-webkit-input-placeholder {
          /* placeholder颜色  */
          color: #A7A7A7 !important;
          /* placeholder字体大小  */
        }
        .m-code{
          position: relative;
          a{
            position: absolute;
            right: 4%;
            top: 0.30rem;
            font-size: 0.28rem;
            color: #35A8FB;
          }
        }
      }
      .van-button--large {
        margin-top: 2rem !important;
      }

      .van-button--primary {
        width: 92%;
        margin: 0 4%;
      }

      h5 {
        text-align: center;
        font-size: 0.26rem;
        padding: 0.2rem 0;
        color: #5B913F;
      }
    }

    .ver_dialog {
      position: relative;

      span.iconfont {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.2rem;
      }

      h3 {
        padding: 0.2rem 0;
        font-size: 0.32rem;
        color: #2B2B2B;
      }

      input {
        width: 4rem;
        height: 0.66rem;
        border: 1px solid #BFBFBF;
        border-radius: 0.08rem;
        padding-left: 0.2rem;
        color: #333 !important;
        margin: 0.8rem 0;
        font-size: 0.26rem;
      }

      input::-webkit-input-placeholder {
        color: #BEBEBE !important;
      }

      .dia_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          width: 50%;
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: rgba(172, 172, 172, 1);
        }

        span:nth-child(2) {
          background: #4163C7;
        }
      }
    }
  }
</style>
