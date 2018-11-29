<template>
    <div id="home">
        <h2 class="home">{{msg}}</h2>

        <Life v-if="flag"></Life>

        <button @click="flag = !flag">点击销毁life组件</button>
    </div>
</template>

<script>
    import Life from './Life.vue'
    export default {
        data(){
            return {
                msg:"这是home组件",
                flag:true
            }
        },
        methods:{

        },
        components:{
            Life
        }
    }
</script>

<style scoped>
    .home{
        background: lightblue;
    }
</style>

