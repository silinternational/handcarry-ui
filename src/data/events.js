import { writable } from 'svelte/store'
import { GET, POST, PUT } from './api'
import { onClear } from './storage'

export const events = writable([])
export const loading = writable(false)
export const isInitialized = writable(false)

export async function join(eventId) {
  const updatedEvent = await POST('events/join', {meeting_id: eventId})

  updateLocalEvents(updatedEvent)
}

export function init() {
  loadEvents()

  onClear(reset)
}

export async function create(event) {
  const newEvent = await POST('events', {
    name: event.name,
    description: event.description,
    image_file_id: event.image_file?.id,
    location: event.location,
    start_date: event.start_date,
    end_date: event.end_date,
    more_info_url: event.more_info_url,
    emails: event.emails,
  })

  loadEvents()

  return newEvent
}

export async function update(event) {
  const updatedEvent = await PUT(`events/${event.id}`, {
    name: event.name,
    description: event.description,
    image_file_id: event.image_file?.id,
    location: event.location,
    start_date: event.start_date,
    end_date: event.end_date,
    more_info_url: event.more_info_url,
  })

  loadEvents()

  return updatedEvent
}

async function loadEvents() {
  loading.set(true)

  const evts = await GET('events')

  events.set(evts)

  loading.set(false)
  isInitialized.set(true)
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
