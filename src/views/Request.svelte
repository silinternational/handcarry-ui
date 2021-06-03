<script>
import { me } from '../data/user'
import { replace } from 'svelte-spa-router'
import RequestImage from '../components/RequestImage.svelte'
import SizeTile from '../components/SizeTile.svelte'
import UserAvatar from '../components/UserAvatar.svelte'
import RequestMessaging from '../components/RequestMessaging.svelte'
import OtherRequestsBy from '../components/OtherRequestsBy.svelte'
import { describeVisibility } from '../data/visibility.js'
import WeightDisplay from '../components/WeightDisplay.svelte'
import { getClient, operationStore, query } from "@urql/svelte";

export let params = {} // URL path parameters, provided by router.

const dlTermColumns        = 'col-12 col-md-5 col-lg-3'
const dlDescriptionColumns = 'col-12 col-md-7 col-lg-9'

$: conversationId = params.conversationId
$: requester = $req.data && $req.data.request.createdBy || {}
$: isMine = $me.id && (requester.id === $me.id) // Check $me.id first to avoid `undefined === undefined`
$: params.id, query(req)

function goToConversation(conversationId) {
  replace(`/requests/${params.id}/conversation/${conversationId}`)
}

const req = operationStore(
    `
   query($id: ID!) {
  request(id: $id) {
    createdBy {
    avatarURL
    id
    nickname
  }
  description
  destination {
    description
    latitude
    longitude
    country
  }
  meeting {
    id
    name
  }
  origin {
    description
    latitude
    longitude
    country
  }
  id
  kilograms
  neededBefore
  organization {
    name
  }
  photo {
    url
  }
  photoID
  potentialProviders {
    id
    nickname
  }
  provider {
    id
    nickname
  }
  size
  status
  title
  visibility
  }
}
  `,
    { id: params.id }
  );
</script>

<style>
.keep-line-breaks {
  white-space: pre-line;
}
.request-image-container {
  height: 160px; /* Set height inherited by request image, so it's not 0px */
  min-width: 105px;
}
.size-tile-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 160px;
}
</style>

<div class="row mb-3">
  <div class="col">
    <a href="#/requests" class="text-secondary mb-3">« back to requests</a>
  </div>
</div>


<button on:click={() => query(req)}>query</button>

{#if $req.fetching}
  <p>⏳ retrieving request...</p>
{:else if $req.error}
  Oh no!! {$req.error.message}
{:else if !$req.data}
  No data
{:else}
  <div class="row">
    <div class="col-12 col-sm-4 col-lg-3">
      <div class="row">
        <div class="col col-sm-12 mb-4"><div class="request-image-container"><RequestImage request={$req.data.request} hideSize /></div></div>
        <div class="col col-sm-12 mb-4"><div class="size-tile-container"><SizeTile size={$req.data.request.size} /></div></div>
      </div>
    </div>
    <div class="col">
      <div class="row">
        <div class="col">
          <h3 class="card-title">{ $req.data.request.title || ''}</h3>
          <dl class="row">
            <dt class={dlTermColumns}>Deliver to</dt>
            <dd class={dlDescriptionColumns}>{ ($req.data.request.destination && $req.data.request.destination.description) || '' }</dd>

            <dt class={dlTermColumns}>From</dt>
            <dd class={dlDescriptionColumns}>
              {#if $req.data.request.origin }
                { $req.data.request.origin.description }
              {:else}
                <span class="font-italic">anywhere</span>
              {/if}
            </dd>

            {#if isMine && $req.data.request.visibility }
              <dt class={dlTermColumns}>Visible to</dt>
              <dd class={dlDescriptionColumns}>{ describeVisibility($req.data.request.visibility, [$req.data.request.organization]) }</dd>
            {/if}

            {#if $req.data.neededBefore }
              <dt class={dlTermColumns}>Needed before</dt>
              <dd class={dlDescriptionColumns}>{ (new Date($req.data.request.neededBefore + ' 00:00:00')).toLocaleDateString() }</dd>
            {/if}

            <!-- Show any actual value (including zero) -->
            {#if $req.data.request.kilograms != null }
              <dt class={dlTermColumns}>Weight</dt>
              <dd class={dlDescriptionColumns}><WeightDisplay kilograms={$req.data.request.kilograms} /></dd>
            {/if}
          </dl>
        </div>
        <div class="col-auto">
          <div class="text-center mb-2">
            <UserAvatar user={requester} />
            <div>{ requester.nickname || '' }</div>
          </div>
        </div>
      </div>
      <p class="mb-4 keep-line-breaks">{ $req.data.request.description || '' }</p>
      {#if isMine}
        <a href="#/requests/{$req.data.request.id}/edit" class="btn btn-sm btn-outline-secondary mb-2">Edit request</a>
      {/if}
      <RequestMessaging request={$req.data.request} {conversationId} on:conversation-selected={event => goToConversation(event.detail)} />
      {#if !isMine }
        <OtherRequestsBy request={$req.data.request} {requester} />
      {/if}
    </div>
  </div>
{/if}
