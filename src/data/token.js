import qs from 'qs'
import { location, querystring, push } from 'svelte-spa-router'
import { get as getStoreValue} from 'svelte/store'
import { onClear, save, LIFESPAN, retrieve, clear, exists } from './storage'
import { loggedIn } from './analytics'

let qsData = {}

init()

export default {
  authzHeader: () => `${get('token-type')} ${pair()}`,
  key: () => get('key'),
  pair,
  expiration: () => new Date(get('expires-utc') || '9999-12-31'),
}

function init() {
  // MIGRATION NOTE:  historically key was stored in session, need to clean that up if it exists there for a user.
  sessionStorage.removeItem('key') // TODO: remove this line after some reasonable amount of time has passed to clean up old instances

  qsData = qs.parse(getStoreValue(querystring))

  set('key', createKey())
  set('token-type', 'Bearer')
  set('access-token')
  set('expires-utc')

  qsData['access-token'] && loggedIn()
  
  cleanAddressBar()

  onClear(reset)
}

function createKey() {
  return Math.random()     // doesn't need to be cryptographically strong
             .toString(36) // convert to base-36 so we get more letters
             .substring(2) // strip off the leading '0.'
}

function get(key) {
  return retrieve(key) || qsData[key]
}

function set(key, defaultValue = '') {
  save(key, get(key) || defaultValue, LIFESPAN.LONG)
}

function reset() {
  // not clearing 'key' here to avoid any unnecessary re-authn scenarios.
  clear('token-type')
  clear('access-token')
  clear('expires-utc')
}

function pair() {
  return `${get('key') + get('access-token')}`
}

function cleanAddressBar() {
  Object.keys(qsData).filter(prop => exists(prop)).map(key => delete qsData[key])

  const remainingQsParms = qs.stringify(qsData)
  push(`${getStoreValue(location)}${remainingQsParms.length ? '?' : ''}${remainingQsParms}`)
}
