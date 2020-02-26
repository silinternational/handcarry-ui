<script>
import { 
  filteredRequestsBySize,
  filteredRequestsByMine,
  filteredRequestsByProviding,
  filteredRequestsByAll,
  searchedRequests,
} from '../data/analytics'
import { removeFilter } from '../data/filtering'
import { isDefaultSizeFilter } from '../data/sizes'
import { me } from '../data/user'
import SearchFilter from './SearchFilter.svelte'
import SizeFilter from './SizeFilter.svelte'
import { createEventDispatcher } from 'svelte'
import ToggleFilter from './ToggleFilter.svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: searchText = filter.search.value || ''
$: size = filter.size.value
$: onlyMyCommitments = filter.provider.active
$: onlyMyRequests = filter.creator.active

function onKeywordInput(event) {
  const query = event.detail
  dispatch('set', { search: query })

  searchedRequests(query)
}

function onMyCommitmentsChange(event) {
  if (event.detail) {
    dispatch('set', {
      creator: null,
      provider: $me.id,
      size: null,
    })
    filteredRequestsByProviding()
  } else {
    removeFilter('provider')
  }
}

function onMyRequestsChange(event) {
  if (event.detail) {
    dispatch('set', {
      creator: $me.id,
      provider: null,
      size: null,
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
    dispatch('set', { size: lowerCaseSize })
  }
}

function resetFilters() {
  dispatch('reset')

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
    <SearchFilter title="Keyword" value={searchText} on:input={onKeywordInput} />
    <hr />
    <SizeFilter cssClass="d-md-block" initialValue={size} on:selection={onSizeSelection} />
  </div>
</div>