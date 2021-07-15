<script>
import { me } from '../data/user'
import { formatDistanceToNow } from 'date-fns'
import { createEventDispatcher } from 'svelte'
import { unreads, saw, send } from '../data/messaging'
import { sentMessage } from '../data/analytics'
import RequestAction from './RequestAction.svelte'

export let conversation = {}
export let minimal = false

let reply = ''
const FIVE_SECONDS = 5000
const dispatch = createEventDispatcher()

$: request = conversation.request || {}
$: messages = conversation.messages || []
$: destination = request.destination && request.destination.description
$: unread = $unreads.find(({ id }) => id === conversation.id) || {}
$: unread.count > 0 && setTimeout(() => saw(conversation.id), FIVE_SECONDS)
$: participants = conversation.participants || []

async function sendMessage() {
  if (reply !== '') {
    const updatedConversation = await send(reply, conversation)

    reply = ''

    const isNewConversation = !conversation.id
    if (isNewConversation) {
      dispatch('new', updatedConversation)
    }

    sentMessage()
  }
}

const whenWas = dateTimeString => formatDistanceToNow(new Date(dateTimeString), {addSuffix: true})
const focusOnCreate = element => element.focus()
</script>

<style>
.card-body > .card-footer {
  /* Counter the padding added by .card-body for the "Reply" section. */
  margin-right: -1.25rem;
  margin-bottom: -1.25rem;
  margin-left: -1.25rem;
}
.message-content {
  border: 1px solid #ccc;
  border-radius: 12px 12px 12px 0;
  display: inline-block;
  padding: 4px 8px;
  white-space: pre-wrap;
}
.text-right .message-content {
  border-radius: 12px 12px 0 12px;
}
</style>

<div class="tab-pane card-body active">
  {#if ! request.id}
    <p class="text-center"><i>Please select a conversation to see its messages</i></p>
  {:else}
    {#if ! minimal}
      <div class="row">
        <div class="col-8">
          <h3 class="text-center"><a href="/requests/{request.id}">{request.title}</a></h3>

          <div class="text-center">
            <small>
              <strong>{request.created_by.nickname}</strong> @ {destination}
            </small>
          </div>
        </div>

        <div class="col text-right mb-1">
          <RequestAction request={request} conversationParticipants={participants} />
        </div>
      </div>

      <hr class="mt-1" />
    {/if}

    {#each messages as message}
      {#if message.sender.id === $me.id}
        <blockquote class="blockquote text-right">
          <p class="mb-0 message-content">{message.content}</p>
          <footer class="blockquote-footer">you, { whenWas(message.created_at) }</footer>
        </blockquote>
      {:else}
        <blockquote class="blockquote">
          <p class="mb-0 message-content">{message.content}</p>
          <footer class="blockquote-footer">{message.sender.nickname}, {whenWas(message.created_at)}</footer>
        </blockquote>
      {/if}
    {/each}

    <div class="card-footer">
      <form on:submit|preventDefault={sendMessage}>
        <div class="row">
          <div class="col">
            <label class="sr-only" for="replyField">Reply</label>

            <input bind:value={reply} class="form-control mb-2 mr-sm-2"
                   placeholder="Reply" autocomplete="off" use:focusOnCreate />
          </div>

          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-2">Send</button>
          </div>
        </div>
      </form>
    </div>
  {/if}
</div>
