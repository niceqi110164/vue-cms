<template>
   <div class="user">
      这里是vuex当中state的数据查看是不是数据共享----{{this.$store.state.count}}
      <hr>
      
      <ul>
         <li>
            <router-link to='/user/userAdd'>添加用户</router-link>
         </li>
         <li>
            <router-link to='/user/userList'>用户列表</router-link>
         </li>
      </ul>
      <div class="content">
         <router-view></router-view>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">

import store from '../vuex/store.js'
   export default {
      props: {

      },
      data() {
         return {

         }
      },
      store,
      methods: {

      },
      components: {

      }
   }
</script>

<style scoped>
</style>