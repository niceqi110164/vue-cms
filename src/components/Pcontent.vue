<template>
   <div class="pcontent">
      {{msg}}
   </div>
</template>

<script type="text/ecmascript-6">

   export default {
      props: {

      },
      data() {
         return {
            msg:"这是Pcontent页面"
         }
      },
      methods:{

      },
      components: {

      },
      mounted() {
         window.console.log(this.$route.params);
      },
   }
</script>

<style scoped>
</style>
