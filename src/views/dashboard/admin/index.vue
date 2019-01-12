<template>
  <div class="dashboard-editor-container">
    <!-- <h2>这是admin下面的index.vue</h2> -->
    <!-- github -->
    <githubCorner class="githubCorner"></githubCorner>
    <!-- 控制板 -->
    <PanelGroup></PanelGroup>

    <el-row style="background:#fff;padding:16px 16xp 0;margin-bottom:32px;">
      <lineChart :chart-data="lineChartData"></lineChart>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import githubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup.vue";
import LineChart from "./components/LineChart.vue";

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
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
  },
  methods: {},
  components: { githubCorner, PanelGroup, LineChart }
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
}
</style>
