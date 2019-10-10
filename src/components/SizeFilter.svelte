<script>
import SizeIndicator from './SizeIndicator.svelte'
import { sizes, includedInSizeSelection } from '../data/sizes'
import { createEventDispatcher } from 'svelte';

export let initialValue

const dispatch = createEventDispatcher();
const heights = {
  'TINY': '17px',
  'SMALL': '20px',
  'MEDIUM': '24px',
  'LARGE': '28px',
  'XLARGE': '32px',
}

let selectedSizeType
$: selectedSizeType = initialValue ? String(initialValue).toUpperCase() : 'XLARGE'
$: dispatch('selection', selectedSizeType)

function getBadgeColorFor(size, selectedSizeType) {
  return includedInSizeSelection(size.type, selectedSizeType) ? size.color : 'light'
}

function getTextColorFor(size, selectedSizeType) {
  return includedInSizeSelection(size.type, selectedSizeType) ? 'white' : size.color
}
</script>

<style>

/* Technique based on https://stackoverflow.com/a/17541916 */

[type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.badge {
  vertical-align: middle;
}

label {
  cursor: pointer;
  margin: 1px;
}

label:hover .name {
  opacity: 100;
}

.name {
  height: 0;
  opacity: 0;
  position: absolute;
  top: 1.5em;
  z-index: 10;
}
.name > .badge {
  font-size: 0.75rem;
}
</style>

<div class="d-inline-block text-center text-nowrap">
  {#each sizes as size }
    <div class="d-inline-block" style="font-size: {heights[size.type]}">
      <label class="form-check-label d-block position-relative" for="size{size.type}" title="{size.name}">
        <div class="badge badge-{getBadgeColorFor(size, selectedSizeType)}">
          <input type="radio" name="size" id="size{size.type}" value={size.type} class="form-check-input" bind:group={selectedSizeType}>
          <svg class="lnr lnr-briefcase text-{getTextColorFor(size, selectedSizeType)}"><use xlink:href="#lnr-briefcase"></use></svg>
        </div>
        <div class="name text-center">
          <div class="d-block badge badge-{size.color}">{size.name}</div>
        </div>
      </label>
    </div>
  {/each}
</div>
