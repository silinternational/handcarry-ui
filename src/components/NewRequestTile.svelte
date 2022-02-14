<script>
import { createRequestByTile } from 'data/analytics.js'

import { goto } from '@roxi/routify'

function create() {
  $goto(`/requests/new`)

  createRequestByTile()
}
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

<div class="card request-tile bg-light" on:click={create}>
  <div class="card-body half-p position-relative">
    <div class="card-text plus-icon text-success">+</div>
  </div>
  <div class="card-footer half-p bg-success">
    <div class="row">
      <div class="col text-center"><a class="text-light" href="/requests/new">Make a request</a></div>
    </div>
  </div>
</div>
