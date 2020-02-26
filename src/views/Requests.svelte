<script>
import FilteredDisplay from '../components/FilteredDisplay.svelte'
import GridListToggle from '../components/GridListToggle.svelte'
import RequestListEntry from '../components/RequestListEntry.svelte'
import RequestFilters from '../components/RequestFilters.svelte'
import RequestTile from '../components/RequestTile.svelte'
import NewRequestTile from '../components/NewRequestTile.svelte'
import { me } from '../data/user'
import { requests, loading } from '../data/requests'
import { querystring } from 'svelte-spa-router'
import qs from 'qs'
import { updateQueryString } from '../data/url'
import { populateRequestFilterFrom } from '../data/requestFiltering'
import { viewedRequestsAsGrid, viewedRequestsAsList } from '../data/analytics'
import { flip } from 'svelte/animate';
import { send, receive } from '../data/transitions'

let requestFilter = {}
let showAsList = false

$: queryStringData = qs.parse($querystring)
$: requestFilter = populateRequestFilterFrom(queryStringData, $me)
$: showAsList = queryStringData.hasOwnProperty('list')

function viewAsGrid() {
  updateQueryString({ list: null })

  viewedRequestsAsGrid()
}

function viewAsList() {
  updateQueryString({ list: 1 })

  viewedRequestsAsList()
}
</script>

<FilteredDisplay title="Requests" filter={requestFilter} items={$requests}>
  <div slot="toggles">
    <GridListToggle on:list={viewAsList} on:grid={viewAsGrid} {showAsList} buttonCssClass="my-1 mx-0" />
  </div>
  <div slot="filters">
    <RequestFilters filter={requestFilter} />
  </div>
  <div slot="items" let:items={filteredRequests} class="form-row align-items-stretch">
    {#if $loading}
      <p>⏳ retrieving requests...</p>
    {:else if filteredRequests.length < 1}
      <div class="col-12 my-2 mx-5"><i class="text-muted">None found</i></div>
    {:else}
      {#if showAsList }
        {#each filteredRequests as request (request.id) }
          <div class="col-12 my-1"
               animate:flip="{{ duration: 250 }}"><RequestListEntry {request} /></div>
        {/each}
      {:else}
        {#each filteredRequests as request (request.id) }
          <div class="col-6 my-1 col-lg-4"
               animate:flip="{{ duration: 250 }}"><RequestTile {request} /></div>
        {/each}
      {/if}
    {/if}

    <div class:d-md-block={showAsList} class="d-none col-12 my-1">
      <a href="#/requests/new" class="btn btn-success btn-sm"><span style="font-size: larger">+</span> Make a request</a>
    </div>
    
    <div class:d-md-block={!showAsList} class="d-none col-6 mb-1 my-sm-1 col-md-6 col-lg-4"><NewRequestTile /></div>
  </div>
</FilteredDisplay>