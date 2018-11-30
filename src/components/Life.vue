<template>
    <div id="life">
        <h2>这是life 组件 ---- {{msg}}</h2>
        <br>
        <button @click="getMsg()">点击改变数据111111111112222222</button>
    </div>
</template>

<script>
    
    export default {
        data(){
            return {
                msg:"这是life组件的数据"
            }
        },
        methods:{
            getMsg(){
               
                this.msg = "这是life组件改变后的的数据";
            }
        },
        beforeCreate() {
            console.log("组件创建之前执行1")
        },
        created() {
            console.log("这是组件创建之后执行2")
        },
        beforeMount() {
            console.log("模板编译之前执行3")
        },
        mounted(){
            console.log("模板编译之后执行4")
        },
        beforeUpdate() {
            console.log("数据更新之前执行")
        },
        updated() {
            console.log("数据更新之后执行")
        },
        beforeDestroy() {
            console.log("实例销毁之前执行")  
        },
        destroyed(){
            console.log("实例销毁之后执行")
        }

    }
</script>  

<style >

</style>
