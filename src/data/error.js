import { writable } from 'svelte/store'

const defaultError = {
  code: 0,
  message: '',
}

export const error = writable(defaultError)

init()

function init() {
  // the incoming object here is from the browser https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
  window.onunhandledrejection = ({reason}) => {
    // `reason` will contain whatever was thrown (which should only be from `throwError` below)
    error.set(reason)

    scrollTo(0,0) // ensures the user sees the error message at the top of the page
  }
}

export function reset() {
  error.set(defaultError)
}

export function throwError(message = '', code = 0) {
  throw  {
    code,
    message,
  }
}
