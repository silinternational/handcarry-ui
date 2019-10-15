<script>
import RequestListEntry from '../components/RequestListEntry.svelte'
import RequestTile from '../components/RequestTile.svelte'
import NewRequestTile from '../components/NewRequestTile.svelte'
import SizeFilter from '../components/SizeFilter.svelte'
import { getRequests } from '../data/gqlQueries'
import { getSelectedSizes } from '../data/sizes'
import { push, querystring } from 'svelte-spa-router'
import qs from 'qs'

let errorMessage = ''
let hasLoaded = false

let isAllRequests
let isJustMyRequests
let isJustMyCommitments
let filteredRequests
let requestFilter = {}
let me = {}
let queryStringData
let requests = []; loadRequests()
let showAsList = false

$: queryStringData = qs.parse($querystring)
$: requestFilter = populateFilterFrom(queryStringData)
$: filteredRequests = filterRequests(requests, requestFilter)
$: isAllRequests = !isCreatorSelected(requestFilter) && !isProviderSelected(requestFilter)
$: isJustMyRequests = isSelectedCreator(me.id, requestFilter)
$: isJustMyCommitments = isSelectedProvider(me.id, requestFilter)
$: showAsList = queryStringData.hasOwnProperty('list')

function populateFilterFrom(queryStringData) {
  return {
    createdBy: { id: queryStringData.creator },
    provider: { id: queryStringData.provider },
    size: getSelectedSizes(String(queryStringData.size).toUpperCase()),
  }
}

function filterRequests(requests, requestFilter) {
  let results = requests.slice(0); // Shallow-clone the array quickly.
  
  for (const property in requestFilter) {
    results = results.filter((request) => matches(request, requestFilter, property))
  }
  
  return results
}

function matches(request, requestFilter, property) {
  if (!requestFilter[property]) {
    return true
  }
  
  if (!request) {
    return false
  }
  
  if (Array.isArray(requestFilter[property])) {
    return (requestFilter[property].indexOf(request[property]) >= 0)
  } else if (typeof requestFilter[property] === 'object') {
    for (const subProperty in requestFilter[property]) {
      if (!matches(request[property], requestFilter[property], subProperty)) {
        return false
      } 
    }
    return true
  }
  return request[property] === requestFilter[property]
}

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
  if (lowerCaseSize === 'xlarge') {
    lowerCaseSize = null
  }
  updateQueryString({
    size: lowerCaseSize,
  })
}

function updateQueryString(updates) {
  let queryStringData = qs.parse($querystring)
  
  let value
  for (const key in updates) {
    value = updates[key]
    if (value) {
      queryStringData[key] = value
    } else if (queryStringData.hasOwnProperty(key)) {
      delete queryStringData[key]
    }
  }
  
  const queryStringForUrl = qs.stringify(queryStringData)
  queryStringForUrl ? push(`/requests?${queryStringForUrl}`) : push('/requests')
}

function selectCreator(userId) {
  updateQueryString({
    creator: userId,
    provider: null,
    size: null,
  })
}

function selectProvider(userId) {
  updateQueryString({
    creator: null,
    provider: userId,
    size: null,
  })
}

function isSelectedCreator(userId, requestFilter) {
  if (userId) {
    return requestFilter.createdBy && requestFilter.createdBy.id && requestFilter.createdBy.id == userId
  }
  return false
}

function isSelectedProvider(userId, requestFilter) {
  if (userId) {
    return requestFilter.provider && requestFilter.provider.id && requestFilter.provider.id == userId
  }
  return false
}

function isCreatorSelected(requestFilter) {
  return requestFilter.createdBy && requestFilter.createdBy.id
}

function isProviderSelected(requestFilter) {
  return requestFilter.provider && requestFilter.provider.id
}
</script>

<div class="row">
  <div class="col-12 col-sm-auto text-center text-sm-left">
    <h2>Requests</h2>
  </div>
  <div class="col text-right">
    <button class="btn btn-sm m-1" on:click={() => selectCreator(null)} class:btn-primary={isAllRequests} class:btn-outline-primary={!isAllRequests}>
      All
    </button>
    <button class="btn btn-sm m-1" on:click={() => selectCreator(me.id)} class:btn-primary={isJustMyRequests} class:btn-outline-primary={!isJustMyRequests}>
      My Requests
    </button>
    <button class="btn btn-sm m-1" on:click={() => selectProvider(me.id)} class:btn-primary={isJustMyCommitments} class:btn-outline-primary={!isJustMyCommitments}>
      My Commitments
    </button>
  </div>
</div>

<div class="row mt-2">
  <div class="col-12 col-md-5 col-lg-4 col-xl-3 mb-2">
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
            <b>Max. size: </b>
            <SizeFilter initialValue={queryStringData.size} on:selection={(event) => selectSize(event.detail)} />
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <div class="col col-sm-10 offset-sm-1 col-md offset-md-0">
    <p class:d-none={hasLoaded}>⏳ retrieving requests...</p>
    
    <div class:d-none={!hasLoaded} class="form-row align-items-stretch">
      {#each filteredRequests as request}
        {#if showAsList }
          <div class="col-12 my-1"><RequestListEntry {request} /></div>
        {:else}
          <div class="col-6 mb-1 my-sm-1 col-md-6 col-lg-4 col-xl-3"><RequestTile {request} /></div>
        {/if}
      {/each}
      
      <div class:d-md-block={showAsList} class="d-none col-12 my-1 text-right">
        <a href="#/requests/new" class="btn btn-success btn-sm"><span style="font-size: larger">+</span> Make a request</a>
      </div>
      <div class:d-md-block={!showAsList} class="d-none col-6 mb-1 my-sm-1 col-md-6 col-lg-4 col-xl-3"><NewRequestTile /></div>
    </div>
    
    <p class:d-none={!errorMessage}>🧨 Something went wrong: {errorMessage}</p>
  </div>
</div>
