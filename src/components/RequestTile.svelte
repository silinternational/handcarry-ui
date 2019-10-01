<script>
import SizeIcon from '../components/SizeIcon.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { push } from 'svelte-spa-router'
import { format } from 'date-fns'

export let request;

let user = request.createdBy || {}
let size = request.size
</script>

<style>
.request-tile {
  border-color: #444444;
  cursor: pointer;
  max-width: 360px;
}
</style>

<div class="container-fluid request-tile border rounded-lg shadow-sm p-3" on:click={ () => push(`/requests/${request.id}`) }>

  <div class="row">
    <div class="col">
      <img src={ request.imageUrl } alt="Photo of an example" class:d-none={ !request.imageUrl } />
    </div>
    
    <div class="col-4 text-center">
      <SizeIcon {size} />
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
    
    <div class="col-5 text-center">
      <UserAvatar {user} />
    </div>
  </div>

</div>
