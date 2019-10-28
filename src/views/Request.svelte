<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import { getRequest, cancelPost } from '../data/gqlQueries'
import { push, pop } from 'svelte-spa-router'
import Icon from 'fa-svelte'
import { faTrash, faComment } from '@fortawesome/free-solid-svg-icons'
import Messaging from '../components/Messaging.svelte'

export let params = {} // URL path parameters, provided by router.

let conversationId = null
let request = {}; loadRequest()
let me = {}
let potentialConversation = null

async function loadRequest() {
  const response = await getRequest(params.id)
  request = response.post
  me = response.user
}

$: requestor = request.createdBy || {}
$: provider = request.provider || {}
$: conversations = request.threads || []
$: isMine = me.id && (requestor.id === me.id)
$: imProviding = me.id && (provider.id === me.id)
$: hasConversation = conversations.length > 0 || potentialConversation
$: destination = request.destination && request.destination.description || ''
$: if (!potentialConversation && !conversationId && conversations.length > 0) {
  conversationId = conversations[0].id
}

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

function showConversation(id) {
  conversationId = id
}

function discussThis() {
  potentialConversation = {
    post: request
  }
}

function onConversationStarted(event) {
  let newConversation = {
    post: request,
    id: event.detail.id,
    messages: event.detail.messages,
  }
  
  conversations[conversations.length] = newConversation
  conversationId = newConversation.id
  
  potentialConversation = null
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
          <button class="btn btn-sm btn-warning" disabled title="unavailable at this time">Edit</button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

{#if isMine || imProviding || hasConversation }
  <h4 class="text-center mt-4">Messages</h4>
  <Messaging minimal listColumns="col-12 col-md-3" {conversations} {me} {conversationId} {potentialConversation}
             on:conversation-selected={event => showConversation(event.detail)}
             on:new={onConversationStarted} />
{/if}