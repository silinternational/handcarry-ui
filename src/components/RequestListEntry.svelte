<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { goto } from '@roxi/routify'

export let request;

$: user = request.createdBy || {}
$: size = request.size
$: from = request.origin && request.origin.description
$: to = request.meeting ? request.meeting.name : request.destination.description
</script>

<style>
.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0;
}
.request-list-entry {
  border-color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.request-list-entry:hover {
  border-color: var(--blue);
}
</style>

<div class="card request-list-entry h-100" on:click="{ () => $goto(`/requests/${request.id}`) }">
  <div class="row no-gutters h-100">
    <div class="col-2 col-sm-1">
      <div class="card-img text-center h-100">
        <RequestImage {request} hideSize />
      </div>
    </div>
    <div class="col-7 col-sm-9">
      <div class="card-body p-1">
        <h3 class="card-title text-truncate">{request.title}</h3>
        <div class="form-row">
          <div class="col-12 col-sm text-truncate" title={to}>
            <span class="text-muted small small-caps">To:</span>
            { to }
          </div>
          <div class="col-12 col-sm text-truncate" title={from}>
            <span class="text-muted small small-caps">From:</span>
            {#if from }
              { from }
            {:else}
              <span class="font-italic">anywhere</span>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 col-sm-2 text-center small">
      <SizeIndicator {size} /><br />
      <UserAvatar {user} small />
    </div>
  </div>
</div>
