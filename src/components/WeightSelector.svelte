<script>
import { kilogramsToPounds, poundsToKilograms } from '../data/weight'
import { createEventDispatcher } from 'svelte'

export let kilograms

const dispatch = createEventDispatcher()

let pounds
let units

// If a weight was provided, determine the units... (just once and 0 is possible)
$: kilograms !== undefined && showCorrectUnitsOnInitialLoad()

function wasProbablyStoredAsPounds(kilograms) {
  return String(kilograms).indexOf('.') >= 0
}

let showCorrectUnitsOnInitialLoad = function() {
  if (wasProbablyStoredAsPounds(kilograms)) {
    units = 'lb'
    pounds = Math.round(kilogramsToPounds(kilograms))
  }
  
  showCorrectUnitsOnInitialLoad = Function() // noop since we want this to be a one-time check per "page view"
}

function onNumberChanged(event) {
  // If the user emptied out the field...
  if (event.target.value === '') {
    pounds = null
    kilograms = null
  } else {
    if (units === 'kg') {
      kilograms = normalize(kilograms)
      pounds = kilogramsToPounds(kilograms)
    } else {
      pounds = normalize(pounds)
      kilograms = poundsToKilograms(pounds)
    }
  }
  
  dispatch('change', kilograms)
}

/**
 * Enforce some basic requirements:
 * - No negative values
 * - No decimal values (round them)
 */
function normalize(value) {
  return Math.abs(Math.round(value))
}

function onUnitsChanged(event) {
  // Copy the value over to the (newly visible) input field.
  // NOTE: `units` won't have the new value yet.
  if (event.target.value === 'kg') {
    kilograms = pounds
    pounds = kilogramsToPounds(kilograms)
  } else {
    pounds = kilograms
    kilograms = poundsToKilograms(pounds)
  }
  
  dispatch('change', kilograms)
}
</script>

<div class="form-row">
  <div class="col-2">
    {#if units === 'lb' }
      <input type="number" aria-describedby="weightInputField" on:change={onNumberChanged} class="form-control" min="0"
             bind:value={pounds} />
    {:else}
      <input type="number" aria-describedby="weightInputField" on:change={onNumberChanged} class="form-control" min="0"
             bind:value={kilograms} />
    {/if}
  </div>
  <div class="col-auto">
    <select class="form-control" on:change={onUnitsChanged} bind:value={units}>
      <option value="kg">kg</option>
      <option value="lb">lb</option>
    </select>
  </div>
</div>
<div class="form-row">
  <div class="col-auto">
    <small id="weightInputField" class="form-text text-muted">Approximate weight in whole numbers</small>
  </div>
</div>
