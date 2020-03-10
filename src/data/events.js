import { writable } from 'svelte/store'
import { getEvents, joinEvent } from './gqlQueries'
import { onClear } from './storage'

export const events = writable([])
export const loading = writable(false)

export async function addToMyEvents(eventId) {
  const updatedEvent = await joinEvent(eventId)

  updateLocalEvents(updatedEvent)
}

export function init() {
  loadEvents()

  onClear(reset)
}

async function loadEvents() {
  loading.set(true)
  
  const evts = await getEvents()

  events.set(evts)
  
  loading.set(false)
}

function reset() {
  events.set([])
}

const updateLocalEvents = updatedEvent => {
  events.update(currentEvents => {
    const i = currentEvents.findIndex(({ id }) => id === updatedEvent.id)
    if (i >= 0) {
      currentEvents[i] = updatedEvent
    }

    return currentEvents
  })
}
