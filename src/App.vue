<template>
  <div id="app">

    <Home></Home>
    <!-- <input type="text" v-model="msg" @keydown="doAdd($event)" data-aid = "123">
    <button @click="doAdd()">+增加</button>
    <br>
    <hr>
    <h2>在进行中</h2>
    <ul>
      <li v-for="(item, index) in list" :key="index" v-if="!item.checked">
        <input type="checkbox" v-model="item.checked" @change="saveData()">
        {{item.title}} ----
        <button @click="remove(index)">删除</button>
      </li>
    </ul>
    <hr>
    <hr>
    <br>
    <h2>已经完成</h2>
    <ul>
      <li v-for="(item, index) in list" :key="index" v-if="item.checked">
        <input type="checkbox" v-model="item.checked" @change="saveData()">
        {{item.title}} ----
        <button @click="remove(index)">删除</button>
      </li>
    </ul> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import storage from './model/storage.js';
import Home from './components/Home.vue';

export default {
  data() {
    return {
      msg: "",
      checkedMsg: false,
      list: []
    };
  },
  methods: {
    doAdd(e) {
      window.console.log(e);
      
      if (e.keyCode == "13") {
        if (this.msg == "") {
          alert("无输入");
          return false;
        } else {
          this.list.push({
            title: this.msg,
            checked: false
          });
          this.msg = "";
        }
      }
      //localStorage.setItem('list',JSON.stringify(this.list))
      storage.set("list",this.list);
    },
    remove(index) {
      this.list.splice(index, 1);
      //localStorage.setItem("list",JSON.stringify(this.list));
       storage.set("list",this.list);
    },

    saveData(){
      //localStorage.setItem("list",JSON.stringify(this.list));
       storage.set("list",this.list);
    }
  },
  name: "app",
  components: {
    // HelloWorld
    Home
  },
  mounted() {
    // let list = JSON.parse(localStorage.getItem("list"));
    // var list = JSON.parse(localStorage.getItem('list'));
    let list  = storage.get("list");
    if(list){
      this.list = list;
    }
  }
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
