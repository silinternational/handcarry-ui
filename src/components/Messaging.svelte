<script>
import Conversation from 'components/Conversation.svelte'
import ConversationListEntry from 'components/ConversationListEntry.svelte'

import { createEventDispatcher, tick } from 'svelte'

export let conversations
export let conversationId
export let minimal = false
export let listColumns = "col-12 col-sm-5 col-lg-4"

const dispatch = createEventDispatcher()

let selectedConversation = {}

$: hasConversation = conversations.length > 0
$: showTabs = conversations.length > 1 || ! minimal
$: selectedConversation = conversations.find(conversation => conversation.id === conversationId) || {}
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
  {#if showTabs }
    <div class="{listColumns}">
      <div class="list-group list-group-flush">
        {#each conversations as conversation}
          <!-- on:conversation-selected is being passed up to consumer, i.e., views/Messages.svelte -->
          <ConversationListEntry {conversation} on:conversation-selected active={ selectedConversation.id === conversation.id } {minimal} />
        {/each}

        {#if !hasConversation }
          <i class="text-muted">No ongoing conversations at this time</i>
        {/if}
      </div>
    </div>
  {/if}
  <div class="col">
    <div class="tab-content card conversation-card" class:conversation-card-empty={!selectedConversation.request}>
      <!-- on:new is being used to passed up to consumer, i.e., views/Request.svelte -->
      <Conversation conversation={selectedConversation} on:new {minimal} />
    </div>
  </div>
</div>
