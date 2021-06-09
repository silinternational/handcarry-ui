export const getSeed = () => localStorage.getItem('seed')
export const getToken = () => getSeed() + getAccessToken()
export const getAuthzHeader = () => `${getTokenType()} ${getToken()}`
export const clear = () => {
  localStorage.removeItem('seed')
  localStorage.removeItem('access-token')
  localStorage.removeItem('token-type')
}

const generateRandomID = (prefix = '') => prefix + Math.random().toString(36).slice(2)

initialize()
function initialize() {
  localStorage.getItem('seed') || localStorage.setItem('seed', generateRandomID())

  initializeToken()
}

function initializeToken() {
  const params = new URLSearchParams(location.search)

  if (init('access-token') || init('token-type')) {
    cleanAddressBar()
  }

  function init(name) {
    const value = params.get(name)

    if (value !== null) {
      localStorage.setItem(name, value)
      params.delete(name)
    }

    return value
  }

  function cleanAddressBar() {
    const search = [...params].length ? `?${params.toString()}` : ''

    location.replace(location.pathname + search)
  }
}

function getAccessToken() {
  return localStorage.getItem('access-token') || ''
}

function getTokenType(){
  return localStorage.getItem('token-type') || 'Bearer'
}
