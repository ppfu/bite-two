<template>
  <div class="public">
    <div class="d_logo">
      <div class="top_tit">
        <van-nav-bar title="个人中心">
          <van-icon name="setting-o" slot="right" @click="goSett" />
        </van-nav-bar>
      </div>
      <div class="top_head">
        <div class="mine_info">
          <img src="../assets/img/hpo.jpeg">
          <div class="m_phone">
            <span>{{data.user_phone}}</span>
            <p><span>会员</span><img src="../assets/img/huiyuan.png"><span>ID:{{data.user_code}}</span></p>
          </div>
        </div>
        <div class="statis">
          <p><span>可用BST</span><span>{{data.bst_amount}}</span></p>
          <a></a>
          <p><span>今日收益</span><span>{{data.profit_today}}</span></p>
          <a></a>
          <p><span>我的矿机</span><span>{{data.mining_amount}}</span></p>
        </div>
      </div>

    </div>
    <div class="order_states">
      <p @click="goOrder(0)"><img src="../assets/img/dingdan.png"><span>全部订单</span></p>
      <p @click="goOrder(1)"><img src="../assets/img/fukuan.png"><span>待付款</span></p>
      <p @click="goOrder(2)"><img src="../assets/img/daifahuo.png"><span>待发货</span></p>
      <p @click="goOrder(3)"><img src="../assets/img/daishouhuo.png"><span>确认收货</span></p>
      <p @click="goOrder(4)"><img src="../assets/img/yiwancheng.png"><span>已完成</span></p>
    </div>
    <div class="content">
      <div class="mine_info">
        <van-cell  @click="gotrAcc" title="转账"  is-link />
        <van-cell @click="goMoneyCode"  title="我的收钱码" is-link />
        <van-cell @click="goDeal"  title="我的交易" is-link />
        <van-cell @click="goEarn"  title="我的收益" is-link />
        <van-cell @click="goAddress" title="我的收货地址" is-link />
        <van-cell @click="goGroup" title="我的团队" is-link  />
        <van-cell @click="goDrive" title="邀请返佣" is-link  />

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
        data: {}, //我的页面信息
        na_type:0,
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getUserInfo();
//       that.$store.state.navigation_type = window.performance.navigation.type;
//        if (that.$store.state.navigation_type == 1) {
//         that.na_type = 1;
//         console.log(that.na_type)
//       }else{
//          that.na_type = 0;
//           console.log(that.na_type)
//       }
//
    },
    methods: {
      back() {
        this.$router.back();
      },
      //获取我的页面信息
      getUserInfo() {
        let that = this;
        that
          .$http({
            url: "User/getUserInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.data = res.data.data;
              that.$store.state.user_data = res.data.data;
              // console.log(that.$store.state.user_data)
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
       //设置
       goSett() {
        let that = this;
        that.$router.push({
          path: '/setting'
        })
      },
      //我的订单
       goOrder(i) {
         // console.log(i)
        this.$router.push({
          path: '/order',
          query: {
            type: i
          }
        })
      },
      //我的交易
        goDeal() {
        let that = this;
        that.$router.push({
          path: '/dealList'
        })
      },
      //我的收益
       goEarn() {
        let that = this;
        that.$router.push({
          path: '/earnings'
        })
      },
      //我的团队
       goGroup() {
        let that = this;
        that.$router.push({
          path: '/group'
        })
      },
         //收款码
       goMoneyCode() {
        let that = this;
        that.$router.push({
          path: '/moneyCode'
        })
      },

       //转账
      gotrAcc() {
        let that = this;
        that.$router.push({
          path: '/transferAcc',
        })
      },
     //我的地址
      goAddress() {
        let that = this;
        that.$router.push({
          path: '/myAddress'
        })
      },
      //邀请返佣
      goDrive(){
          let that = this;
        that.$router.push({
          path: '/directDrive'
        })
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
      background: url(../assets/img/wode-bg.png) no-repeat;
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
          justify-content: start;

          img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }

          .m_phone {
            padding-left: 0.4rem;
            text-align: left;

            span {
              font-size: 0.3rem;
              color: rgba(255, 255, 255, 1);
            }

            p {
              padding: 0.08rem 0;
              display: flex;
              align-items: center;
              span {
                font-size: 0.26rem;
                color: rgba(255, 255, 255, 1);
              }

              img {
                width: 0.4rem;
                height: 100%;
                margin: 0 0.06rem;
              }
               span:nth-child(3) {
                font-size: 0.26rem;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }


        .statis {
          width: 100%;
          margin-top: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: space-around;

          p {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: PingFang SC;
            color: rgba(255, 255, 255, 1);

            span:nth-child(1) {
              font-size: 0.24rem;
              opacity: 0.6;
              padding: 0.12rem 0;
            }

            span:nth-child(2) {
              font-size: 0.30rem;
              font-weight: bold;
            }


          }

          a {
            width: 0.02rem;
            height: 0.81rem;
            background: rgba(255, 255, 255, 1);
            opacity: 0.2;
          }
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
        img {
          width: 0.46rem;
          height: 0.52rem;
        }
        span {
          padding-top: 0.14rem;
          font-size: 0.24rem;
          font-family: PingFang SC;
          color: rgba(167, 167, 167, 1);
        }
      }
      p:nth-child(4){
        img{
           width: 0.6rem;
          height: 0.52rem;
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
       /deep/ .van-cell {
          padding: 0.22rem 0 !important;
          font-size: 0.28rem;
          font-weight: 400;
          background:none !important;
          color: #fff !important;
        }
        .van-hairline--top-bottom::after {
          // border-width: 0;
        }

        /deep/  .van-cell:not(:last-child)::after {
          border-bottom:1px solid #1F244F !important;
        }
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
