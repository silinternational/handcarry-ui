import { filterItems, stringIsIn } from './filtering'
import { updateQueryString } from './url'

export function populateEventFilterFrom(queryStringData) {
  return {
    location: {
      active: !! queryStringData.location,
      getLabel: () => 'Location: ' + queryStringData.location,
      isMatch: event => stringIsIn(queryStringData.location, event.location.description),
      value: queryStringData.location,
    },
    search: {
      active: !! queryStringData.search,
      getLabel: () => 'Keyword: ' + queryStringData.search,
      isMatch: event => stringIsIn(queryStringData.search, event.name),
      value: queryStringData.search,
    },
  }
}

/** NOTE: This should clear all values used by `populateFilterFrom()` */
export function clearEventFilter() {
  updateQueryString({
    location: null,
    search: null,
  })
}

export function filterEvents(items, filters) {
  let results = items.slice(0); // Shallow-clone the array quickly.
  
  Object.values(filters).filter(isActive).forEach(filter => {
    results = results.filter(filter.isMatch)
  })

  return results
}

function isActive(filter) {
  return filter.active
}