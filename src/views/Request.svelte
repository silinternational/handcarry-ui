<script>
import { me } from '../data/user'
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import { requests, cancel } from '../data/requests'
import { push } from 'svelte-spa-router'
import Icon from 'fa-svelte'
import { faTrash, faComment } from '@fortawesome/free-solid-svg-icons'
import Messaging from '../components/Messaging.svelte'
import { conversations } from '../data/messaging'
import { cancelled } from '../data/analytics'

export let params = {} // URL path parameters, provided by router.

let conversationId = null
let potentialConversation = null

$: request = $requests.find(({ id }) => id === params.id) || {}
$: requestor = request.createdBy || {}
$: provider = request.provider || {}
$: conversationsOnThisRequest = $conversations.filter(({ post }) => post.id === request.id)
$: isMine = $me.id && (requestor.id === $me.id)
$: imProviding = $me.id && (provider.id === $me.id)
$: hasConversation = conversationsOnThisRequest.length > 0 || potentialConversation
$: destination = request.destination && request.destination.description || ''

// Select a default conversation (when appropriate)
$: if (!potentialConversation && !conversationId && conversationsOnThisRequest.length > 0) {
  conversationId = conversationsOnThisRequest[0].id
}

async function cancelRequest() {
  await cancel(params.id)

  push(`/requests`)

  cancelled()
}

function showConversation(id) {
  conversationId = id
}

function discussThis() {
  potentialConversation = {
    post: request
  }
}

function newConversationCreated(newConversation) {
  potentialConversation = null
  
  showConversation(newConversation.id)
}
</script>

<style>
div.card-img {
  min-height: 215px; /* wanted to keep short squatty images from making the whole card look weird. */
}
</style>

<a href="#/requests" class="text-secondary">« back to requests</a>

{#if request.id}
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
              <button on:click={cancelRequest} class="btn btn-sm btn-outline-danger rounded-circle float-right">
                <Icon icon={faTrash} />
              </button>
            {/if}
          </h5>
          <p>{ destination }</p>
          <blockquote class="blockquote">
            { request.description }
            <footer class="blockquote-footer">
              { requestor.nickname } 
              {#if !isMine && !hasConversation}
                <button on:click={discussThis} class="btn btn-success btn-sm mt-1 align-top">
                  <Icon icon={faComment} class="mr-2" />
                  Discuss this
                </button>
              {/if}
            </footer>
          </blockquote>
        </div>

        <div class="row p-2">
          <div class="col" />
          <div class="col-auto">
            {#if isMine}
              <a href="#/requests/{request.id}/edit" class="btn btn-sm btn-warning">Edit</a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>

  {#if isMine || imProviding || hasConversation }
    <h4 class="text-center mt-4">Messages</h4>
    <Messaging minimal listColumns="col-12 col-md-3" conversations={conversationsOnThisRequest} {conversationId} {potentialConversation}
              on:conversation-selected={event => showConversation(event.detail)}
              on:new={event => newConversationCreated(event.detail)} />
  {/if}
{:else}
  <p class="alert alert-danger text-center mt-4" role="alert">
    That request was not found
  </p>
{/if}