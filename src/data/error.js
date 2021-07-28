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

// window change event
history.pushState = (f => function pushState(){
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.pushState);

history.replaceState = (f => function replaceState(){
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
  window.dispatchEvent(new Event('locationchange'))
});

window.addEventListener("locationchange", reset)