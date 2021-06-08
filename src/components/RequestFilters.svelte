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
import { setFilters, removeFilter } from '../data/filtering'
import { clearRequestFilter, removeRequestFilter } from '../data/requestFiltering'
import { isDefaultSizeFilter } from '../data/sizes'
import { me } from '../data/user'
import EventFilter from './EventFilter.svelte'
import LocationFilter from './LocationFilter.svelte'
import SearchFilter from './SearchFilter.svelte'
import SizeFilter from './SizeFilter.svelte'
import ToggleFilter from './ToggleFilter.svelte'
import { goto } from '@roxi/routify'

export let filter = {}

$: eventId = filter.event.value
$: destination = filter.destination.value
$: origin = filter.origin.value
$: searchText = filter.requestSearch.value || ''
$: size = filter.size.value
$: onlyMyCommitments = filter.provider.active
$: onlyMyRequests = filter.creator.active

function onEventChange(domEvent) {
  const eventId = domEvent.detail
  if (eventId) {
    const newUrl = setFilters({
      toDescription: false,
      toCountry: false,
      toLatitude: false,
      toLongitude: false,
      event: eventId,
    })

    const eventName = $events.find(({ id }) => id === eventId).name
    filteredRequestsByEvent(eventName)

    $goto(newUrl)
  } else {
    $goto(removeRequestFilter('event'))
  }
}

function onDestinationChange(event) {
  const location = event.detail
  if (location) {
    const newUrl = setFilters( {
      toDescription: location.description,
      toCountry: location.country,
      toLatitude: location.latitude,
      toLongitude: location.longitude,
      event: false,
    })

    filteredRequestsByDestination(location.description)

    $goto(newUrl)
  } else {
    $goto(removeFilter('destination'))
  }
}

function onOriginChange(event) {
  const location = event.detail
  if (location) {
    const newUrl = setFilters( {
      fromDescription: location.description,
      fromCountry: location.country,
      fromLatitude: location.latitude,
      fromLongitude: location.longitude,
    })

    filteredRequestsByOrigin(location.description)

    $goto(newUrl)
  } else {
    $goto(removeFilter('origin'))
  }
}

function onKeywordInput(event) {
  const query = event.detail
  const newUrl = setFilters( { search: query })

  searchedRequests(query)

  $goto(newUrl)
}

function onMyCommitmentsChange(event) {
  if (event.detail) {
    const newUrl = setFilters( {
      creator: false,
      provider: $me.id,
      size: false,
    })

    filteredRequestsByProviding()

    $goto(newUrl)
  } else {
    $goto(removeRequestFilter('provider'))
  }
}

function onMyRequestsChange(event) {
  if (event.detail) {
    const newUrl = setFilters( {
      creator: $me.id,
      provider: false,
      size: false,
    })

    filteredRequestsByMine()

    $goto(newUrl)
  } else {
    $goto(removeRequestFilter('creator'))
  }
}

function onSizeSelection(event) {
  const lowerCaseSize = String(event.detail).toLowerCase()

  filteredRequestsBySize(lowerCaseSize)

  if (isDefaultSizeFilter(lowerCaseSize)) {
    $goto(removeRequestFilter('size'))
  } else {
    $goto(setFilters( { size: lowerCaseSize }))
  }
}

function resetFilters() {
  const newUrl = clearRequestFilter()

  filteredRequestsByAll()

  $goto(newUrl)
}
</script>

<div class="card border-bottom"><!-- Note: Remove "border-bottom" if another card is added. -->
  <div class="card-header d-flex flex-row justify-content-between align-items-center">
      Filters
      <button on:click={resetFilters} class="btn btn-link p-0"><small>clear filters</small></button>
  </div>

  <div class="card-body">
    <ToggleFilter on:change={onMyRequestsChange} active={onlyMyRequests} label="Only my requests" />
    <ToggleFilter on:change={onMyCommitmentsChange} active={onlyMyCommitments} label="Only my commitments" />
    <hr />
    <LocationFilter title="From" placeholder="Origin city" location={origin} on:change={onOriginChange}/>
    <hr />
    <LocationFilter title="To" placeholder="Destination city" location={destination} on:change={onDestinationChange}/>
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
