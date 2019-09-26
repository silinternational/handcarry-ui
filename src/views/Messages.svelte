<script>
import Conversation from '../components/Conversation.svelte'
import MessageListEntry from '../components/MessageListEntry.svelte'
import { getMyConversations } from '../data/gqlQueries'

export let params = {} // URL path parameters, provided by router.

let conversations = []; loadConversations()
let me = {}

$: selectedConversation = conversations.find(conversation => conversation.id === params.id) || conversations[0] || {} 
// TODO: need to address the following scenarios:
//        1.  no conversations exist => show a message
//        2.  no params.id was provided => default to the first conversations if there are conversations.
//        3.  the prarams.id provided doesn't match any of the conversations => show conversations list without selecting any
//        4.  the prarams.id matches one of the conversations => select that one

// TODO: would like to establish a web socket here to receive messages from 
// the api when a relevant change to conversations takes place, e.g., 
// a conversation is expired, a new one is added, an existing one is updated...
async function loadConversations() {
  let response = await getMyConversations() 
  
  // TODO: errorhandling needed?
  conversations = response.myThreads
  me = response.user
}
</script>

<style>
.conversation-card {
  border: 2px solid #007bff;
  border-radius: revert;
}
.conversation-card-empty {
  border-color: #999;
}
</style>

<h2 class="pb-4">Messages</h2>

<div class="row no-gutters">
  <div class="col-sm-5 col-lg-4">
    <div class="list-group list-group-flush">
      {#each conversations as conversation}
        <MessageListEntry {conversation} {me} active={ selectedConversation.id === conversation.id } />
      {/each}

      {#if conversations.length < 1 }
      <i class="text-muted">No ongoing conversations at this time</i>
      {/if}
    </div>
  </div>
  <div class="col-sm-7 col-lg-8">
    <div class="tab-content card conversation-card" class:conversation-card-empty={ ! selectedConversation.id }>
      <Conversation { me } conversation={ selectedConversation } />
    </div>
  </div>
</div>
