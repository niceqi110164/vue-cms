<template>
  <div class="dashboard-container">
    <h2>这是dashboard下面的index.vue</h2>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
// import adminDashboard from "./admin/index.vue";
// import editorDashboard from "./editor/index.vue";
export default {
  name: "Dashboard",
  //components: { adminDashboard, editorDashboard },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
</style>
