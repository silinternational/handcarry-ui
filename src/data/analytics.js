import { location } from 'svelte-spa-router'

init()

// https://developers.google.com/analytics/devguides/collection/analyticsjs
function init() {
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)}
  ga.l=+new Date

  ga('create', process.env.GOOGLE_ANALYTICS_ID, 'auto')

  loadLib()

  location.subscribe(sendPageView)
}

function loadLib() {
  const el = document.createElement('script')

  el.src = 'https://www.google-analytics.com/analytics.js'
  el.async = true
  
  document.head.appendChild(el)
}

function sendPageView(route) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/pages#pageview_fields
  ga('send', 'pageview', route)
}

// https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
export const loggedIn  = () => ga('send', 'event', 'Auth', 'logged in')
export const loggedOut = () => ga('send', 'event', 'Auth', 'logged out')

export const createRequestByFab    = () => ga('send', 'event', 'Menu', 'create request', 'fab')
export const createRequestByButton = () => ga('send', 'event', 'Menu', 'create request', 'button')
export const createRequestByTile   = () => ga('send', 'event', 'Menu', 'create request', 'tile')
export const clickedLogo           = () => ga('send', 'event', 'Menu', 'logo clicked')
export const clickedHelp           = () => ga('send', 'event', 'Menu', 'help')
export const choseMyRequests       = () => ga('send', 'event', 'Menu', 'my requests')
export const choseMyCommitments    = () => ga('send', 'event', 'Menu', 'my commitments')

export const filteredRequestsBySize      = size  => ga('send', 'event', 'Requests', 'filter', size)
export const filteredRequestsByMine      = ()    => ga('send', 'event', 'Requests', 'filter', 'mine')
export const filteredRequestsByProviding = ()    => ga('send', 'event', 'Requests', 'filter', 'providing')
export const filteredRequestsByAll       = ()    => ga('send', 'event', 'Requests', 'filter', 'all')
export const viewedRequestsAsGrid        = ()    => ga('send', 'event', 'Requests', 'view'  , 'grid')
export const viewedRequestsAsList        = ()    => ga('send', 'event', 'Requests', 'view'  , 'list')
export const searchedRequests            = query => ga('send', 'event', 'Requests', 'search', query)

export const accepted       = () => ga('send', 'event', 'Request', 'accepted')
export const committed      = () => ga('send', 'event', 'Request', 'committed')
export const trackReceived  = () => ga('send', 'event', 'Request', 'received')
export const trackDelivered = () => ga('send', 'event', 'Request', 'delivered')
export const updated        = () => ga('send', 'event', 'Request', 'updated')
export const created        = () => ga('send', 'event', 'Request', 'created')
export const cancelled      = () => ga('send', 'event', 'Request', 'cancelled')

export const changedNickname = () => ga('send', 'event', 'User', 'changed nickname')
export const changedAvatar   = () => ga('send', 'event', 'User', 'changed avatar')

export const sentMessage = () => ga('send', 'event', 'Messaging', 'sent')

export const uploadedImage = () => ga('send', 'event', 'Image', 'uploaded')
