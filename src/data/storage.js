const customClearFns = []

export const onClear = fn => customClearFns.push(fn)

export function clearApp() {
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

export const save = (key, value, lifespan) => lifespan.setItem(key, value)

export function retrieve(key) {
  let item = LIFESPAN.SHORT.getItem(key)

  if (item === null) {
    item = LIFESPAN.LONG.getItem(key)
  }

  return item
}

export const clear = (...keys) => keys.map(key => {
  LIFESPAN.SHORT.removeItem(key)
  LIFESPAN.LONG.removeItem(key)
})

export const exists = key => Object.keys(LIFESPAN.SHORT).includes(key) || Object.keys(LIFESPAN.LONG).includes(key)