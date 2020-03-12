<script>
import { createEventDispatcher } from 'svelte'

export let title
export let value
export let placeholder = 'City'

const dispatch = createEventDispatcher()

function onInput(event) {
  dispatch('input', event.target.value)
}
</script>

<label class="d-block">
  <p class="mb-1 text-muted">{ title }:</p>
  <input class="form-control form-control-sm" {placeholder} {value} on:input={onInput} />
</label>
