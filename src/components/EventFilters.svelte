<script>
import {
  filteredMeetingsByAll,
  filteredMeetingsByLocation,
  filteredMeetingsByMine,
  searchedMeetings,
} from '../data/analytics'
import { clearEventFilter } from '../data/eventFiltering'
import { removeFilter, setFilters } from '../data/filtering'
import LocationFilter from './LocationFilter.svelte'
import SearchFilter from './SearchFilter.svelte'
import ToggleFilter from './ToggleFilter.svelte'
import { goto } from '@roxi/routify'

export let filter = {}

$: location = {description: filter.location.value}
$: onlyMyEvents = filter.participating.active
$: searchText = filter.search.value || ''

function onKeywordInput(event) {
  const query = event.detail
  const newUrl = setFilters({ search: query })

  searchedMeetings(query)

  $goto(newUrl)
}

function onLocationChange(event) {
  const query = event.detail && event.detail.description
  const newUrl = setFilters({ location: query })

  filteredMeetingsByLocation(query)

  $goto(newUrl)
}

function onMyEventsChange(event) {
  if (event.detail) {
    const newUrl = setFilters({ participating: null })

    filteredMeetingsByMine()

    $goto(newUrl)
  } else {
    $goto(removeFilter('participating'))
  }
}

function resetFilters() {
  const newUrl = clearEventFilter()

  filteredMeetingsByAll()

  $goto(newUrl)
}
</script>

<div class="card border-bottom"><!-- Note: Remove "border-bottom" if another card is added. -->
  <div class="card-header d-flex flex-row justify-content-between align-items-center">
      Filters
      <button on:click={resetFilters} class="btn btn-link p-0"><small>clear filters</small></button>
  </div>

  <div class="card-body">
    <ToggleFilter on:change={onMyEventsChange} active={onlyMyEvents} label="Only my events" />
    <hr />
    <LocationFilter title="Event location" {location} on:change={onLocationChange} />
    <hr />
    <SearchFilter title="Keyword" value={searchText} on:input={onKeywordInput} />
  </div>
</div>
