import { route } from '@roxi/routify'

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || ''

init()

// https://developers.google.com/analytics/devguides/collection/gtagjs
// https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs
function init() {
  loadLib()

  window.dataLayer = window.dataLayer || []

  window.gtag = function (){
    dataLayer.push(arguments)
  }

  gtag('js', new Date())

  //since we are sending manually we need to disable the default of sending each pageview
  gtag('config', GOOGLE_ANALYTICS_ID, {
    send_page_view: false,
  })

  route.subscribe(trackPageView)
}

function loadLib() {
  const script = document.createElement('script')

  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`
  script.async = true

  document.head.appendChild(script)
}

function trackPageView(page) {
  if (page) {
    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages#default_behavior
    gtag('event', 'page_view', {
      page_path: location.pathname, //page.path or page.shortPath are also available
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
function trackEvent(eventName, eventLabel, value) {
  gtag('event', eventName, {
    event_label: eventLabel,
    value,
  })
}

export const notFound = () => trackEvent('Error', 'Page not found')

const trackAuthEvent     = (eventLabel)        => trackEvent('Auth'    , eventLabel)
const trackMeetingsEvent = (eventLabel, value) => trackEvent('Meetings', eventLabel, value)
const trackMenuEvent     = (eventLabel, value) => trackEvent('Menu', eventLabel, value)
const trackRequestsEvent = (eventLabel, value) => trackEvent('Requests', eventLabel, value)
const trackRequestEvent  = (eventLabel)        => trackEvent('Request' , eventLabel)
const trackUserEvent     = (eventLabel)        => trackEvent('User'    , eventLabel)

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
