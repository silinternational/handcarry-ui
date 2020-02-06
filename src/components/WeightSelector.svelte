<script>
import { createEventDispatcher } from 'svelte'

export let kilograms

const dispatch = createEventDispatcher()

let numericValue
let units

$: if (numericValue) {
  kilograms = (units === 'kg') ? numericValue : poundsToKilograms(numericValue)
} else {
  kilograms = null
}
$: dispatch('change', kilograms)

function poundsToKilograms(lbs) {
  return lbs * 0.45359237
}
function roundInputValue(event) {
  const value = event.target.value
  if (value) {
    /* The rounding precision here (e.g. 0.1) should match the "step" value of the input. */
    numericValue = Math.round(event.target.value * 10) / 10
  }
}
</script>

<div class="form-row">
  <div class="col-2">
    <input type="number" on:blur={roundInputValue} class="form-control" min="0" step="0.1" bind:value={numericValue} />
  </div>
  <div class="col-auto">
    <select class="form-control" bind:value={units}>
      <option value="kg">kg</option>
      <option value="lb">lb</option>
    </select>
  </div>
</div>
