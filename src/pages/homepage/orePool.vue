<template>
  <div class="public">
    <van-nav-bar title="矿池" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="gross">
        <span>{{total_bsc_amount}}</span>
        <span>矿池总币量</span>
      </div>
      <div class="statis">
        <p><span>{{bsc_amount_surplus}}</span><span>待挖数量</span></p>
        <a></a>
        <p><span>{{bsc_amount_circulate}}</span><span>流通数量</span></p>
        <a></a>
        <p><span>{{bsc_amount_destroy}}</span><span>销毁币量</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total_bsc_amount:'',//bsc币总数量
        bsc_amount_circulate:'',//流通的bsc币数量
        bsc_amount_surplus:'',//待挖bsc数量
        bsc_amount_destroy:'',//销毁bsc数量
      }
    },
     mounted: function() {
      let that = this;
      that.getCoinPoolInfo();
    },
    methods: {
      back() {
        this.$router.back();
      },
	    //转换数据格式
	  checkPrice(price) {
	    if (price) {
	      price = parseFloat(price);
	      if (price < 1000) {
	        price = parseFloat(price).toFixed(4);
	      }
	      if (price >= 1000 && price < 10000) {
	        price = parseFloat(price / 1000).toFixed(4) + "k";
	      }
	      if (price >= 10000 && price < 1000000) {
	        price = parseFloat(price / 10000).toFixed(4) + "w";
	      }
	      if (price >= 1000000) {
	        price = parseFloat(price / 1000000).toFixed(4) + "m";
	      }
	    }
	    return price;
	  },
       //获取矿池信息
      getCoinPoolInfo() {
        let that = this;
        that
          .$http({
            url: "Mining/getCoinPoolInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.total_bsc_amount = res.data.data.total_bsc_amount;
              that.bsc_amount_circulate = res.data.data.bsc_amount_circulate;
              that.bsc_amount_surplus = res.data.data.bsc_amount_surplus;
              that.bsc_amount_destroy = res.data.data.bsc_amount_destroy;
              //bsc币总数量
			        that.total_bsc_amount = that.checkPrice(that.total_bsc_amount);
                  //流通的bsc币数量
              that.bsc_amount_circulate = that.checkPrice(that.bsc_amount_circulate);
                 //待挖bsc数量
              that.bsc_amount_surplus = that.checkPrice(that.bsc_amount_surplus);
                 //销毁bsc数量
              that.bsc_amount_destroy = that.checkPrice(that.bsc_amount_destroy);
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      goDetail() {
        let that = this;
        that.$router.push({
          path: '/informDetail'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .gross {
        margin-top: 1rem;
        width: 6rem;
        height: 6rem;
        background: url(../../assets/img/kuangchi.png) no-repeat;
        background-size: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);

        span:nth-child(1) {
          font-size: 0.6rem;
          font-weight: bold;
        }

        span:nth-child(2) {
          font-size: 0.32rem;
        }
      }

      .statis {
        width: 100%;
        margin-top: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: space-around;

        p {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);

          span:nth-child(1) {
            font-size: 0.30rem;
            font-weight: bold;
          }

          span:nth-child(2) {
            font-size: 0.24rem;
            opacity: 0.6;
            padding: 0.12rem 0;
          }
        }

        a {
          width: 0.02rem;
          height: 0.81rem;
          background: rgba(255, 255, 255, 1);
          opacity: 0.2;
        }
      }
    }
  }
</style>
