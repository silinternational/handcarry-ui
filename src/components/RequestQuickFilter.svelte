<script>
import { createEventDispatcher } from 'svelte'

export let buttonCssClass = ''
export let isAllRequests
export let isJustMyRequests
export let isJustMyCommitments

const dispatch = createEventDispatcher()
</script>

<button class="btn btn-sm my-1 mx-0" on:click={() => dispatch('all')} class:btn-primary={isAllRequests} class:btn-outline-primary={!isAllRequests}>
  All
</button>
<button class="btn btn-sm my-1 mx-0" on:click={() => dispatch('my-requests')} class:btn-primary={isJustMyRequests} class:btn-outline-primary={!isJustMyRequests}>
  My Requests
</button>
<button class="btn btn-sm my-1 mx-0" on:click={() => dispatch('my-commitments')} class:btn-primary={isJustMyCommitments} class:btn-outline-primary={!isJustMyCommitments}>
  My Commitments
</button>
