const customClearFns = []

export function onClear(fn) {
  customClearFns.push(fn)
}

export function runCustomClears() {
  while (customClearFns.length) {
    customClearFns.pop()()
  }
}

const SHORT = sessionStorage
const LONG = localStorage
export const LIFESPAN = Object.freeze({
  SHORT,
  LONG,
})

export function save(key, value, LIFESPAN) {
  LIFESPAN.setItem(key, value)
}

export function retrieve(key) {
  let item = LIFESPAN.SHORT.getItem(key)

  if (item === null) {
    item = LIFESPAN.LONG.getItem(key)
  }

  return item
}

export function clear(key) {
  LIFESPAN.SHORT.removeItem(key)
  LIFESPAN.LONG.removeItem(key)
}

export function exists(key) {
  return Object.keys(LIFESPAN.SHORT).includes(key) || Object.keys(LIFESPAN.LONG).includes(key)
}