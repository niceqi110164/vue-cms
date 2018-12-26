<template>
  <div class="article">
    <h2>这是article页面-----{{msg}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  data() {
    return {
      msg: "这是article里面data下的数据"
    };
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
</style>
