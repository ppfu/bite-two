<template>
  <div>
    <div class="tabs-wrap">
      <router-view name="child"></router-view>
    </div>
    <div id="footer">
      <van-tabbar v-model="active">
        <router-link to="/home">
          <van-tabbar-item>
            <span>首页</span>
            <img slot="icon" slot-scope="props" :src="props.active ? icon.tab1_on : icon.tab1_off" />
          </van-tabbar-item>
        </router-link>
        <router-link to="/transfer">
          <van-tabbar-item>
            <span>扫码</span>
            <img slot="icon" slot-scope="props" :src="props.active ? icon.tab2_on : icon.tab2_off" />
          </van-tabbar-item>
        </router-link>
        <router-link to="/store">
          <van-tabbar-item>
            <span>商城</span>
            <img slot="icon" slot-scope="props" :src="props.active ? icon.tab3_on : icon.tab3_off" />
          </van-tabbar-item>
        </router-link>
        <router-link to="/deal">
          <van-tabbar-item>
            <span>交易</span>
            <img slot="icon" slot-scope="props" :src="props.active ? icon.tab4_on : icon.tab4_off" />
          </van-tabbar-item>
        </router-link>
        <router-link to="/mine">
          <van-tabbar-item>
            <span>我的</span>
            <img slot="icon" slot-scope="props" :src="props.active ? icon.tab5_on : icon.tab5_off" />
          </van-tabbar-item>
        </router-link>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        icon: {
          tab1_off: require("../assets/img/tab1_off.png"),
          tab1_on: require("../assets/img/tab1_on.png"),
          tab2_off: require("../assets/img/tab2_off.png"),
          tab2_on: require("../assets/img/tab2_on.png"),
          tab3_off: require("../assets/img/tab3_off.png"),
          tab3_on: require("../assets/img/tab3_on.png"),
          tab4_off: require("../assets/img/tab4_off.png"),
          tab4_on: require("../assets/img/tab4_on.png"),
          tab5_off: require("../assets/img/tab5_off.png"),
          tab5_on: require("../assets/img/tab5_on.png"),
        }
      };
    },
    components: {},
    watch: {
      // 使用watch 监听$router的变化
      $route(to, from) {
        if (this.$route.path == "/home") {
          this.active = 0;
        } else if (this.$route.path == "/transfer") {
          this.active = 1;
        } else if (this.$route.path == "/store") {
          this.active = 2;
        } else if (this.$route.path == "/deal") {
          this.active = 3;
        } else if (this.$route.path == "/mine") {
          this.active = 4;
        }
      }
    },
    created: function() {
      if (this.$route.path == "/home") {
        this.active = 0;
      } else if (this.$route.path == "/transfer") {
        this.active = 1;
      } else if (this.$route.path == "/store") {
        this.active = 2;
      } else if (this.$route.path == "/deal") {
        this.active = 3;
      } else if (this.$route.path == "/mine") {
        this.active = 4;
      }
    },
    methods: {
      // tranTip(){
      //   this.$toast.fail("该功能尚未开放");
      // }
    }
  };
</script>

<style scoped="scoped">
  #footer {
    height: 1rem;
    width: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 0;
  }

  /deep/ .van-tabbar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 1rem;
    background-color: #1F2241;
    /* border-top: 1px solid #ffffff; */
    /* box-shadow:0px -1px 4px rgba(113,141,184,0.16); */
  }

  .van-hairline--top-bottom::after {
    border-width: 0;
  }

  .van-tabbar a {
    display: inline-block;
    height: 1rem;
    width: 33.33334%;
    padding-top: 0.06rem;
  }

  .van-tabbar-item {
    color: #B1B9DC;
    font-size: 0.24rem;
  }

  .van-tabbar-item--active {
    color: #4163C7;
  }

  /* .van-tabbar-item__icon .contract{
  margin-top: -0.4rem;
  color: #7d7e80;
  font-size: 0.24rem;
  text-align: center;
}
.van-tabbar-item--active .contract span{
  color: #5D784C;
}
.van-tabbar-item__icon .contract p{
text-align: center;
 width:0.94rem;
height:0.94rem;
background:rgba(255,255,255,1);
box-shadow:0px -3px 4px rgba(113,154,214,0.16);
border-radius:50%;
opacity:1;
line-height: 1.16rem;
margin-bottom: 0.03rem;
}
.van-tabbar-item__icon .contract img{
   display: inline-block;
} */
  .van-tabbar-item__icon img {
    display: block;
    height: 0.50rem;
  }
</style>
