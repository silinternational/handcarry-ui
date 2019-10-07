<script>
import SizeIndicator from './SizeIndicator.svelte'
import { sizes, includedInSizeSelection } from '../data/sizes'

export let selectedName

let heights = {
  'tiny': '17px',
  'small': '20px',
  'medium': '24px',
  'large': '28px',
  'xlarge': '32px',
}

function getBadgeColorFor(size, selectedSizeName) {
  return includedInSizeSelection(size.name, selectedSizeName) ? size.color : 'light'
}

function getTextColorFor(size, selectedSizeName) {
  return includedInSizeSelection(size.name, selectedSizeName) ? 'white' : size.color
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

<div>
  {#each sizes as size }
    <div class="d-inline-block" style="font-size: {heights[size.name]}">
      <label class="form-check-label d-block" for="size{size.name}" title="{size.name}">
        <div class="badge badge-{getBadgeColorFor(size, selectedName)}">
          <input type="radio" name="size" id="size{size.name}" value={size.name} class="form-check-input" bind:group={selectedName}>
          <svg class="lnr lnr-briefcase text-{getTextColorFor(size, selectedName)}"><use xlink:href="#lnr-briefcase"></use></svg>
        </div>
      </label>
    </div>
  {/each}
</div>
