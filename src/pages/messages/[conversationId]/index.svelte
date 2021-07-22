<script>
  import Messages from 'components/Messages.svelte'

  import { params } from '@roxi/routify'
</script>

<Messages conversationId={$params.conversationId} />
