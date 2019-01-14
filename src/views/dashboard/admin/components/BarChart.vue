<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  >
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts"; //这里是你必须的，千万不能忘记！
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
const animationDuration = 6000;
export default {
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
      default: "330px"
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
    //就是整个实例都不能用了，要用必须重新init
    this.chart.dispose();
    this.chart = null;
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
    this.sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.drawGraph(); //执行方法
    },
    drawGraph() {
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "pageA",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [79, 52, 200, 334, 390, 330, 220],
            animationDuration
          },
          {
            name: "pageB",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [80, 52, 200, 334, 390, 330, 220],
            animationDuration
          },
          {
            name: "pageC",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [30, 52, 200, 334, 390, 330, 220],
            animationDuration
          }
        ]
      });
    }
  },
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
