<script>
import { getActiveFilterKeys } from '../data/filtering'
import { getFiltersForWatch, getWatchableKeys, create } from '../data/watch'
import { createdWatch } from '../data/analytics'
import FilterTag from './FilterTag.svelte'
import jquery from 'jquery' // $ is already a reserved token in Svelte (stores)
import { onMount } from 'svelte'

export let filter

let name = ''
let submitted = false

function onSubmit() {
  create(name, filter)
  createdWatch()
  submitted = true
}

onMount(() => {
    jquery('#createWatchModal').on('hidden.bs.modal', function (e) {
        name = ''
        submitted = false
    })
});

$: canWatch = getWatchableKeys(getActiveFilterKeys(filter)).length
$: watchFilters = getFiltersForWatch(filter)

</script>
{#if canWatch}
  <button class={$$props.class} data-toggle="modal" data-target="#createWatchModal">Create alert</button>

  <div class="modal fade" id="createWatchModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
            <h4 class="modal-title text-white">Create an alert</h4>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="align-text-top">×</span>
            </button>
        </div>
        {#if !submitted}
          <form on:submit|preventDefault={onSubmit}>
            <div class="modal-body">
              <div class="form-group">
                <div>
                  Alert settings:
                </div>
                {#each watchFilters as watchFilter}
                  <FilterTag label="{watchFilter.label}" hideCloseButton />
                {/each}
              </div>
              <div class="form-group">
                <label class="col-form-label">Alert name:
                  <input type="text" class="form-control" bind:value={name} placeholder="Alert Name"
                         minlength="3" required>
                </label>
              </div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-outline-dark" data-dismiss="modal" tabindex="-1">Close</button>
              <button type="submit" class="btn btn-primary">Create alert</button>
            </div>
          </form>
        {:else}
          <div class="modal-body text-center">
            <span>Alert was created successfully</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
