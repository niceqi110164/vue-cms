<template>
  <div class="dashboard-editor-container">
    <div
      class=""
      clearfix
    >
      <PanThumb
        :image="avatar"
        style="float:left;"
      > Your roles:
        <span
          v-for="item in roles"
          :key="item"
          class="pan-info-roles"
        >{{item}}</span>
      </PanThumb>
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
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
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
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}
.dashboard-editor-container {
  background-color: #e3e3e3;
  // min-height: 100vh;
  padding: 50px 60px 0px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>
