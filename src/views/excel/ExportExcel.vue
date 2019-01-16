<template>
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename"></FilenameOption>
      <AutoWidthOption v-model="autoWidth"></AutoWidthOption>
      <BookTypeOption v-model="bookType"></BookTypeOption>
      <!-- <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="promary"
        icon="document"
        @click="handleDownload"
      >
        {{$t('excel.export')}}Excel
      </el-button> -->
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left:15px;"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FilenameOption from "./components/FilenameOption.vue";
import AutoWidthOption from "./components/AutoWidthOption.vue";
import BookTypeOption from "./components/BookTypeOption.vue";
export default {
  name: "ExportExcel",
  props: {},
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      filename: "",
      autoWidth: true,
      bookType: "xlsx"
    };
  },
  methods: {}
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
