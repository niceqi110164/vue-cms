<template>
  <div class="user">
    <h2>这是user.vue页面</h2>
    <!-- <ul>
      <li>
        <router-link to="/user/UserAdd">添加</router-link>
      </li>
      <li>
        <router-link to="/user/UserList">列表</router-link>
      </li>
    </ul>-->
    <div class="content">
      <router-view></router-view>
    </div>
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