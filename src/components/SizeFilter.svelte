<script>
import SizeIndicator from './SizeIndicator.svelte'
import { sizes, includedInSizeSelection } from '../data/sizes'

export let selectedSizeType

let heights = {
  'TINY': '17px',
  'SMALL': '20px',
  'MEDIUM': '24px',
  'LARGE': '28px',
  'XLARGE': '32px',
}

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
  vertical-align: top;
}

label {
  cursor: pointer;
  margin: 1px;
}
</style>

<div class="text-center">
  {#each sizes as size }
    <div class="d-inline-block" style="font-size: {heights[size.type]}">
      <label class="form-check-label d-block" for="size{size.type}" title="{size.name}">
        <div class="badge badge-{getBadgeColorFor(size, selectedSizeType)}">
          <input type="radio" name="size" id="size{size.type}" value={size.type} class="form-check-input" bind:group={selectedSizeType}>
          <svg class="lnr lnr-briefcase text-{getTextColorFor(size, selectedSizeType)}"><use xlink:href="#lnr-briefcase"></use></svg>
        </div>
      </label>
    </div>
  {/each}
</div>
