const tagsView = {
   state: {
      visitedTabsView: [],
      cachedViews: []
   },
   mutations: {
      ADD_VISITED_VIEW: (state, view) => {
         if (state.visitedTabsView.some(v => v.path === view.path)) {
            return
         }
         state.visitedTabsView.push({
            name: view.meta.title,
            path: view.path
         })
      },
      DEL_VISITED_VIEW: (state, view) => {
         for (let [i, v] of state.visitedTabsView.entries()) {
            if (v.path === view.path || v.name === view.name) {
               state.visitedTabsView.splice(i, 1)
            }
         }
      }
   },
   actions: {
      //添加一个新的tabsView
      add_visited_view({
         commit
      }, view) {
         commit('ADD_VISITED_VIEW', view)
      },
      //关闭一个tabsView
      del_visited_view({
         commit,
         state
      }, view) {
         return new Promise((resolve) => {
            commit('DEL_VISITED_VIEW', view)
            resolve([...state.visitedTabsView])
         })

      }
   }
}


export default tagsView