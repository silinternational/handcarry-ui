<script>
import Messaging from 'components/Messaging.svelte'
import { conversations } from 'data/messaging.js'

import { redirect } from '@roxi/routify'

export let conversationId

$: if (!conversationId && $conversations.length > 0) {
  goToConversation($conversations[0].id)
}

function goToConversation(conversationId) {
  $redirect('/messages/' + conversationId)
}
</script>

<h2 class="pb-4">Messages</h2>

<Messaging conversations={$conversations} {conversationId} on:conversation-selected={event => goToConversation(event.detail)} />
