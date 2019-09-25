<template>
  <div class="public">
    <van-nav-bar title="我的矿机" right-text="矿池" left-arrow @click-left="back" @click-right="goOre" />
    <div class="content">
      <div class="sele_mill">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="run" @change="seletChange(value1)" />
            <van-dropdown-item v-model="value2" :options="scrap" @change="seletChangeSc(value2)" />
          </van-dropdown-menu>
      </div>
      <div class="mill_con">
        <div class="mill_info">
          <div class="mill_left">
            <p><span>昨日挖矿收益</span><span>{{my_profit_yesterday}}</span></p>
            <p><span>累计挖矿收益</span><span>{{my_profit_total}}</span></p>
            <p><span>全网算力</span><span>{{power_total}}</span></p>
            <p><span>实时算力</span><span>{{power_now}}</span></p>
          </div>
          <div class="mill_left mill_right">
            <div><span>我的算力</span><span>{{my_power}}</span></div>
            <p><span>原始算力</span><span>{{my_power_original}}</span></p>
            <p><span>增益算力</span><span>{{my_power_add}}</span></p>
          </div>
        </div>
      </div>
      <div class="d_chart">
        <h4>我的收益</h4>
        <div class="chart">
          <div id="myChart" :style="{width: '100%', height: '240px'}"></div>
        </div>
      </div>
      <div class="d_chart">
        <h4>我的算力</h4>
        <div class="chart">
          <div id="myChart2" :style="{width: '100%', height: '240px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        value1: 0,
        value2: 0,
        min_id:0,
        run: [], //运行中的矿机
        scrap: [], //报废的矿机
        minInfo:{},
        my_profit_yesterday:'',
        my_profit_total:'',
        power_total:'',
        power_now:'',
        my_power:'',
        my_power_original:'',
        my_power_add:'',
        my_profit_list:[],//我的收益列表
        my_power_list:[],//我的算力列表
        profit_date:[],
        profit_val:[],
        power_date:[],
        power_val:[],

      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getMyMiningList();
      that.getMyMiningInfo();
    },
    methods: {
      back() {
        this.$router.back();
      },
       //选择运行中矿机
      seletChange(i) {
        let that = this;
        // that.exch_info = that.exchange_coin[i];
        that.min_id = that.run[i].id;
        that.getMyMiningInfo();
      },
        //选择报废矿机
      seletChangeSe(i) {
        let that = this;
        that.min_id = that.scrap[i].id;
        that.getMyMiningInfo();
      },
      //获取我的矿机列表
      getMyMiningList() {
        let that = this;
        that
          .$http({
            url: "Mining/getMyMiningList",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              //运行中的矿机
              that.run = res.data.data.run;
              // 1. 拼接出全部运行中矿机对象
              var cmt = {
               id:0,
               value: 0,
               text:"运行中矿机"
              };
              that.run.unshift(cmt);
              that.run = JSON.parse(JSON.stringify(that.run).replace(/mining_name/g, "text"));
              $.each(that.run, function(index, item) {
                item["value"] = index;
              });
              // console.log(that.run)
              //报废的矿机
              that.scrap = res.data.data.scrap;
               // 1. 拼接出全部报废矿机对象
              var cmt1 = {
               id:0,
               value: 0,
               text:"已报废矿机"
              };
              that.scrap.unshift(cmt1);
              that.scrap = JSON.parse(JSON.stringify(that.scrap).replace(/mining_name/g, "text"));
              var exchObj = {};
              $.each(that.scrap, function(index, item) {
                item["value"] = index;
              });
              // console.log(that.scrap)
              // //默认可用币
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },
       //获取我的矿机详情
      getMyMiningInfo() {
        let that = this;
        that
          .$http({
            url: "Mining/getMyMiningInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id:that.min_id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              //矿机详情
              that.minInfo = res.data.data;
              that.my_profit_yesterday = res.data.data.my_profit_yesterday;
              that.my_profit_total = res.data.data.my_profit_total;
              that.power_total = res.data.data.power_total;
              that.power_now = res.data.data.power_now;
              that.my_power = res.data.data.my_power;
              that.my_power_original = res.data.data.my_power_original;
              that.my_power_add = res.data.data.my_power_add;
              that.my_profit_list = res.data.data.my_profit_list;
              var profitDate = [];
              var profitVal =[];
              for (var i = 0; i < that.my_profit_list.length; i++) {
                profitVal.push(parseInt(that.my_profit_list[i].total_profit)); // 量
                //times 日期  把返回的日期放到times[]数组中
                profitDate.push(that.my_profit_list[i].create_date); //日期
              }
              that.profit_date = profitDate;
              that.profit_val = profitVal;
              that.drawChart(myChart)
              that.my_power_list = res.data.data.my_power_list;
              var powerDate = [];
              var powerVal =[];
              for (var i = 0; i < that.my_power_list.length; i++) {
                powerVal.push(parseInt(that.my_power_list[i].total_profit)); // 量
                //times 日期  把返回的日期放到times[]数组中
                powerDate.push(that.my_power_list[i].create_date); //日期
              }
              that.power_date = powerDate;
              that.power_val = powerVal;
              // console.log(that.power_date)
              that.drawChart2(myChart2)
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //我的收益图表
      drawChart(id) {
        var myChart = echarts.init(document.getElementById('myChart'));
        let that = this;
        // 指定图表的配置项和数据
        var option = {
          grid: {
            left: "20%",
            top: "20",
            height: "160",
            width: "76%"
          },
          textStyle: {
            color: "rgba(255,255,255,.6)"
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: "line",
              snap: true,
            }
          },
          xAxis: {
            type: "category",
            data: that.profit_date,
            axisLine: {
              onZero: false,
              lineStyle: {
                // show: false,
                color: "rgba(255,255,255,.6)"
              }
            },
            // axisTick: {//刻度线
            //   show: false,//去掉刻度线
            // },
          },
          yAxis: {
            type: "value",
            name: "",
            max: 1000,
            min: 0,
            nameLocation: "start",
            nameGap: 10,
            nameTextStyle: {
              padding: [-16, 100, 0, 0]
            },
            axisLine: {
              show: false,
              onZero: false,
              lineStyle: {
                color: "rgba(255,255,255,.6)"
              }
            },
            splitLine: {
              // show: false,
              lineStyle: {
                type: "solid",
                color: "rgba(255,255,255,.3)"
              }
            },
            axisLabel: {
              formatter: function(value, index) {
                return value.toFixed(4);
              }
            },
            axisTick: { //刻度线
              show: false, //去掉刻度线
            },
          },
          dataZoom: [{
            type: "inside",
            startValue: that.profit_date - 7 > 0 ? that.profit_date.length - 7 : 0,
            endValue: that.profit_date.length - 1
          }],
          series: [{
            data: that.profit_val,
            type: "bar",
            barMaxWidth: 30,
            lineStyle: {
              color: "#35A8FB"
            },
            itemStyle: {
              color: "#35A8FB"
            }
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.clear(option, true);
        myChart.setOption(option, true);
      },
      //我的算力图表
      drawChart2(id) {
       var myChart2 = echarts.init(document.getElementById('myChart2'));
       let that = this;
       // 指定图表的配置项和数据
       var option = {
         grid: {
           left: "20%",
           top: "20",
           height: "160",
           width: "76%"
         },
         textStyle: {
           color: "rgba(255,255,255,.6)"
         },
         tooltip: {
           trigger: 'axis',
           axisPointer: {
             type: "line",
             snap: true,
           }
         },
         xAxis: {
           type: "category",
           data: that.power_date,
           axisLine: {
             onZero: false,
             lineStyle: {
               // show: false,
               color: "rgba(255,255,255,.6)"
             }
           },
           // axisTick: {//刻度线
           //   show: false,//去掉刻度线
           // },
         },
         yAxis: {
           type: "value",
           name: "",
           max: 1000,
           min: 0,
           nameLocation: "start",
           nameGap: 10,
           nameTextStyle: {
             padding: [-16, 100, 0, 0]
           },
           axisLine: {
             show: false,
             onZero: false,
             lineStyle: {
               color: "rgba(255,255,255,.6)"
             }
           },
           splitLine: {
             // show: false,
             lineStyle: {
               type: "solid",
               color: "rgba(255,255,255,.3)"
             }
           },
           axisLabel: {
             formatter: function(value, index) {
               return value.toFixed(4);
             }
           },
           axisTick: { //刻度线
             show: false, //去掉刻度线
           },
         },
         dataZoom: [{
           type: "inside",
           startValue: that.power_date.length - 7 > 0 ? that.power_date.length - 7 : 0,
           endValue: that.power_date.length - 1
         }],
         series: [{
           data: that.power_val,
           type: "bar",
           barMaxWidth: 30,
           lineStyle: {
             color: "#35A8FB"
           },
           itemStyle: {
             color: "#35A8FB"
           }
         }]
       };

       // 使用刚指定的配置项和数据显示图表。
       myChart2.clear(option, true);
       myChart2.setOption(option, true);
     },
      goOre() {
        let that = this;
        that.$router.push({
          path: '/orePool'
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-hairline--bottom::after {
      border: none !important;
    }
    .content {
      padding: 0;
      overflow-y: scroll;
      height: calc(100% - 0.8rem);

      // margin-bottom: 1rem;
      .sele_mill {
        margin: 0.2rem 0;
        width: 100%;
        // padding-top: 0.12rem;
        background: #212548 !important;

        p {
          width: 100%;
          height: 0.88rem;
          line-height: 0.88rem;
          padding:0 6%;
          display: flex;
          justify-content: space-between;
          font-size: 0.28rem;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          span {
            display: block;
            width: 50%;
          }
        }
        p:nth-child(2){
          border: none;
        }

        .van-dropdown-menu {
          background: #212548 !important;
          height: 0.8rem !important;
        }

        /deep/ .van-dropdown-menu__title {
          color: rgba(254, 254, 254, 0.8) !important;
          font-size: 0.26rem;
        }

        /deep/ .van-popup {
          background: #212548 !important;
        }

        /deep/ .van-overlay {
          background-color: rgba(0, 0, 0, .8);
        }

        /deep/ .van-cell {
          color: rgba(254, 254, 254, 0.6) !important;
          border-radius: 0 !important;
          background: none !important;
        }

        /deep/ .van-cell:not(:last-child)::after {
          left: 0.1rem !important;
          transform: scaleY(.06);
        }
      }

      .mill_con {
        width: 100%;
        padding: 0 4%;


        .mill_info {
          display: flex;

          .mill_left {
            width: 50%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            border-right: 1px solid rgba(31, 36, 79, 1);

            p {
              font-size: 0.26rem;
              width: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 0.14rem 0;

              span:nth-child(1) {
                color: rgba(255, 255, 255, 0.46);
                font-size: 0.24rem;
              }

              span:nth-child(2) {
                color: #FFFFFF;
                font-size: 0.28rem;
                padding: 0.12rem 0;
              }
            }
          }

          .mill_right {
            width: 50%;
            border: none;

            div {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 0.14rem 0;

              span:nth-child(1) {
                color: rgba(167, 167, 167, 0.6);
                font-size: 0.24rem;
              }

              span:nth-child(2) {
                color: #FFFFFF;
                font-size: 0.28rem;
                padding: 0.06rem 0;
              }
            }
          }
        }
      }

      .d_chart {
        margin-top: 0.2rem;
        width: 100%;

        h4 {
          color: #fff;
          text-align: center;
          font-size: 0.28rem;
          margin: 0.14rem 0;
        }
      }
    }
  }
</style>
