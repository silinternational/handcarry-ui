<script>
import Messaging from '../components/Messaging.svelte'
import { getMyConversations, getRequest } from '../data/gqlQueries'
import { replace } from 'svelte-spa-router'

export let params = {} // URL path parameters, provided by router.

let conversationId
let conversations = []; loadConversations()
let me = {}

$: conversationId = params.id

$: if (!conversationId && conversations.length > 0) {
  goToConversation(conversations[0].id)
}

function goToConversation(conversationId) {
  replace('/messages/' + conversationId)
}

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

<h2 class="pb-4">Messages</h2>

<Messaging {conversations} {me} {conversationId} on:conversation-selected={event => goToConversation(event.detail)} />
