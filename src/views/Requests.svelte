<script>
import GridListToggle from '../components/GridListToggle.svelte'
import RequestListEntry from '../components/RequestListEntry.svelte'
import RequestQuickFilter from '../components/RequestQuickFilter.svelte'
import RequestTile from '../components/RequestTile.svelte'
import NewRequestTile from '../components/NewRequestTile.svelte'
import SizeFilter from '../components/SizeFilter.svelte'
import { getRequests } from '../data/gqlQueries'
import { querystring } from 'svelte-spa-router'
import qs from 'qs'
import { updateQueryString } from '../data/url'
import Icon from 'fa-svelte'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { clearFilter, filterRequests, populateFilterFrom } from '../data/requestFiltering'

let errorMessage = ''
let hasLoaded = false

let filteredRequests
let requestFilter = {}
let me = {}
let queryStringData
let requests = []; loadRequests()
let searchText = ''
let showAsList = false

$: queryStringData = qs.parse($querystring)
$: requestFilter = populateFilterFrom(queryStringData)
$: searchText = queryStringData.search || ''
$: filteredRequests = filterRequests(requests, requestFilter, searchText)
$: showAsList = queryStringData.hasOwnProperty('list')

async function loadRequests() {
  try {
    const response = await getRequests()
    me = response.user
    requests = response.posts
  } catch (error) {
    errorMessage = error.message
  }
  hasLoaded = true
}

function selectSize(sizeString) {
  let lowerCaseSize = String(sizeString).toLowerCase()
  
  // If it's the default value, just remove the size filter from the query string.
  if (lowerCaseSize === 'xlarge') {
    lowerCaseSize = null
  }
  
  updateQueryString($querystring, {
    size: lowerCaseSize,
  })
}

function selectCreator(userId) {
  updateQueryString($querystring, {
    creator: userId,
    provider: null,
    size: null,
  })
}

function selectProvider(userId) {
  updateQueryString($querystring, {
    creator: null,
    provider: userId,
    size: null,
  })
}

function showAll() {
  clearFilter($querystring)
}

function viewAsGrid() {
  updateQueryString($querystring, {
    list: null,
  })
}

function viewAsList() {
  updateQueryString($querystring, {
    list: 1,
  })
}

function searchForText(searchText) {
  updateQueryString($querystring, {
    search: searchText,
  })
}
</script>

<div class="row">
  <div class="col-12 col-md-auto text-center text-sm-left">
    <h2>Requests</h2>
  </div>
  <div class="col text-right">
    <div class="row">
      <div class="col-12 text-center col-sm text-sm-left text-md-right">
        <RequestQuickFilter {me} {requestFilter} buttonCssClass="my-1 mx-0"
                            on:all={showAll} on:my-requests={() => selectCreator(me.id)} on:my-commitments={() => selectProvider(me.id)} />
      </div>
      <div class="col-12 text-center col-sm-auto text-sm-right">
        <GridListToggle on:list={viewAsList} on:grid={viewAsGrid} {showAsList} buttonCssClass="my-1 mx-0" />
      </div>
    </div>
  </div>
</div>

<div class="row mt-2">
  <div class="col-12 col-md-4 col-lg-3 mb-2">
    <div class="accordion" id="requestFilters">
      <div class="card border-bottom"><!-- Note: Remove "border-bottom" if another card is added. -->
        <div class="card-header p-0" id="headingOne">
          <h4 class="m-0">
            <button class="btn btn-block" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Filters
            </button>
          </h4>
        </div>
        
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#requestFilters">
          <div class="card-body text-center">
            <b class="d-inline-block d-md-block">Max. size:</b>
            <div class="d-inline-block text-md-left">
              <SizeFilter cssClass="d-md-block" initialValue={queryStringData.size} on:selection={event => selectSize(event.detail)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col col-sm-10 offset-sm-1 col-md offset-md-0">
    <p class:d-none={hasLoaded}>⏳ retrieving requests...</p>
    
    <div class:d-none={!hasLoaded} class="form-row align-items-stretch">
      <div class="col-12">
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text"><Icon icon={faSearch} /></div>
          </div>
          <input type="text" class="form-control" placeholder="Search" value={searchText} on:input={event => searchForText(event.target.value)} />
        </div>
      </div>
      {#each filteredRequests as request}
        {#if showAsList }
          <div class="col-12 my-1"><RequestListEntry {request} /></div>
        {:else}
          <div class="col-6 mb-1 my-sm-1 col-md-6 col-lg-4 col-xl-3"><RequestTile {request} /></div>
        {/if}
      {/each}
      
      {#if !filteredRequests.length}
        <div class="col-12 my-2 mx-5"><i class="text-muted">None found</i></div>
      {/if}
      
      <div class:d-md-block={showAsList} class="d-none col-12 my-1">
        <a href="#/requests/new" class="btn btn-success btn-sm"><span style="font-size: larger">+</span> Make a request</a>
      </div>
      <div class:d-md-block={!showAsList} class="d-none col-6 mb-1 my-sm-1 col-md-6 col-lg-4 col-xl-3"><NewRequestTile /></div>
    </div>
    
    <p class:d-none={!errorMessage}>🧨 Something went wrong: {errorMessage}</p>
  </div>
</div>
