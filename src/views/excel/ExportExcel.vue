<template>
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename"></FilenameOption>
      <AutoWidthOption v-model="autoWidth"></AutoWidthOption>
      <BookTypeOption v-model="bookType"></BookTypeOption>
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="promary"
        icon="document"
        @click="handleDownload"
      >
        <!-- {{ $t('excel.export') }}  -->
        Excel
      </el-button>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left:15px;"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="Id"
        width="95"
      >
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>

      <el-table-column
        label="Author"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag>{{scope.row.author}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="Reading"
        width="115"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>

      <el-table-column
        label="Date"
        width="220"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"> </i>
          <span> {{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";

import FilenameOption from "./components/FilenameOption.vue";
import AutoWidthOption from "./components/AutoWidthOption.vue";
import BookTypeOption from "./components/BookTypeOption.vue";
export default {
  name: "ExportExcel",
  props: {},
  filters: {
    parseTime
  },
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      filename: "", //文件名
      autoWidth: true, //自适应宽度
      bookType: "xlsx", //类型
      downloadLoading: false,
      listLoading: true,
      list: null
    };
  },
  created() {
    //vue实例创建完成之后调用
    this.fetchData();
  },
  methods: {
    //获取article数据
    fetchData() {
      this.listLoading = true;
      fetchList().then(response => {
        window.console.log(response.data);
        this.list = response.data;
        this.listLoading = false;
      });
    },
    //导出函数
    handleDownload() {
      window.console.log("进入");
      //this.downloadLoading = true;
      // import('@/vendor/Export2Excel') 返回的是一个 Promise 对象
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
        const filterVal = [
          "id",
          "title",
          "author",
          "pageviews",
          "display_time"
        ];
        const list = this.list;
        //filterVal:数组   list:数组
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        //this.downloadLoading = false;
      });
    },
    //格式化数据
    // 洗数据
    // 因为导出为 excel 的数据，必须是二维数组，this.list的每一项都是对象，因此，每一项必须转成数组
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>

<style rel='stylesheet/scss' lang='scss' >
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
