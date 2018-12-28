import Vue from 'vue'

//使用vue-router 在使用Vue时注意大小写
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Layout from '../views/layout/Layout.vue'

export const constantRouterMap = [{
      path: '/login',
      component: () => import('../views/login/index.vue'), //引入登录首页
      hidden: true
   },
   {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [{
            path: 'dashboard',
            component: () => import('../views/dashboard/index.vue'),
         },
         {
            path: 'dashboard/add',
            component: () => import('../views/child/add.vue')
         },
         {
            path: 'dashboard/list',
            component: () => import('../views/child/list.vue')
         }
      ]
   },
   {
      path: '/404',
      component: () => import('../views/errorPage/404'),
      hidden: true
   },
   {
      path: '/401',
      component: () => import('../views/errorPage/401'),
      hidden: true
   },
]

export default new VueRouter({
   routes: constantRouterMap
})

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [{
      path: '/home',
      component: Layout,
      redirect: '/home/page',
      alwaysShow: true, // will always show the root menu
      meta: {
         title: 'home',
         icon: 'lock',
         roles: ['hello', '22'] // you can set roles in root nav
      },
      children: [{
            path: 'page',
            component: () => import('../views/home/page.vue'),
            name: 'PagePermission',
            meta: {
               title: 'pagePermission',
               roles: ['hello', '44'] // or you can only set roles in sub nav
            }
         },
         {
            path: 'directive',
            component: () => import('../views/home/directive.vue'),
            name: 'DirectivePermission',
            meta: {
               title: 'directivePermission',
               roles: ['hello', '66f']
               // if do not set roles, means: this page does not require permission
            }
         }
      ]
   },
   {
      path: '/user',
      name: 'User',
      //component: () => import('../components/User.vue'),
      component: Layout,
      redirect: '/user/userList',
      meta: {
         title: 'user',
         icon: 'lock',
         roles: ['he3llo', 'ac'] // you can set roles in root nav
      },
      children: [{
            path: 'userAdd',
            name: 'userAdd',
            meta: {
               roles: ['he3llo', '88']
            },
            component: () => import('../components/User/UserAdd.vue')
         },
         {
            path: 'userList',
            name: 'userList',
            meta: {
               roles: ['he3llo', '233232']
            },
            component: () => import('../components/User/UserList.vue')
         },
      ]
   },
   {
      path: '/documentation',
      //你可以选择不同的layout组件
      component: Layout,
      //这里开始对应的路由都会显示在app-main中 如上图所示
      redirect: '/documentation/index',
      meta: {
         roles: ['vc', 'ac']
      },
      children: [{
         path: 'index',
         component: () => import('../views/documentation/index.vue'),
         name: 'documentation'
      }]
   },
   {
      path: '*',
      redirect: '/404',
      hidden: true
   }
];