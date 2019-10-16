<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { push } from 'svelte-spa-router'
import { format } from 'date-fns'

</script>

<style>
.plus-icon {
  padding: 25% 0;
  text-align: center;
  font-size: 5rem;
  line-height: 1em;
}
.request-tile {
  border-color: var(--success);
  cursor: pointer;
  height: 100%;
}
</style>

<div class="card request-tile bg-light" on:click={ () => push(`/requests/new`) }>
  <div class="card-body p-2 position-relative">
    <div class="card-text plus-icon text-success">+</div>
  </div>
  <div class="card-footer p-2 bg-success">
    <div class="row">
      <div class="col text-center"><a class="text-light" href="#/requests/new">Make a request</a></div>
    </div>
  </div>
</div>
