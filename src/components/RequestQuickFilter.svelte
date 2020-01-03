<script>
import { createEventDispatcher } from 'svelte'
import { me } from '../data/user'

export let buttonCssClass = ''
export let requestFilter = {}

const dispatch = createEventDispatcher()

let isAllRequests
let isJustMyRequests
let isJustMyCommitments

$: isAllRequests = !isCreatorSelected(requestFilter) && !isProviderSelected(requestFilter)
$: isJustMyRequests = isSelectedCreator($me.id, requestFilter)
$: isJustMyCommitments = isSelectedProvider($me.id, requestFilter)

function isCreatorSelected(requestFilter) {
  return requestFilter.createdBy && requestFilter.createdBy.id
}

function isProviderSelected(requestFilter) {
  return requestFilter.provider && requestFilter.provider.id
}

function isSelectedCreator(userId, requestFilter) {
  if (userId) {
    return requestFilter.createdBy && requestFilter.createdBy.id && requestFilter.createdBy.id == userId
  }
  return false
}

function isSelectedProvider(userId, requestFilter) {
  if (userId) {
    return requestFilter.provider && requestFilter.provider.id && requestFilter.provider.id == userId
  }
  return false
}
</script>

<button class="btn btn-sm {buttonCssClass}" on:click={() => dispatch('all')} class:btn-primary={isAllRequests} class:btn-outline-primary={!isAllRequests}>
  All
</button>
<button class="btn btn-sm {buttonCssClass}" on:click={() => dispatch('my-requests')} class:btn-primary={isJustMyRequests} class:btn-outline-primary={!isJustMyRequests}>
  My Requests
</button>
<button class="btn btn-sm {buttonCssClass}" on:click={() => dispatch('my-commitments')} class:btn-primary={isJustMyCommitments} class:btn-outline-primary={!isJustMyCommitments}>
  My Commitments
</button>
