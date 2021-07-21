<script>
import { kilogramsToPounds, poundsToKilograms } from 'data/weight.js'

import { createEventDispatcher } from 'svelte'

export let kilograms

const dispatch = createEventDispatcher()

let pounds
let units

// If a weight was provided, determine the units... (just once and 0 is possible)
$: kilograms !== undefined && showCorrectUnitsOnInitialLoad()

function wasProbablyStoredAsPounds(kilograms) {
  // NOTE: The number of decimal places this is coded for must match what `roundToSupportedPrecision()` allows.
  const hasTooManyDecimalPlaces = /\.[0-9]{2,}$/
  return hasTooManyDecimalPlaces.test(kilograms)
}

let showCorrectUnitsOnInitialLoad = function() {
  if (wasProbablyStoredAsPounds(kilograms)) {
    units = 'lb'
    pounds = roundToSupportedPrecision(kilogramsToPounds(kilograms))
  }

  showCorrectUnitsOnInitialLoad = Function() // noop since we want this to be a one-time check per "page view"
}

function roundToSupportedPrecision(value) {
  // NOTE: The number of decimal places this allows must match what `wasProbablyStoredAsPounds()` is coded for.
  return Math.round(value * 10) / 10
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
 * - Limited support for decimal values (round them if too precise)
 */
function normalize(value) {
  return Math.abs(roundToSupportedPrecision(value))
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

<style>
input[type=number] {
  width: 6em;
}
</style>

<div class="form-row">
  <div class="col-auto">
    {#if units === 'lb' }
      <input type="number" on:change={onNumberChanged} class="form-control" min="0"
             step="0.1" bind:value={pounds} />
    {:else}
      <input type="number" on:change={onNumberChanged} class="form-control" min="0"
             step="0.1" bind:value={kilograms} />
    {/if}
  </div>
  <div class="col-auto">
    <!-- svelte-ignore a11y-no-onchange -->
    <select class="form-control" on:change={onUnitsChanged} bind:value={units}>
      <option value="kg">kg</option>
      <option value="lb">lb</option>
    </select>
  </div>
</div>
