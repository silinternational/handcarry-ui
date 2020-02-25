<script>
import {
  filteredMeetingsByAll,
  filteredMeetingsByLocation,
  searchedMeetings,
} from '../data/analytics'
import SearchFilter from './SearchFilter.svelte'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: location = filter.location.value || ''
$: searchText = filter.search.value || ''

function onKeywordInput(event) {
  const query = event.detail
  dispatch('set', { search: query })

  searchedMeetings(query)
}

function onLocationInput(event) {
  dispatch('set', { location: event.target.value })

  filteredMeetingsByLocation(event.target.value)
}

function resetFilters() {
  dispatch('reset')

  filteredMeetingsByAll()
}
</script>

<div class="card border-bottom"><!-- Note: Remove "border-bottom" if another card is added. -->
  <div class="card-header text-center p-2">
    Filters
    <a href="javascript:void(0)" class="small d-block" on:click={resetFilters}>Reset filters</a>
  </div>
  
  <div class="card-body">
    <p class="mb-1 text-muted" id="location-filter-label">Event location:</p>
    <input aria-labelledby="location-filter-label" class="form-control form-control-sm"
           placeholder="City" value={location} on:input={onLocationInput} />
    
    <hr />
    
    <SearchFilter title="Keyword" value={searchText} on:input={onKeywordInput} />
  </div>
</div>