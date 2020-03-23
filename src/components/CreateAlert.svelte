<script>
import { getActiveFilterKeys } from '../data/filtering'
import { getFiltersForAlert, getAlertableKeys } from '../data/alerting'
import { create } from '../data/watch'
import { createdAlert } from '../data/analytics'
import FilterTag from './FilterTag.svelte'

export let filter

let name = ''
let submitted = false

function onSubmit() {
  create(name, filter)
  createdAlert()
  submitted = true
}

$: canAlert = getAlertableKeys(getActiveFilterKeys(filter)).length
$: alertFilters = getFiltersForAlert(filter)

</script>
{#if canAlert}
  <button class="btn btn-link btn-sm" data-toggle="modal" data-target="#modal">Create Alert</button>

  <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true">
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
                {#each alertFilters as f}
                  <FilterTag label="{f.label}" showCloseButton="{false}" />
                {/each}
              <div class="form-group">
                <label for="alert-name" class="col-form-label">Alert Name:</label>
                <input type="text" class="form-control" id="alert-name" bind:value={name} placeholder="Alert Name"
                       minlength="3">
              </div>
            </div>
            <div class="modal-footer">
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
