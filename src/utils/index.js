//格式化时间
export function parseTime(time, cFormat) {
   if (arguments.length === 0) {
      return null
   }
   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
   let date
   if (typeof time === 'object') {
      date = time
   } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
   }
   const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
   }
   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
         return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
         value = '0' + value
      }
      return value || 0
   })
   return time_str
}

export function formatTime(time, option) {
   time = +time * 1000
   const d = new Date(time)
   const now = Date.now()

   const diff = (now - d) / 1000

   if (diff < 30) {
      return '刚刚'
   } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
   } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
   } else if (diff < 3600 * 24 * 2) {
      return '1天前'
   }
   if (option) {
      return parseTime(time, option)
   } else {
      return (
         d.getMonth() +
         1 +
         '月' +
         d.getDate() +
         '日' +
         d.getHours() +
         '时' +
         d.getMinutes() +
         '分'
      )
   }
}

// 格式化时间
export function getQueryObject(url) {
   url = url == null ? window.location.href : url
   const search = url.substring(url.lastIndexOf('?') + 1)
   const obj = {}
   const reg = /([^?&=]+)=([^?&=]*)/g
   search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
   })
   return obj
}

export function getByteLen(val) {
   let len = 0;
   for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/gi) != null) {
         len += 1
      } else {
         len += 0.5
      }
   }
   return Math.floor(len)
}


export function param(json) {
   //没有参数返回''
   if (!json) return '';
   return cleanArray(
      Object.keys(json).map(key => {
         if (json[key] === undefined) return ""
         return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
   ).join("&")
}

export function param2Obj(url) {
   const search = url.split("?")[1];
   if (!search) {
      return {}
   }
   return JSON.parse(
      '{"' +
      decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
      '"}'
   )
}


export function html2Text(val) {
   const div = document.createElement('div')
   div.innerHTML = val;
   return div.textContent || div.innerText
}

//merge:合并
export function objectMerge(target, source) {
   /*
      Merge two objects,
      giveing the last one precedence : 优先权；
   */
   //targeet不是object 让target变为object
   if (typeof target !== 'object') {
      target = {}
   }
   if (Array.isArray(source)) {
      return source.slice()
   }
   /*
   var obj = {'a':'123','b':'345'};
   console.log(Object.keys(obj)) =>["a", "b"]返回属性名数组
   {
      a:'1',
      b:{
         one:'100',
         two:'200'
      }
   }
   */
   Object.keys(source).forEach(property => {
      //获取属性值
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
         target[property] = objectMerge(target[property], sourceProperty)
      } else {
         target[property] = sourceProperty
      }
   })

   return target
}

//切换className
export function toggleClass(element, className) {
   //没有元素或者类名
   if (!element || !className) {
      return
   }
   let classString = element.className;
   //返回位置
   const nameIndex = classString.lastIndexOf(className)
   if (nameIndex === -1) {
      classString += " " + className
   } else {
      //substr返回一个从指定位置开始的指定长度的子字符串。
      // "left box"
      classString = classString.substr(0, nameIndex) + classString.substr(nameIndex, className.length)

   }
   element.className = classString
}



// picker 采摘
export const pickerOptions = [{
      text: '今天',
      onClick(picker) {
         const end = new Date()
         const start = new Date(new Date().toDateString())
         end.setTime(start.getTime())
         pickerOptions.$emit('pick', [start, end])
      }
   },
   {
      text: '最近一周',
      onClick(picker) {
         const end = new Date(new Date().toDateString())
         const start = new Date()
         start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
         picker.$emit('pick', [start, end])
      }
   }, {
      text: '最近一个月',
      onClick(picker) {
         const end = new Date(new Date().toDateString())
         const start = new Date()
         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
         picker.$emit('pick', [start, end])
      }
   },
   {
      text: '最近三个月',
      onClick(picker) {
         const end = new Date(new Date().toDateString())
         const start = new Date()
         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
         picker.$emit('pick', [start, end])
      }
   }
]


export function getTime(type) {
   if (type === 'start') {
      return new Date().getTime() - 3600 * 1000 * 24 * 90
   } else {
      return new Date(new Date().toDateString())
   }
}

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