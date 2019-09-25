<template>
  <div class="public">
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="矿机商城">
          <div class="account">
            <div class="s_title">
              <span>已购买商品总值：</span>
              <span>{{consume_usdt}}USDT+{{consume_bsc}}BSC</span>
            </div>
            <div class="acc_list" v-for="(item,index) in MiningList" :key="index">
              <h3><img :src="item.mining_img"></h3>
              <div class="s_info">
                <h4>{{item.mining_name}}</h4>
                <span>收益总量：{{item.produce_bsc_amount}}BSC</span>
                <span>运行周期：{{item.mining_cycle}}天</span>
                <p><span>{{item.price_usdt}}</span><a>USDT</a>+<span>{{item.price_bsc}}</span><a>BSC</a></p>
              </div>
              <van-button type="primary" size="small" color="#35A8FB" @click="activateMining(item.id)">激活</van-button>
            </div>
          </div>
        </van-tab>
        <van-tab title="AO商城">
          <div class="ao_store">
            <div class="swipe">
              <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in bannerList" :key="index"><img :src="item.banner_url"></van-swipe-item>
              </van-swipe>
            </div>
            <van-tabs v-model="active_ao" :swipe-threshold="num" @click="navTap(active_ao)">
              <van-tab title="首页">
                <div class="ao_con">
                  <div class="store_list">
                    <div class="scroll_div">
                      <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                        @refresh="onRefresh">
                        <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                          @load="onLoad">
                          <ul>
                            <li v-for="(item,index) in goodsList" :key="index" @click="goComDetail(item)">
                              <img :src="item.goods_img">
                              <div class="s_info">
                                <h4>{{item.goods_name}}</h4>
                                <h5>已售：{{item.total_sale_num}}件</h5>
                                <p><span>{{item.goods_price_usdt}}</span><a>USDT</a>+<span>{{item.goods_price_bsc}}</span><a>BSC</a></p>
                              </div>
                            </li>
                          </ul>
                        </van-list>
                      </van-pull-refresh>
                    </div>
                  </div>
                </div>
              </van-tab>
              <van-tab title="电器">
                <div class="ao_con">
                  <div class="store_list">
                    <div class="scroll_div">
                      <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                        @refresh="onRefresh">
                        <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                          @load="onLoad">
                          <ul>
                            <li v-for="(item,index) in goodsList" :key="index" @click="goComDetail(item)">
                              <img :src="item.goods_img">
                              <div class="s_info">
                                <h4>{{item.goods_name}}</h4>
                                <h5>已售：{{item.total_sale_num}}件</h5>
                                <p><span>{{item.goods_price_usdt}}</span><a>USDT</a>+<span>{{item.goods_price_bsc}}</span><a>BSC</a></p>
                              </div>
                            </li>
                          </ul>
                        </van-list>
                      </van-pull-refresh>
                    </div>
                  </div>
                </div>
              </van-tab>
              <van-tab title="数码">
                <div class="ao_con">
                  <div class="store_list">
                    <div class="scroll_div">
                      <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                        @refresh="onRefresh">
                        <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                          @load="onLoad">
                          <ul>
                            <li v-for="(item,index) in goodsList" :key="index" @click="goComDetail(item)">
                              <img :src="item.goods_img">
                              <div class="s_info">
                                <h4>{{item.goods_name}}</h4>
                                <h5>已售：{{item.total_sale_num}}件</h5>
                                <p><span>{{item.goods_price_usdt}}</span><a>USDT</a>+<span>{{item.goods_price_bsc}}</span><a>BSC</a></p>
                              </div>
                            </li>
                          </ul>
                        </van-list>
                      </van-pull-refresh>
                    </div>
                  </div>
                </div>
              </van-tab>
              <van-tab title="服饰">
                <div class="ao_con">
                  <div class="store_list">
                    <div class="scroll_div">
                      <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                        @refresh="onRefresh">
                        <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                          @load="onLoad">
                          <ul>
                            <li v-for="(item,index) in goodsList" :key="index" @click="goComDetail(item)">
                              <img :src="item.goods_img">
                              <div class="s_info">
                                <h4>{{item.goods_name}}</h4>
                                <h5>已售：{{item.total_sale_num}}件</h5>
                                <p><span>{{item.goods_price_usdt}}</span><a>USDT</a>+<span>{{item.goods_price_bsc}}</span><a>BSC</a></p>
                              </div>
                            </li>
                          </ul>
                        </van-list>
                      </van-pull-refresh>
                    </div>
                  </div>
                </div>
              </van-tab>
              <van-tab title="其他">
                <div class="ao_con">
                  <div class="store_list">
                    <div class="scroll_div">
                      <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                        @refresh="onRefresh">
                        <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                          @load="onLoad">
                          <ul>
                            <li v-for="(item,index) in goodsList" :key="index" @click="goComDetail(item)">
                              <img :src="item.goods_img">
                              <div class="s_info">
                                <h4>{{item.goods_name}}</h4>
                                <h5>已售：{{item.total_sale_num}}件</h5>
                                <p><span>{{item.goods_price_usdt}}</span><a>USDT</a>+<span>{{item.goods_price_bsc}}</span><a>BSC</a></p>
                              </div>
                            </li>
                          </ul>
                        </van-list>
                      </van-pull-refresh>
                    </div>
                  </div>
                </div>
              </van-tab>
            </van-tabs>
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
        active: this.$route.query.type, //进入页面选中nav导航索引（矿机商城，Ao商城）
        active_ao: 0, //默认nav导航索引（ao商城种类列表）
        num: 5, //nav导航超过5个滑动
        MiningList: [], //矿机商城列表
        MinAccount: {}, //矿机购买总价
        consume_usdt: '',
        consume_bsc: '',
        bannerList: [], //ao商城首页banner图
        pageindex: 1, //商品列表默认第一页
        goodsList: [], //商品列表
        goodsTotal: 0, // 总数量
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false // 全部加载
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getShopBanner();
      that.getShopGoodsList();
      that.getMiningList();
    },
    methods: {
      back() {
        this.$router.back();
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
      //获取矿机商城列表
      getMiningList() {
        let that = this;
        that
          .$http({
            url: "Mining/getMiningList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.MiningList = res.data.data.mining;
              that.MinAccount = res.data.data.account;
              that.consume_bsc = that.MinAccount.consume_bsc;
              that.consume_usdt = that.MinAccount.consume_usdt;
              that.consume_usdt = that.checkPrice(that.consume_usdt);
              that.consume_bsc = that.checkPrice(that.consume_bsc);
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //激活矿机
      activateMining(id) {
        let that = this;
        that
          .$http({
            url: "Mining/activateUserMining",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            // console.log(res)
            if (res.data.code == 1) {
              that.$toast.success("激活成功");
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      //获取Ao商城首页轮播图
      getShopBanner() {
        let that = this;
        that
          .$http({
            url: "Aoshop/getShopBanner",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.bannerList = res.data.data;
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //点击商品类别显示相应商品列表
      navTap(i) {
        let that = this;
        that.active_ao = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.goodsList = [];
        that.getShopGoodsList(0);
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.goodsList = [];
        that.goodsTotal = 0;
        that.getShopGoodsList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getShopGoodsList(1);
      },
      //获取Ao商城商品列表
      getShopGoodsList(t) {
        let that = this;
        let type = (that.active_ao).toString();
        // type == 0 : 全部; type == 1 : 电器;type == 2 : 数码; type == 3 : 服饰;type == 4 : 其他;
        let goods_type = type == "0" ? "0" : type == "1" ? "1" : type == "2" ? "2" : type == "3" ? "3" : "4";
        that
          .$http({
            url: "Aoshop/getShopGoodsList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
              goods_class: goods_type,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (t == 0) {
                if (res.data.data.data.length > 0) {
                  that.goodsList = res.data.data.data;
                  $.each(that.goodsList, function(index, item) {
                    //usdt
                    item.goods_price_usdt = that.checkPrice(item.goods_price_usdt);
                    //bsc
                    item.goods_price_bsc = that.checkPrice(item.goods_price_bsc);
                    // console.log(item.goods_price_bsc)
                  });
                  that.goodsTotal = res.data.data.total;
                  if (that.goodsList.length >= that.goodsTotal) {
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
                  that.goodsList = that.goodsList.concat(res.data.data.data);
                  $.each(that.goodsList, function(index, item) {
                     item.goods_price_usdt = that.checkPrice(item.goods_price_usdt);
                     item.goods_price_bsc = that.checkPrice(item.goods_price_bsc);
                  });
                  that.goodsTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.goodsList.length >= that.goodsTotal) {
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
      //商品详情
      goComDetail(item) {
        let that = this;
        that.$store.state.goods_info = item;
        that.$router.push({
          path: '/comDetail',
          query: {
            goods_info: that.$store.state.goods_info
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      font-family: PingFang SC;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 1rem);

      /deep/ .van-tab {
        color: #fff !important;
      }

      /deep/ .van-tab--active {
        color: #35A8FB !important;
      }

      /deep/ .van-tabs__nav {
        background: rgba(255, 255, 255, 0.06) !important;
      }

      .account {
        padding: 0 4%;

        .s_title {
          width: 100%;
          text-align: right;
          font-size: 0.26rem;
          padding: 0.24rem 0;

          span:nth-child(1) {
            color: #A7A7A7;
          }

          span:nth-child(2) {
            color: #DDB71E;
          }
        }

        .acc_list {
          width: 100%;
          height: 2.26rem;
          padding: 0 0.16rem;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          display: flex;
          justify-content: space-between;
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
            }

            span {
              display: inline-block;
              font-size: 0.2rem;
              color: rgba(185, 184, 184, 1);
            }

            p {
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

      .ao_store {
        /deep/ .van-tabs__nav {
          background: rgba(255, 255, 255, 0.028) !important;
          z-index: 99;
        }

        .swipe {
          width: 100%;
          height: 3.2rem;

          img {
            width: 100%;
            height: 3.2rem;
          }
        }

        .ao_con {
          .store_list {
            margin-top: 0.2rem;

            .scroll_div {
              ul {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                li {
                  width: 3.66rem;
                  height: 5.12rem;
                  background: rgba(255, 255, 255, 0.1);
                  margin-bottom: 0.14rem;

                  img {
                    width: 99.8%;
                    height: 3.37rem;
                  }

                  .s_info {
                    width: 100%;
                    padding: 0.12rem 0.14rem;

                    h4 {
                      font-size: 0.26rem;
                      font-family: PingFang SC;
                      color: rgba(255, 255, 255, 1);
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }

                    h5 {
                      padding-top: 0.06rem;
                      font-size: 0.22rem;
                      color: #A7A7A7;
                    }

                    p {
                      color: rgba(221, 183, 30, 1);
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;

                      span {
                        font-size: 0.22rem;
                        color: rgba(221, 183, 30, 1);
                      }

                      a {
                        font-size: 0.2rem;
                        color: rgba(221, 183, 30, 1);
                      }
                    }
                  }
                }
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
