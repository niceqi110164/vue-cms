<template>
  <div id="app">

    <router-link to="/home">Home</router-link>
    <router-link to="/news">News</router-link>
    
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
