<script>
import Icon from 'fa-svelte'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export let active = false
export let conversation = {}
export let me = {}

$: isCreatedByMe = post => post.createdBy.id === me.id
$: isProvidedByMe = post => post.provider && post.provider.id === me.id
$: creator = post => post.createdBy && post.createdBy.nickname
$: messageFrom = participants => participants.filter(p => p.id !== me.id).map(p => p.nickname).join(', ')
</script>

<a href="#/messages/{ conversation.id }" class:active={ active } class="list-group-item list-group-item-action">
  { conversation.post.title } &ndash; { `${ isCreatedByMe(conversation.post) ? messageFrom(conversation.participants) : creator(conversation.post) }` }

  {#if isProvidedByMe(conversation.post)}
  <Icon icon={faCheckCircle} class="ml-2" />
  {/if}
</a>
