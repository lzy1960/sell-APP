// 时间戳的格式化
export function formatDate(date, fmt) {
  // 正则表达式
  // 先获取四位数的年，并替换
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 然后匹配剩下的两位数的内容，并替换
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDay(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 遍历这个对象，
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // 首先定义替换的值,转换为字符串
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
  // 重要！！！补0算法
}
