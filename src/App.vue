<template>
  <div id="app">

    <router-link to="/home">Home</router-link>
    <router-link to="/news">News</router-link>
    <router-link to="/user">User</router-link>
    <button @click="goHome()">js跳转到home</button>
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
//import storage from './model/storage.js';
//import Home from './components/Home.vue';

export default {
  data() {
    return {
      msg: "",
      checkedMsg: false,
      list: []
    };
  },
  methods: {
    goHome(){
      //编程式导航
      //this.$router.push({path:'/home'});

      //当想传递 home/参数的时候 路径要用name
      this.$router.push({ name: 'home', params: { userId: '123' } });
      // this.$route.params


      //当想get获取时要传入query  会在路径上显示
      //this.$router.push({path:'/home',query:{'aid':444}});
      

    }
  },
  components: {
    
  },
  mounted() {
   
    
  }
}
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
