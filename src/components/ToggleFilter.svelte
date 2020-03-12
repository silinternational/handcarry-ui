<script>
import { createEventDispatcher } from 'svelte'

export let active
export let label

const dispatch = createEventDispatcher()

function onChange(event) {
  dispatch('change', event.target.checked)
}
</script>

<label class="d-block">
  <input type="checkbox" on:change={onChange} checked={active} /> { label }
</label>
