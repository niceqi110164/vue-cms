<template>
  <div class="user">
    <ul>
      <li>
        <router-link to="/user/userAdd">添加用户</router-link>
      </li>
      <li>
        <router-link to="/user/userList">用户列表</router-link>
      </li>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>

    <button @click="setCookie()">点击按钮</button>
    
    <button @click="getCookie('name')">点击按钮</button>
  </div>
</template>

<script type="text/ecmascript-6">
import Cookie from "js-cookie";
export default {
  props: {},
  data() {
    return {};
  },
  //store,
  methods: {
    setCookie() {
      Cookie.set("name", "张三");
    },
    getCookie(val) {
      let value = Cookie.get(val);
      window.console.log(value);
    }
  },
  components: {}
};
</script>

<style scoped>
</style>