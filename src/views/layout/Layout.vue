<template>
  <div class="app-wrapper">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div> -->
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { Navbar, Sidebar, AppMain, TagsView } from "./components";
//import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "Layout",
  data() {
    return {
      msg: "layout页面的数据"
    };
  },
  //mixins: [ResizeMixin],
  methods: {},
  components: {},
  computed: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
