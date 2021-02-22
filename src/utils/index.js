// localStorage封装

function setStorage(name, val) {
  localStorage.setItem(name, val)
}

function getStorage(name) {
  return localStorage.getItem(name)
}

function removeStorage(name) {
  localStorage.removeItem(name)
}
