import { isItemInList, stringIsIn } from './filtering'
import { updateQueryString } from './url'

/** NOTE: This should clear all values used by `populateEventFilterFrom()` */
export function clearEventFilter() {
  updateQueryString({
    location: null,
    participant: null,
    search: null,
  })
}

/** NOTE: All values used here should be cleared by `clearEventFilter()` */
export function populateEventFilterFrom(queryStringData, me) {
  return {
    location: {
      active: !! queryStringData.location,
      label: 'Location: ' + queryStringData.location,
      isMatch: event => stringIsIn(queryStringData.location, event.location.description),
      value: queryStringData.location,
    },
    participant: {
      active: !! queryStringData.participant,
      label: 'Only my events',
      isMatch: event => isItemInList(event, me.meetingsAsParticipant),
      value: queryStringData.participant,
    },
    search: {
      active: !! queryStringData.search,
      label: 'Keyword: ' + queryStringData.search,
      isMatch: event => stringIsIn(queryStringData.search, event.name),
      value: queryStringData.search,
    },
  }
}
