import { throwError } from './error'

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

export const save = (key, value, lifespan) => {
  Object.keys(LIFESPAN).filter(type => LIFESPAN[type] !== lifespan).map(type => {
    const valueFromOtherLocation = LIFESPAN[type].getItem(key)

    if (valueFromOtherLocation !== null) {
      console.error(`Storage key name clash:  ${key} found in ${type} already, moving to requested location.`)
      clear(key)
    }
  })

  lifespan.setItem(key, value)
}

export function retrieve(key) {
  const values = Object.keys(LIFESPAN).map(type => LIFESPAN[type].getItem(key)).filter(value => value !== null)

  return values.length ? values[0] : null
}

export const clear = (...keys) => Object.keys(LIFESPAN).map(type => keys.map(key => LIFESPAN[type].removeItem(key)))

export const exists = key => Object.keys(LIFESPAN).some(type => Object.keys(LIFESPAN[type]).includes(key))