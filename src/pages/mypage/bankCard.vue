<template>
  <div class="public">
    <van-nav-bar title="银行卡" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field label="姓名" v-model="yinlian_name" clearable placeholder="请输入姓名" />
        <van-field label="银行卡号" v-model="yinlian_number" clearable placeholder="请输入银行卡号" />
        <van-field label="开户行" v-model="yinlian_bank" clearable placeholder="请输入开户行" />
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
      <van-button type="primary" size="large" @click="addBank">确认</van-button>
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
        yinlian_name: this.$store.state.pay_type.yinlian_name, //银联账户名
        yinlian_number: this.$store.state.pay_type.yinlian_number, //银联卡号
        yinlian_bank:this.$store.state.pay_type.yinlian_bank, //银行卡开户行
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
 //新增银行卡
      addBank() {
        let that = this;
        let yinlian_name = that.yinlian_name;
        let yinlian_number = that.yinlian_number;
        let yinlian_bank = that.yinlian_bank;
        if (!yinlian_name || yinlian_name == null) {
          that.$toast("请输入姓名");
        } else if (!yinlian_number || yinlian_number == null) {
          that.$toast("请输入银行卡号");
        } else if (!yinlian_bank || yinlian_bank == null) {
          that.$toast("请输入开户行");
        } else {
         that.$toast.loading({
           mask: true,
           message: "提交中..."
         });
          that.$http({
             url: "User/editUserPayType",
             method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              yinlian_name: yinlian_name,
              yinlian_number: yinlian_number,
              yinlian_bank: that.yinlian_bank,
            }
            }).then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
               that.$toast.success("添加成功");
                that.back();
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
