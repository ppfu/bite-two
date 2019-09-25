<template>
  <div class="public">
    <van-nav-bar title="攻略" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="details">
        <div class="de_text" v-html="profitInfo">

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
         profitInfo:this.$store.state.profitInfo,
      }
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
        padding: 0.4rem 0;
        font-size: 0.26rem;
        line-height: 0.42rem;
        color: #767994;
        margin-bottom: 1rem;

        .de_text {
          font-size: 0.26rem;
          color: #767994;
          line-height: 0.46rem;
          text-indent: 0.62rem;
        }

        h5 {
          text-align: center;

        }
      }
    }
  }
</style>
