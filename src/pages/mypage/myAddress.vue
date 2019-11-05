<template>
  <div class="public">
    <van-nav-bar title="我的地址" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="account">
        <div class="acc_list" v-for="(item,index) in addressList" :key="index">
          <div class="add_info">
            <div class="info_left" @click="gotoClose(index)">
              <p class="deal_tit"><span>{{item.consignee_name}}</span><span>{{item.consignee_phone}}</span></p>
              <h4>{{item.address_detail}}</h4>
            </div>
            <span class="iconfont icon-tabbianji" @click="goEditaddress(item)"></span>
          </div>
          <div class="acc_top">
            <p v-if="item.is_default == 0" @click="setDefault(item.id)"><span class="iconfont icon-tabyigouxuan"></span><a>设置为默认地址</a></p>
            <p v-if="item.is_default == 1" style="color:#DDB71E;"><span class="iconfont icon-tabyigouxuan"></span><a>默认地址</a></p>
            <span class="iconfont icon-tabshanchu" @click="delAddress(item.id)"></span>
          </div>
        </div>
        <van-button type="primary" size="large" @click="goAddaddress">添加地址</van-button>
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
        default_add: '1', //默认地址
        checked: '', //非默认地址
        addressList: [], //我的页面信息
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getMyAddress()
    },
    methods: {
      back() {
        this.$router.back();
      },
      //前往结算
      gotoClose(index) {
        window.sessionStorage.setItem("addressIndex", index);
        this.back();
      },
      //添加地址
      goAddaddress() {
        let that = this;
        that.$router.push({
          path: '/addAdderss'
        })
      },
      //编辑地址
      goEditaddress(item) {
        let that = this;
        // console.log(item)
        that.$store.state.edit_address = item;
        that.$router.push({
          path: '/editAddress',
          // query:{
          //   edit_address:that.$store.state.edit_address
          // }
        })
      },
      //获取我的地址列表信息
      getMyAddress() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "User/getUserAddressList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.addressList = res.data.data;
              window.sessionStorage.setItem(
                "address",
                JSON.stringify(that.addressList)
              );
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //设置默认地址
      setDefault(id) {
        let that = this;
        that.$http
          .post("User/setUserAddressDefault", {
            token: window.localStorage.getItem("token"),
            id: id,
          })
          .then(function(res) {
            that.$toast.clear();
            if (res.data.code == 1) {
              that.getMyAddress()
              that.$toast.success("设置成功");
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(err) {});

      },
      //删除地址
      delAddress(id) {
        let that = this;
        that.$http
          .post("User/delUserAddress", {
            token: window.localStorage.getItem("token"),
            id: id,
          })
          .then(function(res) {
            that.$toast.clear();
            if (res.data.code == 1) {
              that.getMyAddress()
              that.$toast.success("删除成功");
            } else {
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(err) {});
      }
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
        background: rgba(98, 98, 98, 0.1) !important;
      }

      .account {
        margin-top: 0.22rem;

        .acc_list {
          padding: 0 4%;
          background: rgba(98, 98, 98, 0.1);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          font-family: PingFang SC;

          .add_info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #1F244F;

            .info_left {
              flex: 1;

              .deal_tit {
                width: 100%;
                height: 0.8rem;
                align-items: center;
                display: flex;

                // justify-content: space-between;
                span:nth-child(1) {
                  font-size: 0.28rem;
                  color: #fff;
                }

                span:nth-child(2) {
                  font-size: 0.24rem;
                  color: #fff;
                  padding-left: 0.2rem;
                }
              }

              h4 {
                font-size: 0.24rem;
                font-family: PingFang SC;
                color: rgba(167, 167, 167, 1);
              }
            }

            span.iconfont {
              display: inline-block;
              width: 1rem;
              text-align: right;
              color: #808080;
              font-size: 0.52rem;

            }
          }

          .acc_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: PingFang SC;
            padding: 0.32rem 0;

            p {
              display: flex;
              align-items: center;
              color: #ABABAB;

              span.icon-tabyigouxuan {
                font-size: 0.38rem;
              }

              a {
                padding-left: 0.2rem;
                font-size: 0.24rem;
              }
            }

            span.icon-tabshanchu {
              font-size: 0.32rem;
              color: #ABABAB;
            }

          }

        }

        .van-button--large {
          margin: 1rem 4% !important;
        }

        .van-button--primary {
          width: 92%;
        }
      }
    }
  }
</style>
