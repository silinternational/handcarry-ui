import { stringIsIn } from './filtering'
import { includedInSizeSelection } from './sizes'
import { updateQueryString } from './url'

/** NOTE: This should clear all values used by `populateRequestFilterFrom()` */
export function clearRequestFilter() {
  updateQueryString({
    creator: null,
    destination: null,
    origin: null,
    search: null,
    provider: null,
    size: null,
  })
}

/** NOTE: All values used here should be cleared by `clearRequestFilter()` */
export function populateRequestFilterFrom(queryStringData, me) {
  return {
    creator: {
      active: !! queryStringData.creator,
      getLabel: () => 'Only my requests',
      isMatch: request => isMyRequest(request, me),
      value: queryStringData.creator,
    },
    destination: {
      active: !! queryStringData.destination,
      getLabel: () => 'To: ' + queryStringData.destination,
      isMatch: request => stringIsIn(queryStringData.destination, request.destination.description),
      value: queryStringData.destination,
    },
    origin: {
      active: !! queryStringData.origin,
      getLabel: () => 'From: ' + queryStringData.origin,
      isMatch: request => !request.origin || stringIsIn(queryStringData.origin, request.origin.description),
      value: queryStringData.origin,
    },
    search: {
      active: !! queryStringData.search,
      getLabel: () => 'Keyword: ' + queryStringData.search,
      isMatch: request => requestMatchesSearchText(request, queryStringData.search),
      value: queryStringData.search,
    },
    provider: {
      active: !! queryStringData.provider,
      getLabel: () => 'Only my commitments',
      isMatch: request => iAmProviding(request, me),
      value: queryStringData.provider,
    },
    size: {
      active: !! queryStringData.size,
      getLabel: () => 'Size: ' + queryStringData.size,
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

function requestMatchesSearchText(request, searchText) {
  return stringIsIn(searchText, request.title) ||
         stringIsIn(searchText, request.destination.description) ||
         stringIsIn(searchText, request.createdBy.nickname)
}
