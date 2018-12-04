<template>
   <div class="user">
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
   export default {
      props: {

      },
      data() {
         return {

         }
      },
      methods: {

      },
      components: {

      }
   }
</script>

<style scoped>
</style>