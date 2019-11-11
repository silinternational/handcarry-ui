<script>
import Messaging from '../components/Messaging.svelte'
import { getUser } from '../data/gqlQueries'
import { replace } from 'svelte-spa-router'
import { conversations } from '../data/messaging'

export let params = {} // URL path parameters, provided by router.

let conversationId
let me = {}; loadUser()

$: conversationId = params.id
$: if (!conversationId && $conversations.length > 0) {
  goToConversation($conversations[0].id)
}

function goToConversation(conversationId) {
  replace('/messages/' + conversationId)
}

async function loadUser() {
  const { user } = await getUser() 
  // TODO: errorhandling needed?
  me = user
}
</script>

<h2 class="pb-4">Messages</h2>

<!-- TODO: review this api, e.g., could `me` simply be gathered later rather than simply passed down without ever needing it in this view? And would `selected={conversationId}` be more intuitive? -->
<Messaging conversations={$conversations} {me} {conversationId} on:conversation-selected={event => goToConversation(event.detail)} />
