<script>
  import { create } from '../data/watch'
  import { createdAlert } from '../data/analytics'

  export let filter

  let name = ''
  let submitted = false

  function onSubmit() {
    create(name, filter)
    createdAlert()
    submitted = true
  }

  $: console.log(submitted)
</script>

<button class="btn btn-link btn-sm" data-toggle="modal" data-target="#modal">Create Alert</button>

<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      {#if !submitted}
        <form on:submit|preventDefault={onSubmit}>
          <div class="modal-header bg-primary">
            <h4 class="modal-title text-white">Create an Alert</h4>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="align-text-top">×</span>
            </button>
          </div>
          <div class="modal-body">
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
        <div class="modal-header bg-primary">
          <h4 class="modal-title text-white">Create an Alert</h4>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" class="align-text-top">×</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <span>Created</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      {/if}
    </div>
  </div>
</div>
