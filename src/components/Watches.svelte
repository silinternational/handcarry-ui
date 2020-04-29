<script>
import Icon from 'fa-svelte'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { getWatches, deleteWatch } from '../data/watch'
import { onMount } from 'svelte'
import FilterTag from './FilterTag.svelte'
import { labelFor } from '../data/requestFiltering'
import { fly } from 'svelte/transition'

let watches = []
let loading = false
let numVisibleLimited = true

onMount(async () => {
  try {
    loading = true
    watches = await getWatches()  
  } finally {
    loading = false
  }
})

$: visibleWatches = numVisibleLimited ? firstThree(watches) : watches

const firstThree = array => array.slice(0,3)

const relevantCriteria = watch => Object.keys(watch).filter(key => isCriteriaField(key) && hasValue(watch[key]))
const isCriteriaField = field => ! ['id', 'name'].includes(field)
const hasValue = value => value !== null

function valueFor(criteria, watch) {
  const value = watch[criteria]

  return value.description || value.name || value
}

async function remove(watch) {
  await deleteWatch(watch.id)

  watches = watches.filter(({ id }) => id !== watch.id)
}

function showAll() {
  numVisibleLimited = false
}
</script>

{#each visibleWatches as watch (watch.id)} <!-- id needed for animation -->
  <div class="card mb-2" out:fly={{ x: 300, duration: 200}}>
    <div class="row no-gutters">
      <div class="col">
        <div class="card-body">
          <h5 class="card-title">{watch.name}</h5>
          
          <p class="card-text">
            {#each relevantCriteria(watch) as criteria}
              <FilterTag label={labelFor(criteria, valueFor(criteria, watch))} hideCloseButton />
            {/each}
          </p>
        </div>
      </div>
      <div class="col-1 d-flex align-items-end justify-content-center">
        <button type="button" on:click={() => remove(watch)} class="btn btn-sm" title="Delete this alert">
          <Icon icon={faTrash} class="text-danger" />
        </button>
      </div>
    </div>
  </div>
{:else}
  {#if loading}
    ⏳ checking for saved alerts...
  {:else}
    No saved alerts.
  {/if}
{/each}

{#if watches.length > 3 && numVisibleLimited}
  <button on:click={showAll} class="btn btn-link w-100 text-right">see all...</button>
{/if}
