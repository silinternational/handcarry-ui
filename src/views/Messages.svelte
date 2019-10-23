<script>
import Conversations from '../components/Conversations.svelte'
import { getMyConversations, getRequest } from '../data/gqlQueries'
import { replace } from 'svelte-spa-router'

export let params = {} // URL path parameters, provided by router.

let conversationId
let conversations = []; loadConversations()
let me = {}
let potentialConversation = {}

$: conversationId = params.id

$: if (params.postId) {
  loadPotentialConversationDetails()
} else if (!conversationId && conversations.length > 0) {
  goToConversation(conversations[0].id)
}

function goToConversation(conversationId) {
  replace('/messages/' + conversationId)
}

async function loadPotentialConversationDetails() {
  let response = await getRequest(params.postId)
  potentialConversation = {
    post: response.post
  }
}

// TODO: would like to establish a web socket here to receive messages from 
// the api when a relevant change to conversations takes place, e.g., 
// a conversation is expired, a new one is added, an existing one is updated...
async function loadConversations() {
  let response = await getMyConversations() 
  
  // TODO: errorhandling needed?
  conversations = response.myThreads
  me = response.user
  
  if (params.postId) {
    let matchingConversation = conversations.find(conversation => conversation.post.id === params.postId)
    if (matchingConversation) {
        replace('/messages/' + matchingConversation.id)
    }
  }
}

function onConversationStarted(event) {
  let newConversation = potentialConversation
  potentialConversation = {}
  
  newConversation.id = event.detail.id
  newConversation.messages = event.detail.messages
  
  conversations[conversations.length] = newConversation
  replace('/messages/' + newConversation.id)
}
</script>

<h2 class="pb-4">Messages</h2>

<Conversations {conversations} {me} {potentialConversation} {conversationId} on:new={onConversationStarted}
               on:conversation-selected={event => goToConversation(event.detail)} />
