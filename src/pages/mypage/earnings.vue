<template>
  <div class="public">
    <van-nav-bar title="收益" left-text="" right-text="攻略" @click-right="goStrat" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="矿机收益">
          <div class="total_re">
            <div class="re_left">
              <span>总收益</span>
              <span>{{mining.total_profit}} BSC</span>
            </div>
            <div class="re_right">
              <p><span>我的矿机:</span><span>{{mining.count}}</span></p>
            </div>
          </div>

          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in miningList" :key="index">
                    <div class="acc_top">
                      <p><span>{{item.relation_mining}}</span><span>{{item.create_time}}</span></p>
                      <p class="acc_rig"><span>{{item.coin_amount}}BSC</span><span>收益</span></p>
                    </div>
                  </div>

                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab title="其他收益">
          <div class="total_re">
            <div class="re_left">
              <span>推广总收益</span>
              <span>{{team.total_profit}} BSC</span>
            </div>
            <div class="re_right">
              <p><span>我的直推:</span><span>{{team.direct_num}}</span></p>
              <p><span>团队人数:</span><span>{{team.team_num}}</span></p>
            </div>
          </div>
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in teamList" :key="index">
                    <div class="acc_top">
                      <p><span>{{item.relation_user}}</span><span>{{item.create_time}}</span></p>
                      <p class="acc_rig"><span>{{item.coin_amount}}BSC</span><span>{{item.team_type}}</span></p>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
        profitInfo: "", //攻略
        mining: "", //矿机信息
        team: "", //其他收益
        pageindex: 1, //矿机列表默认第一页
        miningList: [], //矿机收益列表
        teamList: [], //其他收益列表
        miningTotal: 0, // 总数量
        teamTotal: 0, // 总数量
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getMyProfitInfo();
      that.getMyMiningProfit();
      that.getMyTeamProfit();
    },
    methods: {
      back() {
        this.$router.back();
      },
      cancel() {
        let that = this;
        that.tran_dlg = true;
      },
      goStrat() {
        let that = this;
        that.$router.push({
          path: '/strategy',
        })
      },
      //获取我的收益
      getMyProfitInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Account/getMyProfitInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.profitInfo = res.data.data.profit_intro;
              that.$store.state.profitInfo = that.profitInfo;
              that.mining = res.data.data.mining;
              that.team = res.data.data.team;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.miningList = [];
        that.teamList = [];
        that.miningTotal = 0;
        that.teamTotal = 0;
        that.getMyMiningProfit(0);
        that.getMyTeamProfit(0);

      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getMyMiningProfit(1);
        that.getMyTeamProfit(1);
      },
      //获取我的矿机收益列表
      getMyMiningProfit(i) {
        let that = this;
        that
          .$http({
            url: "Account/getMyMiningProfit",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
            },

          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (i == 0) {
                if (res.data.data.data.length > 0) {
                  that.miningList = res.data.data.data;
                  that.miningTotal = res.data.data.total;
                  if (that.miningList.length >= that.miningTotal) {
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
                  that.miningList = that.miningList.concat(res.data.data.data);

                  that.miningTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.miningList.length >= that.miningTotal) {
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
      //获取其他收益列表
      getMyTeamProfit(i) {
        let that = this;
        that
          .$http({
            url: "Account/getMyTeamProfit",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
            },

          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (i == 0) {
                if (res.data.data.data.length > 0) {
                  that.teamList = res.data.data.data;
                  that.teamTotal = res.data.data.total;
                  if (that.teamList.length >= that.teamTotal) {
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
                  that.teamList = that.teamList.concat(res.data.data.data);

                  that.teamTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.teamList.length >= that.teamTotal) {
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
      padding: 0;
      height: calc(100% - 1rem);

      /deep/ .van-tabs__nav {
        background: rgba(98, 98, 98, 0.1) !important;
      }

      .total_re {
        width: 100%;
        height: 2rem;
        background: url(../../assets/img/zhifu-bg.png) no-repeat;
        background-size: 100%;
        font-family: PingFang SC;
        font-weight: 500;
        padding: 0 6%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .re_left {
          display: flex;
          flex-direction: column;
          width: 50%;

          span:nth-child(1) {
            font-size: 0.28rem;
            color: rgba(255, 255, 255, 1);
            padding-bottom: 0.14rem;
          }

          span:nth-child(2) {
            font-size: 0.4rem;
            color: rgba(10, 180, 128, 1);
          }
        }

        .re_right {
          p {
            margin: 0.12rem 0;
            width: 2.4rem;
            height: 0.6rem;
            border: 1px solid #989CAC;
            border-radius: 2rem;
            text-align: center;
            font-family: PingFang SC;

            span:nth-child(1) {
              display: inline-block;
              height: 0.6rem;
              line-height: 0.56rem;
              font-size: 0.26rem;
              color: rgba(167, 167, 167, 1);
            }

            span:nth-child(2) {
              font-size: 0.26rem;
              color: rgba(53, 168, 251, 1);
            }
          }
        }
      }

      .account {

        // margin-top: 0.22rem;
        .acc_list {
          padding: 0 4%;
          background: rgba(98, 98, 98, 0.1);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          font-family: PingFang SC;

          .acc_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: PingFang SC;
            padding: 0.26rem 0;

            p {
              display: flex;
              flex-direction: column;

              span:nth-child(1) {
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
                padding-bottom: 0.2rem;
              }

              span:nth-child(2) {
                font-size: 0.24rem;
                color: #A7A7A7;
                padding-bottom: 0.04rem;
              }
            }

            .acc_rig {
              align-items: center;

              span:nth-child(1) {
                color: #0AB480;
              }
            }

            .van-button--primary {
              border-radius: 2rem !important;
            }
          }
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
