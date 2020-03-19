<script>
import Icon from 'fa-svelte'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'
import WeightSelector from './WeightSelector.svelte'

export let title
export let value

const dispatch = createEventDispatcher()

function onWeightChanged(event) {
  dispatch('input', event.detail)
}
</script>

<p class="mb-1 text-muted" id="search-filter-label">{ title }:</p>
<div class="input-group mb-2">
  <div class="col"><WeightSelector on:change={onWeightChanged} kilograms={value} /></div>
</div>
