<script>
import { requests } from '../data/requests'
import RequestTile from './RequestTile.svelte'

export let request
export let requester

let requestsFromThisRequester = []

$: if (requester.id) {
  requestsFromThisRequester = $requests.filter(({ createdBy }) => createdBy.id === requester.id)
}
$: otherRequests = requestsFromThisRequester.filter(({id}) => id !== request.id)
</script>

<style>
hr {
  width: 80%;
}

.request-tile-container {
  width: 128px;
}
</style>

{#if otherRequests.length > 0 }
  <hr />
  <div class="row my-4">
    <div class="col-12"><h4 class="text-blue">{requester.nickname}'s other requests</h4></div>
    {#each otherRequests as otherRequest }
      <div class="col-auto">
        <div class="request-tile-container"><RequestTile request={otherRequest} smaller /></div>
      </div>
    {/each}
  </div>
{/if}
