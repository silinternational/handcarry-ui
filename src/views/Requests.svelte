<script>
import { requests } from '../data/gqlQueries'
import { push } from 'svelte-spa-router'
import { format } from 'date-fns'
</script>

<div class="row">
  <div class="col-6">
    <h2>Requests</h2>
  </div>
  <div class="col-6">
    <div class="float-right">
      <a class="btn btn-primary" href="/#/requests" aria-pressed="true" role="button">
        All
      </a>
      <a class="btn btn-outline-primary" href="/#/requests/mine" role="button">
        My Requests
      </a>      
      <a class="btn btn-outline-primary" href="/#/requests/new" role="button">
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
      Here are your HandCarry requests, those you've committed to, and those still looking for a HandCourier.
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Request</th>
          <th>Destination</th>
          <th>Needed After</th>
          <th>Needed Before</th>
          <th>Cost</th>
          <th>Category</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {#await requests()}
          <p>⏳ retrieving requests...</p>
        {:then data}
          {#each data.posts as request}
          <tr on:click={ () => push(`/requests/${request.id}`) }>
            <td>{ request.title }</td>
            <td>{ request.destination }</td>
            <td>{ format(new Date(request.neededAfter), 'MMM e, yyyy') }</td>
            <td>{ format(new Date(request.neededBefore), 'MMM e, yyyy') }</td>
            <td>{ request.cost || '–'}</td>
            <td>{ request.category || '–' }</td>
            <td>{ request.size || '–' }</td>
          </tr>
          {/each}
        {:catch error}
          <p>🧨 Something went wrong: {error.message}</p>
        {/await}
      </tbody>
    </table>
  </div>
</div>
