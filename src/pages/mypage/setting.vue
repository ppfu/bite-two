<template>
  <div class="public">
    <van-nav-bar title="账户设置" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="mine_info">
        <van-cell v-if="$store.state.user_data.rz_status == 0" @click="goAccount()" title="实名认证" value="未认证" is-link />
        <van-cell v-if="$store.state.user_data.rz_status == 1" @click="goAccount()" title="实名认证" value="已提交认证" is-link />
        <van-cell v-if="$store.state.user_data.rz_status == 2" @click="goAccount()" title="实名认证" value="认证通过" is-link />
        <van-cell v-if="$store.state.user_data.rz_status == 3" @click="goAccount()" title="实名认证" value="认证失败" is-link />
        <van-cell title="收款方式" @click="goCashway" is-link />
        <van-cell title="交易密码" @click="goMpass" value="修改" is-link />
        <van-cell title="登录密码"  @click="goLpass" value="修改" is-link />
       <!-- <van-cell title="帮助中心"  @click="showPopup" is-link /> -->
      </div>
      <van-button type="primary" size="large" @click="logOut">退出登录</van-button>
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

      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      // that.getUserInfo()
      // console.log(this.$store.state.user_data)
    },
    methods: {
      back() {
        this.$router.back();
      },
      //实名认证
       goAccount() {
        let that = this;
        that.$router.push({
          path: '/accountAuth',
        })
      },
      //收款方式
       goCashway() {
        let that = this;
        that.$router.push({
          path: '/cashWay',
        })
      },
       //资金密码
       goMpass() {
        let that = this;
        that.$router.push({
          path: '/moneyPass',
        })
      },
       //登录密码
      goLpass() {
        let that = this;
        that.$router.push({
          path: '/logPass',
        })
      },
      //退出登录
      logOut() {
        let that = this;
        that.$http
          .post("User/userLogout", {
            token: window.localStorage.getItem("token"),
          })
          .then(function(res) {
            that.$toast.clear();
            if (res.data.code == 1) {
              window.localStorage.clear();
              window.sessionStorage.clear();
              that.$router.push({
                path: "/"
              });
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(err) {});

      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 1rem);

      .mine_info {
        background: rgba(98, 98, 98, 0.1);
        padding: 0 4%;

        /deep/ .van-cell {
          padding: 0.24rem 0 !important;
          font-size: 0.28rem;
          font-weight: 400;
          background: none !important;
          color: #fff !important;
        }

        .van-hairline--top-bottom::after {
          // border-width: 0;
        }

        /deep/ .van-cell:not(:last-child)::after {
          border-bottom: 1px solid #1F244F !important;
        }
      }
      .van-button--large {
        margin-top: 2rem !important;
      }

      .van-button--primary {
        width: 92%;
        margin: 0 4%;
      }
    }
  }
</style>
