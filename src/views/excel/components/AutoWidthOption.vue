<template>
  <div class="autoWidthOption">
    <label class="radio-label">Cell Auto-Width: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio
        :label="true"
        border
      >True</el-radio>
      <el-radio
        :label="false"
        border
      >False</el-radio>
    </el-radio-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {
    /* 
      当autoWidth不传值的时候是获取 
      当autoWidth(val)传值的时候是设置
    */
    autoWidth: {
      get() {
        //window.console.log(this.value);
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {},
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.autoWidthOption {
  display: inline-block;
}
</style>
