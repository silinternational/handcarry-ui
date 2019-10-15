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
.request-list-entry {
  border-color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
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
        <b class="card-title">{request.title}</b>
        <span class="card-text">{request.destination}</span>
      </div>
    </div>
    <div class="col-auto p-2"><SizeIndicator {size} /></div>
    <div class="col-auto p-2"><UserAvatar {user} />
    </div>
  </div>
</div>
