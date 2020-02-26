<script>
import { isActive } from '../data/filtering'
import FilterTag from './FilterTag.svelte'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: filterKeys = Object.keys(filter)
$: filtersAreActive = Object.values(filter).some(isActive)
</script>

<style>
div {
  font-size: 0.875rem;
}
</style>

{#if filtersAreActive }
  <div class="row d-flex align-items-center">
    <div class="col-auto">
      Results filtered for:
    </div>
    <div class="col text-left">
      {#each filterKeys as key }
        {#if filter[key].active }
          <FilterTag label="{ filter[key].label }" on:remove="{() => dispatch('remove', key)}" />
        {/if}
      {/each}
    </div>
  </div>
{/if}
