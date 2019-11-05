<template>
  <div class="public">
    <van-nav-bar title="提币" left-arrow @click-left="back">
      <van-icon name="notes-o" slot="right" />
    </van-nav-bar>
    <div class="content">
      <div class="login_info waiting">
        <van-field label="提币地址" v-model="address" clearable placeholder="请输入或长按粘结地址" />
        <van-field label="提币数量" v-model="amount" clearable placeholder="请输入提币数量" />
      </div>
      <div class="uses">
        <p><span>可用{{coinInfo.coin_name}}:</span><span>{{coinInfo.useable_amount}}</span></p>
        <p><span>手续费:</span><span>{{coinInfo.cash_out_fee}}</span></p>
      </div>
      <van-button type="primary" size="large" @click="showMendlg">确认</van-button>
    </div>
    <!-- 密码框-->
    <x-dialog v-model="men_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
        <h3>资金密码</h3>
        <input type="password" v-model="pay_pwd" placeholder="请输入资金密码" />
        <div class="dia_btn">
          <span @click="closeDia">取消</span>
          <span @click="cashOut">确认</span>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        men_dlg: false,
        pay_pwd: '', //密码
        coin_id: this.$route.query.coin_id, //提币id
        address: '', //提现地址
        amount: '', //提现数量
        coinInfo: {}, //提现信息
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getCashOutInfo();
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      closeDia() {
        let that = this;
        that.men_dlg = false;
      },
      //获取提现信息
      getCashOutInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Wallet/getCashOutInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.coin_id
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.coinInfo = res.data.data; //
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //密码弹窗
      showMendlg() {
        let that = this;
        let address = that.address;
        let amount = that.amount;
        let pay_pwd = that.pay_pwd;
        if (!address || address == null) {
          that.$toast("请输入充值地址");
        } else if (!amount || amount == null) {
          that.$toast("请输入充值数量");
        } else if (Number(amount) <= 0) {
          that.$toast("数量不能小于0！");
        } else {
          that.men_dlg = true;
        }
      },
      //提币
      cashOut() {
        let that = this;
        let pay_pwd = that.pay_pwd;
        if (!pay_pwd || pay_pwd == null) {
          that.$toast("请输入交易密码");
        } else {
          that.$toast.loading({
            mask: true,
            message: "提交中..."
          });
          that.$http({
              url: "Wallet/getUserCashOut",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                pay_pwd: pay_pwd,
                coin_id: that.coin_id,
                amount: that.amount,
                address: that.address,
              }
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
                that.$toast.success("提币成功");
                that.$router.back(-1);
              } else {
                that.$toast.fail(res.data.msg);
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

      .uses {
        display: flex;
        justify-content: space-between;
        padding: 0.08rem 4%;

        p {
          font-size: 0.24rem;
          font-family: PingFang SC;
          padding-right: 0.2rem;

          span:nth-child(1) {
            color: rgba(185, 184, 184, 1);
          }

          span:nth-child(2) {
            color: #35A8FB;
            padding-left: 0.12rem;
          }
        }
      }

      // p {
      //   padding: 0 4%;
      //   margin-top: 0.2rem;
      //   text-align: right;
      //   font-size: 0.24rem;
      //   color: #35A8FB;
      // }

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
