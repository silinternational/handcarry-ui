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
.request-tile {
  border-color: #444444;
  cursor: pointer;
  height: 100%;
}
.request-tile > .request-image {
  overflow: hidden;
  height: 10rem;
}
</style>

<div class="card request-tile" on:click={ () => push(`/requests/${request.id}`) }>
  <div class="card-img-top request-image text-center">
    <RequestImage {request} />
  </div>
  <div class="card-body p-2">
    <h3 class="card-title">{request.title}</h3>
    <div class="card-text">{request.destination.description}</div>
  </div>
  <div class="card-footer p-2">
    <div class="row">
      <div class="col"><UserAvatar {user} /></div>
      <div class="col-auto"><a class="pr-1" href="#/requests/{request.id}">View</a></div>
    </div>
  </div>
</div>
