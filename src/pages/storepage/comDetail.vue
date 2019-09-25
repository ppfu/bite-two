<template>
  <div class="public">
    <van-nav-bar title="商品详情" left-text="" left-arrow @click-left="back(1)" />
    <div class="content">
      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in goodsInfo.detail_imgs" :key="index"><img :src="item"></van-swipe-item>
        </van-swipe>
      </div>
      <div class="con_info">
        <div class="con_tit">
          <h4>{{goodsInfo.goods_name}}</h4>
          <p>USDT<span>{{goodsInfo.goods_price_usdt}}</span><a>+</a>BSC<span>{{goodsInfo.goods_price_bsc}}</span></p>
          <div>
            <span>快递：{{goodsInfo.express_fee_bsc}}</span>
            <span>月销{{goodsInfo.month_sale_month}}笔</span>
            <span>{{goodsInfo.province_id}}&nbsp;{{goodsInfo.city_id}}</span>
          </div>
        </div>
        <div class="standard">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
              <div slot="title">规格<span>选择 {{spec_item1}}分类 ，{{spec_item2}}</span></div>
              <div class="stan_info">
                <div class="color">
                  <h4>{{spec_item1}}分类</h4>
                  <p>
                    <span :class="item == shopType1?'active_span':''" v-for="(item,index) in spec_cont1" :key="index"
                      @click="chooseTypeFunOne(item)">{{item}}</span>
                  </p>
                </div>
                <div class="color">
                  <h4>{{spec_item2}}</h4>
                  <p>
                    <span :class="item == shopType2?'active_span':''" v-for="(item,index) in spec_cont2" :key="index"
                      @click="chooseTypeFunTwo(item)">{{item}}</span></p>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
        <div class="com_detail">
          <h4>商品详情</h4>
          <div class="detail_info" v-html="goodsInfo.goods_detail">

          </div>
        </div>

      </div>
      <div class="buy_btn">
        <span @click="gotoClose">立即购买</span>
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
        activeNames: ['1'],
        goods_id: this.$store.state.goods_info.id, //商品id
        goodsInfo: {}, //商品详情
        spec_cont1: [], //分类1
        spec_cont2: [], //分类2
        spec_item1: '', //分类1
        spec_item2: '', //分类2
        shopType1: '', //规格1
        shopType2: '', //规格2
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getShopGoodsInfo()
    },
    methods: {
      back(i) {
        this.$router.push({
          path: '/store',
          query: {
            type: i
          }
        });
      },
      closeDia() {
        let that = this;
        that.tran_dlg = false;
      },

      // updated() {
      //   $('.detail_info').find('p').css('color', '#fff');
      //   $('.detail_info>p>img').css('width', '100%');
      // },
      //获取商品详情
      getShopGoodsInfo() {
        let that = this;
        that
          .$http({
            url: "Aoshop/getShopGoodsInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.goods_id
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.goodsInfo = res.data.data;
              that.spec_cont1 = res.data.data.goods_spec[0].spec_cont;
              that.spec_cont2 = res.data.data.goods_spec[1].spec_cont;
              that.spec_item1 = res.data.data.goods_spec[0].spec_item;
              that.spec_item2 = res.data.data.goods_spec[1].spec_item; //类型名称
              console.log(that.goodsInfo)
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //选择规格一
      chooseTypeFunOne(index) {
        this.shopType1 = index;
      },
      //选择规格二
      chooseTypeFunTwo(index) {
        this.shopType2 = index;
      },
      //
      //立即购买
      gotoClose() {
        let that = this;
        var arr = [{
          goods_id: that.goods_id, //商品id
          goods_price_usdt: that.goodsInfo.goods_price_usdt, //usdt
          goods_price_bsc: that.goodsInfo.goods_price_bsc, //bst
          // price: that.shopinfo.price, //红包
          // number: that.num, //数量
          goods_name: that.goodsInfo.goods_name, //名字
          specs1: that.shopType1, // 规格1
          specs2: that.shopType2, // 规格2
          spec_item1: that.spec_item1, //规格名称1
          spec_item2: that.spec_item2, //规格名称2
        }];
        var allMoney = {
          goods_price_usdt: that.goodsInfo.goods_price_usdt, //usdt
          goods_price_bsc: that.goodsInfo.goods_price_bsc, //bst
        };
        sessionStorage.setItem("orderMoney", JSON.stringify(allMoney));
        sessionStorage.setItem("orderList", JSON.stringify(arr));
        if (that.shopType1 == "" && that.spec_cont1.length != 0) {
          that.$toast("请选择商品规格");
        } else if (that.shopType2 == "" && that.spec_cont2.length != 0) {
          that.$toast("请选择商品规格");
        } else {
          that.$router.push({
            path: "/orderDetail"
          });
        }
      },
      //提交订单
      submitGoodsOrder() {
        let that = this;
        that
          .$http({
            url: "Aoshop/submitGoodsOrder",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              goods_id: that.goods_id,
              order_amount_usdt: that.goodsInfo.goods_price_usdt,
              order_amount_bsc: that.goodsInfo.goods_price_bsc,
              address_id: that.goodsInfo.goods_price_bsc

            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.goodsInfo = res.data.data;
              that.spec_cont1 = res.data.data.goods_spec[0].spec_cont;
              that.spec_cont2 = res.data.data.goods_spec[1].spec_cont;
              that.spec_item1 = res.data.data.goods_spec[0].spec_item;
              that.spec_item2 = res.data.data.goods_spec[1].spec_item; //类型名称
              console.log(that.goodsInfo)
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
      overflow-y: scroll;
      height: calc(100% - 1.8rem);

      .swipe {
        width: 100%;
        height: 3.2rem;

        img {
          width: 100%;
          height: 3.2rem;
        }
      }

      .con_info {
        font-family: PingFang SC;

        .con_tit {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.14rem 4%;
          margin-bottom: 0.22rem;

          h4 {
            font-size: 0.28rem;
            color: rgba(255, 255, 255, 1);
          }

          p {
            font-size: 0.22rem;
            font-family: PingFang SC;
            color: rgba(221, 183, 30, 1);
            padding: 0.14rem 0;
            font-size: 0.22rem;

            a {
              font-size: 0.24rem;
              padding: 0 0.04rem;
            }

            span {
              font-size: 0.28rem;
            }
          }

          >div {
            display: flex;
            justify-content: space-between;

            span {
              font-size: 0.24rem;
              font-family: PingFang SC;
              color: rgba(167, 167, 167, 1);
            }
          }
        }

        .standard {
          width: 100%;
          padding: 0.14rem 4%;
          background: rgba(255, 255, 255, 0.04);
          font-family: PingFang SC;
          margin-bottom: 0.22rem;

          /deep/ .van-cell {
            background: none !important;
            padding: 0.22rem 0 !important;
          }

          /deep/ .van-collapse-item__content {
            background: none !important;
          }

          /deep/ .van-cell:not(:last-child)::after {
            display: none !important;
          }

          /deep/ .van-cell__title {
            font-size: 0.28rem;
            color: rgba(255, 255, 255, 1);

            span {
              color: #A7A7A7;
              font-size: 0.26rem;
              padding-left: 0.2rem;
            }
          }

          /deep/ .van-collapse-item__content {
            padding: 0.04rem 0;
          }

          .color {
            h4 {
              font-size: 0.26rem;
              color: rgba(202, 202, 202, 1);
            }

            p {
              margin: 0.2rem 0;

              span {
                display: inline-block;
                width: 1.05rem;
                height: 0.46rem;
                line-height: 0.46rem;
                text-align: center;
                border-radius: 2rem;
                color: #fff;
                font-size: 0.22rem;
                margin-right: 0.2rem;
              }

              .active_span {
                background: #DDB71E;
              }

              span {
                background: rgba(208, 208, 208, 0.2);
              }
            }
          }
        }

        .com_detail {
          width: 100%;

          h4 {
            font-size: 0.28rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            height: 0.8rem;
            text-align: center;
            line-height: 0.8rem;
            background: rgba(255, 255, 255, 0.04);
          }

          .detail_info {
            width: 100%;

            /deep/ img {
              width: 100% !important;
            }

            /deep/ p {
              color: #fff;
              padding: 0.06rem 0;
            }

          }


        }
      }

      .buy_btn {
        width: 100%;
        height: 0.88rem;
        position: fixed;
        bottom: 0;
        left: 0;

        span {
          display: block;
          height: 0.88rem;
          line-height: 0.88rem;
          background: #DDB71E;
          text-align: center;
          font-size: 0.28rem;
          color: #fff;
        }
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

      p {
        font-size: 0.34rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
        margin: 1rem;
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
