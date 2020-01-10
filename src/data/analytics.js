import { location } from 'svelte-spa-router'

init()

// https://developers.google.com/analytics/devguides/collection/analyticsjs
function init() {
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)}
  ga.l=+new Date

  ga('create', process.env.GOOGLE_ANALYTICS_ID, 'auto')

  loadLib()

  location.subscribe(trackPageView)
}

function loadLib() {
  const el = document.createElement('script')

  el.src = 'https://www.google-analytics.com/analytics.js'
  el.async = true
  
  document.head.appendChild(el)
}

function trackPageView(route) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/pages#pageview_fields
  ga('send', 'pageview', route)
}

function trackEvent(primary, secondary, tertiary) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
  ga('send', 'event', primary, secondary, tertiary)
}

const trackAuthEvent     = secondary             => trackEvent('Auth'    , secondary)
const trackMenuEvent     = (secondary, tertiary) => trackEvent('Menu'    , secondary, tertiary)
const trackRequestsEvent = (secondary, tertiary) => trackEvent('Requests', secondary, tertiary)
const trackRequestEvent  = secondary             => trackEvent('Request' , secondary)
const trackUserEvent     = secondary             => trackEvent('User'    , secondary)

export const loggedIn  = () => trackAuthEvent('logged in')
export const loggedOut = () => trackAuthEvent('logged out')

export const createRequestByFab    = () => trackMenuEvent('create request', 'fab')
export const createRequestByButton = () => trackMenuEvent('create request', 'button')
export const createRequestByTile   = () => trackMenuEvent('create request', 'tile')
export const clickedLogo           = () => trackMenuEvent('logo clicked')
export const clickedHelp           = () => trackMenuEvent('help')
export const choseMyRequests       = () => trackMenuEvent('my requests')
export const choseMyCommitments    = () => trackMenuEvent('my commitments')

export const filteredRequestsBySize      = size  => trackRequestsEvent('filter', size)
export const filteredRequestsByMine      = ()    => trackRequestsEvent('filter', 'mine')
export const filteredRequestsByProviding = ()    => trackRequestsEvent('filter', 'providing')
export const filteredRequestsByAll       = ()    => trackRequestsEvent('filter', 'all')
export const viewedRequestsAsGrid        = ()    => trackRequestsEvent('view'  , 'grid')
export const viewedRequestsAsList        = ()    => trackRequestsEvent('view'  , 'list')
export const searchedRequests            = query => trackRequestsEvent('search', query)

export const accepted       = () => trackRequestEvent('accepted')
export const committed      = () => trackRequestEvent('committed')
export const trackReceived  = () => trackRequestEvent('received')
export const trackDelivered = () => trackRequestEvent('delivered')
export const updated        = () => trackRequestEvent('updated')
export const created        = () => trackRequestEvent('created')
export const cancelled      = () => trackRequestEvent('cancelled')

export const changedNickname = () => trackUserEvent('changed nickname')
export const changedAvatar   = () => trackUserEvent('changed avatar')

export const sentMessage = () => trackEvent('Messaging', 'sent')

export const uploadedImage = () => trackEvent('Image', 'uploaded')
