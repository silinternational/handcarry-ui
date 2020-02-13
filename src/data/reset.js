const resetFns = []

export function register(resetFunction) {
  resetFns.push(resetFunction)
}

export function reset() {
  while (resetFns.length) {
    const subscribersResetFn = resetFns.pop()
    subscribersResetFn()
  }
}

