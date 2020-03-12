<script>
import Icon from 'fa-svelte'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'

export let title
export let value

const dispatch = createEventDispatcher()

function onInput(event) {
  dispatch('input', event.target.value)
}
</script>

<p class="mb-1 text-muted" id="search-filter-label">{ title }:</p>
<div class="input-group mb-2">
  <div class="input-group-prepend">
    <div class="input-group-text"><Icon icon={faSearch} /></div>
  </div>
  <input type="text" aria-labelledby="search-filter-label" class="form-control form-control-sm"
         placeholder="Search" {value} on:input={onInput} />
</div>
