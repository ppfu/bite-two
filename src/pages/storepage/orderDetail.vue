<template>
  <div class="public">
    <van-nav-bar title="订单详情" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="address">
        <div class="add_info" @click="goAddress">
          <span class="iconfont icon-tabdizhi"></span>
          <div class="add_left">
            <p><span>收货人：{{addressInfo.consignee_name}}</span><span>{{addressInfo.consignee_phone}}</span></p>
            <h4>收货地址：{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.area}}{{addressInfo.address_detail}}</h4>
          </div>
        </div>
        <span class="iconfont icon-tabgengduo1"></span>
      </div>
      <div class="account">
        <div class="acc_list" v-for="(item,index) in orderList" :key="index">
          <div class="acc_top">
            <h3><img :src="goods_img"></h3>
            <div class="s_info">
              <h4>{{item.goods_name}}</h4>
              <span>{{item.specs1}}，{{item.specs2}}</span>
              <span>数量：1</span>
              <div class="number">
                <p><span>{{item.goods_price_usdt}}</span><a>USDT</a>+<span>{{item.goods_price_bsc}}</span><a>BSC</a></p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="order_btn">
        <div class="btn_left">
          <span>合计</span>
          <p><span>{{orderMoney.goods_price_usdt}}</span><a>USDT</a>+<span>{{orderMoney.goods_price_bsc}}</span><a>BSC</a></p>
        </div>
        <h4 @click="submitOrder(0)">提交订单</h4>
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
        tran_dlg: false,
        pay_pwd:'',//交易密码
        goods_id: this.$store.state.goods_info.id, //商品id
        goods_img:this.$store.state.goods_info.goods_img, //商品图片
        addressList: [],//地址列表
        addressInfo: {},//订单地址
        orderList: JSON.parse(sessionStorage.getItem("orderList")) || [],//订单列表
        orderMoney: JSON.parse(sessionStorage.getItem("orderMoney")) || {},//金额
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getMyDefAddress()
    },
    methods: {
      back() {
        this.$router.back();
        sessionStorage.setItem("orderList", "");
      },
      closeDia() {
        let that = this;
        that.tran_dlg = false;
      },
      //获取默认地址
      getMyDefAddress() {
        let that = this;
        if (sessionStorage.getItem("addressIndex")) {
          var index = Number(sessionStorage.getItem("addressIndex"));
          var addressList = JSON.parse(sessionStorage.getItem("address"));
          that.addressInfo = addressList[index];
        } else {
          that
            .$http({
              url: "User/getUserAddressList",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.addressList = res.data.data;
                var addobj = {};
                $.each(that.addressList, function(i, item) {
                  if (item.is_default == 1) {
                    addobj = item;
                    return
                  }
                });
                that.addressInfo = addobj;
              } else {
                that.$toast(res.data.msg);
              }
            })
            .catch(function(error) {

            });
        }
      },
      ShowPass(){
        let that = this;
        that.tran_dlg = true;
      },
      //提交订单
      submitOrder(i) {
        let that = this;
         var shopArr = [];
        $.each(that.orderList, function(i, item) {
          shopArr.push({spec_item:item.spec_item1,spec_cont:item.specs1},{spec_item:item.spec_item2,spec_cont:item.specs2}); //数组形式[[2（购物车ID）,2（商品数量）],[1,3]]
        });
        var specArr = JSON.stringify(shopArr);
          that
            .$http({
              url: "Aoshop/submitGoodsOrder",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                goods_id:that.goods_id,
                goods_spec:specArr,
                order_amount_usdt:that.orderMoney.goods_price_usdt,
                order_amount_bsc:that.orderMoney.goods_price_bsc,
                address_id:that.addressInfo.id,
              }
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.code == 1) {
                that.$toast.success("提交成功,请到我的订单支付");
                 that.$router.push({
                  path: '/order',
                  query:{
                    type:i
                  }
                })
                that.pay_pwd = ''
                that.tran_dlg = false;
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(error) {

            });

      },
      //去我的地址选择地址
      goAddress() {
        let that = this;
        that.$router.push({
          path: '/myAddress'
        })
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

          //           p {
          //             display: flex;
          //             justify-content: space-between;
          //             padding-bottom: 0.2rem;
          //
          //             span {
          //               font-size: 0.24rem;
          //               color: rgba(185, 184, 184, 1);
          //             }
          //           }

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
        }
      }

      .order_btn {
        width: 100%;
        height: 0.88rem;
        position: fixed;
        font-family: PingFang SC;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn_left {
          width: 74%;
          height: 100%;
          background: rgba(98, 98, 98, 0.1);
          display: flex;
          align-items: center;
          padding-left: 4%;

          span {
            font-size: 0.26rem;
            color: rgba(255, 255, 255, 1);
          }

          p {
            display: flex;
            align-items: baseline;
            color: rgba(221, 183, 30, 1);
            padding-left: 0.2rem;

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

        h4 {
          width: 26%;
          height: 100%;
          text-align: center;
          line-height: 0.88rem;
          background: rgba(221, 183, 30, 1);
          font-size: 0.28rem;
          color: #fff;
        }
      }
    }

  }
</style>
