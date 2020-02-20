<script>
import FilterTag from './FilterTag.svelte'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: filteringByKeyword = !!filter.search
$: filtersAreActive = filteringByKeyword
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
    </div>
  </div>
{/if}
