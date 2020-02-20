import { updateQueryString } from '../data/url'

export function populateFilterFrom(queryStringData) {
  return {
    search: queryStringData.search,
  }
}

/** NOTE: This should clear all values used by `populateFilterFrom()` */
export function clearFilter() {
  updateQueryString({
    search: null,
  })
}

export function filterEvents(events, filter) {
  let results = events.slice(0); // Shallow-clone the array quickly.
  const eventFilter = Object.assign({}, filter)
  
  const searchText = eventFilter.search
  delete eventFilter.search

  for (const property in eventFilter) {
    results = results.filter(event => matchesProperty(event, eventFilter, property))
  }

  if (searchText) {
    results = results.filter(event => matchesSearchText(event, searchText))
  }

  return results
}

function matchesProperty(event, eventFilter, property) {
  if (!eventFilter[property]) {
    return true
  }

  if (!event) {
    return false
  }

  if (Array.isArray(eventFilter[property])) {
    return (eventFilter[property].indexOf(event[property]) >= 0)
  } else if (typeof eventFilter[property] === 'object') {
    for (const subProperty in eventFilter[property]) {
      if (!matchesProperty(event[property], eventFilter[property], subProperty)) {
        return false
      }
    }
    return true
  }
  return event[property] === eventFilter[property]
}

function matchesSearchText(event, searchText) {
  return stringIsIn(searchText, event.name)
}

function stringIsIn(needle, haystack) {
  return (haystack || '').toLowerCase().indexOf(String(needle).toLowerCase()) >= 0
}
