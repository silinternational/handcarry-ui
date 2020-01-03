import { writable } from 'svelte/store'

const defaultError = {
  code: 0,
  message: '',
}

export const error = writable(defaultError)

init()

function init() {
  window.onunhandledrejection = ({reason}) => {
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
