<template>
  <div class="public">
    <van-nav-bar title="消息详情" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="details">
        <h4>{{mess_tit}}</h4>
        <div class="de_text" v-html="mess_con">

        </div>
        <!-- <h5 v-if="$store.state.user_data.about_us == null">暂无数据</h5> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        mess_tit: this.$route.query.mess_tit,
        mess_con: this.$route.query.mess_con,
      }
    },
    mounted:function(){
      // console.log(this.$route.query.mess_con)
    },
    methods: {
      back() {
        this.$router.back();
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      overflow-y: scroll;

      .details {
        width: 100%;
        padding: 0.4rem 0;
        font-size: 0.26rem;
        line-height: 0.42rem;
        color: #767994;
        margin-bottom: 1rem;
        h4{
          text-align: center;
          font-size: 0.30rem;
          padding-bottom: 0.12rem;
          color: #fff;
        }
        .de_text {
          font-size: 0.26rem;
          color: #767994;
          line-height: 0.46rem;
          // text-indent: 0.62rem;
         /deep/ p{
          /deep/ img{
              width: 100% !important;
            }
          }
        }

        h5 {


        }
      }
    }
  }
</style>
