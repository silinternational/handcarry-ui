<script>
import { 
  filteredRequestsByDestination,
  filteredRequestsByEvent,
  filteredRequestsByOrigin,
  filteredRequestsBySize,
  filteredRequestsByWeight,
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
import LocationInput from './LocationInput.svelte'
import SearchFilter from './SearchFilter.svelte'
import SizeFilter from './SizeFilter.svelte'
import ToggleFilter from './ToggleFilter.svelte'
import Icon from 'fa-svelte'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import WeightFilter from './WeightFilter.svelte'

export let filter = {}

$: destinationText = filter.destination.value || ''
$: eventId = filter.event.value
$: origin = filter.origin.value
$: searchText = filter.search.value || ''
$: size = filter.size.value
$: onlyMyCommitments = filter.provider.active
$: onlyMyRequests = filter.creator.active
$: weight = filter.weight.value

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
    destination: (query !== null) && JSON.stringify(query),
    event: false,
  })

  filteredRequestsByDestination(query)
}

function onOriginInput(event) {
  const query = event.detail
  setFilters({ origin: (query !== null) && JSON.stringify(query) })

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

function onWeightInput(event) {
  const query = event.detail
  setFilters({ weight: query })

  filteredRequestsByWeight(query)
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
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <Icon icon={faMapMarkerAlt} />
          </span>
        </div>

        <LocationInput class="form-control" on:change={onOriginInput} placeholder="Origin city"
                       location={origin} />
      </div>
    </div>
    <hr />
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <Icon icon={faMapMarkerAlt} />
          </span>
        </div>

        <LocationInput class="form-control" on:change={onDestinationInput} placeholder="Destination city" />
      </div>
    </div>
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
