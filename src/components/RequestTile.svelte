<script>
import SizeIndicator from '../components/SizeIndicator.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { push } from 'svelte-spa-router'
import { format } from 'date-fns'

export let request;

let user = request.createdBy || {}
let size = request.size
let photo = request.photo || {}
let photoUrl = photo.url || ''
</script>

<style>
.request-image {
  max-height: 200px;
  max-width: 200px;
}

.request-tile {
  border-color: #444444;
  cursor: pointer;
  max-width: 360px;
}
</style>

<div class="container-fluid request-tile border rounded-lg shadow-sm p-3" on:click={ () => push(`/requests/${request.id}`) }>

  <div class="row">
    <div class="col">
      <img src={ photoUrl } alt="Photo of an example" class="request-image" class:d-none={ !photoUrl } />
    </div>
    
    <div class="col-auto">
      <SizeIndicator {size} />
    </div>
  </div>
  
  <div class="row">
    <div class="col">
      <h3>{ request.title }</h3>
    </div>
  </div>
  
  <div class="row">
    <div class="col">
      <p>{ request.destination }</p>
    </div>
    
    <div class="col-auto">
      <UserAvatar {user} />
    </div>
  </div>

</div>
