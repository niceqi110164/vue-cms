<template>
  <div class="sideBar">
    <h2>这是sideBar页面 ---{{msg}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  data() {
    return {
      msg: "sideBar里面的data数据"
    };
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
</style>
