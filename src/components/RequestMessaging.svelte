<script>
import { conversations, listOtherParticipants } from '../data/messaging'
import { createEventDispatcher } from 'svelte'
import { me } from '../data/user'
import Messaging from '../components/Messaging.svelte'
import { send } from '../data/messaging'

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
  }
}
</script>

<div class="row">
  <div class="col">
    {#if hasConversation }
      <h4 class="text-blue">Chat with { listOtherParticipants(selectedConversation, $me) }</h4>
      <Messaging minimal listColumns="col-12 col-md-3" conversations={conversationsOnThisRequest} {conversationId}
                 on:conversation-selected />
    {:else if !isMine }
      <h4 class="text-blue">Chat with { requester.nickname }</h4>
      <div class="row">
        <div class="col">
          <textarea class="border rounded p-2 w-100" bind:value={newMessageContent}
                    placeholder="Hi { requester.nickname }, tell me more about..."></textarea>
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" on:click={startConversation}>Send</button>
        </div>
      </div>
    {/if}
  </div>
</div>
