<script>
import { createEventDispatcher } from 'svelte'
import LocationInput from './LocationInput.svelte'

export let title
export let location
export let placeholder = 'City'

const dispatch = createEventDispatcher()

function onChange(event) {
  dispatch('change', event.detail)
}
</script>

  <p class="mb-1 text-muted">{ title }:</p>
  <div class="input-group mb-2">
      <LocationInput class="form-control form-control-sm" on:change={onChange} {placeholder} {location} />
  </div>
