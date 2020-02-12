<script>
import GridListToggle from '../components/GridListToggle.svelte'
import RequestListEntry from '../components/RequestListEntry.svelte'
import RequestQuickFilter from '../components/RequestQuickFilter.svelte'
import RequestTile from '../components/RequestTile.svelte'
import NewRequestTile from '../components/NewRequestTile.svelte'
import SizeFilter from '../components/SizeFilter.svelte'
import { me } from '../data/user'
import { requests, loading } from '../data/requests'
import { location, querystring } from 'svelte-spa-router'
import qs from 'qs'
import { updateQueryString } from '../data/url'
import Icon from 'fa-svelte'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { clearFilter, filterRequests, populateFilterFrom } from '../data/requestFiltering'
import { isDefaultSizeFilter } from '../data/sizes'
import { 
  filteredRequestsBySize,
  filteredRequestsByMine,
  filteredRequestsByProviding,
  filteredRequestsByAll,
  viewedRequestsAsGrid,
  viewedRequestsAsList,
  searchedRequests,
} from '../data/analytics'

let filteredRequests
let requestFilter = {}
let queryStringData
let searchText = ''
let showAsList = false

$: queryStringData = qs.parse($querystring)
$: requestFilter = populateFilterFrom(queryStringData)
$: searchText = queryStringData.search || ''
$: filteredRequests = filterRequests($requests, requestFilter, searchText)
$: showAsList = queryStringData.hasOwnProperty('list')

function selectSize(sizeString) {
  let lowerCaseSize = String(sizeString).toLowerCase()

  filteredRequestsBySize(lowerCaseSize)

  if (isDefaultSizeFilter(lowerCaseSize)) {
    lowerCaseSize = null
  }

  updateQueryString($location, $querystring, {
    size: lowerCaseSize,
  })
}

function selectCreator(userId) {
  updateQueryString($location, $querystring, {
    creator: userId,
    provider: null,
    size: null,
  })

  filteredRequestsByMine()
}

function selectProvider(userId) {
  updateQueryString($location, $querystring, {
    creator: null,
    provider: userId,
    size: null,
  })

  filteredRequestsByProviding()
}

function showAll() {
  clearFilter($location, $querystring)

  filteredRequestsByAll()
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

function searchForText(searchText) {
  updateQueryString($location, $querystring, {
    search: searchText,
  })

  searchedRequests(searchText)
}

function resetFilters() {
  clearFilter($location, $querystring)
}
</script>

<div class="row">
  <div class="col-12 col-md-auto text-center text-sm-left">
    <h2>Requests</h2>
  </div>
  <div class="col text-right">
    <div class="row">
      <div class="col-12 text-center col-sm text-sm-left text-md-right">
        <RequestQuickFilter {requestFilter} buttonCssClass="my-1 mx-0"
                            on:all={showAll} on:my-requests={() => selectCreator($me.id)} on:my-commitments={() => selectProvider($me.id)} />
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
      <div class="card border-bottom"><!-- Note: Remove "border-bottom" if another card is added. -->
        <div class="card-header text-center p-2">
          Filters
          <a href="javascript:void(0)" class="small d-block" on:click={resetFilters}>Reset filters</a>
        </div>
        
        <div>
          <div class="card-body text-center">
            <b class="d-inline-block d-md-block" id="size-filter-label">Max. size:</b>
            <div class="d-inline-block text-md-left" aria-labelledby="size-filter-label">
              <SizeFilter cssClass="d-md-block" initialValue={queryStringData.size} on:selection={event => selectSize(event.detail)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="form-row align-items-stretch">
      <div class="col-12">
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text"><Icon icon={faSearch} /></div>
          </div>
          <input type="text" class="form-control" placeholder="Search" value={searchText} on:input={event => searchForText(event.target.value)} />
        </div>
      </div>

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
