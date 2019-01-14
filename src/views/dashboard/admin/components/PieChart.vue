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
const animationDuration = 2600;
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
  mounted() {
    this.initChart();
    //页面调整执行函数
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    //为window添加 resize事件
    window.addEventListener("resize", this.__resizeHandler);
    //监听sedebar变化
    this.sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
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
  methods: {
    //sidebar调整函数
    sidebarResizeHandler(e) {
      //window.console.log(e);
      //监听事件的属性名为 width 时执行函数
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    //初始化chart
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.drawGraph(); //执行方法
    },
    //绘制方法
    drawGraph() {
      this.chart.setOption({
        //提示框组件。
        tooltip: {
          //触发类型
          //item:数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          //axis:坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          trigger: "item",
          //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
          //饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          //图例的数据数组
          data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"]
        },
        calculable: true,
        series: [
          {
            name: "WEEKLY WRITE ARTICLES", //系列名称，用于tooltip的显示
            type: "pie", //类型
            //radius:扇区圆心角展现数据的百分比，半径展现数据的大小。
            //area:所有扇区圆心角相同，仅通过半径展现数据大小。
            roseType: "radius",
            radius: [15, 95], //饼图的半径。可以为如下类型：
            center: ["50%", "38%"], //饼图的中心（圆心）坐标，
            //系列中的数据内容数组
            data: [
              { value: 320, name: "Industries" },
              { value: 240, name: "Technology" },
              { value: 149, name: "Forex" },
              { value: 100, name: "Gold" },
              { value: 59, name: "Forecasts" }
            ],
            animationEasing: "cubicInOut", //初始动画的缓动效果
            animationDuration: animationDuration //动画时长,支持回调函数
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
