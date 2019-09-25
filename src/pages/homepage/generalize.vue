<template>
  <div class="public">
    <van-nav-bar title="推广办卡" left-text="" left-arrow @click-left="back" />
    <div class="content">
     <!-- <img class="big-img" :src="cardimg" /> -->
       <div class="gen_info" v-html="cardimg">

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
        cardimg:'',
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
       let that = this;
       that.getRecommendCardImg();
    },
    methods: {
      back() {
        this.$router.back();
      },
         //获取客服列表
      getRecommendCardImg() {
        let that = this;
        that
          .$http({
            url: "Index/getRecommendCardImg",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {

            if (res.data.code == 1) {
              that.cardimg = res.data.data;
              console.log(that.cardimg)
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
    .content{
//       .ge_top {
//         position: fixed;
//         top: 0;
//         width: 100%;
//         .van-nav-bar {
//           width: 100%;
//           background:rgba(255,255,255,0.1) !important;
//         }
//
//         .van-hairline--bottom::after {
//           border: none !important;
//         }
//       }

      // width: 100%;
      // height: 100%;
      // border-radius: 0rem;
      // position: relative;
      padding: 0;
      height: calc(100% - 0.92rem);
      overflow-y: scroll;


      // img.big-img {
      //   width: 100%;
      //   height: 100%;
      //   display: block;
      // }
      .gen_info{
       /deep/ p{
          font-size: 0.28rem;
          color: #767994;
          img{
            display: block;
            width: 100% !important;
            margin-bottom: 0.14rem;
          }
        }
      }


    }
  }
</style>
