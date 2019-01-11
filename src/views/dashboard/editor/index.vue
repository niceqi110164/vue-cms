<template>
  <div class="dashboard-editor-container">
    <div
      class=""
      clearfix
    >
      <githubCorner style="position:absolute;top:0px;right:0;border:0;"></githubCorner>
      <div class="info-container">
        <span class="display_name">{{name}}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
      </div>
    </div>

    <div>
      <img
        :src="emptyGif"
        class="emptyGif"
        alt=""
      >
    </div>
    <h2>这是editor下面的index.vue</h2>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import PanThumb from "@//components/PanThumb";
import githubCorner from "@/components/GithubCorner";
export default {
  name: "DashboardEditor",
  props: {},
  data() {
    return {
      emptyGif:
        "https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  methods: {},
  components: { PanThumb, githubCorner }
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  // min-height: 100vh;
  padding: 50px 60px 0px;
}
</style>
