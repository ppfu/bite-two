<template>
  <div class="public">
    <div class="poster">
      <div class="ge_top">
        <van-nav-bar title="直推" left-text="" left-arrow @click-left="back" />
      </div>
      <p><img src="../../assets/img/biaoyu.png"></p>
      <div class="dire_info">
        <div class="info_list">
          <span>我的邀请码:</span>
          <span>{{invite_code}}</span>
          <span v-clipboard:copy="invite_code" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        </div>
        <div class="info_list1">
          <p><span>推广链接:</span><span>{{invite_url}}</span></p>
          <h4 v-clipboard:copy="invite_url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</h4>
        </div>
        <div class="info_list2">
          <span>我的二维码：</span>
          <p><img class="imgCode" :src="invite_qrcode"><span @click="downloadIamge('.imgCode',invite_qrcode)">保存二维码至相册</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2';
  import {
    XDialog
  } from "vux";
  export default {
    name: "qrCode",
    data() {
      return {
        invite_code: this.$store.state.user_data.invite_code,
        // invite_qrcode: this.$store.state.user_data.invite_qrcode,
        invite_url:this.$store.state.user_data.invite_url,
        invite_qrcode:"http://qr.liantu.com/api.php?text="+ this.$store.state.user_data.invite_url
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      // this.$nextTick(function () {
      //   this.bindQRCode();
      // })
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
      //  bindQRCode: function () {
      //   new QRCode(this.$refs.qrCodeDiv, {
      //     text: this.share_link,
      //     width: 120,
      //     height: 120,
      //     colorDark: "#333333", //二维码颜色
      //     colorLight: "#ffffff", //二维码背景色
      //     correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      //   })
      // },
      //复制失败
      onError() {
        // 移动端走的失败
        that.$toast.success("复制成功");
      },
      //复制成功
      onCopy() {
        // web走的成功
        let that = this;
        that.$toast.success("复制成功");
      },

    }
  }
</script>

<style lang="less" scoped>
  // /deep/ .van-toast{
  //   z-index: 999999 !important;
  //   background: #1F2241 !important;
  //   color: #fff !important;
  //   }
  .public {
    .poster {
      .ge_top {
        position: fixed;
        top: 0;
        width: 100%;

        .van-nav-bar {
          width: 100%;
          background: none !important;
        }

        .van-hairline--bottom::after {
          border: none !important;
        }
      }

      width: 100%;
      height: 100%;
      border-radius: 0rem;
      background: url(../../assets/img/tuiguang-bg2.png) no-repeat;
      background-size: 100%;

      p {
        width: 100%;
        text-align: center;
        margin-top: 2rem;

        img {
          width: 5.87rem;
          height: 0.58rem;
        }
      }

      .dire_info {
        width: 6.88rem;
        height: 8.31rem;
        margin: 0.6rem auto;
        background: url(../../assets/img/kuang.png) no-repeat;
        background-size: 100%;
        padding: 0.6rem 0.8rem;
        padding-right: 0.66rem;
        font-family: PingFang SC;

        .info_list {
          display: flex;
          justify-content: space-between;

          span:nth-child(1) {
            width: 2.12rem;
            font-size: 0.32rem;
            color: rgba(88, 87, 87, 1);
          }

          span:nth-child(2) {
            font-size: 0.36rem;
            font-family: Adobe Heiti Std;
            color: rgba(238, 153, 97, 1);
          }

          span:nth-child(3) {
            width: 1.28rem;
            height: 0.68rem;
            background: url(../../assets/img/anniu.png) no-repeat;
            background-size: 100%;
            font-size: 0.26rem;
            color: #967534;
            text-align: center;
            line-height: 0.6rem;
            margin-top: -0.06rem;
            // margin-left: 0.6rem;
          }
        }

        .info_list1 {
          font-family: PingFang SC;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.4rem;

          p {
            width: 3.6rem;
            text-align: left;
            margin: 0;
            span:nth-child(1) {
              // width: 3rem;
              font-size: 0.32rem;
              color: rgba(88, 87, 87, 1);
            }

            span:nth-child(2) {
              display: block;
              word-wrap: break-word;
              font-size: 0.26rem;
              font-family: PingFang SC;
              color: rgba(166, 166, 166, 1);
              margin-top: 0.12rem;
            }
          }
           h4{
             width: 1.28rem;
            height: 0.68rem;
            background: url(../../assets/img/anniu.png) no-repeat;
            background-size: 100%;
            font-size: 0.26rem;
            color: #967534;
            text-align: center;
            line-height: 0.6rem;
            // margin-top: -0.06rem;
            // margin-left: 0.6rem;
          }
        }
        .info_list2{
          margin-top: 0.4rem;

           span:nth-child(1) {
            font-size: 0.32rem;
            color: rgba(88, 87, 87, 1);
          }
          p{
            width: 100%;
            text-align: center;
            margin: 0;
            img{
              width: 3.2rem;
              height: 3.2rem;
            }
            span{
              display: block;
              color: #A6A6A6;
              font-size: 0.26rem;
            }
          }
        }
      }


    }
  }
</style>
