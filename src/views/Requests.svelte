<script>
import RequestTile from '../components/RequestTile.svelte'
import { getRequests } from '../data/gqlQueries'
</script>

<div class="row">
  <div class="col-6">
    <h2>Requests</h2>
  </div>
  <div class="col-6">
    <div class="float-right">
      <a class="btn btn-sm btn-primary mx-1" href="/#/requests" aria-pressed="true" role="button">
        All
      </a>
      <a class="btn btn-sm btn-outline-primary mx-1" href="/#/requests/mine" role="button">
        My Requests
      </a>      
      <a class="btn btn-sm btn-outline-primary mx-1" href="/#/requests/new" role="button">
        Add
      </a>
    </div>
  </div>
</div>

<style>
tbody > tr {
  cursor: pointer;
}
</style>

<div class="row">
  <div class="col-12">
    <div class="alert alert-secondary" role="alert">
      Here are your WeCarry requests, those you've committed to, and those still looking for a HandCourier.
    </div>

    {#await getRequests()}
      <p>⏳ retrieving requests...</p>
    {:then data}
      <div class="d-flex justify-content-around flex-wrap">
        {#each data.posts as request}
          <div class="m-1 flex-fill"><RequestTile {request} /></div>
        {/each}
      </div>
    {:catch error}
      <p>🧨 Something went wrong: {error.message}</p>
    {/await}
  </div>
</div>
