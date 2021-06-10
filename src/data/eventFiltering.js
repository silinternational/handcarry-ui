import { stringIsIn } from './filtering'
import { updateQueryString } from './url'

/** NOTE: This should clear all values used by `populateEventFilterFrom()` */
export function clearEventFilter() {
  return updateQueryString({
    location: false,
    participating: false,
    search: false,
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
    participating: {
      active: queryStringData.hasOwnProperty('participating'),
      label: 'Only my events',
      isMatch: event => isParticipant(me, event),
      value: queryStringData.hasOwnProperty('participating'),
    },
    search: {
      active: !! queryStringData.search,
      label: 'Keyword: ' + queryStringData.search,
      isMatch: event => stringIsIn(queryStringData.search, event.name),
      value: queryStringData.search,
    },
  }
}

export function isParticipant(user, event) {
  const participantUserIds = event.participants.map(participant => participant.user.id)
  return participantUserIds.some(id => id === user.id)
}
