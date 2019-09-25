<template>
  <div class="public">
    <van-nav-bar title="我的收钱码" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="service">
        <p><img class="imgCode" :src="money_code" /></p>
        <span>点击支付扫一扫，向我付钱</span>
      </div>
      <h4 @click="downloadIamge('.imgCode',money_code)">保存二维码</h4>
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
        money_code:this.$store.state.user_data.transfer_qrcode,//收款码
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
    },
    methods: {
      back() {
        this.$router.back();
      },
       //保存二维码
      downloadIamge(selector, name) {
        // 通过选择器获取img元素，
        if (this.money_code == '') {

          this.$toast("您还不能支付，请联系客服设置");

        } else {
          var img = document.querySelector(selector)
          // 将图片的src属性作为URL地址
          var url = img.src
          var a = document.createElement('a')
          var event = new MouseEvent('click')
          a.download = name || '下载图片名称'
          a.href = url
          a.dispatchEvent(event)
        }
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-hairline--bottom::after {
      border: none !important;
    }


    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
   .service{
     margin-top: 1rem;
     width: 100%;
     display: flex;
     flex-direction: column;
     align-items: center;
     p{
       background: #fff;
       img{
         width:3rem;
         height: 3rem;
       }
     }
     span{
       padding: 0.2rem 0;
       color:#7D7C7C;
       font-size: 0.28rem;
     }

   }
   h4{
     margin-top: 1rem;
     width: 2.58rem;
     height: 0.76rem;
     background: url(../../assets/img/anniu2.png) no-repeat;
     background-size: 100%;
     text-align: center;
     line-height: 0.66rem;
     font-size: 0.28rem;
     color: #715B35;
   }


    }
  }
</style>
