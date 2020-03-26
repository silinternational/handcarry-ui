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

export let filter = {}

$: location = {description: filter.location.value}
$: onlyMyEvents = filter.participating.active
$: searchText = filter.search.value || ''

function onKeywordInput(event) {
  const query = event.detail
  setFilters({ search: query })

  searchedMeetings(query)
}

function onLocationChange(event) {
  const query = event.detail && event.detail.description
  setFilters({ location: query })

  filteredMeetingsByLocation(query)
}

function onMyEventsChange(event) {
  if (event.detail) {
    setFilters({ participating: null })
    
    filteredMeetingsByMine()
  } else {
    removeFilter('participating')
  }
}

function resetFilters() {
  clearEventFilter()

  filteredMeetingsByAll()
}
</script>

<div class="card border-bottom"><!-- Note: Remove "border-bottom" if another card is added. -->
  <div class="card-header text-center p-2">
    Filters
    <a href="javascript:void(0)" class="small d-block" on:click={resetFilters}>Reset filters</a>
  </div>
  
  <div class="card-body">
    <ToggleFilter on:change={onMyEventsChange} active={onlyMyEvents} label="Only my events" />
    <hr />
    <LocationFilter title="Event location" {location} on:change={onLocationChange} />
    <hr />
    <SearchFilter title="Keyword" value={searchText} on:input={onKeywordInput} />
  </div>
</div>
