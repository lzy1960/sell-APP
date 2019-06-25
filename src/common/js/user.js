// {id: pwd}
export function saveToLocal(id, pwd) {
  let user = window.localStorage.__user__

  if (!user) {
    user = {}
  }
  user[id] = pwd
  window.localStorage.__user__ = JSON.stringify(user)
}

export function loadFromLocal(id, def) {
  let user = window.localStorage.__user__
<<<<<<< HEAD

  if (!user) {
    return def
  }
=======
  user = JSON.parse(user)
  if (!user) {
    return def
  }
  let pwd = user[id]
  return pwd || def
>>>>>>> 完成支付的流程
}
