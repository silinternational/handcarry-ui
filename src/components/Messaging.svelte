<script>
import Conversation from '../components/Conversation.svelte'
import ConversationListEntry from './ConversationListEntry.svelte'

export let conversations
export let me
export let potentialConversation = null
export let conversationId = null
export let minimal = false
export let listColumns = "col-12 col-sm-5 col-lg-4"

let defaultConversation = {}
let selectedConversation = {}

$: defaultConversation = potentialConversation || {}
$: selectedConversation = conversations.find(conversation => conversation.id === conversationId) || defaultConversation
// TODO: need to address the following scenarios:
//        1.  no conversations exist => show a message
//        2.  no conversationId was provided => default to the first conversations if there are conversations.
//        3.  the conversationId provided doesn't match any of the conversations => show conversations list without selecting any
//        4.  the conversationId matches one of the conversations => select that one
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
  <div class="{listColumns}">
    <div class="list-group list-group-flush">
      {#each conversations as conversation}
        <ConversationListEntry {conversation} {me} on:conversation-selected active={ selectedConversation.id === conversation.id } {minimal} />
      {/each}
      
      {#if potentialConversation }
        <ConversationListEntry conversation={potentialConversation} {me} active {minimal} />
      {:else if conversations.length < 1 }
        <i class="text-muted">No ongoing conversations at this time</i>
      {/if}
    </div>
  </div>
  <div class="col">
    <div class="tab-content card conversation-card" class:conversation-card-empty={!selectedConversation.post}>
      <Conversation {me} conversation={selectedConversation} on:new {minimal} />
    </div>
  </div>
</div>
