<template>
  <div class="public">
    <van-nav-bar title="收款方式" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="account">
        <div class="acc_list">
          <h3><img src="../../assets/img/bank1.png"></h3>
          <div class="acc_top">
            <div class="cash_info">
              <p><span>银行卡</span><span>{{payTypeInfo.yinlian_name}}</span></p>
              <span>{{payTypeInfo.yinlian_number}}</span>
            </div>
            <span v-if="payTypeInfo.yinlian_name == null" @click="goBank">添加</span>
            <span v-if="payTypeInfo.yinlian_name !== null" @click="goBank">修改</span>
          </div>
        </div>
        <div class="acc_list">
          <h3><img src="../../assets/img/zhifu.png"></h3>
          <div class="acc_top">
            <div class="cash_info">
              <p><span>支付宝</span><span>{{payTypeInfo.zfb_name}}</span></p>
              <span>{{payTypeInfo.zfb_account}}</span>
            </div>
            <span v-if="payTypeInfo.zfb_name == null" @click="goAlipay">添加</span>
            <span v-if="payTypeInfo.zfb_name !== null" @click="goAlipay">修改</span>
          </div>
        </div>
        <div class="acc_list">
          <h3><img src="../../assets/img/weixin.png"></h3>
          <div class="acc_top">
            <div class="cash_info">
              <p><span>微信</span><span>{{payTypeInfo.wx_name}}</span></p>
              <span>{{payTypeInfo.wx_account}}</span>
            </div>
            <span v-if="payTypeInfo.wx_name == null" @click="goWechat">添加</span>
            <span v-if="payTypeInfo.wx_name !== null" @click="goWechat">修改</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        payTypeInfo: {},
      }
    },
    mounted() {
      let that = this;
      that.getUserPayType()
    },
    methods: {
      back() {
        this.$router.back();
      },
      //获取我的地址列表信息
      getUserPayType() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "User/getUserPayType",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.payTypeInfo = res.data.data;
              that.$store.state.pay_type = res.data.data;

            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //微信
      goWechat() {
        let that = this;
        that.$router.push({
          path: '/weChat'
        })
      },
      //支付宝
      goAlipay() {
        let that = this;
        that.$router.push({
          path: '/alipay'
        })
      },
      //银行卡
      goBank() {
        let that = this;
        that.$router.push({
          path: '/bankCard'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {

    .content {
      padding: 0;

      .account {
        margin-top: 0.4rem;

        .acc_list {
          padding: 0.32rem 4%;
          background: rgba(98, 98, 98, 0.1);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;

          h3 {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            background: url(../../assets/img/acc.png) no-repeat;
            background-size: 100%;
            text-align: center;
            line-height: 1.2rem;

            img {
              display: inline-block;
              width: 0.54rem;
              height: 0.54rem;
            }
          }

          .acc_top {
            flex: 1;
            padding-left: 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .cash_info {
              p {
                display: flex;
                align-items: baseline;
                font-family: PingFang SC;

                span:nth-child(1) {
                  font-size: 0.28rem;
                  color: rgba(255, 255, 255, 1);
                }

                span:nth-child(2) {
                  font-size: 0.24rem;
                  color: #A7A7A7;
                  padding-left: 0.12rem;
                }
              }

              span {
                font-size: 0.24rem;
                color: #A7A7A7;
              }
            }

            span {
              font-size: 0.28rem;
              font-family: PingFang SC;
              color: rgba(53, 168, 251, 1);
            }
          }
        }
      }
    }
  }
</style>
