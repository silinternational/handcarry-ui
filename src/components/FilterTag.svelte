<script>
import { createEventDispatcher } from 'svelte'

export let label
export let hideCloseButton = false

const dispatch = createEventDispatcher()

function onClick() {
  dispatch('remove')
}
</script>

<style>
button {
  border-radius: 0;
  line-height: 1;
}

span {
  font-size: 0.875rem;
  font-weight: normal;
  line-height: 1.5;
}
</style>

<span class="badge badge-light border border-secondary p-0 m-quarter">
  <span class="px-half">{ label }</span>
  {#if !hideCloseButton }
    <button class="btn btn-secondary btn-sm p-quarter m-0" type="button" on:click={onClick}>×</button>
  {/if}
</span>
