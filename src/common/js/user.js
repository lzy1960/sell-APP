// {id: pwd}
export function saveToLocal(id, pwd) {
  let user = window.localStorage.__user__

  if (!user) {
    user = {}
  } else {
    user = JSON.parse(user)
  }
  user[id] = pwd
  window.localStorage.__user__ = JSON.stringify(user)
}

export function loadFromLocal(id, def) {
  let user = window.localStorage.__user__

  if (!user) {
    return def
  }
  user = JSON.parse(user)
  if (!user) {
    return def
  }
  let pwd = user[id]
  return pwd || def
}
