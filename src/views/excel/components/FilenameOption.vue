<template>
  <div class="filenameOption">
    <label class="radio-label">Filename: </label>
    <el-input
      placeholder="$t('ecxel.placehlder')"
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
      //默认值
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    /*
    当filename不传值的时候是获取值
    当filename(val)传值的时候是设置值 
    */
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
.filenameOption {
  display: inline-block;
  .radio-label {
    padding-left: 0;
  }
  .filename-input {
    width: 340px;
  }
}
</style>
