import Vue from 'vue'
import App from './App.vue'
//设置axios并配置全局使用
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios


//vue-resource的使用
import VueResource from 'vue-resource'
Vue.use(VueResource)

//4挂载到Vue实例上

import router from './router/router.js'

import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')