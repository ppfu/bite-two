<template>
  <div class="public">
    <van-nav-bar title="订单" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" :swipe-threshold="num" @click="navTap(active)">
        <van-tab title="全部的">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in orderList" :key="index">
                    <p>
                      <span>订单号：{{item.order_sn}}</span>
                      <span v-if="item.order_status == 0">待付款 <a @click="setOrderDelete(item.id)" class="iconfont icon-tabshanchu"></a></span>
                      <span v-if="item.order_status == 1">待发货</span>
                      <span v-if="item.order_status == 2">待收货</span>
                      <span v-if="item.order_status == 3">已完成 <a @click="setOrderDelete(item.id)" class="iconfont icon-tabshanchu"></a></span>
                      <span v-if="item.order_status == 99">已取消 <a @click="setOrderDelete(item.id)" class="iconfont icon-tabshanchu"></a></span>
                    </p>
                    <div class="acc_top">
                      <h3 @click="goOrderInfo(item.id)"><img :src="item.goods_img"></h3>
                      <div class="s_info">
                        <h4>{{item.goods_name}}</h4>
                        <span>{{item.goods_spec}}</span>
                        <span>数量：{{item.goods_num}}</span>
                        <div class="number">
                          <p><span>{{item.order_amount_usdt}}</span><a>USDT</a>+<span>{{item.order_amount_bsc}}</span><a>BSC</a></p>

                        </div>
                      </div>
                      <div v-if="item.order_status == 0" class="order_btn"><span @click="cancelOrder(item.id)">取消</span><span
                          @click="ShowPass(item.id)">付款</span></div>
                      <div v-if="item.order_status == 1" class="order_btn"><span @click="pushDelivery(item.id)">催发货</span></div>
                      <div v-if="item.order_status == 2" class="order_btn"><span @click="setOrderReceive(item.id)">确认收货</span></div>
                      <div v-if="item.order_status == 3" class="order_btn"><span style="background: #7C7C7C;">已完成</span></div>
                      <div v-if="item.order_status == 99" class="order_btn"><span style="background: #7C7C7C;">已取消</span></div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab title="待付款">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in orderList" :key="index">
                    <p>
                      <span>订单号：{{item.order_sn}}</span>
                      <span v-if="item.order_status == 0">待付款 <a @click="setOrderDelete(item.id)" class="iconfont icon-tabshanchu"></a></span></p>
                    <span v-if="item.order_status == 99">已取消 <a @click="setOrderDelete(item.id)" class="iconfont icon-tabshanchu"></a></span></p>
                    <div class="acc_top">
                      <h3><img :src="item.goods_img"></h3>
                      <div class="s_info">
                        <h4>{{item.goods_name}}</h4>
                        <span>{{item.goods_spec}}</span>
                        <span>数量：{{item.goods_num}}</span>
                        <div class="number">
                          <p><span>{{item.order_amount_usdt}}</span><a>USDT</a>+<span>{{item.order_amount_bsc}}</span><a>BSC</a></p>
                        </div>
                      </div>
                      <div class="order_btn" v-if="item.order_status == 0"><span @click="cancelOrder(item.id)">取消</span><span
                          @click="ShowPass(item.id)">付款</span></div>
                      <div class="order_btn" v-if="item.order_status == 99" style="background: #7C7C7C;"><span>已取消</span></div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in orderList" :key="index">
                    <p><span>订单号：{{item.order_sn}}</span><span>待发货</span></p>
                    <div class="acc_top">
                      <h3><img :src="item.goods_img"></h3>
                      <div class="s_info">
                        <h4>{{item.goods_name}}</h4>
                        <span>{{item.goods_spec}}</span>
                        <span>数量：{{item.goods_num}}</span>
                        <div class="number">
                          <p><span>{{item.order_amount_usdt}}</span><a>USDT</a>+<span>{{item.order_amount_bsc}}</span><a>BSC</a></p>
                        </div>
                      </div>
                      <div class="order_btn" v-if="item.is_urgent == 0"><span @click="pushDelivery(item.id)">催发货</span></div>
                      <div class="order_btn" v-if="item.is_urgent == 1"><span style="background: #7C7C7C;">已催货</span></div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab title="待收货">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in orderList" :key="index">
                    <p><span>订单号：{{item.order_sn}}</span><span>待收货</span></p>
                    <div class="acc_top">
                      <h3><img :src="item.goods_img"></h3>
                      <div class="s_info">
                        <h4>{{item.goods_name}}</h4>
                        <span>{{item.goods_spec}}</span>
                        <span>数量：{{item.goods_num}}</span>
                        <div class="number">
                          <p><span>{{item.order_amount_usdt}}</span><a>USDT</a>+<span>{{item.order_amount_bsc}}</span><a>BSC</a></p>
                        </div>
                      </div>
                      <div class="order_btn"><span @click="setOrderReceive(item.id)">确认收货</span></div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in orderList" :key="index">
                    <p><span>订单号：{{item.order_sn}}</span><span>已完成 <a @click="setOrderDelete(item.id)" class="iconfont icon-tabshanchu"></a></span></p>
                    <div class="acc_top">
                      <h3><img :src="item.goods_img"></h3>
                      <div class="s_info">
                        <h4>{{item.goods_name}}</h4>
                        <span>{{item.goods_spec}}</span>
                        <span>数量：{{item.goods_num}}</span>
                        <div class="number">
                          <p><span>{{item.order_amount_usdt}}</span><a>USDT</a>+<span>{{item.order_amount_bsc}}</span><a>BSC</a></p>
                        </div>
                      </div>
                      <div class="order_btn"><span style="background: #7C7C7C;">已完成</span></div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 密码框-->
    <x-dialog v-model="tran_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
        <h3>资金密码</h3>
        <input type="password" v-model="pay_pwd" placeholder="请输入资金密码" />
        <div class="dia_btn">
          <span @click="closeDia">取消</span>
          <span @click="payment">确认</span>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        active: this.$route.query.type,
        num: 5,
        tran_dlg: false,
        order_id: '', //订单id
        pageindex: 1, //商品列表默认第一页
        orderList: [], //商品列表
        orderTotal: 0, // 总数量
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        pay_pwd: '', //支付密码

      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      this.$nextTick(() => {
        if (this.$route.query.type) {
          this.active = Number(this.$route.query.type);
        } else {
          this.active = 0;
        }
      });
      // console.log(this.$route.query.type)
      that.getOrderList()
    },
    methods: {
      back() {
        this.$router.back();
      },
      //订单详情
      goOrderInfo(id) {
        let that = this;
        that.$router.push({
          path: '/orderInfo',
          query: {
            id: id
          }
        })
      },
      //关闭密码弹窗
      closeDia() {
        let that = this;
        that.tran_dlg = false;
        that.pay_pwd = '';
      },
      //弹出密码弹窗
      ShowPass(id) {
        let that = this;
        that.order_id = id;
        that.tran_dlg = true;
      },
      //付款
      payment() {
        let that = this;
        if (!that.pay_pwd || that.pay_pwd == null) {
          that.$toast("请输入交易密码");
        } else {
          that
            .$http({
              url: "Aoshop/getGoodsOrderPay",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                id: that.order_id,
                pay_pwd: that.pay_pwd
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.onRefresh()
                that.$toast.success("支付成功");
                that.pay_pwd = ''
                that.tran_dlg = false;
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(error) {

            });
        }
      },
      //催发货
      pushDelivery(id) {
        console.log(id)
        let that = this;
        that
          .$http({
            url: "Aoshop/setOrderUrgent",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.onRefresh();
              that.$toast.success("已催货");
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      //取消订单
      cancelOrder(id) {
        let that = this;
        that
          .$http({
            url: "Aoshop/setOrderCancel",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.onRefresh();
              that.$toast.success("取消成功");
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //确认收货
      setOrderReceive(id) {
        let that = this;
        that
          .$http({
            url: "Aoshop/setOrderReceive",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.onRefresh();
              that.$toast.success("确认成功");
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //删除订单
      setOrderDelete(id) {
        let that = this;
        that
          .$http({
            url: "Aoshop/setOrderDelete",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.onRefresh();
              that.$toast.success("删除成功");
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      //转换数据格式
      checkPrice(price) {
        if (price) {
          price = parseFloat(price);
          if (price < 1000) {
            price = parseFloat(price).toFixed(4);
          }
          if (price >= 1000 && price < 10000) {
            price = parseFloat(price / 1000).toFixed(4) + "k";
          }
          if (price >= 10000 && price < 1000000) {
            price = parseFloat(price / 10000).toFixed(4) + "w";
          }
          if (price >= 1000000) {
            price = parseFloat(price / 1000000).toFixed(4) + "m";
          }
        }
        return price;
      },
      //点击商品类别显示相应商品列表
      navTap(i) {
        let that = this;
        that.active = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.orderList = [];
        that.getOrderList(0);
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.orderList = [];
        that.orderTotal = 0;
        that.getOrderList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getOrderList(1);
      },
      //获取我的订单列表
      getOrderList(i) {
        let that = this;
        let typeorder = (that.active).toString();
        // typeorder == 0 : 全部; typeorder == 1 : 电器;typeorder == 2 : 数码; typeorder == 3 : 服饰;typeorder == 4 : 其他;
        let order_type = typeorder == "0" ? "-1" : typeorder == "1" ? "0" : typeorder == "2" ? "1" : typeorder == "3" ?
          "2" : "3";
        that
          .$http({
            url: "Aoshop/getMyGoodsOrderList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
              order_status: order_type,
            },

          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (i == 0) {
                if (res.data.data.data.length > 0) {
                  that.orderList = res.data.data.data;
                  $.each(that.orderList, function(index, item) {
                    //usdt
                    item.order_amount_usdt = that.checkPrice(item.order_amount_usdt);
                    //bsc
                    item.order_amount_bsc = that.checkPrice(item.order_amount_bsc);

                  });
                  that.orderTotal = res.data.data.total;
                  if (that.orderList.length >= that.orderTotal) {
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
                  that.orderList = that.orderList.concat(res.data.data.data);
                  $.each(that.orderList, function(index, item) {
                    //usdt
                    item.order_amount_usdt = that.checkPrice(item.order_amount_usdt);
                    //bsc
                    item.order_amount_bsc = that.checkPrice(item.order_amount_bsc);
                  });
                  that.orderTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.orderList.length >= that.orderTotal) {
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
    /deep/ .van-tabs__nav {
      background: rgba(255, 255, 255, 0.028) !important;
      z-index: 99;
    }

    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 1rem);

      .account {
        margin-top: 0.4rem;

        .acc_list {
          padding: 0.36rem 2.4%;
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

              a.icon-tabshanchu {
                font-size: 0.32rem;
                padding-left: 0.24rem;
              }
            }
          }

          .acc_top {
            width: 100%;
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
              // width: 3.4rem;
              font-family: PingFang SC;
              padding-left: 0.16rem;
              flex: 1;

              h4 {

                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
                padding: 0.06rem 0;
                // text-overflow: -o-ellipsis-lastline;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // display: -webkit-box;
                // -webkit-line-clamp: 2;
                // line-clamp: 2;
                // -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              span {
                display: block;
                font-size: 0.24rem;
                color: rgba(185, 184, 184, 1);
              }

              .number {
                display: flex;
                align-items: baseline;

                span {
                  display: inline-block;
                  // font-size: 0.32rem;
                  color: rgba(185, 184, 184, 1);
                }

                p {
                  display: flex;
                  align-items: baseline;
                  color: rgba(221, 183, 30, 1);
                  padding: 0;
                  padding-right: 0.04rem;

                  span {
                    font-size: 0.22rem;
                    color: rgba(221, 183, 30, 1);
                  }

                  a {
                    font-size: 0.22rem;
                    color: rgba(221, 183, 30, 1);
                  }
                }
              }
            }

            .order_btn {
              // width: 1.4rem;
              display: flex;
              flex-direction: column;
              // margin-bottom: 0.12rem;
              // margin-right: 4%;
              text-align: right;

              span {
                font-size: 0.20rem;
                display: inline-block;
                width: 1.2rem;
                height: 0.48rem;
                background: #DDB71E;
                line-height: 0.48rem;
                text-align: center;
                border-radius: 2rem;
                margin-bottom: 0.22rem;
                color: #fff;
              }
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

      h3 {
        padding: 0.2rem 0;
        font-size: 0.32rem;
        color: #2B2B2B;
      }

      input {
        width: 4rem;
        height: 0.66rem;
        border: 1px solid #BFBFBF;
        border-radius: 0.08rem;
        padding-left: 0.2rem;
        color: #333 !important;
        margin: 0.8rem 0;
        font-size: 0.26rem;
      }

      input::-webkit-input-placeholder {
        color: #BEBEBE !important;
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
