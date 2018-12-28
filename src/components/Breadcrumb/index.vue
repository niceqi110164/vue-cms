<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">
        <span
          v-if="item.redirect==='noredirect'||index==length.length-1"
          class="no-redirect"
        >{{ generateTitle(item.meta.title) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{generateTitle(item.meta.title)}}</a>
      </el-breadcrumb-item>
    </transition-group>-->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">活动管理</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
//import { generateTitle } from "@/utils/i18n";
//import pathToRegexp from "path-to-regexp";
export default {
  props: {},
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    //  $route() {
    //    this.getBreadcrumb();
    //  }
  },
  created() {
    //this.getBreadcrumb();
  },
  methods: {
    //  generateTitle,
    //  getBreadcrumb() {
    //    let matched = this.$route.matched.filters(item => {
    //      if (item.name) {
    //        return true;
    //      }
    //    });
    //    const first = matched[0];
    //    if (
    //      first &&
    //      first.name.trim().toLocaleLowerCase() !==
    //        "Dashboard".toLocaleLowerCase()
    //    ) {
    //      matched = [{ path: "/dashboard", meta: { title: "dashboard" } }].concat(
    //        matched
    //      );
    //    }
    //    this.levelList = matched;
    //  },
    //  pathCompile(path) {
    //    const { params } = this.$route;
    //    let toPath = pathToRegexp.compile(path);
    //    return toPath(params);
    //  },
    //  handleLink(item) {
    //    const { redirect, path } = item;
    //    if (redirect) {
    //      this.$router.push(redirect);
    //      return;
    //    }
    //    this.$router.push(this.pathCompile(path));
    //  }
  },
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
