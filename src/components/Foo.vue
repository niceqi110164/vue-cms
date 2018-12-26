<template>
  <div class="foo">
    <h2>这是Foo页面----{{msg}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  data() {
    return {
      msg: "这里是data里面的数据"
    };
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
</style>
