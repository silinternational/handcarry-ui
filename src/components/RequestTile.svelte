<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { push } from 'svelte-spa-router'
import { format } from 'date-fns'

export let request;
export let smaller = false;

$: user = request.createdBy || {}
$: size = request.size
</script>

<style>
.card-footer.smaller {
  line-height: 75%;
}
h3.smaller {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}
.request-tile {
  border-color: #444444;
  cursor: pointer;
  height: 100%;
}
.request-tile > .request-image {
  overflow: hidden;
  height: 10rem;
}
.request-tile > .request-image.smaller {
  height: 6rem;
}
.smaller {
  font-size: 0.9rem;
}
</style>

<div class="card request-tile" on:click={ () => push(`/requests/${request.id}`) }>
  <div class="card-img-top request-image text-center" class:smaller>
    <RequestImage {request} />
  </div>
  <div class="card-body p-2">
    <h3 class="card-title" class:smaller>{request.title}</h3>
    <div class="card-text" class:smaller>{request.destination.description}</div>
  </div>
  <div class="card-footer p-2" class:smaller>
    <div class="row">
      <div class="col"><UserAvatar {user} small /></div>
      <div class="col-auto"><a class="pr-1" href="#/requests/{request.id}">View</a></div>
    </div>
  </div>
</div>
