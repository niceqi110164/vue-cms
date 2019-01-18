<template>
  <div class="bookTypeOption">
    <label class="radio-label">Book Type: </label>
    <el-select
      v-model="bookType"
      class="bookType-select"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: String,
      default: "xlsx"
    }
  },
  data() {
    return {
      options: ["xlsx", "csv", "txt"]
    };
  },
  computed: {
    /*
    当bookType不传值的时候是获取值
    当bookType(val)传值的时候是设置值 
    */
    bookType: {
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
.bookTypeOption {
  display: inline-block;
  .bookType-select {
    width: 120px;
  }
}
</style>
