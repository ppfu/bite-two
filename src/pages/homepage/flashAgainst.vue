<template>
  <div class="public">
    <van-nav-bar title="闪兑" left-arrow @click-left="back">
      <!--  <span class="iconfont icon-tabicon"></span> -->
      <van-icon name="notes-o" slot="right" @click="goFlre" />
    </van-nav-bar>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="兑币">
          <div class="account">
            <van-dropdown-menu>
              <van-dropdown-item v-model="exch_value" :options="exchange_coin" @change="seletChange(exch_value)" />
            </van-dropdown-menu>
            <div class="pu_pwd">
              <h4>兑换数量：</h4>
              <van-field v-model="number" placeholder="请输入兑换数量" />
              <a @click="allNum">全部</a>
            </div>
            <div class="uses">
              <p><span>可用{{use_a}}:</span><span>{{exch_info.useable_a}}</span></p>
              <p><span>兑换比例:</span><span>{{exch_info.exchange_price}}</span></p>
            </div>
            <van-button type="primary" size="large" @click="exchange">确认</van-button>
          </div>
        </van-tab>
        <van-tab title="充值">
          <div class="account">
            <van-dropdown-menu>
              <van-dropdown-item v-model="rech_value" :options="recharge_coin" @change="seletChangeRe(rech_value)" />
            </van-dropdown-menu>
            <div class="pu_pwd">
              <h4>我的{{coin_name}}地址：</h4>
              <van-field v-model="address" placeholder="请输入交易所或钱包地址" clearable />
            </div>
            <div class="pu_pwd">
              <h4>{{coin_name}}充值数量：</h4>
              <van-field v-model="exch_number" placeholder="请输入充值数量" clearable />
            </div>
            <div class="uses">
              <p><span>温馨提示：仔细核对您的{{coin_name}}平台充币地址，避免资金丢失</span></p>
            </div>
            <div class="service">
              <p><img class="imgCode" :src="recharge_address_qrcode" /></p>
              <!-- <span @click="downs">保存二维码</span> -->
              <span @click="downloadIamge('.imgCode',recharge_address_qrcode)">保存二维码</span>
            </div>
            <div class="service">
              <h4>{{recharge_address}}</h4>
              <span v-clipboard:copy="recharge_address" v-clipboard:success="onCopy" v-clipboard:error="onError">复制地址</span>
            </div>
            <van-button type="primary" size="large" @click="recharge">确认</van-button>
          </div>
        </van-tab>
      </van-tabs>
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
        active: this.$route.query.type,
        number: '', //兑换数量
        exch_number: '', //充值数量
        address: '', //充值地址
        rech_value: 0, //选中的虚拟币
        recharge_coin: [], //可充值虚拟币
        exch_value: 0, //选中的可兑换虚拟币对
        exchange_coin: [], //可兑换虚拟币对
        exch_info: {}, //兑换币信息
        use_a: '', //可兑换币数量
        recharge_address: '', //充值地址
        recharge_address_qrcode: '', //充值二维码
        coin_id: '', //充值币id
        coin_name: '', //充值币名称
        coin_id_a: '', //兑换币a id
        coin_id_b: '', //兑换币b id
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getRechargeInfo()
    },
    methods: {
      back() {
        this.$router.back();
      },
      //闪兑记录
      goFlre() {
        let that = this;
        that.$router.push({
          path: '/flashRecord'
        })
      },
      //选择可兑换币对
      seletChange(i) {
        let that = this;
        that.exch_info = that.exchange_coin[i];
        var use_coin = that.exch_info.text.split("/");
        that.use_a = use_coin[1];
        that.coin_id_a = that.exchange_coin[i].coin_a;
        that.coin_id_b = that.exchange_coin[i].coin_b;
        // console.log(that.coin_id_a,that.coin_id_b)
      },
      //选择充值币
      seletChangeRe(i) {
        let that = this;
        that.coin_id = that.recharge_coin[i].id;
        that.coin_name = that.recharge_coin[i].text;
        that.recharge_address = that.recharge_coin[i].recharge_address;
        that.recharge_address_qrcode = that.recharge_coin[i].recharge_address_qrcode;
      },
      //设置全部数量
      allNum() {
        let that = this;
        that.number = that.exch_info.useable_a;
      },
      //保存二维码
      downloadIamge(selector, name) {
        // 通过选择器获取img元素，
        if (this.recharge_address_qrcode == '') {

          this.$toast("您还不能充值，请联系客服设置充值地址");

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
      // downloadIamge(imgsrc, name) {//下载图片地址和图片名
      //   var image = new Image();
      //   // 解决跨域 Canvas 污染问题
      //   image.setAttribute("crossOrigin", "anonymous");
      //   image.onload = function() {
      //     var canvas = document.createElement("canvas");
      //     canvas.width = image.width;
      //     canvas.height = image.height;
      //     var context = canvas.getContext("2d");
      //     context.drawImage(image, 0, 0, image.width, image.height);
      //     var url = canvas.toDataURL("image/jpg"); //得到图片的base64编码数据
      //
      //     var a = document.createElement("a"); // 生成一个a元素
      //     var event = new MouseEvent("click"); // 创建一个单击事件
      //     a.download = name || "photo"; // 设置图片名称
      //     a.href = url; // 将生成的URL设置为a.href属性
      //     a.dispatchEvent(event); // 触发a的单击事件
      //   };
      //   image.src = imgsrc;
      // },
      // downs(){
      //   this.downloadIamge(this.recharge_address_qrcode, 'pic')
      // },

      //兑换
      exchange() {
        let that = this;
        let number = that.number;
        if (!number || number == null) {
          that.$toast("请输入兑换数量");
        } else if (Number(number) <= 0) {
          that.$toast("数量不能小于0！");
        } else {
          that.$toast.loading({
            mask: true,
            message: "提交中..."
          });
          that.$http({
              url: "Account/getUserCoinExchange",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                coin_id_a: that.coin_id_a,
                coin_id_b: that.coin_id_b,
                number: number,
              }
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
                that.$toast.success("兑换成功");
                that.$router.back(-1);
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(err) {});
        }
      },
      //充值
      recharge() {
        let that = this;
        let address = that.address;
        let exch_number = that.exch_number;
        if (!address || address == null) {
          that.$toast("请输入充值地址");
        } else if (!exch_number || exch_number == null) {
          that.$toast("请输入充值数量");
        } else if (Number(exch_number) <= 0) {
          that.$toast("数量不能小于0！");
        } else {
          that.$toast.loading({
            mask: true,
            message: "提交中..."
          });
          that.$http({
              url: "Account/rechargeUserAccount",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                coin_id: that.coin_id,
                number: exch_number,
                address: address,
              }
            })
            .then(function(res) {
              that.$toast.clear();
              if (res.data.code == 1) {
                that.$toast.success("充值成功，请等待系统确认后到账");
                that.$router.back(-1);
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(err) {});
        }
      },
      //获取闪兑相关信息
      getRechargeInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Account/getRechargeInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              //充值
              that.recharge_coin = res.data.data.recharge_coin;
              that.recharge_coin = JSON.parse(JSON.stringify(that.recharge_coin).replace(/coin_name/g, "text"));
              $.each(that.recharge_coin, function(index, item) {
                item["value"] = index;
              });
              that.coin_id = that.recharge_coin[0].id; //默认充值币id
              that.coin_name = that.recharge_coin[0].text; //默认充值币名称
              that.recharge_address = that.recharge_coin[0].recharge_address;
              that.recharge_address_qrcode = that.recharge_coin[0].recharge_address_qrcode;
              //兑换
              that.exchange_coin = res.data.data.exchange_coin;
              that.exchange_coin = JSON.parse(JSON.stringify(that.exchange_coin).replace(/name/g, "text"));
              var exchObj = {};
              $.each(that.exchange_coin, function(index, item) {
                item["value"] = index;
              });
              //默认可用币
              that.exch_info = that.exchange_coin[0];
              var use_coin = that.exch_info.text.split("/");
              that.use_a = use_coin[1];
              //默认兑换币id
              that.coin_id_a = that.exchange_coin[0].coin_a;
              that.coin_id_b = that.exchange_coin[0].coin_b;
              console.log(that.coin_id_a, that.coin_id_b)
              // //充值二维码
              // that.recharge_address_qrcode = res.data.data.recharge_address_qrcode;
              // //充值地址
              // that.recharge_address = res.data.data.recharge_address;
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },
      //复制地址失败
      onError() {
        // 移动端走的失败
        that.$toast.success("复制成功");
      },
      //复制地址成功
      onCopy() {
        // web走的成功
        let that = this;
        that.$toast.success("复制成功");
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-hairline--bottom::after {
      // : none !important;
    }

    .van-nav-bar .van-icon {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .content {
      font-family: PingFang SC;
      overflow-y: scroll;
      height: calc(100% - 1rem);

      /deep/ .van-tab {
        color: #fff !important;
      }

      /deep/ .van-tab--active {
        color: #35A8FB !important;
      }

      .account {
        margin-top: 0.4rem;

        .van-dropdown-menu {
          background: #212548 !important;
          height: 0.66rem !important;
          width: 50%;
          border-radius: 0.08rem;
        }

        /deep/ .van-dropdown-menu__title {
          color: #FEFEFE !important;
          font-size: 0.26rem;
        }

        /deep/ .van-popup {
          background: #212548 !important;
          width: 46%;
          border-radius: 0.12rem;
          left: 4%;
        }

        /deep/ .van-overlay {
          display: none;
          background-color: rgba(0, 0, 0, .8);
        }

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

        .uses {
          display: flex;
          padding: 0.08rem 0;


          p {
            font-size: 0.24rem;
            font-family: PingFang SC;
            padding-right: 0.2rem;

            span:nth-child(1) {
              color: rgba(185, 184, 184, 1);
            }

            span:nth-child(2) {
              color: #35A8FB;
              padding-left: 0.12rem;
            }
          }
        }

        .service {
          margin-top: 1rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            background: #fff;

            img {
              width: 3rem;
              height: 3rem;
            }
          }

          h4 {
            width: 90%;
            color: #fff;
            text-align: center;
            word-wrap: break-word;
          }

          span {
            margin-top: 0.4rem;
            display: inline-block;
            background: #35A8FB;
            width: 2.6rem;
            height: 0.66rem;
            color: #fff;
            text-align: center;
            line-height: 0.66rem;
            font-size: 0.28rem;
            border-radius: 0.08rem;
          }

        }

        .van-button--large {
          margin: 1.2rem 0 !important;
        }

      }
    }
  }
</style>
