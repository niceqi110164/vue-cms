<template>
  <div>
    <h2>sss{{this.chartData}}</h2>
    <div
      :class="className"
      :style="{height:height,width:width}"
    >
    </div>
  </div>

</template>

<script>
import echarts from "echarts"; //这里是你必须的，千万不能忘记！
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
export default {
  name: "Chart",
  data() {
    return {
      // 初始化空对象
      chart: null,
      sidebarElm: null
    };
  },
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    //调整大小
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  computed: {},
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.drawGraph(val);
      }
    }
  },
  mounted() {
    //  this.$nextTick(function() {
    //    this.drawGraph("main");
    //  });
    //页面加载时执行
    this.initChart();
    //判断autoResize是存在
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      //window.console.log(this.__resizeHandler);
      window.addEventListener("resize", this.__resizeHandler);
    }
    //监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    //为sidebar添加 transitionend事件
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
  },
  beforeDestroy() {
    //实例销毁之前执行
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      //移除window的resiz事件
      window.removeEventListener("resize", this.__resizeHandler);
    }
    //移除sedebar监听事件
    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //sidebar调整函数
    sidebarResizeHandler(e) {
      //window.console.log(e);
      //监听事件的属性名为 width 时执行函数
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    //初始化echarts
    initChart() {
      //传入 DOM
      this.chart = echarts.init(
        document.getElementsByClassName("chart")[0], //DOM对象
        "macarons"
      );
      //执行方法
      this.drawGraph(this.chartData);
    },
    // 绘图
    drawGraph({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ["expected", "actual"]
        },
        series: [
          {
            name: "expected",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "actual",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
    }
  }
};
</script>