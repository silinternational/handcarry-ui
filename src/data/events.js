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
  isInitialized.set(true)
}

export async function addCoOrganizers(id, emails) {
  try {
    loading.set(true)

    // TODO: redo when it is known what the format will be
    // return await POST(`/events/${id}/invite`, {emails: emails})
    console.log(emails)
  } catch(err) {
    throw err
  } finally {
    loading.set(false)
  }
}

export async function inviteUsers(id, emails, sendEmail) {
  try {
    loading.set(true)

    // TODO: add support for 'sendEmail' field to determine wether to send an invite email to the user(s)
    return await POST(`events/${id}/invite`, {emails: emails, send_email: sendEmail})
  } catch (err) {
    throw err
  } finally {
    loading.set(false)
  }
}

export async function getOneEvent(id) {
  try {
    loading.set(true)

    return await GET(`/events/${id}`)
  } catch (err) {
    throw err
  } finally {
    loading.set(false)
  }
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

  events.update(currentEvents => [newEvent, ...currentEvents])
  sort()

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

  updateLocalEvents(updatedEvent)
  sort()

  return updatedEvent
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

function sort() {
  events.update(currentEvents => currentEvents.sort((a, b) => new Date(a.start_date) - new Date(b.start_date)))
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
