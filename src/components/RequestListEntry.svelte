<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { push } from 'svelte-spa-router'
import { format } from 'date-fns'

export let request;

$: user = request.createdBy || {}
$: size = request.size
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

<div class="card request-list-entry h-100" on:click={ () => push(`/requests/${request.id}`) }>
  <div class="row no-gutters h-100">
    <div class="col-1">
      <div class="card-img text-center h-100">
        <RequestImage {request} showSize={false} />
      </div>
    </div>
    <div class="col">
      <div class="card-body p-2">
        <h3 class="card-title d-inline-block">{request.title}</h3>
        <span class="card-text">| {request.destination.description}</span>
      </div>
    </div>
    <div class="col-auto p-2"><SizeIndicator {size} /></div>
    <div class="col-auto p-2"><UserAvatar {user} />
    </div>
  </div>
</div>
