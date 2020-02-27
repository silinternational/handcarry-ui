import { stringIsIn } from './filtering'
import { includedInSizeSelection } from './sizes'
import { updateQueryString } from './url'

/** NOTE: This should clear all values used by `populateRequestFilterFrom()` */
export function clearRequestFilter() {
  updateQueryString({
    creator: null,
    destination: null,
    event: null,
    origin: null,
    search: null,
    provider: null,
    size: null,
  })
}

/** NOTE: All values used here should be cleared by `clearRequestFilter()` */
export function populateRequestFilterFrom(queryStringData, me, events) {
  return {
    creator: {
      active: !! queryStringData.creator,
      label: 'Only my requests',
      isMatch: request => isMyRequest(request, me),
      value: queryStringData.creator,
    },
    destination: {
      active: !! queryStringData.destination,
      label: 'To: ' + queryStringData.destination,
      isMatch: request => stringIsIn(queryStringData.destination, request.destination.description),
      value: queryStringData.destination,
    },
    event: {
      active: !! queryStringData.event,
      label: 'To: ' + getEventName(events, queryStringData.event),
      isMatch: request => request.meeting && request.meeting.id === queryStringData.event,
      value: queryStringData.event,
    },
    origin: {
      active: !! queryStringData.origin,
      label: 'From: ' + queryStringData.origin,
      isMatch: request => !request.origin || stringIsIn(queryStringData.origin, request.origin.description),
      value: queryStringData.origin,
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
