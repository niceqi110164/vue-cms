import Cookies from 'js-cookie'

const app = {
   state: {
      sidebar: {
         opened: !+Cookies.get('sidebarStatus'),
         withoutAnimation: false
      },
      device: 'desktop',
      language: Cookies.get('language') || 'en',
      size: Cookies.get("size") || 'medium'
   },
   mutations: {
      TOGGLE_SIDEBAR: state => {
         if (state.sidebar.opened) { //sidebar打开状态
            Cookies.set('sidebarStatus', 1)
         } else {
            Cookies.set('sidebarStatus', 0)
         }
         state.sidebar.opened = !state.sidebar.opened
         state.sidebar.withoutAnimation = false
      },
      CLOSE_SIDEBAR: (state, withoutAnimation) => { //关闭sidebar
         Cookies.set('sidebarStatus', 1)
         state.sidebar.opened = false
         state.sidebar.withoutAnimation = withoutAnimation
      },
      TOGGLE_DEVICE: (state, device) => { //设置device
         state.device = device
      },
      SET_LANGUAGE: (state, language) => {
         state.language = language
         Cookies.set('language', language)
      },
      SET_SIZE: (state, size) => {
         state.size = size
         Cookies.set('size', size)
      }
   },
   getters: {},
   actions: {
      toggleSideBar({ //执行mutation中的TOGGLE_SIDEBAR方法
         commit
      }) {
         commit('TOGGLE_SIDEBAR')
      },
      closeSideBar({ //执行mutation中的CLOSE_SIDEBAR方法
         commit
      }, {
         withoutAnimation
      }) {
         commit('CLOSE_SIDEBAR', withoutAnimation)
      },
      toggleDevice({
         commit
      }, device) { //执行mutation中的TOGGLE_DEVICE方法
         commit('TOGGLE_DEVICE', device)
      },
      setLanguage({ //执行mutation中的SET_LANGUAGE方法
         commit
      }, language) {
         commit('SET_LANGUAGE', language)
      },
      setSize({ //执行mutation中的SET_SIZE方法
         commit
      }, size) {
         commit('SET_SIZE', size)
      }
   }
}



export default app