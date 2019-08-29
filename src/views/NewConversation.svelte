<script>
import Conversation from '../components/Conversation.svelte'
import { startConversation } from '../data/gqlQueries'
import { querystring, push } from 'svelte-spa-router'

export let params = {} // URL path parameters, provided by router.

let requestor = /with=(.*)/.exec($querystring)[1]  // TODO: need to test some patterns of nicknames here, e.g., Billy C or names with special characters, etc. to ensure regex matches (or impl a better approach)
let message = ''

async function send() {
  // TODO: may need to sanitize message here before sending along.
  const response = await startConversation(params.id, message)
  
  push(`/messages/${response.createMessage.thread.id}`)
}
</script>

<h2 class="pb-4">Start a conversation</h2>

<div class="alert alert-warning text-center" role="alert">
  Kate, make me beautiful please
</div>

<textarea bind:value={message}></textarea>
<button on:click={send}>Send message to {requestor}</button>