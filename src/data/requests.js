import { writable } from 'svelte/store'
import { getRequests, createRequest, cancelRequest } from './gqlQueries'

export const requests = writable([])
export const loading = writable(false)

init()

function init() {
  loadRequests()

  const EVERY_10_MINUTES = 60 * 1000 * 10
  setInterval(loadRequests, EVERY_10_MINUTES)
  // TODO: consider situations where we'd want the intervals cancelled, e.g, 401    
}

async function loadRequests() {
  try {
    loading.set(true)

    const { posts } = await getRequests()

    requests.set(posts)
  } catch (e) {
    console.error(`requests.js:loadRequests: `, e)
    // TODO: errorhandling?
  } finally {
    loading.set(false)
  }
}

export async function create(request) {
  try {
    const { createPost } = await createRequest(request)
    const newRequest = createPost

    requests.update(currentRequests => [newRequest, ...currentRequests])
  } catch (e) {
    console.error(`requests.js:create: `, e)
    //TODO: errorhandling?
  }
}

export async function cancel(requestId) {
  try {
    await cancelRequest(requestId)

    requests.update(currentRequests => currentRequests.filter(({id}) => id !== requestId))
  } catch (e) {
    console.error(`requests.js:cancel: `, e)
    //TODO: errorhandling?
  }
}
