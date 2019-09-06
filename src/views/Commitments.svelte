<script>
import { getMyCommitments } from '../data/gqlQueries'
import { format } from 'date-fns'

let commitments = []; loadMyCommitments()

async function loadMyCommitments() {
  const response = await getMyCommitments()
  commitments = response.user.posts
}

async function confirmDelivery() {
    //TODO: waiting on API (this will likely be similar to "I'll bring it" (sendCommit())
}
</script>

<h2 class="pb-4">My Commitments</h2>

<div class="alert alert-warning text-center" role="alert">
  Kate, make me beautiful please
</div>

<div class="row">
  <div class="col-sm-12 col-lg-12">
    <div class="list-group list-group-flush" role="tablist">
      {#each commitments as commitment}
        <div class="list-group-item">
          <div class="row pb-4">
            <div class="col-8">
              <h4 class="d-flex align-items-center">{commitment.title}</h4>
            </div>
            <div class="col-4 text-right">
              <button on:click={ confirmDelivery } class="btn btn-primary">Confirm delivery</button>
            </div>
          </div>
          <div class="row">
            <div class="col pb-1">
              Deliver to:
              <a target="_blank" href="https://www.google.com/maps/search/{commitment.destination}" class="pl-1">
                <svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker" /></svg>
                {commitment.destination}
              </a>
            </div>
          </div>

          <div class="row">
            <div class="col">
              Needed between
              <strong>
                { format(new Date(commitment.neededAfter), 'MMM e, yyyy') } – { format(new Date(commitment.neededBefore), 'MMM e, yyyy') }
              </strong>
            </div>
          </div>

          <div class="row pt-4">
            <div class="col">{ commitment.description }</div>
          </div>
        </div>
      {/each}

      {#if commitments.length < 1}
        <i class="text-muted">none</i>
      {/if}
    </div>
  </div>
</div>
