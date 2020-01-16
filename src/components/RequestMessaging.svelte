<script>
import { conversations, listOtherParticipants } from '../data/messaging'
import { createEventDispatcher } from 'svelte'
import { me } from '../data/user'
import Messaging from '../components/Messaging.svelte'
import { send } from '../data/messaging'
import { sentMessage } from '../data/analytics'
import RequestAction from './RequestAction.svelte'

export let conversationId
export let request

const dispatch = createEventDispatcher()

let newMessageContent = null

$: requester = request.createdBy || {}
$: isMine = $me.id && (requester.id === $me.id)
$: conversationsOnThisRequest = $conversations.filter(({ post }) => post.id === request.id)
$: selectedConversation = conversationsOnThisRequest.find(({ id }) => id === conversationId) || {}
$: hasConversation = conversationsOnThisRequest.length > 0

async function startConversation() {
  if (newMessageContent) {
    const newConversation = await send(newMessageContent, {post: request})
    newMessageContent = ''
    dispatch('conversation-selected', newConversation.id)
    
    sentMessage()
  }
}
</script>

<style>
hr {
  width: 80%;
}
</style>

{#if hasConversation }
  <hr />
  <div class="row my-4">
    <div class="col">
      
      <div class="row">
        <div class="col">
          <h4>Chat with { listOtherParticipants(selectedConversation, $me) }</h4>
        </div>
        <div class="col-auto">
          <RequestAction {request} conversationParticipants={selectedConversation.participants} />
        </div>
      </div>
      
      <div class="row">
        <div class="col">
          <Messaging minimal listColumns="col-12 col-md-3" conversations={conversationsOnThisRequest} {conversationId}
                     on:conversation-selected />
        </div>
      </div>
      
    </div>
  </div>
{:else if !isMine }
  <hr />
  <div class="row my-4">
    <div class="col">
      <h4>Chat with { requester.nickname }</h4>
      <form on:submit|preventDefault={startConversation}>
        <div class="row">
          <div class="col">
            <input class="form-control" bind:value={newMessageContent} autocomplete="off"
                   placeholder="Hi { requester.nickname }, tell me more about..." />
          </div>
          <div class="col-auto">
            <button class="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}
