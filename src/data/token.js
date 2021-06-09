import qs from 'qs'
import { onClear, save, LIFESPAN, retrieve, clear, exists as isAlreadyInStorage } from './storage'
import { loggedIn } from './analytics'

const get = key => retrieve(key) || qsData[key]
export const getSeed = () => get('seed')
export const getToken = () => `${getSeed() + get('access-token')}`
export const getAuthzHeader = () => `${get('token-type')} ${getToken()}`

let qsData = {}

const initialize = (key, defaultValue = '') => save(key, get(key) || defaultValue, LIFESPAN.LONG)
const reset = () => clear('token-type', 'access-token') // not clearing 'seed' here to avoid any unnecessary re-authn scenarios.
const createSeed = () =>
  Math.random()     // doesn't need to be cryptographically strong
      .toString(36) // convert to base-36 so we get more letters
      .substring(2) // strip off the leading '0.'

init()
function init() {
  qsData = qs.parse(window.location.search.substring(1))

  initialize('seed', createSeed())
  initialize('token-type', 'Bearer')
  initialize('access-token')

  qsData['access-token'] && loggedIn()

  cleanAddressBar()

  onClear(reset)
}

function cleanAddressBar() {
  Object.keys(qsData).filter(isAlreadyInStorage).map(key => delete qsData[key])

  let cleanedUrl = window.location.pathname

  if (Object.keys(qsData).length) {
    cleanedUrl += `?${qs.stringify(qsData)}`
  }

  // FIXME: this refreshes the browser, which causes this code to re-execute infinitely
  // window.location = cleanedUrl
}
