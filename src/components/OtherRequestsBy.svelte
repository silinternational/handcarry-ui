<script>
import { requests } from '../data/requests'
import RequestTile from './RequestTile.svelte'

export let request
export let requester

let requestsFromThisRequester = []

$: if (requester.id) {
  requestsFromThisRequester = $requests.filter(({ createdBy }) => createdBy.id === requester.id)
}
</script>

<style>
.request-tile-container {
  width: 128px;
}
</style>

<div class="row my-4">
  {#if requestsFromThisRequester.length > 0 }
    <div class="col-12"><h4 class="text-blue">{requester.nickname}'s other requests</h4></div>
  {/if}
  {#each requestsFromThisRequester as otherRequest }
    {#if otherRequest.id !== request.id}
      <div class="col-auto">
        <div class="request-tile-container"><RequestTile request={otherRequest} smaller /></div>
      </div>
    {/if}
  {/each}
</div>
