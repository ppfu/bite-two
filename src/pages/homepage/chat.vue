<template>
  <div class="public">
    <van-nav-bar title="客服" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="service" v-for="(item,index) in service" :key="index">
        <p><img :src="item.wx_qrcode" /></p>
        <span>{{item.name}}</span>
      </div>
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
        service:[],//客服列表
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getServiceList();
    },
    methods: {
      back() {
        this.$router.back();
      },
        //获取客服列表
      getServiceList() {
        let that = this;
        that
          .$http({
            url: "Index/getCustomerServiceList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.service = res.data.data; //客服列表
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
       color: #fff;
       font-size: 0.28rem;
     }

   }
    }
  }
</style>
