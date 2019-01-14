<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  ></div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
const animationDuration = 3000;
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
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      sideBarElm: null
    };
  },
  mounted() {
    //初始化echarts实例
    this.initChart();
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      //为window对象添加resize事件
      window.addEventListener("resize", this.__resizeHandler);
    }
    //监听侧边栏
    this.sideBarElm = document.getElementsByClassName("sidebar-container")[0];
    this.sideBarElm &&
      this.sideBarElm.addEventListener(
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
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    initChart() {
      //window.console.log(this.$el);能获取到当前元素
      this.chart = echarts.init(this.$el, "macarons");
      //执行画图方法(传参)
      this.drawGraph();
    },
    drawGraph() {
      this.chart.setOption({
        //提示框组件。
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: "66%", //的半径
          center: ["50%", "42%"], //的中心（圆心）坐标，
          splitNumber: 8, //指示器轴的分割段数。
          splitArea: {
            areaStyle: {
              color: "rgba(127,95,132,.3)", //分隔区域颜色
              opacity: 1, //图形透明度。
              shadowBlur: 45, //图形阴影的模糊大小
              shadowColor: "rgba(0,0,0,.5)", //颜色
              shadowOffsetX: 0, //x轴偏移
              shadowOffsetY: 15 //y轴偏移
            }
          },
          //雷达图的指示器，
          indicator: [
            //name指示器名称。  max指示器的最大值
            { name: "Sales", max: 10000 },
            { name: "Administration", max: 20000 },
            { name: "Information Techology", max: 20000 },
            { name: "Customer Support", max: 20000 },
            { name: "Development", max: 20000 },
            { name: "Marketing", max: 20000 }
          ]
        },
        legend: {
          left: "center",
          bottom: "10",
          // //图例的数据数组
          data: ["Allocated Budget", "Expected Spending", "Actual Spending"]
        },
        series: [
          {
            type: "radar",
            symbolSize: 0, //标记的大小
            //区域填充样式。
            areaStyle: {
              shadowBlur: 13, //图形阴影的模糊大小
              shadowColor: "rgba(0,0,0,.2)", //阴影颜色。
              shadowOffsetX: 0, //阴影水平方向上的偏移距离。
              shadowOffsetY: 10, //阴影垂直方向上的偏移距离。
              opacity: 1 //图形透明度
            },
            data: [
              {
                value: [5000, 7000, 12000, 11000, 15000, 14000],
                name: "Allocated Budget"
              },
              {
                value: [4000, 9000, 15000, 15000, 13000, 11000],
                name: "Expected Spending"
              },
              {
                value: [5500, 11000, 12000, 15000, 12000, 12000],
                name: "Actual Spending"
              }
            ],
            //动画时长,支持回调函数
            animationDuration: animationDuration
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
