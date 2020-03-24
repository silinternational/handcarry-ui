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
    jquery('#thisModal').on('hidden.bs.modal', function (e) {
        name = ''
        submitted = false
    })
});

$: canWatch = getWatchableKeys(getActiveFilterKeys(filter)).length
$: watchFilters = getFiltersForWatch(filter)

</script>
{#if canWatch}
  <button class={$$props.class} data-toggle="modal" data-target="#thisModal">Create Alert</button>

  <div class="modal fade" id="thisModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
            <h4 class="modal-title text-white">Create an Alert</h4>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="align-text-top">×</span>
            </button>
        </div>
        {#if !submitted}
          <form on:submit|preventDefault={onSubmit}>
            <div class="modal-body">
              <div>
                Alert Settings:
              </div>
                {#each watchFilters as f}
                  <FilterTag label="{f.label}" hideCloseButton />
                {/each}
              <div class="form-group">
                <label for="alert-name" class="col-form-label">Alert Name:</label>
                <input type="text" class="form-control" id="alert-name" bind:value={name} placeholder="Alert Name"
                       minlength="3">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create Alert</button>
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
