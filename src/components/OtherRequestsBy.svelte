<script>
import RequestCard from 'components/RequestCard.svelte'
import { requests } from 'data/requests.js'

export let request
export let requester

let requestsFromThisRequester = []

$: if (requester.id) {
  requestsFromThisRequester = $requests.filter(({ created_by }) => created_by.id === requester.id)
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

.row-spaceing {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>

{#if otherRequests.length > 0 }
  <hr />
  <div class="row row-spaceing">
    <div class="col-12"><h4>{requester.nickname}'s other requests</h4></div>
    {#each otherRequests as otherRequest }
      <div class="col-auto">
        <div class="request-tile-container h-100"><RequestCard request={otherRequest} smaller /></div>
      </div>
    {/each}
  </div>
{/if}
