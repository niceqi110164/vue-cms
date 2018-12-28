import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
   Message
} from 'element-ui'
import {
   getToken
} from '@/utils/auth' // 验权


const whiteList = ['/login', '/auth-redirect'] // 不重定向白名单
//router
router.beforeEach((to, from, next) => {
   NProgress.start()
   if (getToken()) { //存在token
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
                  store.dispatch('FedLogOut').then(() => {
                     Message.error(err || 'Verification failed, please login again')
                     next({
                        path: '/'
                     })
                  })
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
   NProgress.done() // 结束Progress
})