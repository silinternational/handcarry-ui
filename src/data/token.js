import qs from 'qs'
import { location, querystring, push } from 'svelte-spa-router'
import { get as getStoreValue} from 'svelte/store'

let qsData = {}

init()

export default {
  authzHeader: () => `${get('token-type')} ${pair()}`,
  key: () => get('key'),
  pair,
  reset,
}

function init() {
  qsData = qs.parse(getStoreValue(querystring))

  set('key', createKey())
  set('token-type', 'Bearer')
  set('access-token')
  set('expires-utc') // TODO: start a timer for auto-logout at this time?

  cleanAddressBar()
}

function createKey() {
  return Math.random()     // doesn't need to be cryptographically strong
             .toString(36) // convert to base-36 so we get more letters
             .substring(2) // strip off the leading '0.'
}

function get(key) {
  return sessionStorage.getItem(key) || qsData[key]
}

function set(key, defaultValue = '') {
  sessionStorage.setItem(key, get(key) || defaultValue)
}

function reset() {
  sessionStorage.removeItem('token-type')
  sessionStorage.removeItem('access-token')
  sessionStorage.removeItem('expires-utc')
}

function pair() {
  return `${get('key') + get('access-token')}`
}

function cleanAddressBar() {
  for (let i = 0; i < sessionStorage.length; i++) {
    delete qsData[sessionStorage.key(i)]
  }

  const newQsParms = qs.stringify(qsData)
  push(`${getStoreValue(location)}${newQsParms.length ? '?' : ''}${newQsParms}`)
}