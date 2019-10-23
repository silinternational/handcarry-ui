<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import { getRequest, cancelPost } from '../data/gqlQueries'
import { push, pop } from 'svelte-spa-router'
import Icon from 'fa-svelte'
import { faTrash, faComment } from '@fortawesome/free-solid-svg-icons'
import Conversations from '../components/Conversations.svelte'

export let params = {} // URL path parameters, provided by router.

let conversationId = null
let request = {}; loadRequest()
let me = {}

async function loadRequest() {
  const response = await getRequest(params.id)
  request = response.post
  me = response.user
}

$: requestor = request.createdBy || {}
$: provider = request.provider || {}
$: conversations = request.threads || []
$: isMine = requestor.id === me.id
$: imProviding = provider.id === me.id
$: hasConversation = conversations.length > 0
$: destination = request.destination && request.destination.description || ''

async function cancel() {
  try {
    await cancelPost(params.id)

    push(`/requests`)
  } catch (e) {
    // TODO: need errorhandling
  }
}

function asReadableDate(timestamp) {
  return new Date(timestamp).toLocaleDateString()
}
</script>

<style>
div.card-img {
  min-height: 215px; /* wanted to keep short squatty images from making the whole card look weird. */
}
</style>

<h3>Request detail</h3>

<a href="#/requests" on:click|preventDefault={pop} class="text-secondary">« back to requests</a>

<div class="card my-3">
  <div class="row no-gutters">
    <div class="col-12 col-md-3 card-img">
      <RequestImage {request} />
    </div>

    <div class="col-md-9">
      <div class="card-body">
        <h5 class="card-title">
          { request.title || ''}
          {#if isMine}
          <button on:click={cancel} class="btn btn-sm btn-outline-danger rounded-circle float-right">
            <Icon icon={faTrash} />
          </button>
          {/if}
        </h5>
        <p>{ destination }</p>
        <blockquote class="blockquote">
          { request.description }
          <footer class="blockquote-footer">
            { requestor.nickname } 
            {#if !isMine || hasConversation}
            <a href="#/messages/new-conversation/{ request.id }" class="btn btn-success btn-sm m-1" role="button">
              <Icon icon={faComment} class="mr-2" />
              Discuss this
            </a>
            {/if}
          </footer>
        </blockquote>
      </div>

      <div class="row p-2">
        <div class="col" />
        <div class="col-auto">
          {#if isMine}
          <button class="btn btn-sm btn-warning" disabled title="unavailable at this time">Edit</button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

{#if isMine || imProviding}
  <Conversations {conversations} {me} {conversationId} on:conversation-selected={event => conversationId = event.detail} />
{/if}