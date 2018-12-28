import {
   asyncRouterMap,
   constantRouterMap
} from '../../router/index.js';
/** 
 * permission judge function 许可判断函数
 * @params: roles
 * @params: route
 * */
function hasPermission(roles, route) {
   if (roles.indexOf('admin') >= 0) return true //admin permission passed directly admin直接通过
   if (route.meta && route.meta.roles) {
      //roles = ['edit']  rouer => item 为router里面的路由{}
      return roles.some(role => route.meta.roles.indexOf(role) >= 0)
   } else {
      return true
   }
}

/** 
 * filterAsyncRouter : 递归过滤异步路由表,返回符合用户角色权限的路由表
 * @params:routes(array) asyncRouterMap
 * @params:roles(obj)
 * */
function filterAsyncRouter(routes, roles) {
   const res = [];
   //遍历数组 操作数组的每一项
   routes.forEach(route => {
      //把对象解构
      const tmp = {
         ...route
      };
      //判断函数
      if (hasPermission(roles, tmp)) {
         if (tmp.children) {
            tmp.children = filterAsyncRouter(tmp.children, roles)
         }
         res.push(tmp)
      }
   });
   return res
}


const permission = {
   state: {
      routers: constantRouterMap,
      addRouters: []
   },
   mutations: {
      SET_ROUTERS: (state, routers) => { //添加路由
         state.addRouters = routers;
         state.routers = constantRouterMap.concat(routers);
      }
   },
   getters: {
      addRouters: state => state.routers
   },
   actions: {
      //GenerateRoutes 生成routers表
      GenerateRoutes({
         commit
      }, data) {
         return new Promise((resolve) => {
            const {
               roles
            } = data;
            let accessedRouters;
            //检测数组是否包含 'admin'
            if (roles.includes('admin')) {
               accessedRouters = asyncRouterMap
            } else {
               accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            }
            /** accessedRouters 进入routers
            const accessedRouters = asyncRouterMap.filter(v => {
               if (roles.indexOf('admin') >= 0) return true; //当时admin登录时 直接返回true
               if (hasPermission(roles, v)) {
                  if (v.children && v.children.length > 0) {
                     v.children = v.children.filter(child => {
                        if (hasPermission(roles, child)) {
                           return child
                        }
                        return false;
                     });
                     return v
                  } else {
                     return v
                  }
               }
               return false;
            });*/
            window.console.log(accessedRouters);
            commit('SET_ROUTERS', accessedRouters);
            resolve()
         })
      }
   }
}

export default permission