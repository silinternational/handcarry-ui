<script>
import { isActive } from '../data/filtering'
import { receive, send } from '../data/transitions';
import FilterTag from './FilterTag.svelte'
import { createEventDispatcher } from 'svelte'
import { flip } from 'svelte/animate';

export let filter = {}

const dispatch = createEventDispatcher()

$: filterKeys = Object.keys(filter)
$: activeFilterKeys = filterKeys.filter(key => filter[key].active)
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
      {#each activeFilterKeys as key (key) }
        <div class="d-inline-block"
             animate:flip="{{ duration: 250 }}"
             in:receive="{{ key: key }}"
             out:send="{{ key: key }}">
          <FilterTag label="{ filter[key].label }" on:remove="{() => dispatch('remove', key)}" />
        </div>
      {/each}
    </div>
  </div>
{/if}
