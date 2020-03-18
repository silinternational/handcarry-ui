import { stringIsIn, near } from './filtering'
import { includedInSizeSelection } from './sizes'
import { updateQueryString } from './url'

/** NOTE: This should clear all values used by `populateRequestFilterFrom()` */
export function clearRequestFilter() {
  updateQueryString({
    creator: false,
    destination: false,
    event: false,
    origin: false,
    search: false,
    provider: false,
    size: false,
  })
}

/** NOTE: All values used here should be cleared by `clearRequestFilter()` */
export function populateRequestFilterFrom(queryStringData, me, events) {
  let dest = queryStringData.destination && JSON.parse(queryStringData.destination)
  let orig = queryStringData.origin && JSON.parse(queryStringData.origin)
  
  return {
    creator: {
      active: !! queryStringData.creator,
      label: 'Only my requests',
      isMatch: request => isMyRequest(request, me),
      value: queryStringData.creator,
    },
    destination: {
      active: !! queryStringData.destination,
      label: dest && 'To: ' + dest.description,
      isMatch: request => near(dest, request.destination),
      value: dest && dest.description,
      obj: dest
    },
    event: {
      active: !! queryStringData.event,
      label: 'To: ' + getEventName(events, queryStringData.event),
      isMatch: request => request.meeting && request.meeting.id === queryStringData.event,
      value: queryStringData.event,
    },
    origin: {
      active: !! queryStringData.origin,
      label: orig && 'From: ' + orig.description,
      isMatch: request => !request.origin || near(orig, request.origin),
      value: orig && orig.description,
    },
    search: {
      active: !! queryStringData.search,
      label: 'Keyword: ' + queryStringData.search,
      isMatch: request => requestMatchesSearchText(request, queryStringData.search),
      value: queryStringData.search,
    },
    provider: {
      active: !! queryStringData.provider,
      label: 'Only my commitments',
      isMatch: request => iAmProviding(request, me),
      value: queryStringData.provider,
    },
    size: {
      active: !! queryStringData.size,
      label: 'Size: ' + queryStringData.size,
      isMatch: request => includedInSizeSelection(request.size, queryStringData.size),
      value: queryStringData.size,
    },
  }
}

function iAmProviding(request, me) {
  return me.id && request.provider && request.provider.id === me.id
}

function isMyRequest(request, me) {
  return me.id && request.createdBy && request.createdBy.id === me.id
}

function getEventName(events, eventId) {
  const event = events.find(({ id }) => id === eventId) || {}
  return event.name || '(Unknown event)'
}

function requestMatchesSearchText(request, searchText) {
  return stringIsIn(searchText, request.title) ||
         stringIsIn(searchText, request.destination.description) ||
         stringIsIn(searchText, request.createdBy.nickname)
}
