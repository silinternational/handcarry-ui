import { filterItems, stringIsIn } from './filtering'
import { getSelectedSizes } from './sizes'
import { updateQueryString } from './url'

export function populateRequestFilterFrom(queryStringData) {
  return {
    createdBy: { id: queryStringData.creator },
    search: queryStringData.search,
    provider: { id: queryStringData.provider },
    size: getSelectedSizes(queryStringData.size),
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

export function filterRequests(requests, filter) {
  return filterItems(requests, filter, requestMatchesSearchText)
}

function requestMatchesSearchText(request, searchText) {
  return stringIsIn(searchText, request.title) ||
         stringIsIn(searchText, request.destination.description) ||
         stringIsIn(searchText, request.createdBy.nickname)
}
