<template>
  <div style="display:inline-block;">
    <label class="radio-label">Filename: </label>
    <el-input
      v-model="filename"
      prefix-icon="el-icon-document"
      class="filename-input"
    ></el-input>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    filename: {
      get() {
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
.radio-label {
  padding-left: 0;
}
.filename-input {
  width: 340px;
}
</style>
