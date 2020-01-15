<script>
import Conversation from '../components/Conversation.svelte'
import ConversationListEntry from './ConversationListEntry.svelte'
import { createEventDispatcher } from 'svelte'
import { tick } from 'svelte'

export let conversations
export let conversationId
export let potentialConversation = null
export let minimal = false
export let listColumns = "col-12 col-sm-5 col-lg-4"

const dispatch = createEventDispatcher()

let defaultConversation = {}
let selectedConversation = {}

$: hasConversation = conversations.length > 0
$: defaultConversation = potentialConversation || {}
$: selectedConversation = conversations.find(conversation => conversation.id === conversationId) || defaultConversation
$: !conversationId && hasConversation && suggestDefaultConversation()

async function suggestDefaultConversation() {
  // Wait for the component to finish initializing before firing an event.
  await tick()
  dispatch('conversation-selected', conversations[0].id)
}
</script>

<style>
.conversation-card {
  border: 2px solid var(--blue);
  border-top-left-radius: initial; /* blends the corner nicely with a msg list entry */
}
@media (max-width: 576px) { 
  .conversation-card {
    border-top-right-radius: initial; /* blends the corner nicely with a msg list entry (on phones) */
  }
}
.conversation-card-empty {
  border-color: #999;
}
</style>

<div class="row no-gutters">
  {#if conversations.length > 1 || ! minimal }
    <div class="{listColumns}">
      <div class="list-group list-group-flush">
        {#each conversations as conversation}
          <!-- on:conversation-selected is being passed up to consumer, i.e., views/Messages.svelte -->
          <ConversationListEntry {conversation} on:conversation-selected active={ selectedConversation.id === conversation.id } {minimal} />
        {/each}
        
        {#if potentialConversation }
          <ConversationListEntry conversation={potentialConversation} active {minimal} />
        {:else if conversations.length < 1 }
          <i class="text-muted">No ongoing conversations at this time</i>
        {/if}
      </div>
    </div>
  {/if}
  <div class="col">
    <div class="tab-content card conversation-card" class:conversation-card-empty={!selectedConversation.post}>
      <!-- on:new is being used to passed up to consumer, i.e., views/Request.svelte -->
      <Conversation conversation={selectedConversation} on:new {minimal} />
    </div>
  </div>
</div>
