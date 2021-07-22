<script>
import FilterTags from 'components/FilterTags.svelte'
import { filterItems, removeFilter } from 'data/filtering.js'

import { goto } from '@roxi/routify'

export let items = []
export let filter = {}
export let title = ''

$: filteredItems = filterItems(items, filter)

function onRemoveFilter(event) {
  $goto(removeFilter(event.detail))
}
</script>

<div class="row">
  <div class="col-12 col-md-4 col-lg-3">
    <h2>{ title }</h2>
  </div>
  <div class="col text-right">
    <div class="row">
      <div class="col-12 text-center col-sm text-sm-left text-md-right">
        <FilterTags {filter} on:remove={onRemoveFilter} />
      </div>
      <div class="col-12 text-center col-sm-auto text-sm-right">
        <slot name="toggles"></slot>
      </div>
    </div>
  </div>
</div>

<div class="row mt-2">
  <div class="col-12 col-md-4 col-lg-3 mb-2">
    <div>
      <slot name="filters"></slot>
    </div>
  </div>
  <div class="col-12 col-md-8 col-lg-9">
    <slot name="items" items={filteredItems}></slot>
  </div>
</div>
