import request from "../utils/request";
export function loginByUsername(username, password) {
   const data = {
      username,
      password
   }
   // 这个是直接调用axios
   return request({
      url: 'doPost',
      //url: 'api',
      method: 'post',
      data
   })
}

export function logout() {
   return request({
      url: '/login/logout',
      method: 'post'
   })
}

export function getUserInfo(token) {
   return request({
      url: 'doGet',
      method: 'get',
      params: {
         token
      }
   })
}