import { stringIsIn } from './filtering'
import { updateQueryString } from './url'

/** NOTE: This should clear all values used by `populateEventFilterFrom()` */
export function clearEventFilter() {
  updateQueryString({
    location: null,
    search: null,
  })
}

/** NOTE: All values used here should be cleared by `clearEventFilter()` */
export function populateEventFilterFrom(queryStringData) {
  return {
    location: {
      active: !! queryStringData.location,
      label: 'Location: ' + queryStringData.location,
      isMatch: event => stringIsIn(queryStringData.location, event.location.description),
      value: queryStringData.location,
    },
    search: {
      active: !! queryStringData.search,
      label: 'Keyword: ' + queryStringData.search,
      isMatch: event => stringIsIn(queryStringData.search, event.name),
      value: queryStringData.search,
    },
  }
}
