<script>
import { conversations, listOtherParticipants } from '../data/messaging'
import Icon from 'fa-svelte'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { me } from '../data/user'
import Messaging from '../components/Messaging.svelte'

export let request

let conversationId = null
let potentialConversation = null

$: requester = request.createdBy || {}
$: isMine = $me.id && (requester.id === $me.id)
$: conversationsOnThisRequest = $conversations.filter(({ post }) => post.id === request.id)
$: selectedConversation = conversationsOnThisRequest.find(({ id }) => id === conversationId) || {}
$: hasConversation = conversationsOnThisRequest.length > 0 || potentialConversation

// Select a default conversation (when appropriate)
$: if (!potentialConversation && !conversationId && conversationsOnThisRequest.length > 0) {
  conversationId = conversationsOnThisRequest[0].id
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

function showConversation(id) {
  conversationId = id
}
</script>

<div class="row">
  <div class="col">
    {#if hasConversation }
      <h4 class="text-blue">Chat with { listOtherParticipants(selectedConversation, $me) }</h4>
      <Messaging minimal listColumns="col-12 col-md-3" conversations={conversationsOnThisRequest} {conversationId} {potentialConversation}
                 on:conversation-selected={event => showConversation(event.detail)}
                 on:new={event => newConversationCreated(event.detail)} />
    {:else if !isMine }
      <button on:click={discussThis} class="btn btn-success btn-sm mt-1 align-top">
        <Icon icon={faComment} class="mr-2" />
        Discuss this
      </button>
    {:else}
      <i class="text-muted">No ongoing conversations at this time</i>
    {/if}
  </div>
</div>
