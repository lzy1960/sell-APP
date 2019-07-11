export function save(attr, val) {
  let remember = window.localStorage.__remember__
  if (!remember) {
    remember = {}
  } else {
    remember = JSON.parse(remember)
  }
  remember[attr] = val
  window.localStorage.__remember__ = JSON.stringify(remember)
}
export function load(attr) {
  let remember = window.localStorage.__remember__
  if (!remember) {
    remember = {}
  } else {
    remember = JSON.parse(remember)
  }
  return remember[attr]
}
