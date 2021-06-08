<script>
import Messaging from '../components/Messaging.svelte'
import { params, redirect } from '@roxi/routify'
import { conversations } from '../data/messaging'

let conversationId

$: conversationId = $params.messageId
$: if (!conversationId && $conversations.length > 0) {
  goToConversation($conversations[0].id)
}

function goToConversation(conversationId) {
  $redirect('/messages/' + conversationId)
}
</script>

<h2 class="pb-4">Messages</h2>

<Messaging conversations={$conversations} {conversationId} on:conversation-selected={event => goToConversation(event.detail)} />
