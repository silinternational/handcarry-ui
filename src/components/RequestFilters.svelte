<script>
import { 
  filteredRequestsBySize,
  filteredRequestsByMine,
  filteredRequestsByProviding,
  filteredRequestsByAll,
  searchedRequests,
} from '../data/analytics'
import { isDefaultSizeFilter } from '../data/sizes'
import { me } from '../data/user'
import Icon from 'fa-svelte'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SizeFilter from './SizeFilter.svelte'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: searchText = filter.search.value || ''
$: size = filter.size.value
$: onlyMyCommitments = filter.provider.active
$: onlyMyRequests = filter.creator.active

function onKeywordInput(event) {
  dispatch('set', { search: event.target.value })

  searchedRequests(event.target.value)
}

function onMyCommitmentsChange(event) {
  if (event.target.checked) {
    dispatch('set', {
      creator: null,
      provider: $me.id,
      size: null,
    })
    filteredRequestsByProviding()
  } else {
    dispatch('remove', 'provider')
  }
}

function onMyRequestsChange(event) {
  if (event.target.checked) {
    dispatch('set', {
      creator: $me.id,
      provider: null,
      size: null,
    })
    filteredRequestsByMine()
  } else {
    dispatch('remove', 'creator')
  }
}

function onSizeSelection(event) {
  const lowerCaseSize = String(event.detail).toLowerCase()

  filteredRequestsBySize(lowerCaseSize)

  if (isDefaultSizeFilter(lowerCaseSize)) {
    dispatch('remove', 'size')
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
    <label class="d-block">
      <input type="checkbox" on:change={onMyRequestsChange} checked={onlyMyRequests} /> Only my requests
    </label>
    <label class="d-block">
      <input type="checkbox" on:change={onMyCommitmentsChange} checked={onlyMyCommitments} /> Only my commitments
    </label>
    
    <hr />
    
    <p class="mb-1 text-muted" id="keyword-filter-label">Keyword:</p>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div class="input-group-text"><Icon icon={faSearch} /></div>
      </div>
      <input type="text" aria-labelledby="keyword-filter-label" class="form-control form-control-sm"
             placeholder="Search" value={searchText} on:input={onKeywordInput} />
    </div>
    
    <hr />
    
    <p class="mb-1 text-muted" id="size-filter-label">Max. size:</p>
    <div class="d-inline-block text-md-left" aria-labelledby="size-filter-label">
      <SizeFilter cssClass="d-md-block" initialValue={size} on:selection={onSizeSelection} />
    </div>
  </div>
</div>