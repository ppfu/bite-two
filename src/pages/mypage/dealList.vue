<template>
  <div class="public">
    <van-nav-bar title="交易" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" @click="navTap(active)">
        <van-tab title="挂单">
          <div class="account">
            <div class="acc_list" v-for="(item,index) in orderList" :key="index">
              <p class="deal_tit">
                <span>{{item.trade_type}} {{item.coin_name}}</span>
                <span>{{item.create_time}}</span>
              </p>
              <div class="acc_top">
                <p><span>{{item.price}}</span><span>价格</span></p>
                <p><span>{{item.number}}</span><span>数量</span></p>
                <p><span style="color:#D14B64 ;">{{item.trade_status_msg}}</span><span>状态</span></p>
                <van-button v-if="item.trade_status == 2" type="primary" disabled size="small" color="#35A8FB">取消</van-button>
                <van-button v-if="item.trade_status == 1" type="primary" size="small" color="#35A8FB" @click="cancelEntry(item.id)">取消</van-button>
              </div>
            </div>
           <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab title="订单交易中">
          <div class="account">
            <div class="acc_list" v-for="(item,index) in orderList" :key="index">
              <p class="deal_tit" @click="goDetailOrder(item.id)">
                <span>{{item.trade_type}} {{item.coin_name}}</span>
                <span>{{item.create_time}}</span>
              </p>
              <div class="acc_top">
                <p><span>{{item.price}}</span><span>价格</span></p>
                <p><span>{{item.number}}</span><span>数量</span></p>
                <p><span style="color:#D14B64 ;">{{item.trade_status_msg}}</span><span>状态</span></p>
                <!-- <van-button v-if="item.trade_type == '卖出' && item.trade_status == 1" type="primary" size="small" color="#35A8FB">未付款</van-button> -->
                <van-button v-if="item.trade_type == '卖出' && item.trade_status == 2" type="primary" size="small" color="#35A8FB"
                  @click="affirmGat(item.id)">确认收款</van-button>
                <!--             <van-button v-if="item.trade_type == '买入' && item.trade_status == 1" type="primary" size="small" color="#35A8FB">未付款</van-button>
                <van-button v-if="item.trade_type == '买入' && item.trade_status == 2" type="primary" size="small" color="#35A8FB">已付款</van-button> -->
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="订单已完成">
          <div class="account">
            <div class="acc_list" v-for="(item,index) in orderList" :key="index">
              <p class="deal_tit" @click="goDetailOrder(item.id)">
                <span>{{item.trade_type}} {{item.coin_name}}</span>
                <span>{{item.create_time}}</span>
              </p>
              <div class="acc_top">
                <p><span>{{item.price}}</span><span>价格</span></p>
                <p><span>{{item.number}}</span><span>数量</span></p>
                <p><span>{{item.trade_status_msg}}</span><span>状态</span></p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="订单已取消">
          <div class="account">
            <div class="acc_list" v-for="(item,index) in orderList" :key="index" @click="goDetailOrder(item.id)">
              <p class="deal_tit">
                <span>{{item.trade_type}} {{item.coin_name}}</span>
                <span>{{item.create_time}}</span>
              </p>
              <div class="acc_top">
                <p><span>{{item.price}}</span><span>价格</span></p>
                <p><span>{{item.number}}</span><span>数量</span></p>
                <p><span>{{item.trade_status_msg}}</span><span>状态</span></p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
       <div v-if="orderList.length <=0" class="no_data">
        <img src="../../assets/img/noData.png">
        <span>暂无数据</span>
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
        show: false,
        active: 0,
        num: 5,
        orderList: [], //我的交易页面信息
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getMyTradeOrderList()
    },
    methods: {
      back() {
        this.$router.back();
      },
      cancel() {
        let that = this;
        that.tran_dlg = true;
      },
      //订单详情
      goDetailOrder(id) {
        let that = this;
        that.$store.state.payment.deal_id = id;
        that.$router.push({
          path: '/payment',
        })
      },
      navTap(i) {
        let that = this;
        that.getMyTradeOrderList();
      },
      //获取我的交易列表
      getMyTradeOrderList() {
        let that = this;
        var l_type = (that.active).toString()
        var lType = l_type == "0" ? "1" : l_type == "1" ? "2" : l_type == "2" ? "3" : "4";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/getMyTradeOrderList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              type: lType
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.orderList = res.data.data.data;

            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {
             // that.$toast(error);
          });
      },
      //取消挂单
      cancelEntry(id) {
        let that = this;
        that
          .$http({
            url: "Trade/setCoinTradeCancel",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$toast.success("取消成功");
              that.getMyTradeOrderList();
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      //确认收款
      affirmGat(id) {
        let that = this;
        that
          .$http({
            url: "Trade/setCoinOrderDone",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$toast.success("已确认");
              that.getMyTradeOrderList();
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      }

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

      /deep/ .van-tabs__nav {
        background: rgba(98, 98, 98, 0.1) !important;
      }

      .account {
        margin-top: 0.22rem;

        .acc_list {
          padding: 0 4%;
          background: rgba(98, 98, 98, 0.1);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          font-family: PingFang SC;

          .deal_tit {
            width: 100%;
            height: 0.88rem;
            align-items: center;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #1F244F;

            span:nth-child(1) {
              font-size: 0.28rem;
              color: #fff;
            }

            span:nth-child(2) {
              font-size: 0.24rem;
              color: #A7A7A7;
            }
          }

          .acc_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: PingFang SC;
            padding: 0.32rem 0;

            p {
              display: flex;
              flex-direction: column;
              align-items: center;

              span:nth-child(1) {
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
              }

              span:nth-child(2) {
                font-size: 0.24rem;
                color: #A7A7A7;
                padding: 0.08rem 0;
              }
            }

            .van-button--primary {
              border-radius: 2rem !important;
            }
          }
        }
      }
      .no_data{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 3.2rem;
          height: 3.2rem;
          }
        span{
          color: #B1B9DC;
          padding: 0.12rem 0;
          font-size: 0.28rem;
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
