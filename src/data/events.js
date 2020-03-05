import { writable } from 'svelte/store'
import { getEvents } from './gqlQueries'
import { onClear } from './storage'

export const events = writable([])
export const loading = writable(false)

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
