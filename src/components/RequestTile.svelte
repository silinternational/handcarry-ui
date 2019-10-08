<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { push } from 'svelte-spa-router'
import { format } from 'date-fns'

export let request;

$: user = request.createdBy || {}
$: size = request.size
$: photo = request.photo || {}
$: photoUrl = photo.url || ''
</script>

<style>
.request-tile {
  border-color: #444444;
  cursor: pointer;
  height: 100%;
}
.request-tile > .request-image {
  background-color: #ccc;
  max-height: 10rem;
}
.size-indicator-container {
  position: absolute;
  right: 0.3rem;
  top: -1.75rem;
}
</style>

<div class="card request-tile" on:click={ () => push(`/requests/${request.id}`) }>
  <div class="card-img-top request-image text-center">
    <RequestImage {request} />
  </div>
  <div class="card-body p-2 position-relative">
    <div class="size-indicator-container"><SizeIndicator {size} /></div>
    <h3 class="card-title text-center">{request.title}</h3>
  </div>
  <div class="card-footer">
    <div class="float-right mr-n2"><UserAvatar {user} /></div>
    <p class="card-text">{request.destination}</p>
  </div>
</div>
