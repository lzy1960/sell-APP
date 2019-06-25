// 把数据保存到本地
// url格式：url?id=xxx
// 数据格式：{id: {key: value}}
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__

  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    // JSON.parse(text, [reviver])将数据转化为js对象
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  // JSON.stringify(value, [replacer], [space])
  // 将js对象转换为字符串
  window.localStorage.__seller__ = JSON.stringify(seller)
}

// 读取本地数据
// def表示默认值
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }

  let ret = seller[key]
  return ret || def // 如果没有ret，则返回def
}
