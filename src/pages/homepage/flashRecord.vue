<template>
  <div class="public">
    <van-nav-bar title="闪兑记录" left-text="" left-arrow @click-left="back" />
    <div class="content">
       <div class="scroll_div">
         <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
           @refresh="onRefresh">
           <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
             @load="onLoad">
       <div class="account">
         <div class="acc_list" v-for="(item,index) in exchangeList" :key="index">
           <div class="acc_top">
             <h3><a>{{item.coin_log_type}}</a></h3>
             <p><span>{{item.exchange_coin}}</span><span>{{item.create_time}}</span></p>
             <p><span>{{item.coin_amount}}</span><span>数量</span></p>
             <p><span>{{item.coin_log_status}}</span><span>状态</span></p>
           </div>
         </div>
       </div>
           </van-list>
         </van-pull-refresh>
       </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageindex: 1, //商品列表默认第一页
        exchangeList: [], //兑现列表
        goodsTotal: 0, // 总数量
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false // 全部加载
      }
    },
     mounted: function() {
      let that = this;
      that.getExchangeList();
    },
    methods: {
      back() {
        this.$router.back();
      },
        //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.exchangeList = [];
        that.exchangeTotal = 0;
        that.getExchangeList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getExchangeList(1);
      },
      //获取兑现记录
      getExchangeList(i) {
        let that = this;
        that
          .$http({
            url: "Account/getCoinExchangeList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (i == 0) {
                if (res.data.data.data.length > 0) {
                  that.exchangeList = res.data.data.data;
                  that.exchangeTotal = res.data.data.total;
                  if (that.exchangeList.length >= that.exchangeTotal) {
                    //全部数据已加载
                    that.finished = true;
                  }
                } else {
                  that.finished = true;
                }
                that.updateLoading = false;
              } else {
                that.moreloading = false;
                if (res.data.data.data.length > 0) {
                  that.exchangeList = that.exchangeList.concat(res.data.data.data);
                  that.exchangeTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.exchangeList.length >= that.exchangeTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
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
         width: 100%;
         overflow-y: scroll;
         // padding: 0;
         height: calc(100% - 1rem);

    .account {
        margin-top: 0.4rem;

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
              line-height: 0.8rem;
              a {
                font-size: 0.24rem;
                font-family: PingFang SC;
                color: rgba(255, 255, 255, 1);
              }
            }

            p {
              display: flex;
              flex-direction: column;
              align-items: center;

              span {
                font-size: 0.24rem;
                font-family: PingFang SC;
                color: rgba(196, 200, 219, 1);
                padding: 0.06rem 0;
              }
            }

            p:nth-child(2) {
              span:nth-child(1) {
                color: #fff;
                font-size: 0.26rem;
              }
            }

            p:nth-child(3) {
              span:nth-child(1) {
                color: #fff;
                font-size: 0.26rem;
              }
            }

            p:nth-child(4) {
              span:nth-child(1) {
                color: #0AB480;
                font-size: 0.26rem;
              }
            }
          }
        }
      }
    }
  }
</style>
