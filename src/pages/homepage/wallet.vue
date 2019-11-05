<template>
  <div class="public">
    <van-nav-bar title="钱包" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="账户">
          <div class="account">
            <div class="acc_list" v-for="(item,index) in accountList" :key="index">
              <div class="acc_top">
                <h3><a>{{item.coin_name}}</a></h3>
                <p><span>{{item.amount}}</span><span>可用</span></p>
                <p><span>{{item.frozen_amount}}</span><span>冻结</span></p>
                <p><span>{{item.amount_cny}}</span><span>折合(CNY)</span></p>
              </div>
              <div class="acc_btn">
                <span v-if="item.exchange_bst == 1" @click="goConver(0)">兑换BST</span>
                <span v-if="item.is_recharge == 1" @click="goRech(1)">充值</span>
                <span v-if="item.cash_out == 1" @click="goMen(item.coin_id)">提币</span>
              </div>
            </div>
          </div>
           <div v-if="accountList.length <=0" class="no_data">
            <img src="../../assets/img/noData.png">
            <span>暂无数据</span>
          </div>
        </van-tab>
        <van-tab title="余额宝">
          <div class="wall_con">
            <h4 @click="goBala">玩转余额宝</h4>
            <div class="wall_info" v-for="(item,index) in user_yeb" :key="index">
              <h4>收益{{index+1}}（{{item.yeb_cycle}}天）</h4>
              <p><span>{{item.total_amount}}</span><span>总余额（{{item.coin_name}}）</span></p>
              <div class="statis">
                <p><span>{{item.profit_amount_today}}BSC</span><span>今日收益</span></p>
                <p><span>{{item.profit_amount}}BSC</span><span>累计收益</span></p>
                <p><span>{{item.surplus_days}}</span><span>剩余天数</span></p>
              </div>
            </div>

            <div class="no_data" v-if="user_yeb == ''">
              <van-icon name="warning-o" />
              <span>暂无余额</span>
            </div>

          </div>
          <div class="well_btn" @click="seleCoin">
            <span>转入</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 选择币种弹窗 -->
    <x-dialog v-model="coin_dlg" class="de_dialog lang_dialog" hide-on-blur>
      <div class="dialog">
        <ul>
          <li :class="{active:categoryIndex==index}" @click="changeLang(item,index)" v-for="(item,index) in coin_list"
            :key="index">
            <span>{{item.coin_name}}</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>

        </ul>
      </div>
    </x-dialog>
    <van-popup v-model="add_dlg" position="bottom" :style="{ height: '50%' }">
      <div class="shift">
        <h4>转入{{yeb_coin.coin_name}}</h4>
        <div class="shift-info">
          <div class="shift_money">
            <input type="text" v-model="amount" placeholder="请输入转入数量" />
            <span>{{yeb_coin.coin_name}}</span>|<span>转入</span>
          </div>
          <p>可转入数量:{{yeb_coin.amount}}{{yeb_coin.coin_name}}</p>
        </div>
        <h4>周期</h4>
        <div class="shift-data">
          <div class="shift_st" v-for="(item,index) in yeb" :key="index">
            <span>{{item.yeb_cycle}}天</span>
            <span>{{item.profit_rate}}%收益</span>
            <span :class="deIndex == index ? 'active1':''" @click="designate(item,index)">选定</span>
          </div>
        </div>
      </div>
      <div class="shift_btn">
        <span @click="closeAddlog">取消</span>
        <span @click="addUserYebe">确定</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        active: 0,
        categoryIndex: 0, //点击当前背景变成白色索引
        deIndex: -1, //选定
        add_dlg: false,
        coin_dlg: false,
        accountList: [], //转账列表
        coin_list: [], //可转入余额宝的币种
        yeb: [], //余额宝类型
        user_yeb: [], //用户已转入的余额宝
        yeb_coin: {}, //转入余额宝币种
        yeb_intro: '', //余额宝介绍
        yeb_id: '', //余额宝种类id
        coin_id: '', //币id
        amount: '', //转入数量
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getAccountList();
      that.getUserYebInfo();
    },
    methods: {
      back() {
        this.$router.back();
      },
      closeAddlog() {
        let that = this;
        that.add_dlg = false;
      },
      //提币
      goMen(id) {
        let that = this;
        that.$router.push({
          path: '/menCoin',
          query: {
            coin_id: id
          }
        })
      },
      //兑换
      goConver(i) {
        let that = this;
        that.$router.push({
          path: '/flashAgainst',
          query: {
            type: i
          }
        })
      },
      //充值
      goRech(i) {
        let that = this;
        that.$router.push({
          path: '/flashAgainst',
          query: {
            type: i
          }
        })
      },
      //关于余额宝
      goBala() {
        let that = this;
        that.$router.push({
          path: '/aboutBala'
        })
      },
      seleCoin() {
        this.coin_dlg = true;
      },
      //选择币种
      changeLang(item, i) {
        let that = this;
        that.categoryIndex = i;
        that.coin_dlg = false;
        that.add_dlg = true;
        that.yeb_coin = item;
        that.coin_id = item.id;
      },
      //选定周期
      designate(item, i) {
        let that = this;
        that.deIndex = i;
        that.yeb_id = item.id;
      },
      //转入余额宝
      addUserYebe() {
        let that = this;
        let amount = that.amount;
        if (!amount || amount == null) {
          that.$toast("请输入转入数量");
        } else if (Number(amount) <= 0) {
          that.$toast("数量不能小于0！");
        } else {
          that.$toast.loading({
            mask: true,
            message: "提交中..."
          });
          that.$http({
              url: "Wallet/addUserYeb",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                coin_id: that.coin_id,
                yeb_id: that.yeb_id,
                amount: amount,
              }
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
                that.$toast.success("转入成功");
                that.add_dlg = false;
                that.getUserYebInfo();
                that.getAccountList();
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(err) {});
        }
      },
      //转换数据格式
      checkPrice(price) {
        if (price) {
          price = parseFloat(price);
          if (price < 1000) {
            price = parseFloat(price).toFixed(2);
          }
          if (price >= 1000 && price < 10000) {
            price = parseFloat(price / 1000).toFixed(2) + "k";
          }
          if (price >= 10000 && price < 1000000) {
            price = parseFloat(price / 10000).toFixed(2) + "w";
          }
          if (price >= 1000000) {
            price = parseFloat(price / 1000000).toFixed(2) + "m";
          }
        }
        return price;
      },
      //获取账户列表
      getAccountList() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Wallet/getUserAccountList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.accountList = res.data.data;
              $.each(that.accountList, function(index, item) {
                //可用数量
                item.amount = that.checkPrice(item.amount);
                //冻结数量
                item.frozen_amount = that.checkPrice(item.frozen_amount);
                //折合人民币
                item.amount_cny = that.checkPrice(item.amount_cny);

              });
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },
      //获取余额宝信息
      getUserYebInfo() {
        let that = this;
         that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Wallet/getUserYebInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
               that.$vux.loading.hide();
              that.coin_list = res.data.data.coin_list;
              $.each(that.coin_list, function(index, item) {
                //可转入余额宝币种数量
                item.amount = that.checkPrice(item.amount);
              });
              that.yeb = res.data.data.yeb;
              that.user_yeb = res.data.data.user_yeb;
              $.each(that.user_yeb, function(index, item) {
                //总投资额
                item.total_amount = that.checkPrice(item.total_amount);
                //累计收益
                item.profit_amount = that.checkPrice(item.profit_amount);
                //今日收益
                item.profit_amount_today = that.checkPrice(item.profit_amount_today);

              });
              that.yeb_intro = res.data.data.yeb_intro;
              that.$store.state.yeb_intro = that.yeb_intro;
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
    .van-hairline--bottom::after {
      // border: none !important;
    }

    .content {
      font-family: PingFang SC;
      height: calc(100% - 1.8rem);
      overflow-y: scroll;
      padding: 0;

      /deep/ .van-tabs__nav {
        background: rgba(255, 255, 255, 0.028) !important;
        z-index: 99;
      }

      /deep/ .van-tab {
        color: #fff !important;
      }

      /deep/ .van-tab--active {
        color: #35A8FB !important;
      }

      .account {
        margin-top: 0.4rem;
        padding: 0 4%;


        // background: #00B480;
        .acc_list {
          padding: 0.2rem 0.12rem;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;

          .acc_top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h3 {
              display: inline-block;
              width: 1rem;
              height: 1rem;
              background: url(../../assets/img/acc.png) no-repeat;
              background-size: 100%;
              text-align: center;
              line-height: 0.92rem;

              a {
                font-size: 0.26rem;
                font-family: PingFang SC;
                color: rgba(255, 255, 255, 1);
              }
            }

            p {
              display: flex;
              flex-direction: column;
              align-items: center;

              span {
                font-size: 0.26rem;
                font-family: PingFang SC;
                color: rgba(196, 200, 219, 1);
                padding: 0.06rem 0;
              }
            }

            p:nth-child(2) {
              span:nth-child(1) {
                color: #00B480;
              }
            }

            p:nth-child(3) {
              span:nth-child(1) {
                color: #D14B64;
              }
            }

            p:nth-child(4) {
              span:nth-child(1) {
                color: #F58B36;
              }
            }
          }

          .acc_btn {
            width: 100%;
            text-align: right;
            padding-top: 0.12rem;
            color: rgba(255, 255, 255, 1);
            font-family: PingFang SC;

            span {
              font-size: 0.24rem;
              display: inline-block;
              padding: 0.046rem 0.32rem;
              background: #35A8FB;
              border-radius: 2rem;

            }
          }
        }
      }

      .wall_con {
        margin-top: 0.2rem;
        padding: 0 4%;

        h4 {
          text-align: right;
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(53, 168, 251, 1);
          padding: 0.2rem 0;
        }

        .no_data {
          width: 100%;
          height: 2rem;
          color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .van-icon {
            font-size: 0.8rem;
            font-weight: normal;
          }

          span {
            font-size: 0.28rem;
            padding-top: 0.08rem;
          }
        }

        .wall_info {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.08rem 0.16rem;
          margin-bottom: 0.4rem;

          h4 {
            font-size: 0.24rem;
            color: #C4C8DB;
            text-align: left;
          }

          p {
            margin-top: 0.12rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            color: #fff;

            span:nth-child(1) {
              font-size: 0.4rem;
            }

            span:nth-child(2) {
              font-size: 0.24rem;
              padding-top: 0.1rem;
              color: #C4C8DB;
            }
          }

          .statis {
            margin-top: 0.26rem;
            display: flex;
            justify-content: space-around;
            align-items: center;

            p {
              display: flex;
              flex-direction: column;
              color: #fff;

              span:nth-child(1) {
                font-size: 0.3rem;
              }

              span:nth-child(2) {
                font-size: 0.24rem;
                padding: 0.16rem 0;
              }
            }

            p:nth-child(1) {
              span:nth-child(1) {
                color: #D14B64;
              }
            }

            p:nth-child(2) {
              span:nth-child(1) {
                color: #00B480;
              }
            }

            p:nth-child(3) {
              span:nth-child(1) {
                color: #F58B36;
              }
            }
          }

        }


      }

      .well_btn {
        position: fixed;
        height: 0.92rem;
        width: 100%;
        background: #35A8FB;
        bottom: 0;
        text-align: center;
        line-height: 0.92rem;

        span {
          color: #fff;
          font-size: 0.28rem;
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

    .van-popup {
      background: #181B34 !important;


      .shift {
        width: 100%;
        height: auto;
        padding: 0 4%;
        font-family: PingFang SC;

        h4 {
          font-size: 0.28rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          padding: 0.2rem 0;
          border-bottom: 1px solid #1F244F;
        }

        .shift-info {
          margin-top: 0.6rem;
          color: #B3B3B3;
          font-size: 0.26rem;

          .shift_money {
            width: 90%;
            margin: 0 auto;
            height: 0.72rem;
            border: 1px solid rgba(213, 211, 211, 0.4);
            border-radius: 0.08rem;
            display: flex;
            align-items: center;

            input {
              height: 100%;
              flex: 1;
              background: none;
              padding: 0.16rem;
            }

            span {
              padding: 0 0.12rem;
            }

            span:nth-child(3) {
              color: #35A8FB;
            }
          }

          p {
            width: 90%;
            margin: 0 auto;
            text-align: right;
            padding: 0.12rem 0;
          }

        }

        .shift-data {
          display: flex;
          justify-content: space-around;

          .shift_st {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0.32rem 0;

            span:nth-child(1) {
              font-size: 0.32rem;
              color: rgba(255, 255, 255, 1);
            }

            span:nth-child(2) {
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(144, 146, 151, 1);
              padding: 0.08rem 0;
            }

            span:nth-child(3) {
              display: inline-block;
              font-size: 0.24rem;
              font-family: PingFang SC;
              color: rgba(167, 178, 214, 1);
              padding: 0.04rem 0.24rem;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 2rem;
            }

            span.active1 {
              background: #515789;
            }
          }
        }

      }

      .shift_btn {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          width: 50%;
          text-align: center;
          font-size: 0.3rem;
          color: #fff;
        }

        span:nth-child(1) {
          background: #7C7C7C;
        }

        span:nth-child(2) {
          background: #35A8FB;
        }
      }
    }
  }
</style>
