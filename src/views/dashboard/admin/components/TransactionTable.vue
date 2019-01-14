<template>
  <el-table
    :data="list"
    style="width:100%;padding-top:15px;"
    stripe
  >
    <el-table-column
      label="Order_No"
      min-width="200"
    >
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column
      width="195"
      label="Price"
      algin="center"
    >
      <template slot-scope="scope">
        ¥{{ scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column
      label="Status"
      width="100"
      algin="center"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.status|statusFilter">{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
import { fetchList } from "@/api/transaction";
export default {
  props: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger"
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      //截取前30位
      return str.substring(0, 25);
    }
  },
  data() {
    return {
      list: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.slice(0, 8);
      });
    }
  },
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
