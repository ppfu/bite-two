<template>
  <div class="public">
    <van-nav-bar title="比特星空">
      <van-icon name="service-o" slot="right" @click="showPopup" />
    </van-nav-bar>
    <div class="main_content">

      <div class="content">

        <div class="grid_con">
          <div class="grid_list" @click="tranTip">
            <img src="../assets/img/shangcheng.png" />
            <span>线下商城</span>
          </div>
          <div class="grid_list" @click="goVCoin">
            <img src="../assets/img/Vbi.png" />
            <span>V币贷</span>
          </div>
          <div class="grid_list" @click="tranTip">
            <img src="../assets/img/zhongchou.png" />
            <span>众筹</span>
          </div>
          <div class="grid_list" @click="goLife">
            <img src="../assets/img/shenghuo.png" />
            <span>生活版块</span>
          </div>
          <div class="grid_list" @click="goGame">
            <img src="../assets/img/youxi.png" />
            <span>娱乐游戏</span>
          </div>
          <div class="grid_list" @click="goMill">
            <img src="../assets/img/kuangji.png" />
            <span>我的矿机</span>
          </div>
          <div class="grid_list" @click="goFlash">
            <img src="../assets/img/shandui.png" />
            <span>闪兑</span>
          </div>
          <div class="grid_list" @click="goWallet">
            <img src="../assets/img/qianbao.png" />
            <span>我的钱包</span>
          </div>
        </div>
        <div class="notice">
          <span class="iconfont icon-tabtongzhi"></span>
          <span class="textBox">
            <transition name="slide">
              <a :key="number" class="text">{{notice_info}}</a>
            </transition>
          </span>
          <span class="iconfont icon-tabgengduo1" @click="goMess"></span>
        </div>
        <div class="open_img">
         <!-- <img src="../assets/img/open.png" /> -->
           <div class="swipe">
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item,index) in banner" :key="index"><img :src="item.banner_url"></van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <div class="coin_trend">
          <h3>平台币种趋势</h3>
          <div class="coin">
            <p v-for="(item,index) in coin" :key="index">
              <span>{{item.coin_name}}</span>
              <span>{{item.price}}（{{item.rise_percent}}）</span>
            </p>
          </div>
        </div>
        <div class="coin_info">
          <div class="header">
            <span>币种</span>
            <span>单价</span>
            <span>趋势</span>
          </div>
          <div class="con_list">
            <ul>
              <li @click="goTrend(index,item.id)" v-for="(item,index) in coinInfo" :key="index">
                <span>{{item.coin_name}}</span>
                <span>${{item.price.price_usd}}</span>
                <span v-if="item.price.change_type == 0"><a style="background: #D14B64;">{{item.price.change_hourly}}</a></span>
                <span v-if="item.price.change_type == 1"><a style="background: #0AB480;">{{item.price.change_hourly}}</a></span>
              </li>
            </ul>
          </div>
        </div>


        <!-- 签到 -->
      </div>
    </div>
    <x-dialog v-model="home_dlg" class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeDlg"></span>
        <div class="dia_btn">
          <span @click="getMiningProfit">立即签到</span>
        </div>
        <h3>点击签到领取{{mining}}矿机收益</h3>
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
        home_dlg: false,//签到弹框
        mining:'',//签到收益
        banner:{},//轮播图
        notice: [], //浮动公告
        notice_info: '', //浮动公告
        number: 0, //浮动公告第几条
        coin:[],//平台币种
        coinInfo:[],//虚拟币价格趋势
      }
    },
    components: {
      XDialog,
    },
    computed: {

    },
    mounted: function() {
      let that = this;
      that.getmove();
      // console.log(that.notice.length)
      that.checkMiningPro();
      that.getHomeInfo();
      that.getUserNoticeList();
      that.getCoinInfo();

    },
    methods: {
      //客服
      showPopup() {
        let that = this;
        that.$router.push({
          path: '/chat'
        })
      },
      //未开放功能弹窗
       tranTip(){
        this.$toast.fail("该功能尚未开放");
      },
      //关闭签到弹窗
      closeDlg(){
      this.home_dlg = false;
      },
      //判断是否签到
      checkMiningPro() {
        let that = this;
        that
          .$http({
            url: "Mining/checkMiningProfitToday",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            // console.log(res.data.code)
            if (res.data.code == 1) {
              that.mining=res.data.data;
              that.home_dlg = true;
            } else {
              // that.home_dlg = false;
            }
          })
          .catch(function(error) {

          });
      },
        //签到释放矿机收益
      getMiningProfit() {
        let that = this;
        that
          .$http({
            url: "Mining/getMiningProfit",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            // console.log(res.data.code)
            if (res.data.code == 1) {
               that.$toast.success("签到成功");
               that.home_dlg = false;
            } else {
               that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //浮动公告滚动
      getmove() {
        let that = this;
        // console.log(that.notice)
        if (that.notice.length >= 0) {
          let timer = setTimeout(() => {
            if (that.number === that.notice.length - 1) {
              that.number = 0;
            } else {
              that.number += 1;
            }
            that.notice_info = that.notice[that.number].intro;
            // console.log(that.notice_info)
            that.getmove();
          }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
        }
//
      },
       //获取首页信息
      getHomeInfo() {
        let that = this;
        that
          .$http({
            url: "Index/index",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.banner = res.data.data.banner; //轮播图
              that.coin  =res.data.data.coin; //
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
        //获取消息列表信息（默认第一页）
      getUserNoticeList() {
        let that = this;
        that
          .$http({
            url: "Index/getUserNoticeList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page:1
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.notice = res.data.data.data; //消息列表
              // console.log(that.notice)
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
        //虚拟币价格趋势
      getCoinInfo() {
        let that = this;
        that
          .$http({
            url: "Coin/getCoinInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.coinInfo  = res.data.data;
              // console.log(that.coinInfo)
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //v币货
      goVCoin() {
        let that = this;
        that.$router.push({
          path: '/vCoin'
        })
      },
      //钱包
       goWallet() {
        let that = this;
        that.$router.push({
          path: '/wallet'
        })
      },
      //矿机
       goMill() {
        let that = this;
        that.$router.push({
          path: '/myMill'
        })
      },
      //闪兑
       goFlash() {
        let that = this;
        that.$router.push({
          path: '/flashAgainst'
        })
      },
      //生活版块
      goLife() {
        let that = this;
        that.$router.push({
          path: '/lifeSection'
        })
      },
      //娱乐游戏
      goGame() {
        let that = this;
        that.$router.push({
          path: '/games'
        })
      },
      //消息
      goMess() {
        let that = this;
        that.$router.push({
          path: '/messages'
        })
      },
      //虚拟币趋势
      goTrend(i,id) {
        let that = this;
        that.$router.push({
          path: '/coinTrend',
          query:{
            coin_index:i,
            coin_id:id
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar {
     background: rgba(255,255,255,0.06) !important;
    }

    /deep/ .van-nav-bar__right {
      font-size: 0.36rem !important;
    }

    .main_content {
      .swipe {
        width: 100%;
        height: 1.6rem;
        border-radius: 2rem;
        box-shadow:0px 0.3rem 0.1rem -0.3rem #13173D;

        img {
          width: 100%;
          height: 1.6rem;
          border-radius: 2rem;
        }
      }
      .content {
        font-family: PingFang SC;

        .grid_con {
          margin-top: 0.4rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;

          .grid_list {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 25%;
            margin-bottom: 0.4rem;

            img {
              width: 1rem;
              height: 1rem;
            }

            span {
              font-size: 0.24rem;
              font-weight: 400;
              color: rgba(216, 224, 249, 1);
              margin-top: 0.12rem;
            }
          }
        }

        .notice {
          width: 100%;
          height: 0.44rem;
          background-size: 100%;
          display: flex;
          align-items: center;
          margin-top: 0.3rem;
          color: #61698D;

          span {
            font-size: 0.4rem;
          }

          .textBox {
            flex: 1;
            padding-left: 0.2rem;
            // background: red;
            height: 0.46rem;
            line-height: 0.42rem;
            overflow: hidden;
            position: relative;
            .text {
              width: 5.6rem;
              height: 100%;
              position: absolute;
              font-size: 0.26rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          /* 公告动画 */
          .slide-enter-active,
          .slide-leave-active {
            transition: all 0.5s linear;
          }

          .slide-enter {
            transform: translateY(20px) scale(1);
            opacity: 1;
          }

          .slide-leave-to {
            transform: translateY(-20px) scale(0.8);
            opacity: 0;
          }
        }

        .open_img {
          margin: 0.2rem 0;

          img {
            width: 100%;
          }
        }

        .coin_trend {
          h3 {
            font-size: 0.26rem;
            color: rgba(255, 255, 255, 1);
            padding-bottom: 0.2rem;
          }

          .coin {
            display: flex;
            justify-content: space-between;

            p {
              width: 48%;
              height: 1.15rem;
              border: 1px solid rgba(70, 79, 129, 1);
              border-radius: 0.08rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

              span:nth-child(1) {
                font-size: 0.3rem;
                color: rgba(255, 255, 255, 1);
                line-height: 0.46rem;
              }

              span:nth-child(2) {
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
              }
            }


          }
        }

        .coin_info {
          margin-top: 0.2rem;
          width: 100%;

          .header {
            height: 0.8rem;
            line-height: 0.8rem;
            display: flex;

            span {
              display: inline-block;
              width: 33.3333%;
              text-align: center;
              font-size: 0.28rem;
              color: #61698D;
            }
          }

          .con_list {
            height: 100%;

            ul {
              height: 100%;

              li {
                height: 0.9rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.12);

                span {
                  width: 33.3333%;
                  display: inline-block;
                  text-align: center;
                  font-size: 0.26rem;
                  color: #9A9FB4;

                  a {
                    padding: 0.06rem 0.2rem;
                    background: #0AB480;
                    border-radius: 2rem;
                    color: #fff;
                    font-size: 0.26rem;
                  }
                }

              }
            }

          }
        }

      }
    }

    .ver_dialog {
     /deep/ .weui-dialog{
        width: 66% !important;
        background: url(../assets/img/qiandao.png) no-repeat;
        background-size: 100%;
        border-radius: 0.2rem;
      .dialog{
        height: 5rem !important;
          span.iconfont {
          width: 100%;
          padding: 0.2rem;
          display: block;
          text-align: right;
        }
        .dia_btn {
            text-align: center;
            margin-top: 2rem;
          span {
            display: inline-block;
            width: 2.35rem;
            height: 0.68rem;
            line-height: 0.68rem;
            background: rgba(65, 99, 199, 1);
            border-radius: 2rem;
            color: #fff;
            font-size: 0.28rem;
          }
        }
        h3 {
          font-size: 0.28rem;
          font-weight: 500;
          color: #949494;
          margin-top: 0.4rem;
        }


      }
     }
    }
  }
</style>
