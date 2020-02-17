<script>
import { me } from '../data/user'
import { isDefaultSizeFilter } from '../data/sizes'
import FilterTag from './FilterTag.svelte'
import { createEventDispatcher } from 'svelte'

export let filter = {}

const dispatch = createEventDispatcher()

$: filterKeys = Object.keys(filter)
$: lowerCaseSelectedSize = String(filter.size[filter.size.length - 1]).toLowerCase()
$: filteringByKeyword = filter.search
$: filteringBySize = ! isDefaultSizeFilter(lowerCaseSelectedSize)
$: filteringToMyCommitments = $me.id && filter.provider && filter.provider.id === $me.id
$: filteringToMyRequests = $me.id && filter.createdBy && filter.createdBy.id === $me.id
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
        <FilterTag label="Keyword: {filter.search}" on:remove="{() => dispatch('remove', 'search')}" />
      {/if}
      
      {#if filteringBySize }
        <FilterTag label="Size: {lowerCaseSelectedSize}" on:remove="{() => dispatch('remove', 'size')}" />
      {/if}
      
      {#if filteringToMyCommitments }
        <FilterTag label="Only my commitments" on:remove="{() => dispatch('remove', 'provider')}" />
      {/if}
      
      {#if filteringToMyRequests }
        <FilterTag label="Only my requests" on:remove="{() => dispatch('remove', 'createdBy')}" />
      {/if}
    </div>
  </div>
{/if}
