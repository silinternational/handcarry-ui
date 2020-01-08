<script>
import { me } from '../data/user'
import Icon from 'fa-svelte'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'
import CountIndicator from './CountIndicator.svelte'
import { listOtherParticipants, unreads } from '../data/messaging'

export let active = false
export let conversation = {}
export let minimal = false

const dispatch = createEventDispatcher()

$: isCreatedByMe = post => post.createdBy.id === $me.id
$: isProvidedByMe = post => post.provider && post.provider.id === $me.id
$: creator = post => post.createdBy && post.createdBy.nickname
$: unread = $unreads.find(({ id }) => id === conversation.id) || {}
</script>

<button on:click={() => dispatch('conversation-selected', conversation.id)} class:active={active} class="list-group-item list-group-item-action d-flex align-items-center">
  <span class="flex-fill">
    {#if !minimal }
      { conversation.post.title } – 
    {/if}
    
    { `${ isCreatedByMe(conversation.post) ? listOtherParticipants(conversation, $me) : creator(conversation.post) }` }
  </span>

  <CountIndicator number={unread.count} />
  
  {#if isProvidedByMe(conversation.post)}
  <Icon icon={faCheckCircle} class="ml-2" />
  {/if}
</button>
