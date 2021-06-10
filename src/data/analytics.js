init()

// https://developers.google.com/analytics/devguides/collection/analyticsjs
function init() {
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)}
  ga.l=+new Date

  ga('create', process.env.GOOGLE_ANALYTICS_ID, 'auto')

  loadLib()
}

function loadLib() {
  const el = document.createElement('script')

  el.src = 'https://www.google-analytics.com/analytics.js'
  el.async = true

  document.head.appendChild(el)
}

export function trackPageView() {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/pages#pageview_fields
  ga('send', 'pageview', window.location.pathname)
}

function trackEvent(primary, secondary, tertiary) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
  ga('send', 'event', primary, secondary, tertiary)
}

const trackAuthEvent     = secondary             => trackEvent('Auth'    , secondary)
const trackMeetingsEvent = (secondary, tertiary) => trackEvent('Meetings', secondary, tertiary)
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
export const choseMyRequests       = () => trackMenuEvent('my requests')
export const choseMyCommitments    = () => trackMenuEvent('my commitments')

export const filteredRequestsByDestination = query => trackRequestsEvent('destination', query)
export const filteredRequestsByEvent       = name  => trackRequestsEvent('event', name)
export const filteredRequestsByOrigin      = query => trackRequestsEvent('origin', query)
export const filteredRequestsBySize        = size  => trackRequestsEvent('filter', size)
export const filteredRequestsByMine        = ()    => trackRequestsEvent('filter', 'mine')
export const filteredRequestsByProviding   = ()    => trackRequestsEvent('filter', 'providing')
export const filteredRequestsByAll         = ()    => trackRequestsEvent('filter', 'all')
export const viewedRequestsAs              = type  => trackRequestsEvent('view'  , type)
export const searchedRequests              = query => trackRequestsEvent('search', query)

export const filteredMeetingsByAll      = ()    => trackMeetingsEvent('filter', 'all')
export const filteredMeetingsByLocation = query => trackMeetingsEvent('location', query)
export const filteredMeetingsByMine     = ()    => trackMeetingsEvent('filter', 'mine')
export const searchedMeetings           = query => trackMeetingsEvent('search', query)

export const accepted       = () => trackRequestEvent('accepted')
export const offered        = () => trackRequestEvent('offered')
export const trackReceived  = () => trackRequestEvent('received')
export const trackDelivered = () => trackRequestEvent('delivered')
export const updated        = () => trackRequestEvent('updated')
export const created        = () => trackRequestEvent('created')
export const cancelled      = () => trackRequestEvent('cancelled')

export const changedNickname = () => trackUserEvent('changed nickname')
export const changedAvatar   = () => trackUserEvent('changed avatar')

export const sentMessage = () => trackEvent('Messaging', 'sent')

export const uploadedImage = () => trackEvent('Image', 'uploaded')

export const createdWatch = () => trackEvent('watch', 'created')
