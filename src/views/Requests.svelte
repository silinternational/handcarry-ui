<script>
import GridListToggle from '../components/GridListToggle.svelte'
import RequestListEntry from '../components/RequestListEntry.svelte'
import RequestFilters from '../components/RequestFilters.svelte'
import RequestFilterTags from '../components/RequestFilterTags.svelte'
import RequestTile from '../components/RequestTile.svelte'
import NewRequestTile from '../components/NewRequestTile.svelte'
import { me } from '../data/user'
import { requests, loading } from '../data/requests'
import { location, querystring } from 'svelte-spa-router'
import qs from 'qs'
import { updateQueryString } from '../data/url'
import { clearFilter, filterRequests, populateFilterFrom } from '../data/requestFiltering'
import { viewedRequestsAsGrid, viewedRequestsAsList } from '../data/analytics'

let filteredRequests
let requestFilter = {}
let queryStringData
let showAsList = false

$: queryStringData = qs.parse($querystring)
$: requestFilter = populateFilterFrom(queryStringData)
$: filteredRequests = filterRequests($requests, requestFilter)
$: showAsList = queryStringData.hasOwnProperty('list')

function onResetFilter() {
  clearFilter($location, $querystring)
}

function viewAsGrid() {
  updateQueryString($location, $querystring, {
    list: null,
  })

  viewedRequestsAsGrid()
}

function viewAsList() {
  updateQueryString($location, $querystring, {
    list: 1,
  })

  viewedRequestsAsList()
}

function onRemoveFilter(event) {
  const updates = {}
  updates[event.detail] = null
  updateQueryString($location, $querystring, updates)
}

function onSetFilter(event) {
  const updates = event.detail
  updateQueryString($location, $querystring, updates)
}
</script>

<div class="row">
  <div class="col-12 col-md-4 col-lg-3">
    <h2>Requests</h2>
  </div>
  <div class="col text-right">
    <div class="row">
      <div class="col-12 text-center col-sm text-sm-left text-md-right">
        <RequestFilterTags filter={requestFilter} on:remove={onRemoveFilter} />
      </div>
      <div class="col-12 text-center col-sm-auto text-sm-right">
        <GridListToggle on:list={viewAsList} on:grid={viewAsGrid} {showAsList} buttonCssClass="my-1 mx-0" />
      </div>
    </div>
  </div>
</div>

<div class="row mt-2">
  <div class="col-12 col-md-4 col-lg-3 mb-2">
    <div>
      <RequestFilters filter={requestFilter} on:remove={onRemoveFilter} on:reset={onResetFilter} on:set={onSetFilter} />
    </div>
  </div>
  <div class="col">
    <div class="form-row align-items-stretch">
      {#if $loading}
        <p>⏳ retrieving requests...</p>
      {:else}
        {#each filteredRequests as request}
          {#if showAsList }
            <div class="col-12 my-1"><RequestListEntry {request} /></div>
          {:else}
            <div class="col-6 my-1 col-lg-4"><RequestTile {request} /></div>
          {/if}
        {/each}
        
        {#if !filteredRequests.length}
          <div class="col-12 my-2 mx-5"><i class="text-muted">None found</i></div>
        {/if}
      {/if}

      <div class:d-md-block={showAsList} class="d-none col-12 my-1">
        <a href="#/requests/new" class="btn btn-success btn-sm"><span style="font-size: larger">+</span> Make a request</a>
      </div>
      
      <div class:d-md-block={!showAsList} class="d-none col-6 mb-1 my-sm-1 col-md-6 col-lg-4"><NewRequestTile /></div>
    </div>
  </div>
</div>
