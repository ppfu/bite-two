<template>
  <div class="public">
    <div class="d_logo">
      <div class="top_tit">
        <van-nav-bar title="" left-arrow @click-left="back">
          <van-icon name="chat-o" slot="right" @click="showPopup" />
        </van-nav-bar>
      </div>
      <div class="top_head">
        <div class="mine_info">
          <van-icon name="underway-o" slot="right" />
          <div class="m_phone">
            <span>{{coinOrderInfo.order_status_msg}}</span>
            <p>￥<span>{{coinOrderInfo.total_price}}</span></p>
          </div>
        </div>
        <div v-if="coinOrderInfo.trade_type == 1 && coinOrderInfo.order_status == 1 " class="statis">
          {{rest_time}} 后自动取消订单
        </div>
        <div v-if="coinOrderInfo.trade_type == 2 && coinOrderInfo.order_status == 1 " class="statis">
          请在 {{rest_time}} 内完成付款
        </div>
        <!-- <div v-if="coinOrderInfo.trade_type == 2 && coinOrderInfo.order_status == 2 " class="statis">

        </div> -->
      </div>

    </div>
    <div class="order_states">
      <p>订单号<span>{{coinOrderInfo.order_sn}}</span></p>
      <p>单价<span>￥{{coinOrderInfo.price}}</span></p>
      <p>数量<span>{{coinOrderInfo.order_number}}{{coinOrderInfo.coin_name}}</span></p>
    </div>
    <div v-if="coinOrderInfo.trade_type == 1" class="content">
      <div class="mine_info">
        <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" />
      </div>
    </div>
    <div v-if="coinOrderInfo.trade_type == 2" class="content">
      <div class="mine_info" v-if="pay_method.yinlian_name !== null || pay_method.zfb_name !== null || pay_method.wx_name !== null">
        <van-cell :title="pay_name" is-link arrow-direction="down" @click="redShow" />
        <div class="pay_met" v-if="pay_name == '银行卡'">
          <van-cell title="收款人" :value="pay_method.yinlian_name" />
          <van-cell title="收款账号" :value="pay_method.yinlian_number" />
          <van-cell title="开户银行" :value="pay_method.yinlian_bank" />
          <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" />
        </div>
        <div class="pay_met" v-if="pay_name == '支付宝'">
          <van-cell title="收款人" :value="pay_method.zfb_name" />
          <van-cell title="支付宝账号" :value="pay_method.zfb_account" />
          <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" />
          <p class="pay_code">
            <span>支付宝付款码</span>
            <img :src="pay_method.zfb_qrcode">
          </p>
        </div>
        <div class="pay_met" v-if="pay_name == '微信'">
          <van-cell title="收款人" :value="pay_method.wx_name" />
          <van-cell title="微信账号" :value="pay_method.wx_account" />
          <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" />
          <p class="pay_code">
            <span>微信付款码</span>
            <img :src="pay_method.wx_qrcode">
          </p>
        </div>
      </div>
      <div class="mine_info" v-if="pay_method.yinlian_name == null && pay_method.zfb_name == null && pay_method.wx_name == null">
        <h5>对方未设置付款方式，请联系对方或客服</h5>
        <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" />
      </div>
    </div>
    <div class="data_btn" v-if="coinOrderInfo.trade_type == 1">
      <span v-if="coinOrderInfo.order_status == 1" @click="cancelOrder">取消订单</span>
      <span v-if="coinOrderInfo.order_status == 2" style="background: #7C7C7C;">取消订单</span>
      <span v-if="coinOrderInfo.order_status == 1" style="background: #7C7C7C;">等待对方付款</span>
      <span v-if="coinOrderInfo.order_status == 2" @click="affirmGat">确认收款</span>
    </div>
    <div class="data_btn" v-if="coinOrderInfo.trade_type == 2">
      <span v-if="coinOrderInfo.order_status == 1" @click="cancelOrder">取消订单</span>
      <span v-if="coinOrderInfo.order_status == 2" style="background: #7C7C7C;">取消订单</span>
      <span v-if="coinOrderInfo.order_status == 1" @click="goPayment">付款</span>
      <span v-if="coinOrderInfo.order_status == 2" style="background: #7C7C7C;">我已完成付款</span>
    </div>

    <van-action-sheet v-model="show" title="请选择支付方式" :actions="actions" get-container="#app" cancel-text="取消" @select="onSelect"
      @cancel="onCancel" />
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        show: false,
        actions: [], //下拉菜单列表
        deal_id: this.$store.state.payment.deal_id, //订单id
        coinOrderInfo: {}, //
        rest_time: '', //剩余支付时间
        pay_method: {}, //支付，收款方式
        pay_name: '', //支付，收款方式名称
        time_arr: [], //时间数组
        pay_index: '', //选择支付方式的索引
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getCoinOrderInfo();
      // that.ShowCountDown();
    },
    methods: {
      back() {
        this.$router.back();
      },
      //客服
      showPopup() {
        let that = this;
        that.$router.push({
          path: '/chat'
        })
      },
      redShow() {
        let that = this;
        that.show = true;
      },
      //时间格式转换
      checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },

      //获取交易详情信息
      getCoinOrderInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/getCoinOrderInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.deal_id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.coinOrderInfo = res.data.data;
              var restTime = parseInt(that.coinOrderInfo.rest_time);
              // that.rest_time = that.coinOrderInfo.rest_time;
              // console.log(that.rest_time)
              var interval = setInterval(function() {
                restTime--;
                var mm = Math.floor(restTime / 60); //计算剩余的分钟数
                var ss = Math.floor(restTime % 60); //计算剩余的秒数
                mm = that.checkTime(mm);
                ss = that.checkTime(ss); //小于10的话加0
                that.rest_time = mm + ':' + ss;
                // console.log(restTime)
                if (restTime < 0) {
                  clearInterval(interval);
                  that.rest_time = "00" + ':' + "00";
                  if (that.coinOrderInfo.order_status !== 4 && that.coinOrderInfo.order_status == 1) {
                    // console.log(that.coinOrderInfo.order_status)
                    that.cancelOrder();
                  }
                }
              }, 1000);
              that.pay_method = res.data.data.pay_method;
              var pay_arr = [];
              if (that.pay_method.yinlian_name !== null) {
                pay_arr.push({
                  name: "银行卡"
                })
              }
              if (that.pay_method.zfb_name !== null) {
                pay_arr.push({
                  name: "支付宝"
                })
              }
              if (that.pay_method.wx_name !== null) {
                pay_arr.push({
                  name: "微信"
                })
              }
              that.actions = pay_arr;
              that.pay_name = that.actions[0].name;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },

      //选择支付、收款方式
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        let that = this;
        that.pay_name = item.name;
        that.show = false;
      },
      //付款
      goPayment() {
        let that = this;
        if (!that.pay_name || that.pay_name == null) {
          that.$toast("请选择支付方式");
        } else {
          var payMet = that.pay_name == "银行卡" ? "1" : that.pay_name == "支付宝" ? "2" : "3";
          that
            .$http({
              url: "Trade/setCoinOrderPay",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                id: that.deal_id,
                payment_method: payMet,
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$toast.success("付款成功");
                that.getCoinOrderInfo();
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(error) {

            });
        }

      },
      //取消订单
      cancelOrder() {
        let that = this;
        that
          .$http({
            url: "Trade/setCoinOrderCancel",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.deal_id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$toast.success("取消成功");
              that.getCoinOrderInfo();
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      //卖家确认收款
      affirmGat() {
        let that = this;
        that
          .$http({
            url: "Trade/setCoinOrderDone",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.deal_id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$toast.success("已确认");
              that.getCoinOrderInfo();
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      onCancel(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        // Toast(item.name);
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .d_logo {
      width: 100%;
      height: 4rem;
      overflow: hidden;
      background: url(../../assets/img/wode-bg.png) no-repeat;
      background-size: 100% 100%;


      .top_tit {
        .van-nav-bar {
          width: 100%;
          background: none !important;
        }

        .van-nav-bar .van-icon {
          color: #fff !important;
          font-size: 0.4rem !important;
        }

        .van-hairline--bottom::after {
          border: none !important;
        }

      }


      .top_head {
        padding: 0 4%;
        margin-top: 0.48rem;
        text-align: center;

        .mine_info {
          display: flex;
          align-items: center;

          .van-icon {
            width: 1rem;
            color: #fff !important;
            font-size: 1rem !important;
          }

          .m_phone {
            flex: 1;
            padding-left: 0.4rem;
            display: flex;
            justify-content: space-between;

            span {
              font-size: 0.5rem;
              color: rgba(164, 190, 250, 1);
            }

            p {
              padding: 0.08rem 0;
              font-size: 0.4rem;
              color: rgba(255, 255, 255, 1);
              font-family: PingFang SC;

              span {
                font-size: 0.54rem;
                color: #fff;
              }
            }
          }
        }

        .statis {
          width: 100%;
          margin-top: 0.4rem;
          font-size: 0.28rem;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);
          text-align: left;
        }

      }
    }

    .order_states {
      width: 100%;
      padding: 0.36rem 4%;
      background: rgba(98, 98, 98, 0.1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.22rem;

      p {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: PingFang SC;
        color: #fff;

        span {
          padding-top: 0.14rem;
          font-size: 0.24rem;
          color: #A7A7A7;
        }
      }
    }

    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 7rem);
      margin-bottom: 1rem;

      .mine_info {
        height: 100%;
        overflow-y: scroll;
        background: rgba(98, 98, 98, 0.1);
        padding: 0 4%;

        h5 {
          color: #D14B64;
          font-size: 0.26rem;
          padding: 0.26rem 0;
          text-align: center;
        }

        p.pay_code {
          span {
            display: block;
            padding: 0.22rem 0;
            font-size: 0.28rem;
            color: #fff;
          }

          img {
            margin-left: 34%;
            width: 2.6rem;
            height: 2.6rem;
          }
        }

        /deep/ .van-cell {
          padding: 0.22rem 0 !important;
          font-size: 0.28rem;
          font-weight: 400;
          background: none !important;
          color: #fff !important;
        }

        /deep/ .van-cell__value {
          flex: 2;
        }

        .van-hairline--top-bottom::after {
          // border-width: 0;
        }

        /deep/ .van-cell:not(:last-child)::after {
          border-bottom: 1px solid #1F244F !important;
        }
      }
    }

    .data_btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.88rem;
      display: flex;
      justify-content: space-between;

      span {
        display: inline-block;
        width: 50%;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.30rem;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);
      }

      span:nth-child(1) {
        background: #0AB480;
      }

      span:nth-child(2) {
        background: #35A8FB;
      }

    }

    .ver_dialog {
      span.iconfont {
        width: 100%;
        padding: 0.2rem;
        display: block;
        text-align: right;
      }

      h3 {
        font-size: 0.32rem;
        font-weight: 500;
        color: rgba(108, 108, 108, 1);
        margin: 0.8rem 0;
      }

      .dia_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: rgba(107, 161, 65, 1);
        }
      }
    }
  }
</style>
