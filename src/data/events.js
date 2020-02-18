import { writable } from 'svelte/store'
import { getEvents } from './gqlQueries'
import { register } from './reset'

export const events = writable([])

export function init() {
  loadEvents()

  register(reset)
}

async function loadEvents() {
  const evts = await getEvents()

  events.set(evts)
}

function reset() {
  events.set([])
}
