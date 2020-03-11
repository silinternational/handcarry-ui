<script>
import { 
  filteredRequestsByDestination,
  filteredRequestsByEvent,
  filteredRequestsByOrigin,
  filteredRequestsBySize,
  filteredRequestsByMine,
  filteredRequestsByProviding,
  filteredRequestsByAll,
  searchedRequests,
} from '../data/analytics'
import { events } from '../data/events'
import { removeFilter, setFilters } from '../data/filtering'
import { clearRequestFilter } from '../data/requestFiltering'
import { isDefaultSizeFilter } from '../data/sizes'
import { me } from '../data/user'
import EventFilter from './EventFilter.svelte'
import LocationFilter from './LocationFilter.svelte'
import SearchFilter from './SearchFilter.svelte'
import SizeFilter from './SizeFilter.svelte'
import ToggleFilter from './ToggleFilter.svelte'

export let filter = {}

$: destinationText = filter.destination.value || ''
$: eventId = filter.event.value
$: originText = filter.origin.value || ''
$: searchText = filter.search.value || ''
$: size = filter.size.value
$: onlyMyCommitments = filter.provider.active
$: onlyMyRequests = filter.creator.active

function onEventChange(domEvent) {
  const eventId = domEvent.detail
  if (eventId) {
    setFilters({
      destination: false,
      event: eventId,
    })
  
    const eventName = $events.find(({ id }) => id === eventId).name
    filteredRequestsByEvent(eventName)
  } else {
    removeFilter('event')
  }
}

function onDestinationInput(event) {
  const query = event.detail
  setFilters({
    destination: query,
    event: false,
  })

  filteredRequestsByDestination(query)
}

function onOriginInput(event) {
  const query = event.detail
  setFilters({ origin: query })

  filteredRequestsByOrigin(query)
}

function onKeywordInput(event) {
  const query = event.detail
  setFilters({ search: query })

  searchedRequests(query)
}

function onMyCommitmentsChange(event) {
  if (event.detail) {
    setFilters({
      creator: false,
      provider: $me.id,
      size: false,
    })
    filteredRequestsByProviding()
  } else {
    removeFilter('provider')
  }
}

function onMyRequestsChange(event) {
  if (event.detail) {
    setFilters({
      creator: $me.id,
      provider: false,
      size: false,
    })
    filteredRequestsByMine()
  } else {
    removeFilter('creator')
  }
}

function onSizeSelection(event) {
  const lowerCaseSize = String(event.detail).toLowerCase()

  filteredRequestsBySize(lowerCaseSize)

  if (isDefaultSizeFilter(lowerCaseSize)) {
    removeFilter('size')
  } else {
    setFilters({ size: lowerCaseSize })
  }
}

function resetFilters() {
  clearRequestFilter()

  filteredRequestsByAll()
}
</script>

<div class="card border-bottom"><!-- Note: Remove "border-bottom" if another card is added. -->
  <div class="card-header text-center p-2">
    Filters
    <a href="javascript:void(0)" class="small d-block" on:click={resetFilters}>Reset filters</a>
  </div>
  
  <div class="card-body">
    <ToggleFilter on:change={onMyRequestsChange} active={onlyMyRequests} label="Only my requests" />
    <ToggleFilter on:change={onMyCommitmentsChange} active={onlyMyCommitments} label="Only my commitments" />
    <hr />
    <LocationFilter title="From" placeholder="Origin city" value={originText} on:input={onOriginInput} />
    <hr />
    <LocationFilter title="To" placeholder="Destination city" value={destinationText} on:input={onDestinationInput} />
    {#if $events.length }
      <p class="mb-2 text-center text-muted">– or –</p>
      <EventFilter events={$events} {eventId} on:change={onEventChange} />
    {/if}
    <hr />
    <SearchFilter title="Keyword" value={searchText} on:input={onKeywordInput} />
    <hr />
    <SizeFilter cssClass="d-md-block" initialValue={size} on:selection={onSizeSelection} />
  </div>
</div>
