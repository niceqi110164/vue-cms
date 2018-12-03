import Vue from 'vue'
import App from './App.vue'

//vue-resource的使用
import VueResource from 'vue-resource'
Vue.use(VueResource)

//使用vue-router 在使用Vue时注意大小写
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//1 引入组件
import Home from './components/Home.vue'
import News from './components/News.vue'
//2 配置路由
const routes = [{
    path: '/home',
    component: Home
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '*',  /**重定向路由 */
    redirect:'/news'  /**重定向定向的是路由地址 */
  }

]
//3 实例化 VueRouter
const router = new VueRouter({
  routes
})

//4挂载到Vue实例上

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
