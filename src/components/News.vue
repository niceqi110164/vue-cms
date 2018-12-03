<template>
   <div class="news">
      <h2>{{msg}}</h2>
      <hr>
      <ul>
         <li v-for="(item, index) in newsList" :key="index">
            <router-link :to="'newscontent/'+item.aid">{{item.title}}</router-link>
         </li>
      </ul>
   </div>
</template>

<script type="text/ecmascript-6">

   import Axios from 'axios'

   export default {
      props: {

      },
      data() {
         return {
            msg:"这是一个新闻组件",
            newsList:[]
         }
      },
      methods:{
         getData(){
let api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
            Axios.get(api).then((response)=>{
               this.newsList = response.data.result;
            }).catch((error)=>{
               window.console.log(error)
            })
         }
      },
      components: {

      },
      mounted() {
         this.getData();
      },
   }
</script>

<style scoped>
   li{
      list-style:none;
   }
</style>
