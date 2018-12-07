import Vue from 'vue'


//使用vue-router 在使用Vue时注意大小写
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//1 引入组件
import Home from '../components/Home.vue'
import News from '../components/News.vue'
import User from '../components/User.vue'
import UserAdd from '../components/User/UserAdd.vue'
import UserList from '../components/User/UserList.vue'
import Pcontent from '../components/Pcontent.vue'
import Newscontent from '../components/Newscontent.vue'
//2 配置路由
const routes = [{
      path: '/home',
      component: Home,
      name: 'home'
   },
   {
      path: '/news',
      component: News
   },
   {
      path: '/user',
      component: User,
      children: [{
            path: 'userList',
            component: UserList
         },
         {
            path: 'userAdd',
            component: UserAdd
         }
      ]
   },
   {
      path: '/newscontent/:aid',
      component: Newscontent
   },
   {
      path: '/pcontent/:aid',
      /*动态路由 */
      component: Pcontent
   },
   // {
   /**path: '*',重定向路由 */
   /**redirect:'/news'  重定向定向的是路由地址 */
   // }

]
//3 实例化 VueRouter
const router = new VueRouter({
   routes
})


export default router;