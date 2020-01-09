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
export function sendAnalyticEvent(category, action, label) {
  ga('send', 'event', category, action, label)
}
