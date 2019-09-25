<template>
  <div class="public">
    <van-nav-bar title="订单详情" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="address">
        <div class="add_info">
          <span class="iconfont icon-tabdizhi"></span>
          <div class="add_left">
            <p><span>收货人：{{orderAddress.consignee_name}}</span><span>{{orderAddress.consignee_phone}}</span></p>
            <h4>收货地址：{{orderAddress.province}}{{orderAddress.city}}{{orderAddress.area}}{{orderAddress.address_detail}}</h4>
          </div>
        </div>
        <span class="iconfont icon-tabgengduo1"></span>
      </div>
      <div class="account">
        <div class="acc_list">
          <p><span>订单编号：{{orderInfo.order_sn}}</span><span>{{orderInfo.order_status_msg}}</span></p>
          <div class="acc_top">
            <h3><img :src="orderInfo.goods_img"></h3>
            <div class="s_info">
              <h4>{{orderInfo.goods_name}}</h4>
              <span>{{orderInfo.goods_spec}}</span>
              <span>数量：1</span>
              <div class="number">
                <p><span>{{orderInfo.order_amount_usdt}}</span><a>USDT</a>+<span>{{orderInfo.order_amount_bsc}}</span><a>BSC</a></p>
              </div>
            </div>
          </div>
          <div class="express_fee"><span>运费</span><span>{{orderInfo.express_fee}}</span></div>
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
        order_id: this.$route.query.id, //订单id
        orderInfo: [], //订单详情
        orderAddress: {}, //订单地址
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getOrderInfo()
    },
    methods: {
      back() {
        this.$router.back();
      },
      //获取订单详情
      getOrderInfo() {
        let that = this;
        that
          .$http({
            url: "Aoshop/getMyGoodsOrderInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.order_id
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.orderInfo = res.data.data;
              that.orderAddress = res.data.data.order_address;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {

    .content {
      padding: 0;
      height: calc(100% - 1.6rem);

      .address {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.4rem 4%;
        background: rgba(98, 98, 98, 0.1);
        //
        //

        .add_info {
          font-family: PingFang SC;
          // padding: 0 0.06rem;
          display: flex;
          align-items: center;
          flex: 1;

          span {
            font-size: 0.6rem;
            color: #A7A7A7;
          }

          .add_left {
            width: 100%;
            padding-left: 0.06rem;

            p {
              display: flex;
              justify-content: space-between;
              padding-bottom: 0.06rem;

              span {
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
              }
            }

            h4 {
              font-size: 0.26rem;
              color: rgba(167, 167, 167, 1);
            }
          }
        }

        span.icon-tabgengduo1 {
          width: 0.6rem;
          text-align: right;
          font-size: 0.4rem;
          color: #A7A7A7;
        }

      }

      .account {
        margin-top: 0.4rem;

        .acc_list {
          padding: 0.36rem 4%;
          background: rgba(98, 98, 98, 0.1);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          font-family: PingFang SC;
          p {
            display: flex;
            justify-content: space-between;
            padding-bottom: 0.2rem;

            span {
              font-size: 0.24rem;
              color: rgba(185, 184, 184, 1);
            }
          }
          .acc_top {
            display: flex;
            // justify-content: space-between;
            align-items: center;

            h3 {
              display: inline-block;
              width: 1.8rem;
              height: 1.8rem;

              img {
                width: 1.8rem;
                height: 1.8rem;
              }
            }

            .s_info {
              font-family: PingFang SC;
              padding-left: 0.2rem;

              h4 {
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
                padding: 0.06rem 0;
              }

              span {
                display: block;
                font-size: 0.24rem;
                color: rgba(185, 184, 184, 1);
                padding-bottom: 0.04rem;
              }

              .number {
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                  display: inline-block;
                  font-size: 0.24rem;
                  color: rgba(185, 184, 184, 1);
                }

                p {
                  display: flex;
                  align-items: baseline;
                  color: rgba(221, 183, 30, 1);

                  span {
                    font-size: 0.28rem;
                    color: rgba(221, 183, 30, 1);
                  }

                  a {
                    font-size: 0.22rem;
                    color: rgba(221, 183, 30, 1);
                  }
                }
              }

            }
          }
          .express_fee{
            padding-top: 0.2rem;
            display: flex;
            justify-content: space-between;
            span{
               color: #A7A7A7;
               font-size: 0.26rem;
            }
          }
        }
      }

    }

  }
</style>
