<script>
import SizeIndicator from 'components/SizeIndicator.svelte'
import { sizes, includedInSizeSelection } from 'data/sizes.js'

import { createEventDispatcher } from 'svelte'

export let initialValue
export let cssClass = ''

const dispatch = createEventDispatcher()

let selectedSizeType
$: selectedSizeType = initialValue ? String(initialValue).toUpperCase() : 'XLARGE'
$: dispatch('selection', selectedSizeType)

function getBadgeColorFor(size, selectedSizeType) {
  return includedInSizeSelection(size.type, selectedSizeType) ? size.color : 'light'
}

function onChange(size, event) {
  selectedSizeType = size.type
  event.target.checked = true
}
</script>

<p class="mb-1 text-muted" id="size-filter-label">Max. size:</p>
<div class="d-inline-block text-md-left" aria-labelledby="size-filter-label">
  {#each sizes as size }
    <div class="form-check form-check-inline {cssClass}">
      <input type="checkbox" class="form-check-input" id="sizeFilter{size.type}" checked={includedInSizeSelection(size.type, selectedSizeType)}
             on:change={(event) => onChange(size, event)} />
      <label class="form-check-label" for="sizeFilter{size.type}">
        <SizeIndicator size={size.type} />
      </label>
    </div>
  {/each}
</div>
