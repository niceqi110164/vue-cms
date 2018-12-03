<template>
   <div class="newscontent">
      <button @click="goBack()">返回</button>
      <h2>{{detailList.title}}</h2>
      <p v-html="detailList.content"></p>

   </div>
</template>

<script type="text/ecmascript-6">
   import Axios from 'axios'

   export default {
      props: {

      },
      data() {
         return {
            detailList: ''
         }
      },
      methods: {
         getDetailsData(id) {
            let api = "http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=" + id;
            Axios.get(api).then((response) => {
               window.console.log(response.data.result);
               this.detailList = response.data.result[0];
            }).catch((error) => {
               window.console.log(error)
            })

         },

         goBack() {
            window.history.length > 1 ?
               this.$router.go(-1) :
               this.$router.push('/')
         }
      },
      components: {

      },
      mounted() {
         //获取aid 
         //window.console.log(this.$route.params);
         let aid = this.$route.params.aid;
         this.getDetailsData(aid);
         //this.msg = this.$route.query 
      },
   }
</script>

<style scoped>
</style>