<script>
import Messaging from 'components/Messaging.svelte'
import RequestAction from 'components/RequestAction.svelte'
import { sentMessage } from 'data/analytics.js'
import { conversations, listOtherParticipants, send } from 'data/messaging.js'
import { me } from 'data/user.js'

import { createEventDispatcher } from 'svelte'

export let conversationId
export let request

const dispatch = createEventDispatcher()

let newMessageContent = null

$: requester = request.created_by || {}
$: isMine = $me.id && (requester.id === $me.id)
$: conversationsOnThisRequest = $conversations.filter(({ request: aRequest }) => aRequest.id === request.id)
$: selectedConversation = conversationsOnThisRequest.find(({ id }) => id === conversationId) || {}
$: hasConversation = conversationsOnThisRequest.length > 0

async function startConversation() {
  if (newMessageContent) {
    const newConversation = await send(newMessageContent, {request})
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

.row-spacing {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>

{#if hasConversation }
  <hr />
  <div class="row row-spacing">
    <div class="col">

      <div class="row">
        <div class="col">
          <h4>Chat privately with { listOtherParticipants(selectedConversation, $me) }</h4>
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
  <div class="row row-spaceing">
    <div class="col">
      <h4>Chat privately with { requester.nickname }</h4>
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
