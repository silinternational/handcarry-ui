<script>
import FilterTag from './FilterTag.svelte'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: filteringByKeyword = filter.search.active
$: filteringBySize = filter.size.active
$: filteringToMyCommitments = filter.provider.active
$: filteringToMyRequests = filter.creator.active
$: filtersAreActive = filteringByKeyword || filteringBySize || filteringToMyCommitments || filteringToMyRequests
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
        <FilterTag label="{ filter.search.getLabel() }" on:remove="{() => dispatch('remove', 'search')}" />
      {/if}
      
      {#if filteringBySize }
        <FilterTag label="{ filter.size.getLabel() }" on:remove="{() => dispatch('remove', 'size')}" />
      {/if}
      
      {#if filteringToMyCommitments }
        <FilterTag label="{ filter.provider.getLabel() }" on:remove="{() => dispatch('remove', 'provider')}" />
      {/if}
      
      {#if filteringToMyRequests }
        <FilterTag label="{ filter.creator.getLabel() }" on:remove="{() => dispatch('remove', 'creator')}" />
      {/if}
    </div>
  </div>
{/if}
