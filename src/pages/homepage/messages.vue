<template>
  <div class="public">
    <van-nav-bar title="消息" left-text="" left-arrow @click-left="back" />
    <div class="content">
       <van-tabs v-model="active" @click="navTap(active)">
        <van-tab title="系统">
      <div class="account">
        <div class="scroll_div">
          <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
            @refresh="onRefresh">
            <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
              @load="onLoad">
              <div class="acc_list" v-for="(item,index) in noticeList" :key="index" @click="goDetails(item)">
                <div class="acc_top">
                  <p><span>{{item.title}} </span><span>{{item.create_time}}</span></p>
                  <p>
                    <span>{{item.intro}}</span>
                   <a v-if="item.visit == 0" style="color: #07C160;">已读</a>
                   <a v-if="item.visit == 1" style="color: #D14B64;">未读</a>
                  </p>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
       </van-tab>
        <van-tab title="文章">
       <div class="account">
         <div class="scroll_div">
           <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
             @refresh="onRefresh">
             <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
               @load="onLoad">
               <div class="acc_list" v-for="(item,index) in noticeList" :key="index" @click="goDetails(item)">
                 <div class="acc_top">
                   <p><span>{{item.title}} </span><span>{{item.create_time}}</span></p>
                   <p>
                     <span>{{item.intro}}</span>
                    <a v-if="item.visit == 0" style="color: #07C160;">已读</a>
                    <a v-if="item.visit == 1" style="color: #D14B64;">未读</a>
                   </p>
                 </div>
               </div>
             </van-list>
           </van-pull-refresh>
         </div>
       </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active:0,
        pageindex: 1, //消息列表默认第一页
        noticeList: [], //消息列表
        noticeTotal: 0, // 总数量
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        m_type:'',
      }
    },
    mounted: function() {
      let that = this;
      that.getUserNoticeList();
       // if(localStorage.getItem("messIndex")){
       //   that.dotVisible = localStorage.getItem("messIndex");
       //   console.log(that.dotVisible)
       // }
    },
    methods: {
      back() {
        this.$router.back();
      },
      //消息详情
      goDetails(item) {
        let that = this;
        console.log(item.title)
        that.$router.push({
          path: "/messDetail",
          query:{
            mess_tit:item.title,
            mess_con:item.content,
          }
        });
      },
       navTap(index) {
        let that = this;
        // that.dealType = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.noticeList = [];
        that.getUserNoticeList(0);
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.noticeList = [];
        that.noticeTotal = 0;
        that.getUserNoticeList(0);

      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getUserNoticeList(1);
      },
      //获取我的消息列表
      getUserNoticeList(i) {
        let that = this;
        var MType = (that.active).toString();
        that.m_type = MType == "0" ? "0" : "1" //1 :系统 2：文章
        that
          .$http({
            url: "Index/getUserNoticeList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
              type: that.m_type,
            },

          })
          .then(function(res) {
            if (res.data.code == 1) {
              if (i == 0) {
                if (res.data.data.data.length > 0) {
                  that.noticeList = res.data.data.data;
                  that.noticeTotal = res.data.data.total;
                  if (that.noticeList.length >= that.noticeTotal) {
                    //全部数据已加载
                    that.finished = true;
                  }
                } else {
                  that.finished = true;
                }
                that.updateLoading = false;
              } else {
                that.moreloading = false;
                if (res.data.data.data.length > 0) {
                  that.noticeList = that.noticeList.concat(res.data.data.data);
                  that.noticeTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.noticeList.length >= that.noticeTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
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
      padding: 0;
      overflow-y: scroll;
      height: calc(100% - 1rem);
      /deep/ .van-tabs__nav {
         background: rgba(255, 255, 255, 0.028) !important;
         z-index: 99;
       }
      /deep/ .van-tab {
        color: #fff !important;
      }

      /deep/ .van-tab--active {
        color: #35A8FB !important;
      }
      .account {
        padding: 0 4%;
        margin-top: 0.4rem;

        .acc_list {
          padding: 0.2rem 0.18rem;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;

          .acc_top {
            p {
              display: flex;
              justify-content: space-between;
              align-items: center;

              span {
                font-size: 0.26rem;
                font-family: PingFang SC;
                color: #A7A7A7;
                padding: 0.06rem 0;
              }

              a {
                font-size: 0.24rem;
                color: #fff;
              }
            }

            p:nth-child(1) {
              span:nth-child(1) {
                color: #fff;
                font-size: 0.28rem;
              }

            }

            p:nth-child(2) {
              span:nth-child(1) {
                width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

            }
          }
        }
      }
    }
  }
</style>
