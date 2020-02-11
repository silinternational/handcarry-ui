import { writable } from 'svelte/store'
import { 
  createRequest, 
  updateRequest, 
  getRequests, 
  cancelRequest,
  commitToProvide,
  acceptCommitment,
  delivered,
  received,
} from './gqlQueries'
import { register } from './reset'

export const requests = writable([])
export const loading = writable(false)

let intervalId = 0

export function init() {
  const EVERY_10_MINUTES = 60 * 1000 * 10
  intervalId = setInterval(loadRequests, EVERY_10_MINUTES)
  
  loadRequests()

  register(reset)
}

async function loadRequests() {
  try {
    loading.set(true)

    const currentRequests = await getRequests()

    requests.set(currentRequests)
  } catch (e) {
    clearInterval(intervalId)

    throw e
  } finally {
    loading.set(false)
  }
}

export async function create(request) {
  const newRequest = await createRequest(request)

  requests.update(currentRequests => [newRequest, ...currentRequests])
}

export async function update(request) {
  const updatedRequest = await updateRequest(request)

  requests.update(currentRequests => {
    const i = currentRequests.findIndex(({ id }) => id === updatedRequest.id)
    if (i >= 0) {
      currentRequests[i] = updatedRequest
    } 
    
    return currentRequests
  })
}

export async function cancel(requestId) {
  await cancelRequest(requestId)

  requests.update(currentRequests => currentRequests.filter(({id}) => id !== requestId))
}

export async function provide(requestId) {
  const updatedRequest = await commitToProvide(requestId)

  updateLocalRequests(updatedRequest)

  return updatedRequest
}

export async function accept(requestId) {
  const updatedRequest = await acceptCommitment(requestId)

  updateLocalRequests(updatedRequest)

  return updatedRequest
}

export async function deliver(requestId) {
  const updatedRequest = await delivered(requestId)

  updateLocalRequests(updatedRequest)

  return updatedRequest
}

export async function receive(requestId) {
  const updatedRequest = await received(requestId)

  updateLocalRequests(updatedRequest)

  return updatedRequest
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

function reset() {
  requests.set([])
  loading.set(false)
}