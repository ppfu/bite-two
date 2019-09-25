<template>
  <div class="public">
    <van-nav-bar title="转账" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active">
        <van-tab :title="transfer_coin_one.coin_name">
     <div class="login_info waiting">
       <van-field label="转账数量" v-model="transfer_amount" clearable  placeholder="请输入转账数量" />
      <van-field label="收款账户" maxlength="11" v-model="user_id" clearable placeholder="请输入收款人手机号" />
    </div>
    <p>
      <span>可用{{transfer_coin_one.coin_name}}:{{transfer_coin_one.amount}}</span>
    </p>
    <van-button type="primary" size="large" @click="showTranLog">确认</van-button>
        </van-tab>
        <van-tab :title="transfer_coin_two.coin_name">
      <div class="login_info waiting">
        <van-field label="转账数量" v-model="transfer_amount" clearable  placeholder="请输入转账数量" />
       <van-field label="收款账户" maxlength="11" v-model="user_id" clearable placeholder="请输入收款人手机号" />
     </div>
      <p>
       <span>可用{{transfer_coin_two.coin_name}}:{{transfer_coin_two.amount}}</span>
     </p>
     <van-button type="primary" size="large" @click="showTranLog">确认</van-button>
        </van-tab>
         <van-tab :title="transfer_coin_three.coin_name">
         <div class="login_info waiting">
           <van-field label="转账数量" v-model="transfer_amount" clearable  placeholder="请输入转账数量" />
          <van-field label="收款账户" maxlength="11" v-model="user_id" clearable placeholder="请输入收款人手机号" />
        </div>
         <p>
          <span>可用{{transfer_coin_three.coin_name}}:{{transfer_coin_three.amount}}</span>
        </p>
        <van-button type="primary" size="large" @click="showTranLog">确认</van-button>
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
         <span @click="subTransfer">确认</span>
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
        active: 0,
        tran_dlg: false,
        user_id:'',//收款人手机
        pay_pwd:'',//密码
        transfer_amount:'', //数量
        transfer_user:{},//转账人信息
        transfer_coin_one:{},//可转账虚拟币1
        transfer_coin_two:{},//可转账虚拟币2
        transfer_coin_three:{},//可转账虚拟币3
        coin_id:'',//币id
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getTransferInfo()
    },
    methods: {
      back() {
        this.$router.back();
      },
      cancel() {
        let that = this;
        that.tran_dlg = true;
      },
       //关闭密码弹窗
      closeDia() {
        let that = this;
        that.tran_dlg = false;
        that.pay_pwd = '';
      },
      //密码弹窗
     showTranLog(){
       let that = this;
       let transfer_amount = that.transfer_amount;
       let user_id = that.user_id;
       if (!transfer_amount || transfer_amount == null) {
         that.$toast("请输入转账数量");
       } else if (!user_id || user_id == null) {
         that.$toast("请输入收款人手机号");
       }else{
         that.tran_dlg = true;
       }
     },
     //提交转账
     subTransfer(){
       let that = this;
       if(that.active == 0){
         that.coin_id = that.transfer_coin_one.id;
       }
       if(that.active == 1){
         that.coin_id = that.transfer_coin_two.id;
       }
       if(that.active == 2){
         that.coin_id = that.transfer_coin_three.id;
       }
       if (!that.pay_pwd || that.pay_pwd == null) {
         that.$toast("请输入交易密码");
       }else{
          that
           .$http({
             url: "Account/setTransferAccount",
             method: "post",
             data: {
               token: window.localStorage.getItem("token"),
               pay_pwd:that.pay_pwd,
               user_id:that.user_id,
               coin_id: that.coin_id,
               transfer_amount:that.transfer_amount
             }
           })
           .then(function(res) {
             if (res.data.code == 1) {
               that.$toast.success("成功");
               that.tran_dlg = false;
               that.pay_pwd = '';
               that.transfer_amount = '';
               that.user_id = '';
             } else {
               that.$toast.fail(res.data.msg);
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
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.transfer_user = res.data.data.transfer_user;
              that.transfer_coin_one = res.data.data.transfer_coin[0];
              that.transfer_coin_two = res.data.data.transfer_coin[1];
              that.transfer_coin_three = res.data.data.transfer_coin[2];
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
        background:#1B1F41 !important;
        position: fixed;
        height: 0.8rem;
        width: 100%;
        line-height: 0.8rem;
        border-top: 0.01rem solid #13173D;
        // padding: 0.1rem;
      }
     /deep/ .van-tabs__nav--line{
        padding-bottom: 0.12rem;
      }
     /deep/ .van-tabs__line{
        // padding-top: 0.4rem;
       bottom: 0.04rem;
      }
       .login_info {
       width: 100%;
       background: rgba(98, 98, 98, 0.1);

       /deep/ .van-cell {
         width: 94% !important;
         margin: 0 auto !important;
         border-bottom: 1px solid #1F244F !important;
         border-radius: 0 !important;
         background: none !important;
         padding: 0.26rem 0.1rem !important;
       }

       /deep/ .van-cell:nth-child(2) {
         border: none !important;
       }

       .van-cell:not(:last-child)::after {
         display: none !important;
       }

       /deep/ .van-field__label {
         color: #fff !important;
       }

       input::-webkit-input-placeholder {
         /* placeholder颜色  */
         color: #A7A7A7 !important;
         /* placeholder字体大小  */
       }
     }
     p{
       padding: 0.16rem 4%;
       text-align: right;
       color:#35A8FB;
       font-size: 0.26rem;
     }
     .van-button--large {
       margin-top: 2rem !important;
     }

     .van-button--primary {
       width: 92%;
       margin: 0 4%;
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
