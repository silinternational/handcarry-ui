<script>
import { createEventDispatcher } from 'svelte'

export let label

const dispatch = createEventDispatcher()

function onClick() {
  dispatch('remove')
}
</script>

<style>
button {
  line-height: 1;
}

span {
  font-size: 0.875rem;
  font-weight: normal;
}
</style>

<span class="badge badge-light border border-secondary p-0 m-1">
  <span class="px-2">{ label }</span>
  <button class="btn btn-secondary btn-sm p-1 m-0" type="button" on:click={onClick}>×</button>
</span>
