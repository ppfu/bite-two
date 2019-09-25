<template>
  <div class="public">
    <van-nav-bar title="生活版块" left-text="" left-arrow @click-left="back" />
    <div class="content">
                <div class="grid_con">
           <div class="grid_list" @click="tranTip">
             <img src="../../assets/img/doudizhux.png" />
             <span>斗地主</span>
           </div>
           <div class="grid_list" @click="tranTip">
             <img src="../../assets/img/sanguosha.png" />
             <span>三国杀</span>
           </div>
           <div class="grid_list" @click="tranTip">
             <img src="../../assets/img/majiang.png" />
             <span>麻将</span>
           </div>
           <div class="grid_list" @click="tranTip">
             <img src="../../assets/img/sanguo.png" />
             <span>三国战纪</span>
           </div>
         </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      back() {
        this.$router.back();
      },
       tranTip(){
        this.$toast.fail("该功能尚未开放");
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {

    .content {
      padding: 0;
          .grid_con {
          margin-top: 0.4rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;

          .grid_list {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 33%;
            padding: 0.4rem 0;
            margin-bottom: 0.04rem;
            background:rgba(255,255,255,0.04);
            // margin-bottom: 0.4rem;

            img {
              width: 1rem;
              height: 1rem;
            }

            span {
              font-size: 0.24rem;
              font-weight: 400;
              color: rgba(216, 224, 249, 1);
              margin-top: 0.12rem;
            }
          }
        }
    }
  }
</style>
