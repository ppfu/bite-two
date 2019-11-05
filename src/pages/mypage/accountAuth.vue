<template>
  <div class="public">
    <van-nav-bar title="实名认证" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
         <!-- 未实名或实名未通过 姓名 -->
         <van-field v-if="$store.state.user_data.rz_status == 0 || $store.state.user_data.rz_status == 3" label="姓名" v-model="real_name"  clearable placeholder="请输入姓名" />
         <!-- 实名通过或资料已提交还未审核 -->
         <van-field v-if="$store.state.user_data.rz_status == 1 || $store.state.user_data.rz_status == 2" label="姓名" v-model="real_name"  clearable disabled />
          <!-- 未实名或实名未通过  身份证号-->
         <van-field v-if="$store.state.user_data.rz_status == 0 || $store.state.user_data.rz_status == 3" label="身份证号" v-model="idcard_number" maxlength="18" clearable placeholder="请输入身份证号" />
         <!-- 实名通过或资料已提交还未审核 -->
         <van-field v-if="$store.state.user_data.rz_status == 1 || $store.state.user_data.rz_status == 2" label="身份证号" v-model="idcard_number" maxlength="18" clearable disabled />
      </div>
      <h5 v-if="$store.state.user_data.rz_status == 1" style="color: #35A8FB;">您已提交实名认证申请，请等待审核</h5>
      <h5 v-if="$store.state.user_data.rz_status == 2" style="color: #35A8FB;">恭喜您的实名认证已通过</h5>
      <h5 v-if="$store.state.user_data.rz_status == 3" style="color: #D14B64;">抱歉您的实名认证未通过！请重新提交资料</h5>
      <van-button v-if="$store.state.user_data.rz_status == 0 || $store.state.user_data.rz_status == 3" type="primary" @click="accountAuth" size="large">确认</van-button>
      <van-button v-if="$store.state.user_data.rz_status == 1 || $store.state.user_data.rz_status == 2"  type="primary" disabled @click="accountAuth" size="large">确认</van-button>
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
        real_name: this.$store.state.user_data.real_name, //真实姓名
        idcard_number:this.$store.state.user_data.idcard_number, //身份证号
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
       //实名认证
      accountAuth() {
        let that = this;
        let real_name = that.real_name;
        let idcard_number = that.idcard_number;
        if (!real_name || real_name == null) {
          that.$toast("请输入姓名");
        } else if (!idcard_number || idcard_number == null) {
          that.$toast("请输入身份证号");
        } else {
          that.$toast.loading({
            mask: true,
            message: "提交中"
          });
          that.$http
            .post("User/getRealNameCheck", {
              token: window.localStorage.getItem("token"),
              real_name: real_name,
              idcard_number: idcard_number,
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
                that.$toast.success("认证成功");
                that.$router.back(-1);
              } else {
               that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(err) {
            });
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
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

        /deep/ .van-cell:nth-child(2) {
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


      }
       h5{
         text-align: center;
         font-size: 0.24rem;
         padding: 0.2rem 0;
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
