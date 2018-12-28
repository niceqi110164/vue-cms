import Cookies from 'js-cookie'

const app = {
   state: {
      sidebar: { //Cookies.get('sidebarStatus'),=>false
         opened: !+Cookies.get('sidebarStatus'), //初始值 true
         withoutAnimation: false
      },
      device: 'desktop'
   },
   mutations: {
      TOGGLE_SIDEBAR: state => {
         if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
         } else {
            Cookies.set('sidebarStatus', 0)
         }
         state.sidebar.opened = !state.sidebar.opened
         state.sidebar.withoutAnimation = false
      },
      CLOSE_SIDEBAR: (state, withoutAnimation) => {
         Cookies.set('sidebarStatus', 1)
         state.sidebar.opened = false
         state.sidebar.withoutAnimation = withoutAnimation
      },
      TOGGLE_DEVICE: (state, device) => {
         state.device = device
      }
   },
   actions: {
      toggleSideBar: ({
         commit
      }) => {
         commit('TOGGLE_SIDEBAR')
      },
      closeSideBar({
         commit
      }, {
         withoutAnimation
      }) {
         commit('CLOSE_SIDEBAR', withoutAnimation)
      },
      toggleDevice({
         commit
      }, device) {
         commit('TOGGLE_DEVICE', device)
      }
   }
}

export default app