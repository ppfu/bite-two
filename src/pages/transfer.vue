<template>
  <div class="public">
    <van-nav-bar title="转账" />
    <div class="content">
      <div class="user_info">
        <p><img src="../assets/img/tab5_off.png"></p>
        <span>{{transfer_user.user_phone}}</span>
      </div>
      <van-tabs v-model="active" @click="navtap(active)">
        <van-tab :title="transfer_bsc.coin_name">
          <div class="account">
            <div class="pu_pwd">
              <h4>转账数量：</h4>
              <van-field v-model="number" placeholder="请输入转账数量" />
               <a @click="allNumbsc">全部</a>
            </div>
            <p>可用{{transfer_bsc.coin_name}}:<span>{{transfer_bsc.amount}}</span></p>
            <van-button type="primary" size="large" @click="showTranDlg">确认</van-button>
          </div>
        </van-tab>
        <van-tab :title="transfer_bst.coin_name">
         <div class="account">
          <div class="pu_pwd">
            <h4>转账数量：</h4>
            <van-field v-model="number" placeholder="请输入转账数量" />
            <a @click="allNumbst">全部</a>
          </div>
           <p>可用{{transfer_bst.coin_name}}:<span>{{transfer_bst.amount}}</span></p>
          <van-button type="primary" size="large" @click="showTranDlg">确认</van-button>
        </div>
        </van-tab>
         <van-tab :title="transfer_usdt.coin_name">
         <div class="account">
          <div class="pu_pwd">
            <h4>转账数量：</h4>
            <van-field v-model="number" placeholder="请输入转账数量" />
            <a @click="allNumusdt">全部</a>
          </div>
           <p>可用{{transfer_usdt.coin_name}}:<span>{{transfer_usdt.amount}}</span></p>
          <van-button type="primary" size="large" @click="showTranDlg">确认</van-button>
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
       <span @click="transfer">确认</span>
     </div>
   </div>
 </x-dialog>
  </div>
</template>

<script>
  let scan = null
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        active: 0,//tab选中索引
        tran_dlg:false,//密码弹窗默认关闭
        transfer_user:{},//转账人信息
        transfer_bsc:[],//可转账虚拟币信息(bsc)
        transfer_bst:[],//可转账虚拟币信息(bst)
        transfer_usdt:[],//可转账虚拟币信息(usdt)
        number:'',//转数量
        coin_id:'',//虚拟币id
        pay_pwd:'',//转账密码
        userCode:'',//用户收款码
      }
    },
    components: {
      XDialog,
    },
    created:function(){

    },
    mounted: function() {
      // let that = this;
      this.getTransferInfo();
      //判断ios与安卓（扫码）
      var u = navigator.userAgent;
      var isiOS = u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (isiOS) {
        qrCodeScan(payCallBack);
      } else if (isAndroid) {
        // payData = JSON.stringify(payData);
        window.android.qrCodeScan("payCallBack");
      }
        window.payCallBack = this.payCallBack; //注册函数

    },
    methods: {
      back() {
        this.$router.back();
      },
	  //关闭密码弹窗
	   closeDia() {
	    let that = this;
	    that.tran_dlg = false;
       that.pay_pwd = '';
	  },
   //调用安卓原生方法函数
      payCallBack(usercode){
        // alert(usercode);
        var u_code = JSON.stringify(usercode)
        // alert(u_code.result);
        u_code = JSON.parse(u_code);
        // this.$toast(u_code);
        // this.$toast(u_code.result);
        this.userCode = u_code.result;
        // this.$toast(this.userCode);
        this.getTransferInfo();

      },
      //tab切换
      navtap(i){
        this.getTransferInfo();
        this.number = '';
      },
       //设置全部数量
      allNumbst() {
        let that = this;
        that.number = that.transfer_bst.amount;
      },
       allNumbsc() {
        let that = this;
        that.number = that.transfer_bsc.amount;
      },
        allNumusdt() {
        let that = this;
        that.number = that.transfer_usdt.amount;
      },
       //转账弹窗
      showTranDlg() {
        let that = this;
         let number = that.number;
        if (!number || number == null) {
          that.$toast("请输入转账数量");
        } else{
          that.tran_dlg = true;
        }
      },
       //转账
      transfer() {
        let that = this;
        // that.$toast.success(that.transfer_user.user_phone);
        if(that.active == 0){
          that.coin_id = that.transfer_bsc.id;
        }
        if(that.active == 1){
          that.coin_id = that.transfer_bst.id;
        }
         if(that.active == 2){
          that.coin_id = that.transfer_usdt.id;
        }
         if (!that.pay_pwd || that.pay_pwd == null) {
          that.$toast("请输入交易密码");
        } else{
           that
            .$http({
              url: "Account/setTransferAccount",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                pay_pwd:that.pay_pwd,
                user_id:that.transfer_user.user_phone,
                coin_id:that.coin_id,
                transfer_amount:that.number,
              }
            })
            .then(function(res) {

              if (res.data.code == 1) {
                 // alert(res.data.code)
                 // that.$toast.success(res.data.msg);
                 that.$toast.success("转账成功");
                 that.pay_pwd = '';
                 that.number = '';
                 that.tran_dlg = false;
                 that.getTransferInfo();
              } else {
                 that.$toast.fail(res.data.msg);
                 that.pay_pwd = '';
              }
            })
            .catch(function(error) {

            });
        }

      },
      //获取转账信息
      getTransferInfo() {
        let that = this;
        that
          .$http({
            url: "Account/getTransferInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              code:that.userCode,
            }
          })
          .then(function(res) {
            // console.log(res)
            if (res.data.code == 1) {
              that.transfer_user = res.data.data.transfer_user;
               // console.log(transfer_user)
              that.transfer_bsc = res.data.data.transfer_coin[0];
              that.transfer_bst = res.data.data.transfer_coin[1];
              that.transfer_usdt = res.data.data.transfer_coin[2];
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
      font-family: PingFang SC;
      overflow-y: scroll;
      height: calc(100% - 1rem);
      padding: 0;

      /deep/ .van-tab {
        color: #fff !important;
      }

      /deep/ .van-tab--active {
        color: #35A8FB !important;
      }

      .user_info {
        width: 100%;
        height: 2rem;
        background: url(../assets/img/zhifu-bg.png) no-repeat;
        background-size: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #4C5180;
          text-align: center;
          img {
            width: 88%;
            // height: 100%;
          }

        }
        span {
          font-size: 0.28rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          padding: 0.08rem 0;
        }
      }

      .account {
        width: 100%;
        padding: 0 4%;
        margin-top: 0.4rem;

        /deep/ .van-cell {
          color: #FEFEFE;
          border-radius: 0 !important;
          background: none !important;
        }

        /deep/ .van-cell:not(:last-child)::after {
          left: 0.1rem !important;
          transform: scaleY(.2);
        }

        h4 {
          // margin-top: 0.4rem;
          color: #fff;
          font-size: 0.30rem;
        }

        .pu_pwd {

          margin-top: 0.6rem;
          position: relative;
          border-bottom: 1px solid #1F244F;

          /deep/ .van-cell {
            padding: 0.22rem 0 0.08rem 0 !important;
          }

          /deep/ .van-cell:not(:last-child)::after {
            display: none;
          }

          a {
            position: absolute;
            right: 0;
            top: 0.64rem;
            color: #35A8FB;
            font-size: 0.28rem;
          }
        }
          p {
            font-size: 0.24rem;
            font-family: PingFang SC;
            padding-right: 0.2rem;
            margin: 0.12rem 0;
            color: rgba(185, 184, 184, 1);
            span{
              color: #35A8FB;
              padding-left: 0.12rem;
            }
          }
        .van-button--large {
          margin: 1.2rem 0 !important;
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
