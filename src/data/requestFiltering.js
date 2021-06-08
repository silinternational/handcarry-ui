import { stringIsIn, isNear, setFilters, removeFilter } from './filtering'
import { includedInSizeSelection } from './sizes'
import { updateQueryString } from './url'

/** NOTE: This should clear all values used by `populateRequestFilterFrom()` */
export function clearRequestFilter() {
  return updateQueryString({
    creator: false,
    toDescription: false,
    toCountry: false,
    toLatitude: false,
    toLongitude: false,
    fromDescription: false,
    fromCountry: false,
    fromLatitude: false,
    fromLongitude: false,
    event: false,
    search: false,
    provider: false,
    size: false,
  })
}

/** NOTE: All values used here should be cleared by `clearRequestFilter()` */
export function populateRequestFilterFrom(queryStringData, me, events) {
  let destination = queryStringData.toDescription && {
    description: queryStringData.toDescription,
    country: queryStringData.toCountry,
    latitude: Number(queryStringData.toLatitude),
    longitude: Number(queryStringData.toLongitude),
  }
  let origin = queryStringData.fromDescription && {
    description: queryStringData.fromDescription,
    country: queryStringData.fromCountry,
    latitude: Number(queryStringData.fromLatitude),
    longitude: Number(queryStringData.fromLongitude),
  }

  return {
    creator: {
      active: !! queryStringData.creator,
      label: 'Only my requests',
      isMatch: request => isMyRequest(request, me),
      value: queryStringData.creator,
    },
    destination: {
      active: !! queryStringData.toDescription,
      label: labelFor('destination', queryStringData.toDescription),
      isMatch: request => isNear(destination, request.destination),
      value: destination,
    },
    event: {
      active: !! queryStringData.event,
      label: labelFor('meeting', getEventName(events, queryStringData.event)),
      isMatch: request => request.meeting && request.meeting.id === queryStringData.event,
      value: queryStringData.event,
    },
    origin: {
      active: !! queryStringData.fromDescription,
      label: labelFor('origin', queryStringData.fromDescription),
      isMatch: request => isNear(origin, request.origin),
      value: origin,
    },
    requestSearch: {
      active: !! queryStringData.search,
      label: labelFor('searchText', queryStringData.search),
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
      label: labelFor('size', queryStringData.size),
      isMatch: request => includedInSizeSelection(request.size, queryStringData.size),
      value: queryStringData.size,
    },
  }
}

export function labelFor(name, value) {
  const map = {
    destination: 'To: ',
    meeting: 'To: ',
    origin: 'From: ',
    searchText: 'Keyword: ',
    size: 'Size: ',
  }

  return `${map[name]} ${value}`
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

/**
 * Remove the named request filter from the query string.
 *
 * @param {string} name
 */
export function removeRequestFilter(name) {
  if (name === 'destination'){
    return setFilters({
      toDescription: false,
      toCountry: false,
      toLatitude: false,
      toLongitude: false,
    })
  }

  if  (name === 'origin'){
    return setFilters({
      fromDescription: false,
      fromCountry: false,
      fromLatitude: false,
      fromLongitude: false,
    })
  }

  return removeFilter(name)
}
