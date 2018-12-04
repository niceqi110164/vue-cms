<template>
    <div id="home">
        <h2 class="home">{{msg}}</h2>

        <hr>

        <ul>
            <li v-for="(item, index) in list" :key="index">
                <router-link :to="'pcontent/'+index">{{item}}</router-link>
            </li>
        </ul>

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
                flag:true,
                list:[
                    1111,
                    2222,
                    3333
                ]
            }
        },
        methods:{

        },
        components:{
            Life
        },
        mounted() {
window.console.log(this.$route.params)
        },
    }
</script>

<style scoped>
    .home{
        background: lightblue;
    }
</style>

