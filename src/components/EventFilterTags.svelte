<script>
import FilterTag from './FilterTag.svelte'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: filteringByKeyword = !!filter.search
$: filteringByLocation = !!filter.location.description
$: filtersAreActive = filteringByKeyword || filteringByLocation
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
      {#if filteringByKeyword }
        <FilterTag label="Keyword: {filter.search}" on:remove="{() => dispatch('remove', 'search')}" />
      {/if}
      
      {#if filteringByLocation }
        <FilterTag label="Location: {filter.location.description}" on:remove="{() => dispatch('remove', 'location')}" />
      {/if}
    </div>
  </div>
{/if}
