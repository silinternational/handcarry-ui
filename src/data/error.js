import { get, writable } from 'svelte/store'
import { goto, url } from '@roxi/routify'

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

    if (reason.code === 401) {
      reason.message = '' // message details for a 401 aren't really useful to the user at this point.

      // we need to get the user over to the login page but we may want to set up some additional
      // handling in case they were in the middle of something in the app already, i.e., they
      // already authenticated but their credenitals expired while they were looking at requests.
      const currentRoute = get(url)()
      let loginRoute = '/login'
      if (! ['/', loginRoute].includes(currentRoute)) {
        // they were on some page in the app already and lost their credentials,
        // we'll want to give them a little info and get them back to where they were.
        loginRoute += `?return-to=${currentRoute}`
      }

      get(goto)(loginRoute)
    }

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
