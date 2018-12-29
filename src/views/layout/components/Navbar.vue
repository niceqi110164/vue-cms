<template>
  <div class="navbar">
    <Hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    ></Hamburger>
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: { Hamburger, Breadcrumb },
  props: {},
  data() {
    return {};
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    }
  },
  computed: {
    //获取store => app 里面的state
    ...mapGetters(["sidebar", "name", "avatar", "device"])
  }
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
