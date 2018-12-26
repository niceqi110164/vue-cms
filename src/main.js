import Vue from 'vue'
import App from './App.vue'
//设置axios并配置全局使用
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios

//进度条nprogress 
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

//vue-resource的使用
import VueResource from 'vue-resource'
Vue.use(VueResource)

//4挂载到Vue实例上

import store from './vuex/store1.js'

import router from './router/router.js'

import './plugins/element.js'

Vue.config.productionTip = false


const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
//router
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) { //存在token
    //window.console.log(store.getters.token);
    if (to.path === '/login') { //当前路径是 login 就跳转到 '/'
      next({
        path: '/'
      });
      NProgress.done()
    } else {
      //判断当亲用户是否已拉取完user_info信息
      if (store.getters.roles.length === 0) { //没有拉取user_info信息
        //异步去获取用户信息
        store.dispatch('GetUserInfo').then((response) => {
          let roles = response.data.roles //['admin','edit']
          //异步的去添加路由
          store.dispatch('GenerateRoutes', {
            roles
          }).then(() => {
            window.console.log(store.getters.addRouters)

            router.addRoutes(store.getters.addRouters) //动态添加可访问路由表
            next()
          }).catch((err) => {
            window.console.log(err)
          })
        })
      } else { //已经拉取完user_info信息
        next()
      }
    }
  } else { // no token
    if (whiteList.indexOf(to.path) !== -1) { //存在whiteList中
      next()
    } else { //不存在whiteList中
      next('/login') // 重定向到login页面
      NProgress.done()
    }
  }
})


router.afterEach(() => {
  NProgress.done()
})


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')