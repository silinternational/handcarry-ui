import { route } from '@roxi/routify'

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || ''

init()

// https://developers.google.com/analytics/devguides/collection/gtagjs
// https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs
function init() {
  loadLib()

  ;(window).dataLayer = (window).dataLayer || []
  window.gtag = () => (window).dataLayer.push(arguments)

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
function trackEvent(eventName, eventParameters) {
  gtag('event', eventName, eventParameters)
}

export const notFound = () => trackEvent('Error', 'Page not found')

const trackAuthEvent     = eventParameters => trackEvent('Auth'    , eventParameters)
const trackMeetingsEvent = eventParameters => trackEvent('Meetings', eventParameters)
const trackMenuEvent     = eventParameters => trackEvent('Menu'    , eventParameters)
const trackRequestsEvent = eventParameters => trackEvent('Requests', eventParameters)
const trackRequestEvent  = eventParameters => trackEvent('Request' , eventParameters)
const trackUserEvent     = eventParameters => trackEvent('User'    , eventParameters)

export const loggedIn  = () => trackAuthEvent({event_label: 'logged in'})
export const loggedOut = () => trackAuthEvent({event_label: 'logged out'})

export const createRequestByFab    = () => trackMenuEvent({event_label: 'create request', value: 'fab'})
export const createRequestByButton = () => trackMenuEvent({event_label: 'create request', value: 'button'})
export const createRequestByTile   = () => trackMenuEvent({event_label: 'create request', value: 'tile'})
export const clickedLogo           = () => trackMenuEvent({event_label: 'logo clicked'})
export const choseMyRequests       = () => trackMenuEvent({event_label: 'my requests'})
export const choseMyCommitments    = () => trackMenuEvent({event_label: 'my commitments'})

export const filteredRequestsByDestination = query => trackRequestsEvent({event_label: 'destination', value: query})
export const filteredRequestsByEvent       = name  => trackRequestsEvent({event_label: 'event', value: name})
export const filteredRequestsByOrigin      = query => trackRequestsEvent({event_label: 'origin', value: query})
export const filteredRequestsBySize        = size  => trackRequestsEvent({event_label: 'filter', value: size})
export const filteredRequestsByMine        = ()    => trackRequestsEvent({event_label: 'filter', value: 'mine'})
export const filteredRequestsByProviding   = ()    => trackRequestsEvent({event_label: 'filter', value: 'providing'})
export const filteredRequestsByAll         = ()    => trackRequestsEvent({event_label: 'filter', value: 'all'})
export const viewedRequestsAs              = type  => trackRequestsEvent({event_label: 'view', value: type})
export const searchedRequests              = query => trackRequestsEvent({event_label: 'search', value: query})

export const filteredMeetingsByAll      = ()    => trackMeetingsEvent({event_label: 'filter', value: 'all'})
export const filteredMeetingsByLocation = query => trackMeetingsEvent({event_label: 'location', value: query})
export const filteredMeetingsByMine     = ()    => trackMeetingsEvent({event_label: 'filter', value: 'mine'})
export const searchedMeetings           = query => trackMeetingsEvent({event_label: 'search', value: query})

export const accepted       = () => trackRequestEvent({event_label:'accepted'})
export const offered        = () => trackRequestEvent({event_label:'offered'})
export const trackReceived  = () => trackRequestEvent({event_label:'received'})
export const trackDelivered = () => trackRequestEvent({event_label:'delivered'})
export const updated        = () => trackRequestEvent({event_label:'updated'})
export const created        = () => trackRequestEvent({event_label:'created'})
export const cancelled      = () => trackRequestEvent({event_label:'cancelled'})

export const changedNickname = () => trackUserEvent({event_label:'changed nickname'})
export const changedAvatar   = () => trackUserEvent({event_label:'changed avatar'})

export const sentMessage = () => trackEvent({event_label:'Messaging', value: 'sent'})

export const uploadedImage = () => trackEvent({event_label:'Image', value: 'uploaded'})

export const createdWatch = () => trackEvent({event_label:'watch', value: 'created'})
