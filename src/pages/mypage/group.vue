<template>
  <div class="public">
    <van-nav-bar title="团队" left-text="" right-text="推广" @click-right="goDirect" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" :swipe-threshold="num">
        <van-tab :title="'我的直推'+ '（'+direct_num+'）'">
          <div class="account">
            <div class="header">
              <span>会员账号</span>
              <span>姓名</span>
              <span>手机号</span>
              <span>加入时间</span>
            </div>
            <div class="con_list">
              <ul>
                <li v-for="(item,index) in directList" :key="index">
                  <span>{{item.user_code}}</span>
                  <span>{{item.real_name}}</span>
                  <span>{{item.user_phone}}</span>
                  <span>{{item.create_time}}</span>
                </li>
              </ul>
            </div>

          </div>
          <div v-if="directList.length <=0" class="no_data">
            <img src="../../assets/img/noData.png">
            <span>暂无数据</span>
          </div>
        </van-tab>
        <van-tab :title="'团队人数'+ '（'+team_num+'）'">
          <div class="account">
            <div class="header">
              <span>会员账号</span>
              <span>姓名</span>
              <span>手机号</span>
              <span>加入时间</span>
            </div>
            <div class="con_list">
              <ul>
                <li v-for="(item,index) in teamList" :key="index">
                  <span>{{item.user_code}}</span>
                  <span>{{item.real_name}}</span>
                  <span>{{item.user_phone}}</span>
                  <span>{{item.create_time}}</span>
                </li>
              </ul>
            </div>

          </div>
          <div v-if="teamList.length <=0" class="no_data">
            <img src="../../assets/img/noData.png">
            <span>暂无数据</span>
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
        num: 5,
        active: 0,
        direct_num: '', //直推人数
        team_num: '', //团队人数
        directList: [], //直推列表
        teamList: [], //团队列表
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getGroup()
    },
    methods: {
      back() {
        this.$router.back();
      },
      //推广
      goDirect() {
        let that = this;
        that.$router.push({
          path: '/directDrive',
        })
      },
      //获取我的团队信息
      getGroup() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "User/getUserTeamInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.directList = res.data.data.direct;
              $.each(that.directList, function(index, item) {
                item.create_time = that.timesToTime(item.create_time);
              })
              that.teamList = res.data.data.team;
              $.each(that.teamList, function(index, item) {
                item.create_time = that.timesToTime(item.create_time);
              })
              that.direct_num = res.data.data.direct_num;
              that.team_num = res.data.data.team_num;
              // console.log(that.teamList)
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {});
      },
      // 时间戳 转化为时间
      timesToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        if (date.getHours() < 10) {
          var h = "0" + date.getHours() + ":";
        } else {
          var h = date.getHours() + ":";
        }
        if (date.getMinutes() < 10) {
          var m = "0" + date.getMinutes() + ":";
        } else {
          var m = date.getMinutes() + ":";
        }
        var s = date.getSeconds();
        if (s == 0) {
          s = "00";
        } else if (s < 10) {
          s = "0" + s;
        }
        return Y + M + D + h + m + s;
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
        background: #1B1F41 !important;
        position: fixed;
        height: 0.8rem;
        width: 100%;
        line-height: 0.8rem;
        border-top: 0.01rem solid #13173D;
        // padding: 0.1rem;
      }

      /deep/ .van-tabs__nav--line {
        padding-bottom: 0.12rem;
      }

      /deep/ .van-tabs__line {
        // padding-top: 0.4rem;
        bottom: 0.04rem;
      }

      .account {
        background: rgba(98, 98, 98, 0.1);
        padding-bottom: 0.2rem;

        .header {
          position: fixed;
          border-top: 0.14rem solid #13173D;
          width: 100%;
          height: 1rem;
          line-height: 0.8rem;
          display: flex;
          background: #1B1F41;

          span {
            display: inline-block;
            width: 25%;
            text-align: center;
            font-size: 0.28rem;
            color: #fff;
          }
        }

        .con_list {
          padding-top: 0.88rem;
          height: calc(100% - 3rem);
          overflow-y: scroll;

          h5 {
            text-align: center;
            padding: 0.5rem;
            color: #888;
          }

          ul {
            height: 100%;

            li {
              padding: 0.12rem 0;
              display: flex;

              span {
                width: 25%;
                display: inline-block;
                text-align: center;
                font-size: 0.26rem;
                font-weight: 500;
                color: #A7A7A7;
              }
            }
          }
        }
      }
        .no_data{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 3.2rem;
          height: 3.2rem;
          }
        span{
          color: #B1B9DC;
          padding: 0.12rem 0;
          font-size: 0.28rem;
        }
      }
    }
  }
</style>
