/* eslint-disable no-tabs */
// 解析URL参数
// 输出：?id=123&a=b
// 返回：Object {id: 123, a: b}
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&#]+=[^?&#]+/g
  // 											+表示一个或多个
  // 					?    id  = 123  全局
  let arr = url.match(reg)

  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
