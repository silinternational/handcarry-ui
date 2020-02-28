<script>
import { isActive } from '../data/filtering'
import FilterTag from './FilterTag.svelte'
import { createEventDispatcher } from 'svelte'
import { flip } from 'svelte/animate';
import { quintInOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export let filter = {}

const dispatch = createEventDispatcher()
const [send, receive] = crossfade({
  fallback(node) {
    // Preserve any existing CSS transform.
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration: 250,
      easing: quintInOut,
      css: t => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    };
  }
});

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
