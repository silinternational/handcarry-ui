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

$: isCreatedByMe = request => request.created_by.id === $me.id
$: isProvidedByMe = request => request.provider && request.provider.id === $me.id
$: creator = request => request.created_by && request.created_by.nickname
$: unread = $unreads.find(({ id }) => id === conversation.id) || {}
</script>

<button on:click={() => dispatch('conversation-selected', conversation.id)}
        class:active={active} class:list-group-item-secondary={!active}
        class="list-group-item list-group-item-action d-flex align-items-center">
  <span class="flex-fill">
    {#if !minimal }
      { conversation.request.title } –
    {/if}

    { `${ isCreatedByMe(conversation.request) ? listOtherParticipants(conversation, $me) : creator(conversation.request) }` }
  </span>

  <CountIndicator number={unread.count} />

  {#if isProvidedByMe(conversation.request)}
  <Icon icon={faCheckCircle} class="ml-2" />
  {/if}
</button>
