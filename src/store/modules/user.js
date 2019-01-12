import Cookies from 'js-cookie'
import {
   loginByUsername,
   logout,
   getUserInfo
} from '../../api/login'
import {
   getToken,
   setToken,
   removeToken
} from '../../utils/auth'

const user = {
   state: {
      user: '',
      status: '',
      code: '',
      token: getToken(),
      name: '',
      avatar: '',
      introduction: '',
      roles: [],
      setting: {
         articlePlatform: []
      }
   },

   mutations: {
      SET_CODE: (state, code) => {
         state.code = code
      },
      SET_TOKEN: (state, token) => {
         state.token = token
      },
      SET_INTRODUCTION: (state, introduction) => {
         state.introduction = introduction
      },
      SET_SETTING: (state, setting) => {
         state.setting = setting
      },
      SET_STATUS: (state, status) => {
         state.status = status
      },
      SET_NAME: (state, name) => {
         state.name = name
      },
      SET_AVATAR: (state, avatar) => {
         state.avatar = avatar
      },
      SET_ROLES: (state, roles) => {
         state.roles = roles
      }
   },

   actions: {
      // 用户名登录
      LoginByUsername({
         commit
      }, userInfo) {
         const username = userInfo.username.trim()
         return new Promise((resolve, reject) => {
            loginByUsername(username, userInfo.password).then(response => {
               const data = response.data
               //登录成功后将token存储在cookie之中
               Cookies.set('Token', data.token)
               commit('SET_TOKEN', data.token)
               commit('SET_NAME', data.name)
               setToken(data.token)
               //window.console.log(data)
               resolve(data)
            }).catch(error => {
               reject(error)
            })
         })
      },
      //获取用户信息
      GetUserInfo({
         commit,
         state
      }) {
         return new Promise((resolve, reject) => {
            //利用token来获取异步数据
            getUserInfo(state.token).then((response) => {
               if (!response.data) {
                  reject('error')
               }
               const data = response.data
               //存在 roles 并且不为空
               if (data.roles && data.roles.length > 0) {
                  commit('SET_ROLES', data.roles) //把roles放到state中
               } else {
                  reject('getInfo: roles must be a non-null array !')
               }
               //设置用户名等一些信息
               commit('SET_NAME', data.name)
               commit('SET_AVATAR', data.avatar)
               commit('SET_INTRODUCTION', data.introduction)
               resolve(response)
            }).catch((err) => {
               reject(err)
            })
         })
      },
      //登出
      LogOut({
         commit,
         state
      }) {
         return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
               commit('SET_TOKEN', '')
               commit('SET_ROLES', [])
               removeToken()
               resolve()
            }).catch((err) => {
               reject(err)
            })
         })
      },
      //前端 登出
      FedLogOut({
         commit
      }) {
         return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
         })
      },

      //动态修改权限
      ChangeRoles({
         commit,
         dispatch
      }, role) {
         return new Promise((resolve) => {
            //改变 mutations中的设置
            commit('SET_TOKEN', role)
            //再cookies中重新设置token
            setToken(role)
            //利用设置完的token来获取异步数据
            getUserInfo(role).then(response => {
               const data = response.data
               commit('SET_ROLES', data.roles)
               commit('SET_NAME', data.name)
               commit('SET_AVATAR', data.avatar)
               commit('SET_INTRODUCTION', data.introduction)
               dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
               resolve()
            })
         })
      }
   }
}
export default user