import axios from "axios";
import {
   apiUrl
} from '../../config/config.js'

//qs作用格式化post请求传递的参数
import qs from 'qs'

//封装GET请求
export const getRequest = (url, params) => {
   //拼接请求地址
   let _url = apiUrl + url
   return new Promise((resolve, reject) => {
      //axios自定义get请求
      axios({
         method: "get", //请求方式
         url: _url, //请求地址
         params: params //请求参数 (axiox自定义get请求时参数属性要用params)
      }).then((response) => {
         resolve(response)
      }).catch((err) => {
         reject(err)
      })
   })
}

//封装post请求
export const postRequest = (url, params) => {
   //拼接请求地址
   let _url = apiUrl + url
   return new Promise((resolve, reject) => {
      //axios自定义post请求
      axios({
         method: "post", //请求方式
         url: _url, //请求地址
         data: qs.stringify(params), //请求参数 (axiox自定义post请求时参数属性要用data)
         headers: { //设置请求头
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      }).then((response) => {
         resolve(response)
      }).catch((err) => {
         reject(err)
      })
   })
}


// function checkStatus(response) {

//    // loading
//    // 如果http状态码正常，则直接返回数据
//    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
//       return response
//       // 如果不需要除了data之外的数据，可以直接 return response.data
//    }
//    // 异常状态下，把错误信息返回去
//    return {
//       status: -404,
//       msg: '网络异常'
//    }
// }

// function checkCode(res) {

//    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
//    if (res.status === -404) {
//       let vue = new Vue;
//       vue.$message({
//          type: 'error',
//          message: res.msg
//       });
//    }
//    // if (res.data && (!res.data.success)) {
//    //     alert(res.data.error_msg)
//    // }
//    return res
// }