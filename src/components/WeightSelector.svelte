<script>
import { createEventDispatcher } from 'svelte'

export let kilograms

const dispatch = createEventDispatcher()
const kilogramsPerPound = 0.45359237

let pounds
let units

//$: dispatch('change', kilograms)

function roundInputValue(event) {
  const value = event.target.value
  if (value) {
    /* The rounding precision here (e.g. 0.01) should match the "step" value of the input. */
    event.target.value = Math.round(event.target.value * 100) / 100
  }
}

function onKilogramsInputChanged(event) {
  console.log('onKilogramsChanged:', event.target.value, 'kilograms:', kilograms) // TEMP
  pounds = kilogramsToPounds(kilograms)
  dispatch('change', kilograms)
}

function onPoundsInputChanged(event) {
  console.log('onPoundsChanged:', event.target.value, 'pounds:', pounds) // TEMP
  kilograms = poundsToKilograms(pounds)
  dispatch('change', kilograms)
}

function onUnitsChanged(event) {
  console.log('onUnitsChanged:', event.target.value, 'units:', units, 'kilograms:', kilograms, 'pounds:', pounds) // TEMP
  
  // Copy the value over to the (newly visible) input field.
  if (event.target.value === 'kg') {
    kilograms = pounds
    pounds = kilogramsToPounds(kilograms)
  } else {
    pounds = kilograms
    kilograms = poundsToKilograms(pounds)
  }
  
  dispatch('change', kilograms)
}

function kilogramsToPounds(kgs) {
  return kgs / kilogramsPerPound // Converting kilograms to pounds
}

function poundsToKilograms(lbs) {
  return lbs * kilogramsPerPound
}
</script>

<div class="form-row">
  <div class="col-2">
    {#if units === 'lb' }
      lbs: <input type="number" on:change={onPoundsInputChanged} class="form-control" min="0" bind:value={pounds} />
    {:else}
      kgs: <input type="number" on:change={onKilogramsInputChanged} class="form-control" min="0" bind:value={kilograms} />
    {/if}
  </div>
  <div class="col-auto">
    <select class="form-control" on:change={onUnitsChanged} bind:value={units}>
      <option value="kg">kg</option>
      <option value="lb">lb</option>
    </select>
  </div>
</div>

<pre>
kilograms: { JSON.stringify(kilograms) }
pounds: { JSON.stringify(pounds) }
units: { JSON.stringify(units) }
</pre>
