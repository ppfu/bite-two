<template>
  <div class="public">
    <van-nav-bar title="货币趋势详情" left-arrow @click-left="back" />
    <div class="content">
      <div class="data_now">
        <div class="select">
          <span>当前价</span>
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="coinList" @change="seletChangeRe(value1)" />
          </van-dropdown-menu>
        </div>
        <div class="coin_data">
          <div class="data_left">
            <p><span>{{price_usd}}</span><a>$</a></p>
            <span>≈{{price_cny}}CNY</span>
          </div>
          <div class="data_right">
            <p><span>最高:</span><span>{{high}}$</span></p>
            <p><span>最低:</span><span>{{low}}$</span></p>
            <p v-if="change_type == 1"><span style="color: #0AB480;">涨幅:</span><span style="color: #0AB480;">{{coinInfo.change_hourly}}</span></p>
            <p v-if="change_type == 0"><span style="color: #D14B64;">涨幅:</span><span style="color: #D14B64;">{{coinInfo.change_hourly}}</span></p>
          </div>
        </div>
      </div>
      <div class="sele_time">
        <span  v-for="(item,index) in sele_time" :key="index" :class="deIndex == index ? 'active1':''"
        @click="designate(item,index)">{{item.name}}</span>
        <van-icon name="underway" />
      </div>
      <div class="chart_div">
        <!-- 为ECharts准备一个具备大小（宽高）的DOM -->
        <div id="kline" style="height:100%"></div>
      </div>
      <div class="data_btn">
        <span @click="goHuo">去火币交易</span>
        <span @click="gofiveCoin">去58Coin交易</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  import echarts from "echarts";
  export default {
    data() {
      return {
        active: 0,
        value1: this.$route.query.coin_index, //选中的虚拟币种
        k_type: 1,
        o_type: 1,
        t_info: {},
        b_list: [],
        s_list: [],
        l_list: [],
        b_total: 0,
        s_total: 0,
        change_type: 0,
        coinInfo: '', //虚拟币详情
        price_usd: '', //美元价格
        price_cny: '', //人民币价格
        high: '', //最高价
        low: '', //最低价
        coin_id: this.$route.query.coin_id, //虚拟币id
        coinList: [], //虚拟币列表
        deIndex:0,
        time_type:"0",
        sele_time:[
          {id:"1",name:"5分"},
          {id:"2",name:"15分"},
          {id:"3",name:"30分"},
          {id:"4",name:"1小时"},
          {id:"5",name:"6小时"},
          {id:"6",name:"1天"},
        ]
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getCoinList();
      that.getCoinInfoById();
      // that.getUserTeam()
      that.kline();

    },
    methods: {
      back() {
        this.$router.back();
      },
      //去火币
      goHuo() {
        window.location.href = 'https://www.hbg.com/zh-cn/';
      },
      //去58Coin
      gofiveCoin() {
        window.location.href = 'https://58coin-support.zendesk.com/hc/zh-cn';
      },
      //选择时间
      designate(item,i){
        let that = this;
        that.deIndex = i;
        var timeType = item.id;
        that.time_type = timeType;
        // console.log(that.time_type);
        that.kline();
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
      //单个虚拟币价格详情
      getCoinInfoById() {
        let that = this;
        that
          .$http({
            url: "Coin/getCoinInfoById",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.coin_id
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.coinInfo = res.data.data;
              that.price_usd = that.coinInfo.price_usd;
              that.price_cny = that.coinInfo.price_cny;
              that.high = that.coinInfo.high;
              that.low = that.coinInfo.low;
              that.change_type = that.coinInfo.change_type;
              that.price_usd = that.checkPrice(that.price_usd);
              that.price_cny = that.checkPrice(that.price_cny);
              that.high = that.checkPrice(that.high);
              that.low = that.checkPrice(that.low);
            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },
      //选择虚拟币
      seletChangeRe(i) {
        let that = this;
        that.coin_id = that.coinList[i].id;
        that.getCoinInfoById();
        that.kline();
      },
      //获取获取虚拟币列表
      getCoinList() {
        let that = this;
        that
          .$http({
            url: "Coin/getCoinInfo",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              //充值
              that.coinList = res.data.data;
              that.coinList = JSON.parse(JSON.stringify(that.coinList).replace(/coin_name/g, "text"));
              $.each(that.coinList, function(index, item) {
                item["value"] = index;
              });

            } else {
              that.$toast(res.data.msg);
            }

          })
          .catch(function(error) {

          });
      },
      //分时表
      timeline() {
        this.k_type = 0;
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        timelineAjax();

        function timelineAjax() {
          that
            .$http({
              url: "Coin/getCoinKline",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                id: that.coin_id,
                type:that.time_type,
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$vux.loading.hide();
                var time_line_data = that.splitData1(res.data.data);
                that.build_timeline(time_line_data);
              } else {
                that.$toast(res.data.msg);
              }
            }).catch(function(error) {

            });
          // 数据意义：开盘(open)，收盘(close)，最低(low)，最高(high) 量(vol)

          // that.$vux.loading.hide();
          // var time_line_data = that.splitData1(test_data);
          // that.build_timeline(time_line_data);
        }
      },
      // deKline() {
      //   this.k_type = this.s_type;
      // },
      //k线图表
      kline() {
        let that = this;
        // console.log(that.cur_id_a)
        //  console.log(that.cur_id_b)
        that.$vux.loading.show({
          text: ""
        });
        klineAjax();

        function klineAjax() {
          that
            .$http({
              url: "Coin/getCoinKline",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                id: that.coin_id,
                type:that.time_type,

              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                // console.log(res.data.data)
                that.$vux.loading.hide();
                var all_data = that.build_all_data(res.data.data);
                var data = that.splitData(all_data);
                // console.log(data)
                that.build_kline(data);
              } else {
                that.$toast(res.data.msg);
              }

            }).catch(function(error) {

            });
        }
      },
      /*****************计算macd**************macd*/
      //指标参数m_short,m_long  data数据
      build_diff(m_short, m_long, data) {
        var result = [];
        var pre_emashort = 0;
        var pre_emalong = 0;
        for (var i = 0; i < data.length; i++) {
          var ema_short = data[i][2]; //收盘价
          var ema_long = data[i][2]; //收盘价
          if (i != 0) {
            ema_short =
              (1.0 / m_short) * data[i][2] + (1 - 1.0 / m_short) * pre_emashort;
            ema_long =
              (1.0 / m_long) * data[i][2] + (1 - 1.0 / m_long) * pre_emalong;
          }
          pre_emashort = ema_short;
          // console.log(pre_emalong,pre_emashort)
          pre_emalong = ema_long;
          var diff = parseInt((ema_short - ema_long) * 100) / 100;
          result.push(diff);

        }
        return result;
        // console.log(result)
      },
      //指标3 长度
      build_dea(m, diff) {
        var result = [];
        var pre_ema_diff = 0;
        for (var i = 0; i < diff.length; i++) {
          var ema_diff = diff[i];
          if (i != 0) {
            ema_diff = (1.0 / m) * diff[i] + (1 - 1.0 / m) * pre_ema_diff;
          }
          pre_ema_diff = ema_diff;
          ema_diff = parseInt(ema_diff * 100) / 100;
          result.push(ema_diff);
        }
        return result;
      },
      //计算 MACD
      build_macd(data, diff, dea) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
          var macd = 2 * (diff[i] - dea[i]);
          macd = parseInt(macd * 100) / 100;
          result.push(macd);
        }
        return result;
      },
      /*****************计算macd***************/
      build_all_data(res) {
        let that = this;
        var line_data = [];
        for (var i = 0; i < res.length; i++) {
          //数据模型 time0 open1 close2 min3 max4 vol5
          //var time = timestampToTime(res[i].Date);
          var time = res[i][0];
          var line_arr = [
            time,
            res[i][1],
            res[i][2],
            res[i][3],
            res[i][4],
            res[i][5]
          ];
          line_data.push(line_arr);
        }
        // console.log(line_data)
        var diff = that.build_diff(12, 26, line_data);
        var dea = that.build_dea(9, diff);
        var macd = that.build_macd(line_data, diff, dea);
        var all_data = [];
        for (var i = 0; i < line_data.length; i++) {
          //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
          var arr = [
            line_data[i][0],
            line_data[i][1],
            line_data[i][2],
            line_data[i][3],
            line_data[i][4],
            line_data[i][5],
            macd[i],
            diff[i],
            dea[i]
          ];
          all_data.push(arr);
        }
        return all_data;
      },
      //数组处理  //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
      splitData(rawData) {
        let that = this;
        var type = Number(that.s_type);
        var datas = [];
        var times = [];
        var vols = [];
        var macds = [];
        var difs = [];
        var deas = [];
        for (var i = 0; i < rawData.length; i++) {
          datas.push(rawData[i]); //除了日期全部数据
          vols.push(parseInt(rawData[i][5])); // 量
          macds.push(rawData[i][6]);
          difs.push(rawData[i][7]);
          deas.push(rawData[i][8]);
          //splice 返回每组数组中被删除的第一项，即返回数组中被删除的日期
          //alert(rawData[i].splice(0, 1)[0]);
          //times 日期  把返回的日期放到times[]数组中
          times.push(rawData[i].splice(0, 1)[0]); //日期
        }
        // if (type !== 1 && type !== 2 && type !== 3) {
        //   var time1 = [];
        //   $.each(times, function(i, item) {
        //     var arr = item.split(" ");
        //     time1.push(arr[1]);
        //   });
        //   times = time1;
        // }
        return {
          datas: datas, //数组中的数据 y轴对应的数据
          times: times, //数组中的日期 x轴对应的日期
          vols: vols,
          macds: macds,
          difs: difs,
          deas: deas
        };
      },

      //MA计算公式  //计算MA平均线，N日移动平均线=N日收盘价之和/N  dayCount要计算的天数(5,10,20,30)
      calculateMA(dayCount, data) {
        var result = [];

        for (var i = 0, len = data.times.length; i < len; i++) {
          if (i < dayCount) {
            result.push("-");
            continue; //结束单次循环，即不输出本次结果
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            //前5天收盘价总和
            sum += parseFloat(data.datas[i - j][1]);
          }

          result.push((sum / dayCount).toFixed(4));
        }
        return result;
      },

      build_kline(data) {
        let that = this;
        var option = {
          backgroundColor: "transparent", //全图默认背景 设置为透明的
          tooltip: { //提示框
            show: true,
            trigger: "axis", //触发类型：坐标轴触发
            axisPointer: { //坐标轴指示器配置项
              type: "cross", //指示器类型，十字准星
              lineStyle: { //lineStyle设置直线指示器
                type: "dashed",
                color: "#9394a3"
              },
              crossStyle: { //crossStyle设置十字准星指示器
                type: "dashed",
                color: "#9394a3"
              },
              label: { //标注的文本 背景
                show: true,
                precision: 2,
                backgroundColor: "#585858"
              }
            },
            textStyle: { //文本样式
              color: "white",
              fontSize: "12"
            },
            backgroundColor: "transparent", //
            showContent: true,
            position: [0, 0], //提示框位置
            formatter: function(params) {
              //seriesIndex 系列图表索引
              if (params[0].seriesIndex == 0) {
                return (
                  "时间" +
                  params[0].name +
                  "&nbsp;&nbsp;&nbsp;" +
                  "量" +
                  params[0].data[5] +
                  "<br/>" +
                  "开" +
                  params[0].data[1] +
                  " &nbsp;&nbsp;" +
                  "高" +
                  params[0].data[4] +
                  " &nbsp;&nbsp;" +
                  "低" +
                  params[0].data[3] +
                  " &nbsp;&nbsp;" +
                  "收" +
                  params[0].data[2] +
                  "<br/>"
                );
              } else {
                return (
                  "时间" +
                  params[1].name +
                  "&nbsp;&nbsp;&nbsp;" +
                  "量" +
                  params[1].data[5] +
                  "<br/>" +
                  "开" +
                  params[1].data[1] +
                  " &nbsp;&nbsp;" +
                  "高" +
                  params[1].data[4] +
                  " &nbsp;&nbsp;" +
                  "低" +
                  params[1].data[3] +
                  " &nbsp;&nbsp;" +
                  "收" +
                  params[1].data[2] +
                  "<br/>"
                );
              }
            },
            crossStyle: {
              opacity: 1
            }
          },
          axisPointer: { //坐标轴指示器配置项。
            link: {
              xAxisIndex: "all"
            }
          },
          grid: [ //直角坐标系
            {
              left: "5%",
              right: "50",
              height: "58%",
              top: "10px"
            },
            {
              left: "5%",
              right: "50",
              top: "66%",
              height: "26%"
            }
          ],
          xAxis: [ //横坐标
            //第一个图表配置
            {
              type: "category", //坐标轴类型，类目轴
              data: data.times, //日期
              scale: true, //只在数字轴中有效
              boundaryGap: true, //刻度作为分割线，标签和数据点会在两个刻度上
              axisLine: { //坐标轴轴线相关设置。
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,0.7)"
                }
              },
              splitLine: { //是否显示坐标轴轴线 (与坐标刻度垂直的线)
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: false
              },
              axisTick: { //坐标刻度
                show: true
              },
              splitNumber: 20, //坐标轴的分割段数，预估值，在类目轴中无效
              min: "dataMin", //特殊值，数轴上的最小值作为最小刻度
              max: "dataMax", //特殊值，数轴上的最大值作为最大刻度
              axisPointer: {
                label: {
                  show: true
                }
              }
            },

            //第二个图表横坐标配置
            {
              type: "category",
              gridIndex: 1,
              boundaryGap: true,
              data: data.times,
              axisLabel: {
                show: true
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              axisPointer: {
                label: {
                  show: true
                }
              },
              axisTick: {
                show: true
              }
            }
          ],

          yAxis: [ //y坐标
            //第一个图表
            {
              scale: true,
              position: "right",
              boundaryGap: true,
              splitArea: {
                show: false
              },
              axisLine: { // 轴线样式
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              splitLine: { //是否显示坐标轴轴线 (与坐标刻度垂直的线)
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              }
            },
            //第二个表
            {
              gridIndex: 1,
              splitNumber: 3, //坐标轴的分割段数，预估值，在类目轴中无效
              position: "right",
              boundaryGap: true,
              axisLine: {
                onZero: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: true
              }
            }
          ],
          dataZoom: [{
            type: "inside", // 这个dataZoom组件，默认控制x轴。
            xAxisIndex: [0, 1], // 表示这个 dataZoom 组件控制 第一个 和 第二个 xAxis
            startValue: data.times.length > 30 ? data.times.length - 30 : 0, //左边开始的数据
            endValue: data.times.length - 1 //右边结束的数据
          }],
          series: [ //y轴数据
            {
              name: "K线周期图表(matols.com)", //（第一个图表）
              type: "candlestick", //k线图
              data: data.datas, //数据
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,0,0,.3)", //是否显示坐标轴轴线 (与坐标刻度垂直的线)
                  type: "dashed"
                }
              },
              itemStyle: { //表内多边形设置样式
                normal: {
                  color: "#d40469",
                  color0: "#01b782",
                  borderColor: "#d40469",
                  borderColor0: "#01b782",
                  opacity: 1
                }
              }
            },
            {
              name: "MA5", //5日移动平均线，指最近五个交易日股票收盘价的平均价。
              type: "line",
              data: that.calculateMA(5, data),
              smooth: true, //平滑曲线显示，smooth为true时lineStyle不支持虚线
              symbol: "none", //标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
              hoverAnimation: false,
              showSymbol: false,
              showAllSymbol: false,
              lineStyle: {
                type: "solid"
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              itemStyle: {
                type: "solid"
              }
            },
            {
              name: "Volumn", //第二个图表
              type: "bar",
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: data.vols,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {

                    // console.log(data.datas)

                    var colorList;
                    if (data.datas.length <= 1) {
                      colorList = "#01b782";
                      return colorList;
                    } else {
                      if (params.dataIndex == 0) {
                        if (data.datas[1][1] > data.datas[0][1]) {
                          colorList = "#01b782";
                        } else {
                          colorList = "#d40469";
                        }
                        return colorList;
                      }
                      if (params.dataIndex != 0) {
                        if (
                          data.datas[params.dataIndex][1] >
                          data.datas[params.dataIndex - 1][1]
                        ) {
                          colorList = "#d40469";
                        } else {
                          colorList = "#01b782";
                        }
                        return colorList;
                      }
                    }

                  }
                }
              }
            }
          ]
        };
        var myChart = echarts.init(document.getElementById("kline")); //初始化图表
        myChart.clear(option);
        myChart.setOption(option, true);
      },

      //数组处理
      splitData1(rawData) {
        var times = [];
        var price = [];
        var vols = [];
        var datas = [];
        for (var i = 0; i < rawData.length; i++) {
          datas.push(rawData[i]);
          price.push(parseFloat(rawData[i].close));
          vols.push(parseInt(rawData[i].vol));
          times.push(rawData[i].time.split(" ")[1]);
        }
        return {
          datas: datas,
          times: times,
          price: price,
          vols: vols
        };
      },
      build_timeline(data) {
        let that = this;
        var option = {
          animation: false,
          tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "cross",
              lineStyle: {
                type: "dashed",
                color: "#9394a3"
              },
              crossStyle: {
                type: "dashed",
                color: "#9394a3"
              },
              label: {
                show: true,
                precision: 2,
                backgroundColor: "#585858"
              }
            },
            textStyle: {
              color: "white",
              fontSize: "12"
            },
            backgroundColor: "transparent",
            showContent: true,
            position: [0, 0],
            formatter: function(params) {
              var time = params[0].name;
              var price = params[1].value;
              var vols = params[0].value;
              return (
                "时间" +
                time +
                "&nbsp;&nbsp;" +
                "价格" +
                price +
                "<br>" +
                "量" +
                vols
              );
            },
            crossStyle: {
              opacity: 1
            }
          },
          axisPointer: {
            link: {
              xAxisIndex: "all"
            }
          },
          grid: [{
              left: "20%",
              right: "50",
              height: "58%",
              top: "20"
            },
            {
              left: "4%",
              right: "50",
              top: "62%",
              height: "26%"
            }
          ],
          xAxis: [{
              type: "category",
              data: data.times,
              scale: true,
              boundaryGap: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.4)"
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitNumber: 20,
              min: "dataMin",
              max: "dataMax",
              axisPointer: {
                label: {
                  show: false
                }
              }
            },
            {
              type: "category",
              gridIndex: 1,
              boundaryGap: true,
              data: data.times,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              axisLabel: {
                show: true
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              }
            }
          ],
          yAxis: [{
              scale: true,
              position: "right",
              boundaryGap: true,
              splitArea: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              }
            },
            {
              gridIndex: 1,
              splitNumber: 3,
              position: "right",
              boundaryGap: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: true
              }
            }
          ],
          dataZoom: [{
            type: "inside",
            xAxisIndex: [0, 1],
            startValue: data.times.length > 30 ? data.times.length - 30 : 0,
            endValue: data.times.length - 1
          }],
          series: [{
              name: "price",
              type: "line",
              smooth: true,
              data: data.price,
              hoverAnimation: false,
              showSymbol: false,
              showAllSymbol: false,
              itemStyle: {
                normal: {
                  color: "#ccc"
                }
              },
              areaStyle: {
                //区域填充样式
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: "rgba(255,255,255,.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255,.2)"
                      }
                    ],
                    globaCoord: false
                  }
                }
              }
            },
            {
              name: "Volumn",
              type: "bar",
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: data.vols,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList;
                    if (params.dataIndex == 0) {
                      if (data.datas[1].close > data.datas[0].close) {
                        colorList = "#01b782";
                      } else {
                        colorList = "#d40469";
                      }
                    }
                    if (params.dataIndex != 0) {
                      if (
                        data.datas[params.dataIndex].close >
                        data.datas[params.dataIndex - 1].close
                      ) {
                        colorList = "#d40469";
                      } else {
                        colorList = "#01b782";
                      }
                    }
                    return colorList;
                  }
                }
              }
            }
          ]
        };
        var myChart = echarts.init(document.getElementById("kline"));
        myChart.clear(option);
        myChart.setOption(option, true);
      }

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      font-family: PingFang SC;

      // height: 100vh;
      .data_now {
        margin-top: 0.28rem;

        .select {
          display: flex;
          align-items: center;

          span {
            font-family: PingFang SC;
            color: rgba(96, 112, 138, 1);
            font-size: 0.26rem;
            padding-right: 0.12rem;
          }

          .van-dropdown-menu {
            background: #212548 !important;
            height: 0.6rem !important;
            width: 40%;
            border-radius: 0.08rem;
          }

          /deep/ .van-dropdown-menu__title {
            color: #7883A5 !important;
            font-size: 0.26rem;
          }

          /deep/ .van-popup {
            background: #212548 !important;
            width: 36.6%;
            border-radius: 0.12rem;
            left: 16%;
          }

          /deep/ .van-overlay {
            display: none;
            background-color: rgba(0, 0, 0, .8);
          }

          /deep/ .van-cell {
            color: #7883A5;
            border-radius: 0 !important;
            background: none !important;
            padding: 0.12rem 0.15rem !important;
            font-size: 0.26rem !important;
          }

          /deep/ .van-cell:not(:last-child)::after {
            left: 0.1rem !important;
            transform: scaleY(.2);
          }
        }

        .coin_data {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.26rem;

          .data_left {
            width: 40%;
            font-family: PingFang SC;
            color: rgba(10, 180, 128, 1);
            // margin-left: 0.2rem;

            p {
              span {
                font-size: 0.46rem;
                font-weight: normal;
              }

              a {
                font-size: 0.26rem;
                padding-left: 0.06rem;
              }
            }

            span {
              font-size: 0.26rem;
            }
          }

          .data_right {
            width: 60%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            p {
              width: 50%;
              font-size: 0.26rem;
              margin: 0.12rem 0;

              // text-align: right;
              span:nth-child(1) {
                color: #60708A;
              }

              span:nth-child(2) {
                color: #C0CFFA;
                padding-left: 0.08rem;
              }
            }
          }
        }

      }
      .sele_time{
        padding-top: 0.14rem;
        display: flex;
        align-items: center;
         span{
          display: inline-block;
          padding: 0 0.18rem;
          color: #7883A5;
          font-size: 0.28rem;
        }
        span.active1{
          color: #35A8FB;
        }
       /deep/ .van-icon{
          font-size: 0.36rem;
          color: #85C3F5;
          padding: 0 0.1rem;
          // padding-top: 0.06rem;
        }
        }
      .chart_div {
        margin-top: 0.08rem;
        height: 8.6rem;
        overflow-y: scroll;

      }

      .data_btn {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.88rem;
        display: flex;
        justify-content: space-between;

        span {
          display: inline-block;
          width: 50%;
          height: 0.88rem;
          line-height: 0.88rem;
          text-align: center;
          font-size: 0.30rem;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: #0AB480;
        }

        span:nth-child(2) {
          background: #35A8FB;
        }

      }
    }
  }
</style>
