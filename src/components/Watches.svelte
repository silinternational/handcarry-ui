<script>
import Icon from 'fa-svelte'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { getWatches, deleteWatch } from '../data/watch'
import { onMount } from 'svelte'
import FilterTag from './FilterTag.svelte'
import { labelFor } from '../data/requestFiltering'

let watches = []
let loading = false

onMount(loadWatches)

async function loadWatches() {
  try {
    loading = true
    watches = await getWatches()  
  } finally {
    loading = false
  }
}

const relevantCriteria = watch => Object.keys(watch).filter(key => isCriteriaField(key) && hasValue(watch[key]))
const isCriteriaField = field => ! ['id', 'name'].includes(field)
const hasValue = value => value !== null

function valueFor(criteria, watch) {
  const value = watch[criteria]

  return value.description || value.name || value
}

async function remove(id) {
  await deleteWatch(id)

  loadWatches()
}
</script>

<!-- TODO: bunch of alerts?  scrollable container? "see more..." -->
{#each watches as watch}
  <div class="card mb-2">
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
        <button type="button" on:click={() => remove(watch.id)} class="btn btn-sm" title="Delete this alert">
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
