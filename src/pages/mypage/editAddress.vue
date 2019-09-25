<template>
  <div class="public">
    <van-nav-bar title="编辑地址" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info waiting">
        <van-field label="联系人" v-model="consignee_name" clearable placeholder="请填写收货人姓名" />
        <div class="sex_sele">
          <span>性别</span>
          <van-radio-group v-model="consignee_sex">
            <van-radio name="1" checked-color="#07c160">女士</van-radio>
            <van-radio name="2" checked-color="#07c160">男士</van-radio>
          </van-radio-group>
        </div>
        <van-field label="手机号" v-model="consignee_phone" clearable placeholder="请填写收货人手机号码" />
        <div class="sex_sele">
          <span>收货地址</span>
          <group>
            <x-address  :title="title" v-model="value" :list="addressData"  placeholder="请选择地址">123</x-address>
          </group>
        </div>
        <van-field label="详细地址" v-model="address_detail" clearable type="textarea" autosize placeholder="请输入详细地址" />
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
      <van-button type="primary" size="large" @click="EditAddress">确认</van-button>
    </div>
  </div>
</template>

<script>
  import {
    XDialog,
    Group,
    XAddress,
    ChinaAddressV4Data,
    XButton,
    Cell,
    Value2nameFilter as value2name
  } from "vux";
  export default {
    data() {
      return {
        value: [
          this.$store.state.edit_address.province_code,
         this.$store.state.edit_address.city_code,
          this.$store.state.edit_address.area_code
        ],//显示收货地址
        edit_address:this.$store.state.edit_address,//编辑地址信息
        addressData: ChinaAddressV4Data,
        // value4: [],
        // value5: ['广东省', '深圳 市', '南山区'],
        showAddress: false,
        consignee_name: this.$store.state.edit_address.consignee_name, //收货人
        consignee_sex: String(this.$store.state.edit_address.consignee_sex), //性别
        consignee_phone: this.$store.state.edit_address.consignee_phone, //手机号
        address_detail: this.$store.state.edit_address.address_detail, //详细地址
        province_code: this.$store.state.edit_address.province_code, //省编码
        city_code: this.$store.state.edit_address.city_code, //市编码
        area_code: this.$store.state.edit_address.area_code, //区编码
        title: ''
      }
    },
    components: {
      XDialog,
      Group,
      XAddress,
      XButton,
      Cell,
    },
    mounted() {
      let that = this;
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      doShowAddress() {
        this.showAddress = true;
        setTimeout(() => {
          this.showAddress = false;
        }, 2000);
      },
      onShadowChange(ids, names) {
        // console.log(ids, names)
      },
      logHide(str) {
        // console.log('on-hide', str)
      },
      logShow(str) {
        // console.log('on-show')
      },
      //编辑地址
      EditAddress() {
        let that = this;
        let consignee_name = that.consignee_name;
        let consignee_phone = that.consignee_phone;
        let address_detail = that.address_detail;
        if (!consignee_name || consignee_name == null) {
          that.$toast("请输入收货人姓名");
        } else if (!consignee_phone || consignee_phone == null) {
          that.$toast("请输入收货人手机号");
        } else if (!address_detail || address_detail == null) {
          that.$toast("请输入收货详细地址");
        } else {
          that.$toast.loading({
            mask: true,
            message: "提交中..."
          });
          that.$http({
              url: "User/editUserAddress",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                id: that.$store.state.edit_address.id,
                consignee_name: consignee_name,
                consignee_phone: consignee_phone,
                consignee_sex: that.consignee_sex,
                address_detail: address_detail,
                province_code: that.value[0],
                city_code: that.value[1],
                area_code: that.value[2]
              }
            }).then(function(res) {
              console.log(res.data.code)
              that.$toast.clear();
              if (res.data.code == 1) {
                that.$toast.success("修改成功");
                that.back();
              } else {
                that.$toast.fail(res.data.msg);
              }
            })
            .catch(function(err) {});
        }
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

        /deep/ .van-cell:nth-child(5) {
          border: none !important;
        }

        /deep/ .van-field__label {
          width: 1.8rem !important;
        }

        /deep/ .van-field__control {
          color: #fff !important;
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

        .sex_sele {
          display: flex;
          align-items: center;
          padding: 0.26rem 0.1rem;
          width: 94% !important;
          margin: 0 auto !important;
          border-bottom: 1px solid #1F244F !important;

          span {
            font-size: 0.28rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            width: 1.8rem;
          }

          .van-radio-group {
            display: flex !important;
            // padding-left: 1.2rem;

            /deep/ .van-radio__icon--checked .van-icon {
              background: #DDB71E !important;
              border: none !important;
            }

            /deep/ .van-radio__icon .van-icon {
              // border: 1px solid #999999 !important;
            }

            /deep/ .van-radio {
              padding-right: 0.4rem !important;
            }

            /deep/ .van-radio__label {
              font-size: 0.24rem !important;
              color: rgba(255, 255, 255, 0.4) !important;
            }

          }

          /deep/ .weui-cell {
            padding: 0 !important;
          }

          /deep/ .weui-cells {
            width: 5.0rem;
          }

          /deep/ .vux-popup-picker-select {
            text-align: left !important;
            background: none !important;

            font-size: 0.26rem !important;
          }

          /deep/ .vux-cell-value {
            color: #fff !important;
            background: none !important;
          }

          /deep/ .weui-cells:before,
          /deep/ .weui-cells:after {
            display: none;
          }

          /deep/ .vux-no-group-title {
            margin: 0 !important;
            // padding-left: 0.66rem !important;
            background: none !important;
          }

          /deep/ .vux-popup-picker-placeholder {
            font-size: 0.26rem !important;
            color: rgba(255, 255, 255, 0.4) !important;
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
