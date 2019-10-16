<script>
import SizeIndicator from './SizeIndicator.svelte'
import { sizes, includedInSizeSelection } from '../data/sizes'
import { createEventDispatcher } from 'svelte';

export let initialValue
export let cssClass = ''

const dispatch = createEventDispatcher();

let selectedSizeType
$: selectedSizeType = initialValue ? String(initialValue).toUpperCase() : 'XLARGE'
$: dispatch('selection', selectedSizeType)

function getButtonColorFor(size, selectedSizeType) {
  return includedInSizeSelection(size.type, selectedSizeType) ? size.color : 'light'
}

function getTextColorFor(size, selectedSizeType) {
  return includedInSizeSelection(size.type, selectedSizeType) ? 'white' : size.color
}

function selectSize(size) {
  selectedSizeType = size.type
}
</script>

<style>
button {
  margin: 0.25rem 0.125rem;
  padding: 0.125rem 0.25rem;
}
</style>

{#each sizes as size }
  <button class="btn btn-sm btn-{getButtonColorFor(size, selectedSizeType)} text-{getTextColorFor(size, selectedSizeType)} {cssClass}" on:click={() => selectSize(size)}>
    {size.name}
  </button>
{/each}
