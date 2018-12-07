<template>
    <div id="home">
        <h2 class="home">{{msg}}</h2>

        <hr>
        vuex在vue中的时用 ----{{this.$store.state.count}}
        <br>
        <button @click="changeCount()">点击改变vuex当中state中存放的数据</button>
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
    //引入vuex 
    import store from '../vuex/store.js'
    import Life from './Life.vue'
    export default {
        data() {
            return {
                msg: "这是home组件",
                flag: true,
                list: [
                    1111,
                    2222,
                    3333
                ]
            }
        },
        store,
        methods: {
            changeCount() {
                this.$store.commit('incCount');
            }
        },
        components: {
            Life
        },
        mounted() {
            //window.console.log(this.$route.params)

            //window.console.log(store)
        },
    }
</script>

<style scoped>
    .home {
        background: lightblue;
    }
</style>