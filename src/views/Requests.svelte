<script>
import RequestTile from '../components/RequestTile.svelte'
import SizeFilter from '../components/SizeFilter.svelte'
import { getRequests } from '../data/gqlQueries'
import { includedInSizeSelection } from '../data/sizes'

let errorMessage = ''
let hasLoaded = false

let requests = []; loadRequests()
let selectedSizeName = 'xlarge'
$: filteredRequests = requests.filter((request) => includedInSizeSelection(request.size, selectedSizeName))

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

<div class="row">
  <div class="col-3">
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
            <SizeFilter bind:selectedName={selectedSizeName} />
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <div class="col">
    <p class:d-none={hasLoaded}>⏳ retrieving requests...</p>
    
    <div class:d-none={!hasLoaded} class="d-flex justify-content-around flex-wrap">
      {#each filteredRequests as request}
        <div class="m-1 flex-fill"><RequestTile {request} /></div>
      {/each}
    </div>
    
    <p class:d-none={!errorMessage}>🧨 Something went wrong: {errorMessage}</p>
  </div>
</div>
