<template>
  <div class="public">
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="买卖">
          <div class="deal_con">
            <div class="deal_sele">
              <button-tab v-model="dealType">
                <button-tab-item @click.native="navTap(0)" selected>我要买</button-tab-item>
                <button-tab-item @click.native="navTap(1)">我要卖</button-tab-item>
              </button-tab>
              <span class="iconfont icon-tabicon" @click="goDealRecord"></span>
            </div>
            <div class="dela_info">
              <div class="deal_list">
               <h4 class="deal_title">BST</h4>
              <!-- <button-tab v-model="coinType">
                  <button-tab-item  @click.native="navTapCoin(0)" selected>{{coin_one.coin_name}}</button-tab-item>
                  <button-tab-item  @click.native="navTapCoin(1)">{{coin_two.coin_name}}</button-tab-item>
                </button-tab> -->
      <!--          <div v-if="coinType == 0" class="bst_info">
                  <div class="bst_header">
                    <span>方向</span>
                    <span>价格（CNY）</span>
                    <span>数量</span>
                  </div>
                  <div class="bst_list">
                    <ul class="sell">
                      <li v-for="(item,index) in sell" :key="index"><span>卖{{sell.length-index}}</span><span>{{item.price}}</span><span>{{item.number}}</span></li>
                    </ul>
                    <ul class="buy">
                      <li v-for="(item,index) in buy" :key="index"><span>买{{index + 1}}</span><span>{{item.price}}</span><span>{{item.number}}</span></li>
                    </ul>
                  </div>

                </div> -->
                <div v-if="coinType == 1" class="bst_info">
                  <div class="bst_header">
                    <span>方向</span>
                    <span>价格（CNY）</span>
                    <span>数量</span>
                  </div>
                  <div class="bst_list">
                    <ul class="sell">
                      <li v-for="(item,index) in sell" :key="index"><span>卖{{sell.length-index}}</span><span>{{item.price}}</span><span>{{item.number}}</span></li>
                    </ul>
                    <ul class="buy">
                      <li v-for="(item,index) in buy" :key="index"><span>买{{index + 1}}</span><span>{{item.price}}</span><span>{{item.number}}</span></li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
            <!-- 我要买，用户列表 -->
            <div class="deal_user" v-if="dealType == 0">
              <!-- BSC -->
    <!--          <div v-if="coinType == 0" class="deal_info_list">
                <div class="scroll_div">
                  <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                    @refresh="onRefresh">
                    <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                      @load="onLoad">
                      <div class="user_list" v-for="(item,index) in detailList" :key="index">
                        <div class="user_left">
                          <p><span>{{item.user_name}}</span>
                            <img v-if="item.pay_type.zfb_account !== null" src="../assets/img/zfb.png">
                            <img v-if="item.pay_type.yinlian_number !== null" src="../assets/img/bank1.png">
                            <img v-if="item.pay_type.wx_account !== null" src="../assets/img/wei.png"></p>
                          <h4>交易数量：{{item.number}}</h4>
                          <h4><span>单价：{{item.price}}CNY</span><span>总价：{{item.total_price}}CNY</span></h4>
                        </div>
                        <div class="user_right">
                          <span class="cyn">{{item.total_price}}CNY</span>
                          <van-button type="primary" size="small" color="#506793" @click="goBuy(item)">购买</van-button>
                        </div>
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </div>
              </div> -->
              <!-- BST -->
              <div v-if="coinType == 1" class="deal_info_list">
                <div class="scroll_div">
                  <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                    @refresh="onRefresh">
                    <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                      @load="onLoad">
                      <div class="user_list" v-for="(item,index) in detailList" :key="index">
                        <div class="user_left">
                          <p>
                            <span>{{item.user_name}}</span>
                            <img v-if="item.pay_type.zfb_account !== null" src="../assets/img/zfb.png">
                            <img v-if="item.pay_type.yinlian_number !== null" src="../assets/img/bank1.png">
                            <img v-if="item.pay_type.wx_account !== null" src="../assets/img/wei.png">
                          </p>
                          <h4>交易数量：{{item.number}}</h4>
                          <h4><span>单价：{{item.price}}CNY</span><span>总价：{{item.total_price}}CNY</span></h4>
                        </div>
                        <div class="user_right">
                          <span class="cyn">{{item.total_price}}CNY</span>
                          <van-button type="primary" size="small" color="#506793" @click="goBuy(item)">购买</van-button>
                        </div>
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </div>
              </div>
            </div>
            <!-- 我要卖，用户列表 -->
            <div class="deal_user" v-if="dealType == 1">
              <!-- BSC -->
           <!--   <div v-if="coinType == 0" class="deal_info_list">
                <div class="scroll_div">
                  <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                    @refresh="onRefresh">
                    <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                      @load="onLoad">
                      <div class="user_list" v-for="(item,index) in detailList" :key="index">
                        <div class="user_left">
                          <p>
                            <span>{{item.user_name}}</span>
                            <img v-if="item.pay_type.zfb_account !== null" src="../assets/img/zfb.png">
                            <img v-if="item.pay_type.yinlian_number !== null" src="../assets/img/bank1.png">
                            <img v-if="item.pay_type.wx_account !== null" src="../assets/img/wei.png">
                          </p>
                          <h4>交易数量：{{item.number}}</h4>
                          <h4><span>单价：{{item.price}}CNY</span><span>总价：{{item.total_price}}CNY</span></h4>
                        </div>
                        <div class="user_right">
                          <span class="cyn">{{item.total_price}}CNY</span>
                          <van-button type="primary" size="small" color="#506793" @click="goBuy(item)">出售</van-button>
                        </div>
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </div>
              </div> -->
              <!-- BST-->
              <div v-if="coinType == 1" class="deal_info_list">
                <div class="scroll_div">
                  <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
                    @refresh="onRefresh">
                    <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                      @load="onLoad">
                      <div class="user_list" v-for="(item,index) in detailList" :key="index">
                        <div class="user_left">
                          <p>
                            <span>{{item.user_name}}</span>
                            <img v-if="item.pay_type.zfb_account !== null" src="../assets/img/zfb.png">
                            <img v-if="item.pay_type.yinlian_number !== null" src="../assets/img/bank1.png">
                            <img v-if="item.pay_type.wx_account !== null" src="../assets/img/wei.png">
                          </p>
                          <h4>交易数量：{{item.number}}</h4>
                          <h4><span>单价：{{item.price}}CNY</span><span>总价：{{item.total_price}}CNY</span></h4>
                        </div>
                        <div class="user_right">
                          <span class="cyn">{{item.total_price}}CNY</span>
                          <van-button type="primary" size="small" color="#506793" @click="goBuy(item)">出售</van-button>
                        </div>
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="发布">
          <div class="deal_con">
            <div class="deal_sele">
              <button-tab v-model="dealType">
                <button-tab-item @click.native="navTap(0)" selected>我要买</button-tab-item>
                <button-tab-item @click.native="navTap(1)">我要卖</button-tab-item>
              </button-tab>
            </div>
            <div v-if="dealType == 0" class="dela_info">
              <div class="deal_list">
                  <h4 class="deal_title">BST</h4>
               <!-- <button-tab v-model="coinType">
                 <button-tab-item @click.native="navTapCoin(0)" selected>{{trade_one.coin_name}}</button-tab-item>
                  <button-tab-item @click.native="navTapCoin(1)">{{trade_two.coin_name}}</button-tab-item>
                </button-tab> -->
               <!-- <div v-if="coinType == 0" class="bst_input">
                  <van-field label="购买数量" v-model="number" clearable placeholder="请输入购买数量" />
                  <van-field label="购买单价" v-model="price" clearable placeholder="请输入购买单价(CNY)" />
                  <p>可用 {{trade_one.amount}} {{trade_one.coin_name}}</p>

                </div> -->
                <div  class="bst_input">
                  <van-field label="购买数量" v-model="number" clearable placeholder="请输入购买数量" />
                  <van-field label="购买单价" v-model="price" clearable placeholder="请输入购买单价(CNY)" />
                  <p>可用 {{trade_two.amount}} {{trade_two.coin_name}}</p>

                </div>
              </div>

            </div>
            <div v-if="dealType == 1" class="dela_info">
              <div class="deal_list">
                <h4 class="deal_title">BST</h4>
              <!--  <button-tab v-model="coinType">
                 <button-tab-item @click.native="navTapCoin(0)" selected>{{trade_one.coin_name}}</button-tab-item>
                  <button-tab-item @click.native="navTapCoin(1)">{{trade_two.coin_name}}</button-tab-item>
                </button-tab> -->
               <!-- <div v-if="coinType == 0" class="bst_input">
                  <van-field label="卖出数量" v-model="number" clearable placeholder="请输入卖出数量" />
                  <van-field label="卖出单价" v-model="price" clearable placeholder="请输入卖出单价(CNY)" />
                  <p>可用 {{trade_one.amount}} {{trade_one.coin_name}}</p>

                </div> -->
                <div  class="bst_input">
                  <van-field label="卖出数量" v-model="number" clearable placeholder="请输入卖出买数量" />
                  <van-field label="卖出单价" v-model="price" clearable placeholder="请输入卖出单价(CNY)" />
                  <p>可用 {{trade_two.amount}} {{trade_two.coin_name}}</p>

                </div>
              </div>

            </div>
            <van-button type="primary" size="large" @click="showTradLog">确认</van-button>

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
          <span @click="subIssue">确认</span>
        </div>
      </div>
    </x-dialog>
    <!-- 交易-->
    <van-popup v-model="buyShow" position="bottom" :style="{ height: '42%' }">
      <div class="shift">
        <h4 v-if="dealType == 0">购买{{buy_info.coin_name}} <span>单价{{buy_info.price}}CYN</span></h4>
        <h4 v-if="dealType == 1">出售{{buy_info.coin_name}} <span>单价{{buy_info.price}}CYN</span></h4>
        <div class="shift-info">
          <van-tabs v-model="activeBuy" @click="NavactiveBuy(activeBuy)">
            <van-tab title="按金额交易">
              <div class="shift_money">
                <input type="text" @input="OnInput($event)" v-model="deal_amount" placeholder="请输入交易金额" />
                <span>CNY</span>|<span @click="allPrice">全部</span>
              </div>
              <p v-if="dealType == 0">购买数量: {{deal_number}}{{buy_info.coin_name}}</p>
              <p v-if="dealType == 1">出售数量: {{deal_number}}{{buy_info.coin_name}}</p>
              <p>实付款：<span>{{actual_payment}}</span></p>
            </van-tab>
            <van-tab title="按数量交易">
              <div class="shift_money">
                <input type="text" @input="OnInput($event)" v-model="deal_amount" placeholder="请输入交易数量" />
                <span>{{buy_info.coin_name}}</span>|<span @click="allPrice">全部</span>
              </div>
              <p v-if="dealType == 0">购买数量: {{deal_number}}{{buy_info.coin_name}}</p>
              <p v-if="dealType == 1">出售数量: {{deal_number}}{{buy_info.coin_name}}</p>
              <p>实付款：<span>{{actual_payment}}</span></p>

            </van-tab>
          </van-tabs>
        </div>

      </div>
      <div class="shift_btn">
        <span @click="closeBuyshow">取消</span>
        <span @click="showPayment">下单</span>
      </div>
    </van-popup>
     <!-- 密码框-->
    <x-dialog v-model="order_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeOrderDia"></span>
        <h3>资金密码</h3>
        <input type="password" v-model="pay_pwd" placeholder="请输入资金密码" />
        <div class="dia_btn">
          <span @click="closeOrderDia">取消</span>
          <span @click="goPayment">确认</span>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XDialog,
    ButtonTab,
    ButtonTabItem,
  } from "vux";
  export default {
    data() {
      return {
        active: 0,//tab选中索引
        dealType: 0,//买，卖按钮索引
        coinType: 1, //bst索引
        tran_dlg: false, //发布，密码弹窗
        order_dlg:false, //提交订单，密码弹窗
        buyShow: false,//买卖弹窗
        activeBuy: 0,//交易类型
        number: '', //发布数量
        price: '', //发布数量价格(rmb)
        pay_pwd: '', //交易密码
        coin_id: '', //发布交易币id
        trade_type: '', //买入、卖出类型
        trade_one: {}, //发布交易币1
        trade_two: {}, //发布交易币2
        coin: [], //币种
        coin_one:{}, //币1
        coin_two:{},//币2
        sell: [], //卖
        buy: [], //买
        pageindex: 1, //商品列表默认第一页
        detailList: [], //商品列表
        detailTotal: 0, // 总数量
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        buy_info: {},//交易详情
        deal_amount:'',//交易金额
        actual_payment:0,//实交易款(按金额)
        deal_number:0,//交易数量
      }
    },
    components: {
      XDialog,
      ButtonTab,
      ButtonTabItem,
    },
    mounted: function() {
      let that = this;
      that.getTradeInfo();
      that.getUserTradeList();
      that.getTradDetailList()
      // that.onRefresh(0);
      // console.log(that.detailList.length)
    },
    methods: {
      back() {
        this.$router.back();
      },
      //关闭买卖弹窗
      closeBuyshow(){
         let that = this;
        that.buyShow = false;
      },
      //关闭发布密码弹窗
     closeDia() {
       let that = this;
       that.tran_dlg = false;
       that.pay_pwd = '';
     },
      //关闭下单密码弹窗
      closeOrderDia() {
       let that = this;
       that.order_dlg = false;
       that.pay_pwd = '';
     },
     //购买，出售
      goBuy(item) {
        let that = this;
        that.buyShow = true;
        that.buy_info = item;
      },
      //点击tab（买卖）切换
      navTap(index) {
        let that = this;
        // that.dealType = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.detailList = [];
        that.getTradDetailList(0);
      },
      //点击tab（bst,bsc）切换
      navTapCoin(index) {
        let that = this;
        // that.coinType = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.detailList = [];
        that.getTradDetailList(0);
        that.getUserTradeList();
      },
      //发布弹窗
      showTradLog() {
        let that = this;
        let number = that.number;
        let price = that.price;
        if (!number || number == null) {
          that.$toast("请输入购买数量");
        }else if(Number(number) <= 0){
		       that.$toast("数量不能小于0！");
		    } else if (!price || price == null) {
          that.$toast("请输入购买单价");
        }else if(Number(price) <= 0){
		       that.$toast("单价不能小于0！");
		    } else {
          that.tran_dlg = true;
        }
      },
      //发布
      subIssue() {
        let that = this;
        let pay_pwd = that.pay_pwd;
        var dType = (that.dealType).toString();
        that.trade_type = dType == "0" ? "2" : "1" //1 :卖出 2：买入
        // 币id
        if (that.coinType == 0) {
          that.coin_id = that.trade_one.id;
        }
        if (that.coinType == 1) {
          that.coin_id = that.trade_two.id;
        }
        if (!pay_pwd || pay_pwd == null) {
          that.$toast("请输入交易密码");
        } else {
          that
            .$http({
              url: "Trade/addCoinTrade",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                pay_pwd: that.pay_pwd,
                coin_id: that.coin_id,
                number: that.number,
                trade_type: that.trade_type,
                price: that.price
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$toast.success("发布成功");
                that.pay_pwd = '';
                that.number = '';
                that.price = '';
                that.tran_dlg = false;
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(error) {

            });
        }

      },
      //获取发布交易页信息
      getTradeInfo() {
        let that = this;
        that
          .$http({
            url: "Trade/getTradeInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.trade_one = res.data.data[0];
              that.trade_two = res.data.data[1];
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },
      //获取交易买卖页交易列表
      getUserTradeList() {
        let that = this;
        let Ctype = (that.coinType).toString();
        var coinId = Ctype == "0" ? "1" : "2"; //1:BSC 2:BST
         that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/getUserTradeList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              coin_id: coinId,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {

              that.coin = res.data.data.coin;
              that.coin_one = that.coin[0],
              that.coin_two = that.coin[1],
              that.sell = res.data.data.sell;
              that.buy = res.data.data.buy;
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {});
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.detailList = [];
        that.detailTotal = 0;
        that.getTradDetailList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getTradDetailList(1);
         // c
      },
      //获取我的订单列表
      getTradDetailList(t) {
        // console.log(t)
        let that = this;
        let detType = (that.dealType).toString();
        let det_type = detType == "0" ? "1" : "2";
        let detCoin = (that.coinType).toString();
        let det_coin = detCoin == "0" ? "1" : "2";
         that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/getTradeDetailList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
              trade_type: det_type,
              coin_id: det_coin,
            },

          })
          .then(function(res) {
            // console.log(res.data.data.total)
            if (res.data.code == 1) {
               that.$vux.loading.hide();
              if (t == 0) {
                if (res.data.data.data.length > 0) {
                  that.detailList = res.data.data.data;
                  that.detailTotal = res.data.data.total;
                  if (that.detailList.length >= that.detailTotal) {
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
                  that.detailList = that.detailList.concat(res.data.data.data);
                  that.detailTotal = res.data.data.total;
                  // console.log(res.data.data.total)
                } else {
                  that.finished = true;
                }
                if (that.detailList.length >= that.detailTotal) {
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
      //按金额，数量交易
      NavactiveBuy(i){
        let that = this;
        that.deal_amount = '';
        that.actual_payment = 0;
         that.deal_number = 0;
      },
      //全部买入、卖出价格
      allPrice(){
        let that = this;
        if(that.activeBuy == 0){
          that.deal_amount = (that.buy_info.number * that.buy_info.price).toFixed(2);
          that.deal_number = that.buy_info.number;
          that.actual_payment = that.deal_amount;
        }
        if(that.activeBuy == 1){
          that.deal_amount = that.buy_info.number;
          that.deal_number = that.buy_info.number;
          that.actual_payment = (that.buy_info.number * that.buy_info.price).toFixed(4);
        }
        },
        //监听input输入
       OnInput(e) {
         let that = this;
         //限制数字小数点输入位数
         if(that.activeBuy == 0){
            if (e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
             //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
             return
           }
           if (e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0])) {
             e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;

             that.deal_amount = Number(e.target.value);
           }
           that.deal_number = (that.deal_amount / that.buy_info.price).toFixed(4);
           that.actual_payment = that.deal_amount;
         }
         if(that.activeBuy == 1){
            if (e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
             //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
             return
           }
           if (e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,4})/g)[0])) {
             e.target.value = (e.target.value.match(/^\d*(\.?\d{0,4})/g)[0]) || null;
             that.deal_amount = Number(e.target.value);
           }
           that.deal_number = that.deal_amount;
           that.actual_payment = (that.deal_number * that.buy_info.price).toFixed(4);
         }
        //
        // if(that.activeBuy == 0){
        //   that.actual_payment = that.deal_amount;
        // }
        // if(that.activeBuy == 1){
        //   that.deal_amount = that.buy_info.number;
        //   that.actual_payment = (that.buy_info.number * that.buy_info.price).toFixed(4);
        // }
       },
       //交易列表
      goDealRecord() {
        let that = this;
        that.$router.push({
          path: '/dealList'
        })
      },
      //下单密码弹窗
      showPayment(){
        let that = this;
        if(!that.deal_amount || that.deal_amount == null){
           that.$toast("请输入交易价格或数量");
        }else if(Number(that.deal_amount) <= 0){
		       that.$toast("输入的数字不能小于0！");
		    }else if(that.activeBuy == 0 &&  Number(that.deal_amount) > Number(that.buy_info.total_price)){
		       that.$toast("输入的数字不能超过最大价格！");
		    }else if(that.activeBuy == 1 &&  Number(that.deal_amount) > Number(that.buy_info.number)){
		       that.$toast("输入的数字不能超过最大数量！");
		    }else{
          that.order_dlg = true;
        }
      },
      //下单
      goPayment() {
        let that = this;
        var dType = (that.dealType).toString();
        var jsonData;
        that.trade_type = dType == "0" ? "2" : "1" //1 :卖出 2：买入
         if (!that.pay_pwd || that.pay_pwd == null) {
          that.$toast("请输入交易密码");
        } else {
           if(that.activeBuy == 0){
             jsonData = {
              token: window.localStorage.getItem("token"),
              pay_pwd: that.pay_pwd,
              coin_id: that.buy_info.coin_id,
              number: that.deal_number,
              trade_type : that.trade_type,
              price: that.buy_info.price,
              trade_id: that.buy_info.id,
              total_price:that.actual_payment,
             };
           }
           if(that.activeBuy == 1){
             jsonData = {
              token: window.localStorage.getItem("token"),
              pay_pwd: that.pay_pwd,
              coin_id: that.buy_info.coin_id,
              number: that.deal_number,
              trade_type : that.trade_type,
              price: that.buy_info.price,
              trade_id: that.buy_info.id,
             };
           }
          that.httpSubmit(jsonData);
        }

      },
      // 提交 请求
      httpSubmit(jsonData) {
        let that = this;
        that
         .$http({
           url: "Trade/addCoinOrderByUser",
           method: "post",
           data: jsonData
         })
         .then(function(res) {
           if (res.data.code == 1) {
             that.$toast.success("下单成功");
             console.log(res.data.data)
             var payment = {
                deal_id:res.data.data,
                deal_amount:that.deal_amount,
                actual_payment:that.actual_payment,
             }
             that.$store.state.payment = payment;
              that.$router.push({
               path: '/payment',
             })
             that.tran_dlg = false;
           } else {
             that.$toast.fail(res.data.msg);
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

      .deal_con {
        .deal_sele {
          padding: 0.4rem 4%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .vux-button-group {
            width: 4.2rem !important;
            height: 0.68rem !important;
          }

          .vux-button-group>a.vux-button-group-current {
            color: #fff;
            font-size: 0.3rem;
          }

          .vux-button-group>a.vux-button-tab-item-last {
            background: url(../assets/img/mc-3.png) no-repeat !important;
            background-size: 100% !important;
          }

          .vux-button-group>a.vux-button-tab-item-first {
            background: url(../assets/img/mr-1.png) no-repeat !important;
            background-size: 100% !important;
          }

          .vux-button-group>a.vux-button-tab-item-last:after,
          .vux-button-group>a.vux-button-tab-item-first:after {
            border: none !important;
          }

          .vux-button-group>a {
            height: 0.68rem !important;
            line-height: 0.68rem !important;
            border-radius: 0 !important;
            margin-right: 0.06rem !important;
            font-size: 0.24rem;
            color: #fff;
          }

          //           p {
          //             span {
          //               display: inline-block;
          //               width: 2rem !important;
          //               height: 0.68rem !important;
          //               text-align: center;
          //               line-height: 0.68rem;
          //               font-size: 0.26rem;
          //             }
          //
          //             span:nth-child(1) {
          //               background: url(../assets/img/mr-1.png) no-repeat !important;
          //               background-size: 100% !important;
          //               color: #F7F6FA;
          //             }
          //
          //             span:nth-child(2) {
          //               background: url(../assets/img/mc-2.png) no-repeat !important;
          //               background-size: 100% !important;
          //               color: #7E8AA6;
          //             }
          //           }

          span.iconfont {
            font-size: 0.46rem;
            color: #fff;
          }
        }

        .dela_info {
          width: 100%;
          padding: 0.22rem 4%;
          background: rgba(98, 98, 98, 0.1);
          font-family: PingFang SC;
          h4.deal_title{
            color: #35A8FB;
            display: inline;
            padding-left: 0.2rem;
            font-size:0.3rem;
            border-left: 0.066rem solid #35A8FB;
            // border-bottom: 1px solid #506793;
          }
          .vux-button-group {
            width: 3.2rem !important;
            height: 0.56rem !important;
          }

          .vux-button-group>a.vux-button-group-current {
            background: #FFFFFF !important;
            color: #1B1F41 !important;

          }

          .vux-button-group>a.vux-button-tab-item-last:after,
          .vux-button-group>a.vux-button-tab-item-first:after {
            border: none !important;
          }

          .vux-button-group>a {
            height: 0.56rem !important;
            line-height: 0.56rem !important;
            border-radius: 2rem !important;
            margin-right: 0.22rem !important;
            background: rgba(255, 255, 255, 0.2);
          }

          .bst_info {
            margin-top: 0.16rem;

            .bst_header {
              padding: 0.18rem 0;
              display: flex;
              justify-content: space-between;

              span {
                width: 33.33333%;
                display: inline-block;
                text-align: center;
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
              }
            }

            .bst_list {
              ul {
                li {
                  display: flex;
                  justify-content: space-between;
                  padding: 0.14rem 0;

                  span {
                    width: 33.33333%;
                    display: inline-block;
                    text-align: center;
                    font-size: 0.24rem;
                    color: #9A9FB4;
                  }
                }
              }

              ul.sell {
                li {

                  span:nth-child(1),
                  span:nth-child(2) {
                    color: #D14B64;
                  }
                }
              }

              ul.buy {
                li {

                  span:nth-child(1),
                  span:nth-child(2) {
                    color: #0AB480;
                  }
                }
              }
            }
          }

          .bst_input {
            padding: 0.4rem 0;

            /deep/ .van-cell {
              width: 100% !important;
              margin: 0 auto !important;
              border-bottom: 1px solid #1F244F !important;
              border-radius: 0 !important;
              background: none !important;
              padding: 0.26rem 0.1rem !important;
            }

            /deep/ .van-field__label {
              color: #fff !important;
            }

            // /deep/ .van-cell:nth-child(2) {
            //   border: none !important;
            // }
            .van-cell:not(:last-child)::after {
              display: none !important;
            }

            p {
              text-align: right;
              padding-top: 0.12rem;
              font-size: 0.26rem;
              color: #35ABFB;
            }
          }
        }

        .deal_user {
          margin-top: 0.22rem;
          width: 100%;
          padding: 0 4%;
          padding-bottom: 0.2rem;
          background: rgba(98, 98, 98, 0.1);
          font-family: PingFang SC;

          .user_list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.32rem 0;
            border-bottom: 1px solid #1F244F;

            .user_left {
              p {
                display: flex;
                align-items: center;
                padding-bottom: 0.12rem;

                span {
                  padding-right: 0.14rem;
                  font-size: 0.26rem;
                  color: rgba(255, 255, 255, 1);
                }

                img {
                  width: 0.32rem;
                  height: 0.32rem;
                  margin-right: 0.08rem;
                }
              }

              h4 {
                font-size: 0.24rem;
                color: #AAAAAA;
                padding: 0.04rem 0;
              }
            }

            .user_right {
              display: flex;
              flex-direction: column;
              align-items: flex-end;

              span.cyn {
                font-size: 0.28rem;
                color: rgba(10, 180, 128, 1);
                padding-bottom: 0.16rem;
              }

              .van-button--primary {
                width: 1.4rem;
                background: #506793 !important;
                border-radius: 2rem !important;
                font-size: 0.26rem !important;
              }
            }
          }
        }

        .van-button--large {
          margin-top: 2rem !important;
        }

        .van-button--primary {
          width: 92%;
          margin: 0 4%;
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

          span {
            font-size: 0.24rem;
            color: rgba(167, 167, 167, 1);
          }
        }

        .shift-info {
          margin-top: 0.2rem;
          color: #B3B3B3;
          font-size: 0.26rem;

          /deep/ .van-tabs__nav {
            background: none !important;
          }

          .shift_money {
            width: 90%;
            margin: 0 auto;
            margin-top: 0.4rem;
            height: 0.72rem;
            border: 1px solid rgba(213, 211, 211, 0.8);
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
            font-size: 0.24rem;
            padding: 0.12rem 0;

            span {
              font-size: 0.3rem;
              color: #35A8FB;
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
