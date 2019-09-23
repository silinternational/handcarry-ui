init()

export default {
  authzHeader: () => `${get('token-type')} ${get('key') + get('access-token')}`,
  key: () => get('key'),
  reset,
}

function init() {
  set('key', createKey())
  set('token-type', 'Bearer')
  set('access-token')
  // TODO: need to grab the expiry and then setup an automatic logout at that time.
}

function createKey() {
  return Math.random()     // doesn't need to be cryptographically strong
             .toString(36) // convert to base-36 so we get more letters
             .substring(2) // strip off the leading '0.'
}

function get(key) {
  // TODO: currently no IE support for URLSearchParams (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility)
  // check this out for further info:  https://developers.google.com/web/updates/2016/01/urlsearchparams
  // polyfill if needed (https://github.com/jerrybendy/url-search-params-polyfill) or the WebReflection one...
  const defragged = new URL(location.href.replace('#',''))
  const params = new URLSearchParams(defragged.search)

  return sessionStorage.getItem(key) || params.get(key)
}

function set(key, defaultValue = '') {
  sessionStorage.setItem(key, get(key) || defaultValue)
}

function reset() {
  sessionStorage.removeItem('token-type')
  sessionStorage.removeItem('access-token')
}
