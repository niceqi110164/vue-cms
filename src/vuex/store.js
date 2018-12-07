import Vue from 'vue'

//引入vuex
import Vuex from 'vuex'
//在Vue中时用vuex 这里和router时用时一样
Vue.use(Vuex)
//数据放在state里面
let state = {
   count:1,
   list:[]
}
//方法放在 mutations
let mutations = {
   incCount(){
      ++state.count;
   },
   addList(state,data){
      state.list = data;
   }
}
//这里注意一下当创建实例的时候一定要注意是 new Vuex.Store({})
let store = new Vuex.Store({
   state,
   mutations
})


export default store









