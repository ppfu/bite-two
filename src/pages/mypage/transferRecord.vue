<template>
  <div class="public">
    <van-nav-bar title="转账记录" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="scroll_div">
        <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
          @refresh="onRefresh">
          <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
            @load="onLoad">
            <div class="account">
              <div class="acc_list" v-for="(item,index) in transferList" :key="index">
                <p class="deal_tit">
                  <span v-if="item.transfer_type_msg == '转入'" style="color: #01B782;">{{item.transfer_type_msg}}</span>
                  <span v-if="item.transfer_type_msg == '转出'" style="color: #D14B64;">{{item.transfer_type_msg}}</span>
                  <span>{{item.create_time}}</span>
                </p>
                <div class="acc_top">
                  <p>
                    <span>{{item.transfer_user}}</span>
                    <span v-if="item.transfer_type_msg == '转入'">付款人ID</span>
                    <span v-if="item.transfer_type_msg == '转出'">收款人ID</span>
                  </p>
                  <p><span>{{item.coin_name}}</span><span>币种</span></p>
                  <p><span>{{item.coin_amount}}</span><span>转账金额</span></p>
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
        transferList: [], //兑现列表
        transferTotal: 0, // 总数量
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false // 全部加载
      }
    },
    mounted: function() {
      let that = this;
      that.getUserTransferList();
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
        that.transferList = [];
        that.transferTotal = 0;
        that.getUserTransferList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getUserTransferList(1);
      },
      //获取转账记录
      getUserTransferList(i) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Account/getUserTransferList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
            }
          })
          .then(function(res) {
            // console.log(res.data.data.total)
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              if (i == 0) {
                if (res.data.data.data.length > 0) {
                  that.transferList = res.data.data.data;
                  that.transferTotal = res.data.data.total;
                  if (that.transferList.length >= that.transferTotal) {
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
                  that.transferList = that.transferList.concat(res.data.data.data);
                  that.transferTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.transferList.length >= that.transferTotal) {
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
              color: #03AC8F;
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
    }
  }
</style>
