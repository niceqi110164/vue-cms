export function isExternal(path) {
   return /^(https?:|mailto:|tel:)/.test(path)
}



//debounce 防反跳 immediate 立即的 目前的
export function debounce(func, wait, immediate) {
   let timeout, args, context, timestamp, result
   // window.console.log(wait) //100
   //window.console.log(func)
   //window.console.log(args)
   const later = function () {
      // window.console.log(timestamp)
      //据上一次触发时间间隔
      //获取时间间隔
      const last = +new Date() - timestamp
      //上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
         timeout = setTimeout(later, wait - last)
      } else {
         timeout = null
         //如果设定为immediate===true,因为开始边界已经调用过了此处无需调用
         if (!immediate) {
            result = func.apply(context, args)
            if (!timeout) context = args = null //清空对象
         }
      }
   }

   return function (...args) {
      //window.console.log(...args) //Event对象
      context = this
      //当页面调整大小时是window对象
      //当sidebar调整大小时是 sidebar组件对象
      //window.console.log(context)
      timestamp = +new Date()
      const callNow = immediate && !timeout //false
      //如果延时不存在，重新设定延时 (timeout异步执行的队列)
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
         result = func.apply(context, args)
         context = args = null
      }
      return result
   }
}