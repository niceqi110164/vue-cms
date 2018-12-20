import axios from 'axios'
import {
   Message
} from 'element-ui'
import {
   getToken
} from '@/utils/auth'

import {
   apiUrl
} from '../../config/config.js'

import store from '../vuex/store1.js'
window.console.log(store)
//创建一个axios 实例
const service = axios.create({
   baseURL: apiUrl, //api 的 base_url
   //baseURL: process.env.BASE_API, //api 的 base_url
   timeout: 5000 //request timeout
})

//request interceptor 请求级截获器
//拦截请求（在发送请求之前做某事）
service.interceptors.request.use(
   config => {
      //Do something before request is sent
      if (store.getters.token) {
         //让每个请求携带token -- ['x-Token']为自定义key ,根据实际情况自行修改
         config.headers['Access-Token'] = getToken() //getToken()获取token值
      }
      return config
   },
   error => {
      // Do something with request error
      window.console.log(error)
      Promise.reject(error)
   }
)

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
//拦截响应
service.interceptors.response.use(
   response => response,
   error => {
      window.console.log('err' + error) // for debug
      Message({
         message: error.message,
         type: 'error',
         duration: 5 * 1000
      })
      return Promise.reject(error)
   }
)


export default service