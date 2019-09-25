<template>
  <div class="public">
    <van-nav-bar title="支付宝" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field label="姓名" v-model="zfb_name" clearable placeholder="请输入姓名" />
        <van-field label="账号" v-model="zfb_account" maxlength="11" clearable placeholder="请输入账号" />
        <div class="add_code">
          <h4>添加收款二维码</h4>
          <div class="code_img">
            <img v-show="imgShow" @click="showUp" :src="zfb_qrcode"  class="wx_img" />
            <van-uploader v-show="imgShow == false" v-model="fileList" :after-read="afterRead" multiple :max-count="1" />
          </div>
        </div>
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
      <van-button type="primary" size="large" @click="addAlipay">确认</van-button>
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
        zfb_name:this.$store.state.pay_type.zfb_name,//支付宝姓名
        zfb_account:this.$store.state.pay_type.zfb_account,//支付宝账号
        zfb_qrcode:this.$store.state.pay_type.zfb_qrcode,//支付宝收款二维码
        fileList: [], //展示已上传身份证
        imgShow: true, //第一次进入
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      if(that.zfb_qrcode == null){
        that.imgShow = false;
      }
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      closeDia() {
        let that = this;
        that.men_dlg = false;
      },
      //编辑支付宝
           addAlipay() {
             let that = this;
             let zfb_name = that.zfb_name;
             let zfb_account = that.zfb_account;
             let fileList = that.fileList;
             if (!zfb_name || zfb_name == null) {
               that.$toast("请输入姓名");
             } else if (!zfb_account || zfb_account == null) {
               that.$toast("请输入支付宝账号");
             } else if (fileList.length<1) {
               that.$toast("请上传支付宝收款二维码");
             } else {
              that.$toast.loading({
                mask: true,
                message: "提交中..."
              });
               that.$http({
                  url: "User/editUserPayType",
                  method: "post",
                 data: {
                   token: window.localStorage.getItem("token"),
                   zfb_name: zfb_name,
                   zfb_account: zfb_account,
                   zfb_qrcode: that.zfb_qrcode,
                 }
                 }).then(function(res) {
                   that.$toast.clear();
                   if (res.data.code == 1) {
                    that.$toast.success("成功");
                     that.back();
                   } else {
                     that.$toast.fail(res.data.msg);
                   }
                 })
                 .catch(function(err) {
                 });
             }
           },
      // 上传生产许可证
      afterRead(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("file", file.file);
          formData.append("type", "account");
          $.ajax({
            url: "http://btxk.qilinpz.com/api/Common/upload",
            type: "POST",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false
          }).done(function(res) {
            console.log(res)
            if (res.code == 1) {
              //成功回调
              that.$toast.success("上传成功");
              that.zfb_qrcode = res.data;
            } else {
              //失败
              that.$toast(res.msg);
            }
          });
        };
      },
      // 显示上传图片
     showUp() {
       this.imgShow = false;
       this.zfb_qrcode = null;
     },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar__right {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .van-nav-bar .van-icon {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .content {
      padding: 0;

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

        // /deep/ .van-cell:nth-child(2) {
        //   border: none !important;
        // }

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
      .add_code {
        padding: 0 4%;
        h4 {
          padding: 0.24rem 0;
          font-size: 0.28rem;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);
        }
        .code_img{
          width: 100%;
          text-align: center;
          padding: 0.4rem 0;
          .wx_img{
            display: inline-block;
            width: 3rem;
            height: 3rem;
          }
        /deep/  .van-uploader__upload{
            width: 3rem !important;
            height: 3rem !important;
            background: none !important;
            border: 1px solid rgba(55,60,105,1) !important;
          }
         /deep/ .van-uploader__preview-image{
             width: 3rem !important;
             height: 3rem !important;
          }
         /deep/ .van-uploader__upload-icon{
            font-size: 0.8rem !important;
            font-weight: bold !important;
            color: #B2BCD9 !important;
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

      h5 {
        text-align: center;
        font-size: 0.26rem;
        padding: 0.2rem 0;
        color: #5B913F;
      }
    }
  }
</style>
