import Vue from 'vue'
import router from '../router'
import vuex from 'vuex'
import $ from "jquery"
Vue.use(vuex);

export default new vuex.Store({
  state: { //$store.state.a调用
    n:0,
    n1:"",
    planInfo:"",
    // lang: localStorage.getItem("lang")||"cn",
    user_data:{},//用户信息
    edit_address:{},//编辑地址信息
    order_address:{},//订单地址
    goods_info:{}, //商品详情
    orderList:[],//订单详情
    yeb_intro:'',//余额宝介绍
    pay_type:{},//支付方式
    payment:{},//交易支付信息
    profitInfo:'',//收益攻略
    token: window.localStorage.getItem("token")||"",
    navigation_type : 0,
  },
  mutations: { //$store.commit('sum')调用
    focus(state,params){
      $(params.e.target).parents(".f_r").addClass("active");
    },
    blur(state,params){
      $(params.e.target).parents(".f_r").removeClass("active");
    },
    countDown(state) {
      let that = this;
      window.a=1;
      window.tmain = setInterval(function () {
        var date = new Date();
        var now = date.getTime();
        //设置截止时间
        var endDate = new Date(state.end.replace(/-/g,'/'));
        var end = endDate.getTime();
        //时间差
        let leftTime = end - now;
        //定义变量 d,h,m,s保存倒计时的时间
        let d, h, m, s;
        if (leftTime > 0) {
          state.bool = true;
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
          m = Math.floor(leftTime / 1000 / 60 % 60);
          s = Math.floor(leftTime / 1000 % 60);
          if (d < 10) {
            d = "0" + d;
          }
          if (h < 10) {
            h = "0" + h;
          }
          if (m < 10) {
            m = "0" + m;
          }
          if (s < 10) {
            s = "0" + s;
          }
        } else {
          d = "00";
          h = "00";
          m = "00";
          s = "00";

        }
        state.h = h;
        state.m = m;
        state.s = s;
      }, 1000)
    },
  },
  actions: {//$store.dispatch('handler')调用

  },
  getters: {//计算属性

  },
})
