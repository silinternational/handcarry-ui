import qs from 'qs'
import { location, querystring, push } from 'svelte-spa-router'
import { get as getStoreValue} from 'svelte/store'
import { onClear, save, LIFESPAN, retrieve, clear, exists as isAlreadyInStorage } from './storage'
import { loggedIn } from './analytics'

const get = key => retrieve(key) || qsData[key]
export const getSeed = () => get('seed')
export const getToken = () => `${getSeed() + get('access-token')}`
export const getAuthzHeader = () => `${get('token-type')} ${getToken()}`
export const getExpiration = () => new Date(get('expires-utc') || '9999-12-31')

let qsData = {}

const initialize = (key, defaultValue = '') => save(key, get(key) || defaultValue, LIFESPAN.LONG)
const reset = () => clear('token-type', 'access-token', 'expires-utc') // not clearing 'seed' here to avoid any unnecessary re-authn scenarios.
const createSeed = () => 
  Math.random()     // doesn't need to be cryptographically strong
      .toString(36) // convert to base-36 so we get more letters
      .substring(2) // strip off the leading '0.'

init()
function init() {
  // MIGRATION NOTE:  for seeds, historically 'key' was stored in session, need to clean that up if it exists there for a user.
  // TODO: remove this after some reasonable amount of time has passed to clean up old instances
  sessionStorage.removeItem('key')

  qsData = qs.parse(getStoreValue(querystring))

  initialize('seed', createSeed())
  initialize('token-type', 'Bearer')
  initialize('access-token')
  initialize('expires-utc')

  qsData['access-token'] && loggedIn()
  
  cleanAddressBar()

  onClear(reset)
}

function cleanAddressBar() {
  Object.keys(qsData).filter(isAlreadyInStorage).map(key => delete qsData[key])

  const cleanedUrl = getStoreValue(location)

  if (qsData.length) {
    cleanedUrl += `?${qs.stringify(qsData)}` // TODO: does this need to be encoded?
  }

  push(cleanedUrl)
}
