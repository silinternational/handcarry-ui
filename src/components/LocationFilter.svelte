<script>
import { createEventDispatcher } from 'svelte'

export let title
export let value

const dispatch = createEventDispatcher()

function onInput(event) {
  dispatch('input', event.target.value)
}
</script>

<p class="mb-1 text-muted" id="location-filter-label">{ title }:</p>
<input aria-labelledby="location-filter-label" class="form-control form-control-sm"
       placeholder="City" {value} on:input={onInput} />
