import { writable } from 'svelte/store'
import { GET, POST } from './api'
import { onClear } from './storage'

export const events = writable([])
export const loading = writable(false)

export async function join(eventId) {
  const updatedEvent = await POST('events/join', {meeting_id: eventId})

  updateLocalEvents(updatedEvent)
}

export function init() {
  loadEvents()

  onClear(reset)
}

export async function create(event) {
  console.log(event)
  let newEvent = await POST('events', event)

  events.update(currentEvents => [newEvent, ...currentEvents])
}

async function loadEvents() {
  loading.set(true)

  const evts = await GET('events')

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
