<template>
  <div id="home">
    <h2 class="home">{{msg}}</h2>
    <hr>
    vuex在vue中的时用 ----{{this.$store.state.count}}
    <br>
    <button @click="changeCount()">点击改变vuex当中state中存放的数据</button>
    <hr>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="'pcontent/'+index">{{item}}</router-link>
      </li>
    </ul>

    <Life v-if="flag"></Life>

    <button @click="flag = !flag">点击销毁life组件</button>

    <div @click="pop1()">
      <a href="http://www.baidu.com" @click.self.prevent="pop2()">
        <div @click="pop3()">333333</div>
      </a>
    </div>
    <h3>{{this.obj.data}}</h3>
    <input type="text" v-model="question">
    <p>{{answer}}</p>
    <h3>{{this.$store.state.loginForm}}++++++++</h3>

    <button @click="getData3()">点击axios获取数据</button>
    <h3>这个是vuex中的数据{{this.$store.state.list}}</h3>
    <h3>========={{this.$store.state.user3.userName}}</h3>
  </div>
</template>

<script>
//引入vuex
import store from "../vuex/store1.js";
import Life from "./Life.vue";
//import { postRequest } from "../model/request.js";
//import { loginByUsername } from "../api/login.js";
import server from "../utils/request.js";
export default {
  data() {
    return {
      msg: "这是home组件",
      flag: true,
      question: "",
      answer: "1111",
      list: [1111, 2222, 3333],
      obj: ""
    };
  },
  watch: {
    question() {
      this.answer = "waiting for you to stop trying... ";
      this.other();
    }
  },
  store,
  methods: {
    getAnswer() {
      if (this.answer.indexOf("?") === -1) {
        this.answer = "Questions usually contain a question mark. ;-)";
      }
      this.answer = "thinking...";
    },
    changeCount() {
      this.$store.commit("incCount");
    },
    getData3() {
      this.getData1("xiaoqi", "123456")
        .then(response => {
          window.console.log(response);
          this.obj = response;
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    getData1(username, password) {
      //const url = "/doPost";
      const data = {
        username: username,
        password: password
      };
      // 这个是直接调用axios
      return server({
        url: "http://127.0.0.1:8003/api/doPost",
        //url: 'api',
        method: "post",
        data
      });
    },
    getData() {
      return new Promise((resolve, reject) => {
        let api =
          "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
        this.$axios
          .get(api)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  components: {
    Life
  },
  mounted() {
    //window.console.log(this.$route.params)
    //window.console.log(store)
    //this.getData3();
  }
};
</script>

<style scoped>
.home {
  background: lightblue;
}
</style>