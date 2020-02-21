const clearFns = []

export function onClear(fn) {
  clearFns.push(fn)
}

export function clear() {
  while (clearFns.length) {
    clearFns.pop()()
  }
}

