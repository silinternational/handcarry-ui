<script>
import FilteredDisplay from 'components/FilteredDisplay.svelte'
import GridListToggle from 'components/GridListToggle.svelte'
import NewRequestTile from 'components/NewRequestTile.svelte'
import RequestCard from 'components/RequestCard.svelte'
import RequestFilters from 'components/RequestFilters.svelte'
import RequestListEntry from 'components/RequestListEntry.svelte'
import { viewedRequestsAs } from 'data/analytics.js'
import { events } from 'data/events.js'
import { populateRequestFilterFrom } from 'data/requestFiltering.js'
import { requests, loading } from 'data/requests.js'
import { save, LIFESPAN, retrieve } from 'data/storage.js'
import { me } from 'data/user.js'

import { goto, params } from '@roxi/routify'
import { flip } from 'svelte/animate'
import { fade } from 'svelte/transition'

let requestFilter = {}
let viewPreference = retrieve('view-requests-as') || 'grid'

$: requestFilter = populateRequestFilterFrom($params, $me, $events)
$: showAsList = viewPreference === 'list'

function viewToggled(choice) {
  viewPreference = choice

  save('view-requests-as', choice, LIFESPAN.LONG)

  viewedRequestsAs(choice)
}
</script>

<FilteredDisplay title="Requests" filter={requestFilter} items={$requests}>
  <div slot="toggles">
    <GridListToggle on:click={({detail}) => viewToggled(detail)} choice={viewPreference} />
  </div>
  <div slot="filters">
    <RequestFilters filter={requestFilter} />
  </div>
  <div slot="items" let:items={filteredRequests} class="form-row align-items-stretch">
    {#if $loading}
      <p>⏳ retrieving requests...</p>
    {:else if filteredRequests.length }
      {#if showAsList }
        {#each filteredRequests as request (request.id) }
          <div class="col-12 my-1"
               in:fade
               animate:flip="{{ duration: 350 }}"><RequestListEntry {request} /></div>
        {/each}
      {:else}
        {#each filteredRequests as request (request.id) }
          <div class="col-6 my-1 col-lg-4"
               in:fade
               animate:flip="{{ duration: 350 }}"><RequestCard {request}/></div>
        {/each}
      {/if}
    {:else}
      <div class="col-12 my-2 mx-5">
        <i class="text-muted">None found </i>
      </div>
    {/if}

    <div class:d-md-block={showAsList} class="d-none col-12 my-1">
      <button on:click="{() => $goto('/requests/new')}" class="btn btn-success btn-sm w-100"><span style="font-size: larger">+</span> Make a request</button>
    </div>

    <div class:d-md-block={!showAsList} class="d-none col-6 mb-1 my-sm-1 col-md-6 col-lg-4"><NewRequestTile /></div>
  </div>
</FilteredDisplay>
