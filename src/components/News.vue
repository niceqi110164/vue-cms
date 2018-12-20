<template>
  <div class="news">
    <h2>{{msg}}</h2>
    <hr>
    <ul>
      <li v-for="(item, index) in newsList" :key="index">
        <router-link :to="'newscontent/'+item.aid">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Axios from "axios";
import store from "../vuex/store1.js";
export default {
  props: {},
  store,
  data() {
    return {
      msg: "这是一个新闻组件",
      newsList: []
    };
  },
  methods: {
    getData() {
      let api =
        "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
      Axios.get(api)
        .then(response => {
          this.newsList = response.data.result;
          //把数据保存到vuex
          this.$store.commit("addList", response.data.result);
        })
        .catch(error => {
          window.console.log(error);
        });
    }
  },
  components: {},
  mounted() {
    let dataList = this.$store.state.list;
    window.console.log(dataList.length);
    if (dataList.length > 0) {
      this.newsList = dataList;
    } else {
      this.getData();
    }
  }
};
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}
</style>