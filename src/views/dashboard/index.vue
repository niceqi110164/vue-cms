<template>
  <div class="dashboard-container">
    <!-- <h2>这是dashboard下面的index.vue</h2> -->
    <component :is="currentRole"></component>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import editorDashboard from "./editor";
export default {
  name: "Dashboard",
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: "adminDashboard"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    //组件创建之后执行
    if (this.roles.includes("/clipboard")) {
      this.currentRole = "editorDashboard";
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
