import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css

//设置axios并配置全局使用
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios

//vue-resource的使用
import VueResource from 'vue-resource'
Vue.use(VueResource)

//4挂载到Vue实例上

import store from './store'
import router from './router'

import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')