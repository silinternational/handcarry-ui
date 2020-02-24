import { filterItems, stringIsIn } from './filtering'
import { includedInSizeSelection } from './sizes'
import { updateQueryString } from './url'

export function populateRequestFilterFrom(queryStringData, me) {
  return {
    creator: {
      active: !! queryStringData.creator,
      getLabel: () => 'Only my requests',
      isMatch: request => isMyRequest(request, me),
      value: queryStringData.creator,
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

/** NOTE: This should clear all values used by `populateFilterFrom()` */
export function clearRequestFilter() {
  updateQueryString({
    creator: null,
    search: null,
    provider: null,
    size: null,
  })
}

export function filterRequests(items, filters) {
  let results = items.slice(0); // Shallow-clone the array quickly.

  Object.values(filters).filter(isActive).forEach(filter => {
    results = results.filter(filter.isMatch)
  })

  return results
}

function iAmProviding(request, me) {
  return me.id && request.provider && request.provider.id === me.id
}

function isActive(filter) {
  return filter.active
}

function isMyRequest(request, me) {
  return me.id && request.createdBy && request.createdBy.id === me.id
}

function requestMatchesSearchText(request, searchText) {
  return stringIsIn(searchText, request.title) ||
         stringIsIn(searchText, request.destination.description) ||
         stringIsIn(searchText, request.createdBy.nickname)
}
