<script>
import LocationInput from 'components/LocationInput.svelte'

import { createEventDispatcher } from 'svelte'

export let title
export let location
export let placeholder = 'City'

const dispatch = createEventDispatcher()

function onChange(event) {
  dispatch('change', event.detail)
}
</script>

  <p class="mb-1 text-muted">{ title }:</p>
  <LocationInput class="form-control form-control-sm" on:change={onChange} {placeholder} {location} />
