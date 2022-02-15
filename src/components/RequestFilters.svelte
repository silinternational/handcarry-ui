<script>
import EventSelect from 'components/EventSelect.svelte'
import LocationFilter from 'components/LocationFilter.svelte'
import SearchFilter from 'components/SearchFilter.svelte'
import SizeFilter from 'components/SizeFilter.svelte'
import ToggleFilter from 'components/ToggleFilter.svelte'
import { filteredRequestsByDestination, filteredRequestsByEvent, filteredRequestsByOrigin, filteredRequestsBySize, filteredRequestsByMine, filteredRequestsByProviding, filteredRequestsByAll, searchedRequests } from 'data/analytics.js'
import { events } from 'data/events.js'
import { setFilters, removeFilter } from 'data/filtering.js'
import { clearRequestFilter, removeRequestFilter } from 'data/requestFiltering.js'
import { isDefaultSizeFilter } from 'data/sizes.js'
import { me } from 'data/user.js'

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
    $goto(setFilters({
      toDescription: false,
      toCountry: false,
      toLatitude: false,
      toLongitude: false,
      event: eventId,
    }))

    const eventName = $events.find(({ id }) => id === eventId).name
    filteredRequestsByEvent(eventName)
  } else {
    $goto(removeRequestFilter('event'))
  }
}

function onDestinationChange(event) {
  const location = event.detail
  if (location) {
    $goto(setFilters( {
      toDescription: location.description,
      toCountry: location.country,
      toState: location.state,
      toCounty: location.county,
      toCity: location.city,
      toBorough: location.borough,
      toLatitude: location.latitude,
      toLongitude: location.longitude,
      event: false,
    }))

    filteredRequestsByDestination(location.description)
  } else {
    $goto(removeFilter('destination'))
  }
}

function onOriginChange(event) {
  const location = event.detail
  if (location) {
    $goto(setFilters( {
      fromDescription: location.description,
      fromCountry: location.country,
      fromState: location.state,
      fromCounty: location.county,
      fromCity: location.city,
      fromBorough: location.borough,
      fromLatitude: location.latitude,
      fromLongitude: location.longitude,
    }))

    filteredRequestsByOrigin(location.description)
  } else {
    $goto(removeFilter('origin'))
  }
}

function onKeywordInput(event) {
  const query = event.detail
  $goto(setFilters( { search: query }))

  searchedRequests(query)
}

function onMyCommitmentsChange(event) {
  if (event.detail) {
    $goto(setFilters( {
      creator: false,
      provider: $me.id,
      size: false,
    }))

    filteredRequestsByProviding()
  } else {
    $goto(removeRequestFilter('provider'))
  }
}

function onMyRequestsChange(event) {
  if (event.detail) {
    $goto(setFilters( {
      creator: $me.id,
      provider: false,
      size: false,
    }))

    filteredRequestsByMine()
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
  $goto(clearRequestFilter())

  filteredRequestsByAll()
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
    <LocationFilter title="From" placeholder="Origin" location={origin} on:change={onOriginChange}/>
    <hr />
    <LocationFilter title="To" placeholder="Destination" location={destination} on:change={onDestinationChange}/>
    {#if $events.length }
      <p class="mb-half text-center text-muted">– or –</p>
      <EventSelect class="form-control form-control-sm" events={$events} {eventId} on:change={onEventChange} />
    {/if}
    <hr />
    <SearchFilter title="Keyword" value={searchText} on:input={onKeywordInput} />
    <hr />
    <SizeFilter cssClass="d-md-block" initialValue={size} on:selection={onSizeSelection} />
  </div>
</div>
