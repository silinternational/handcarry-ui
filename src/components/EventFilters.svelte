<script>
import {
  filteredMeetingsByAll,
  searchedMeetings,
} from '../data/analytics'
import Icon from 'fa-svelte'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: searchText = filter.search || ''

function onKeywordInput(event) {
  dispatch('set', { search: event.target.value })

  searchedMeetings(event.target.value)
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
    <p class="mb-1 text-muted" id="keyword-filter-label">Keyword:</p>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div class="input-group-text"><Icon icon={faSearch} /></div>
      </div>
      <input type="text" aria-labelledby="keyword-filter-label" class="form-control form-control-sm"
             placeholder="Search" value={searchText} on:input={onKeywordInput} />
    </div>
  </div>
</div>