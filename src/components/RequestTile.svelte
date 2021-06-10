<script>
import RequestImage from '../components/RequestImage.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import { goto } from '@roxi/routify'

export let request;
export let smaller = false;

$: user = request.createdBy || {}
$: size = request.size
$: from = request.origin && request.origin.description
$: to = request.meeting ? request.meeting.name : request.destination.description
</script>

<style>
.card-footer.smaller {
  line-height: 1.3;
}
.card-title {
  font-size: 1.3rem;
}
h3.smaller {
  font-size: 1.15rem;
  margin-bottom: 0.25rem;
}
.multi-line-truncate {
  /* See https://stackoverflow.com/a/13924997 and https://caniuse.com/#search=line-clamp for details. */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* number of lines to show */
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
.small-caps {
  font-variant: small-caps;
}
.smaller {
  font-size: 0.9rem;
}
.smaller .from-prefix,
.smaller .to-prefix {
  display: block;
}

/* Leave space for the UserAvatar. */
.to-from-lines { padding-right: 2.1rem; }
.smaller .to-from-lines { padding-right: inherit; }
.smaller .from-line { padding-right: 2.1rem;}
</style>

<div class="card request-tile" on:click={ () => $goto(`/requests/${request.id}`) }>
  <div class="card-img-top request-image text-center" class:smaller>
    <RequestImage {request} />
  </div>
  <div class="card-body d-flex align-items-start flex-column p-2">
    <h3 class="card-title mb-auto multi-line-truncate" class:smaller>{request.title}</h3>
  </div>
  <div class="card-footer p-2" class:smaller>
    <div class="position-relative">
      <div class="position-absolute" style="bottom: 0; right: 0;"><UserAvatar {user} small /></div>

      <div class="to-from-lines">
        <div class="text-truncate to-line" class:smaller title={to}>
          <span class="text-muted small small-caps to-prefix">To:</span>
          { to }
        </div>

        <div class="text-truncate from-line" class:smaller title={from}>
          <span class="text-muted small small-caps from-prefix">From:</span>
          {#if from }
            { from }
          {:else}
            <span class="font-italic">anywhere</span>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
