<template>
  <div class="dashboard-editor-container">
    <!-- <h2>这是admin下面的index.vue</h2> -->
    <!-- github -->
    <githubCorner class="githubCorner"></githubCorner>
    <!-- 控制板 -->
    <PanelGroup @handleSetLineChartData="handleSetLineChartData"></PanelGroup>
    <!-- 线型图表 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <lineChart :chart-data="lineChartData"></lineChart>
    </el-row>
    <!-- 小图表 -->
    <el-row :gutter="32">
      <!-- 雷达图 -->
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <RaddarChart></RaddarChart>
        </div>
      </el-col>
      <!-- 饼状图 -->
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <PieChart></PieChart>
        </div>
      </el-col>
      <!-- 柱状图 -->
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <BarChart></BarChart>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <!-- table -->
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <TransactionTable />
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import githubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup.vue";
import LineChart from "./components/LineChart.vue";
import RaddarChart from "./components/RaddarChart.vue";
import PieChart from "./components/PieChart.vue";
import BarChart from "./components/BarChart.vue";
import TransactionTable from "./components/TransactionTable.vue";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  props: {},
  components: {
    githubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .githubCorner {
    position: absolute;
    top: 0px;
    right: 0px;
    border: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
