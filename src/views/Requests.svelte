<script>
import RequestTile from '../components/RequestTile.svelte'
import NewRequestTile from '../components/NewRequestTile.svelte'
import SizeFilter from '../components/SizeFilter.svelte'
import { getRequests } from '../data/gqlQueries'
import { getSelectedSizes } from '../data/sizes'

let errorMessage = ''
let hasLoaded = false

let requestFilter = {}
let requests = []; loadRequests()
let selectedSizeType = 'XLARGE'
$: requestFilter.size = getSelectedSizes(selectedSizeType)
$: filteredRequests = filterRequests(requests, requestFilter)

function filterRequests(requests, requestFilter) {
  let results = requests.slice(0); // Shallow-clone the array quickly.
  
  for (const property in requestFilter) {
    results = results.filter((request) => matches(request, requestFilter, property))
  }
  
  return results
}

function matches(request, requestFilter, property) {
  if (Array.isArray(requestFilter[property])) {
    return (requestFilter[property].indexOf(request[property]) >= 0)
  }
  return request[property] === requestFilter[property]
}

async function loadRequests() {
  try {
    let response = await getRequests()
    requests = response.posts
  } catch (error) {
    errorMessage = error.message
  }
  hasLoaded = true
}

</script>

<div class="row">
  <div class="col">
    <h2>Requests</h2>
  </div>
  <div class="col-auto">
    <div class="float-right">
      <a class="btn btn-sm btn-primary mx-1" href="/#/requests" aria-pressed="true" role="button">
        All
      </a>
      <a class="btn btn-sm btn-outline-primary mx-1" href="/#/requests/mine" role="button">
        My Requests
      </a>      
    </div>
  </div>
</div>

<div class="row mt-2">
  <div class="col-12 col-md-5 col-lg-4 col-xl-3 mb-2">
    <div class="accordion" id="requestFilters">
      
      <div class="card border-bottom"><!-- Note: Removed "border-bottom" if another card is added. -->
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-block" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Maximum Size
            </button>
          </h2>
        </div>
        
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#requestFilters">
          <div class="card-body">
            <SizeFilter bind:selectedSizeType={selectedSizeType} />
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <div class="col col-sm-10 offset-sm-1 col-md offset-md-0">
    <p class:d-none={hasLoaded}>⏳ retrieving requests...</p>
    
    <div class:d-none={!hasLoaded} class="form-row align-items-stretch">
      {#each filteredRequests as request}
        <div class="col-6 mb-1 my-sm-1 col-md-6 col-lg-4 col-xl-3"><RequestTile {request} /></div>
      {/each}
      <div class="col-6 mb-1 my-sm-1 col-md-6 col-lg-4 col-xl-3"><NewRequestTile /></div>
    </div>
    
    <p class:d-none={!errorMessage}>🧨 Something went wrong: {errorMessage}</p>
  </div>
</div>
