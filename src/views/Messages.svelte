<script>
import Messaging from '../components/Messaging.svelte'
import { replace } from 'svelte-spa-router'
import { conversations } from '../data/messaging'

export let params = {} // URL path parameters, provided by router.

let conversationId

$: conversationId = params.id
$: if (!conversationId && $conversations.length > 0) {
  goToConversation($conversations[0].id)
}

function goToConversation(conversationId) {
  replace('/messages/' + conversationId)
}
</script>

<h2 class="pb-4">Messages</h2>

<Messaging conversations={$conversations} {conversationId} on:conversation-selected={event => goToConversation(event.detail)} />
