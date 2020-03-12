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

const getAllLifespanTypes = () => Object.keys(LIFESPAN)

export const save = (key, value, lifespanType) => {
  getAllLifespanTypes().filter(type => LIFESPAN[type] !== lifespanType).map(type => {
    const valueFromOtherLocation = LIFESPAN[type].getItem(key)

    if (valueFromOtherLocation !== null) {
      console.error(`Storage key name clash:  ${key} found in ${type} already, moving to requested location.`)
      clear(key)
    }
  })

  lifespanType.setItem(key, value)
}

export function retrieve(key) {
  const values = getAllLifespanTypes().map(type => LIFESPAN[type].getItem(key)).filter(value => value !== null)

  return values.length ? values[0] : null
}

export const clear = (...keys) => getAllLifespanTypes().map(type => keys.map(key => LIFESPAN[type].removeItem(key)))

export const exists = key => getAllLifespanTypes().some(includes(key))

const includes = key => type => Object.keys(LIFESPAN[type]).includes(key)