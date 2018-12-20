import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//在Vue中时用vuex 这里和router时用时一样
import user3 from './modules/user3.js'

Vue.use(Vuex)

//这里注意一下当创建实例的时候一定要注意是 new Vuex.Store({})
let store = new Vuex.Store({
   modules: {
      user3
   },
})


export default store