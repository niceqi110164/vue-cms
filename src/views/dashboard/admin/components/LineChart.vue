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
    //初始化echarts
    initChart() {
      //传入 DOM
      this.chart = echarts.init(
        document.getElementsByClassName("chart")[0], //DOM对象
        "macarons"
      );
      //执行方法(传入数据)
      this.drawGraph(this.chartData);
    },
    // 绘图
    drawGraph({ expectedData, actualData } = {}) {
      this.chart.setOption({
        /**标题 
        title: {
          text: "此处为标题",
          subtext: "副标题",
          x: "center"
        },*/
        //坐标系x轴
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false, //数据是否贴在坐标轴两侧
          axisTick: {
            //x轴是否显示刻度
            show: false
          }
        },
        //直角坐标系内绘图网格
        grid: {
          left: 10, // 组件离容器左侧的距离。
          right: 10, //组件离容器右侧的距离。
          bottom: 20, //组件离容器下侧的距离。
          top: 30, // 组件离容器上侧的距离。
          containLabel: true //区域是否包含坐标轴的刻度标签。
        },
        //提示框组件。
        tooltip: {
          trigger: "axis", //触发类型。 x轴
          //坐标轴指示器配置项
          axisPointer: {
            type: "cross" //设置 tooltip.axisPointer.type 为 'cross' 时会自动显示 axisPointer 的 label。
          },
          // 设置上下的内边距为 5，左右的内边距为 10
          padding: [5, 10]
        },
        //坐标系y轴
        yAxis: {
          //y轴是否显示刻度
          axisTick: {
            show: false
          }
        },
        legend: {
          //图例的数据数组
          data: ["expected", "actual"]
        },
        series: [
          {
            name: "expected", //系列名称，用于tooltip的显示
            itemStyle: {
              normal: {
                color: "#FF005A",
                //线条样式。
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true, //是否平滑曲线显示。
            type: "line", //系列列表。每个系列通过 type 决定自己的图表类型
            data: expectedData, //系列中的数据内容数组。数组项通常为具体的数据项。
            animationDuration: 2800, //初始动画的时长，支持回调函数
            animationEasing: "cubicInOut" //初始动画的缓动效果
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
                //区域填充样式。
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