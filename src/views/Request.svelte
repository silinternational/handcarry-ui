<script>
import { me } from '../data/user'
import { replace } from 'svelte-spa-router'
import RequestImage from '../components/RequestImage.svelte'
import SizeTile from '../components/SizeTile.svelte'
import { requests, loading } from '../data/requests'
import UserAvatar from '../components/UserAvatar.svelte'
import RequestMessaging from '../components/RequestMessaging.svelte'
import OtherRequestsBy from '../components/OtherRequestsBy.svelte'

export let params = {} // URL path parameters, provided by router.

$: conversationId = params.conversationId
$: request = $requests.find(({ id }) => id === params.id) || {}
$: requester = request.createdBy || {}
$: isMine = $me.id && (requester.id === $me.id) // Check $me.id first to avoid `undefined === undefined`
$: destination = (request.destination && request.destination.description) || ''
$: origin = (request.origin && request.origin.description) || ''

function goToConversation(conversationId) {
  replace(`/requests/${params.id}/conversation/${conversationId}`)
}
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
.user-avatar-container {
  max-width: 90px;
}
</style>

<div class="row mb-3">
  <div class="col">
    <a href="#/requests" class="text-secondary mb-3">« back to requests</a>
  </div>
</div>


{#if $loading}
  <p>⏳ retrieving request...</p>
{:else if request.id}
  <div class="row">
    <div class="col-12 col-sm-4 col-lg-3">
      <div class="row">
        <div class="col col-sm-12 mb-4"><div class="request-image-container"><RequestImage {request} hideSize /></div></div>
        <div class="col col-sm-12 mb-4"><div class="size-tile-container"><SizeTile size={request.size} /></div></div>
      </div>
    </div>
    
    <div class="col">
      <div class="row">
        <div class="col">
          <h3 class="card-title">{ request.title || ''}</h3>
          <p>
            Deliver to <u>{ destination }</u>
            {#if origin }
              <br />from <u>{ origin }</u>
            {/if}
          </p>
        </div>
        <div class="col-auto">
          <div class="user-avatar-container text-center mb-2">
            <UserAvatar user={requester} />
            <div>{ requester.nickname || '' }</div>
          </div>
        </div>
      </div>
      <p class="mb-4 keep-line-breaks">{ request.description || '' }</p>
      {#if isMine}
        <a href="#/requests/{request.id}/edit" class="btn btn-sm btn-outline-secondary mb-2">Edit request</a>
      {/if}
      <RequestMessaging {request} {conversationId} on:conversation-selected={event => goToConversation(event.detail)} />
      {#if !isMine }
        <OtherRequestsBy {request} {requester} />
      {/if}
    </div>
  </div>
{/if}
