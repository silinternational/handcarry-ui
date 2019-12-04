import { writable } from 'svelte/store'
import { 
  createRequest, 
  updateRequest, 
  getRequests, 
  cancelRequest,
  commitToProvide,
  acceptCommittment,
  delivered,
  received,
} from './gqlQueries'

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

    const currentRequests = await getRequests()

    requests.set(currentRequests)
  } catch (e) {
    console.error(`requests.js:loadRequests: `, e)
    // TODO: errorhandling?
  } finally {
    loading.set(false)
  }
}

export async function create(request) {
  try {
    const newRequest = await createRequest(request)

    requests.update(currentRequests => [newRequest, ...currentRequests])
  } catch (e) {
    console.error(`requests.js:create: `, e)
    //TODO: errorhandling?
  }
}

export async function update(request) {
  try {
    const updatedRequest = await updateRequest(request)

    requests.update(currentRequests => {
      const i = currentRequests.findIndex(({ id }) => id === updatedRequest.id)
      if (i >= 0) {
        currentRequests[i] = updatedRequest
      } 
      
      return currentRequests
    })
  } catch (e) {
    console.error(`requests.js:update: `, e)
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

export async function provide(requestId) {
  try {
    const updatedRequest = await commitToProvide(requestId)

    updateLocalRequests(updatedRequest)

    return updatedRequest
  } catch (e) {
    console.error(`requests.js:provide: `, e)
    //TODO: errorhandling?
  }
}

export async function accept(requestId) {
  try {
    const updatedRequest = await acceptCommittment(requestId)

    updateLocalRequests(updatedRequest)

    return updatedRequest
  } catch (e) {
    console.error(`requests.js:accept: `, e)
    //TODO: errorhandling?
  }
}

export async function deliver(requestId) {
  try {
    const updatedRequest = await delivered(requestId)

    updateLocalRequests(updatedRequest)

    return updatedRequest
  } catch (e) {
    console.error(`requests.js:deliver: `, e)
    //TODO: errorhandling?
  }
}

export async function receive(requestId) {
  try {
    const updatedRequest = await received(requestId)

    updateLocalRequests(updatedRequest)

    return updatedRequest
  } catch (e) {
    console.error(`requests.js:receive: `, e)
    //TODO: errorhandling?
  }
}

const updateLocalRequests = updatedRequest => {
  requests.update(currentRequests => {
    const i = currentRequests.findIndex(({ id }) => id === updatedRequest.id)
    if (i >= 0) {
      currentRequests[i] = updatedRequest
    }

    return currentRequests
  })
}
