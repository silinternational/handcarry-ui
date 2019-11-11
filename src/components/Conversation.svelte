<script>
import { me } from '../data/user'
import { formatDistanceToNow } from 'date-fns'
import { sendCommit, acceptCommittment } from '../data/gqlQueries'
import { createEventDispatcher } from 'svelte'
import { unreads, saw, send } from '../data/messaging'

export let conversation = {}
export let minimal = false

let reply = ''
const FIVE_SECONDS = 5000
const dispatch = createEventDispatcher()

$: post = conversation.post || {}
$: creator = post.createdBy || {}
$: provider = post.provider || {}
$: messages = conversation.messages || []
$: destination = post.destination && post.destination.description
$: isConversingWithProvider = messages.some(msg => msg.sender.id === provider.id)
$: unread = $unreads.find(({ id }) => id === conversation.id) || {}
$: unread.count > 0 && setTimeout(() => saw(conversation.id), FIVE_SECONDS)

async function accept() {
  try {
    const { updatePost } = await acceptCommittment(post.id)
    post = updatePost
  } catch (e) {
    // TODO: need errorhandling
  }
}

async function sendMessage() {
  if (reply !== '') {
    let isNewConversation = !conversation.id
    const updatedConversation = await send(reply, conversation)
    reply = ''
    
    if (isNewConversation) {
      dispatch('new', updatedConversation)
    }
  }
}

async function commit() {
  try {
    const { updatePost } = await sendCommit(post.id)
    post = updatePost
  } catch (e) {
    // TODO: need errorhandling
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
  {#if ! post.id}
  <p class="text-center"><i>Please select a conversation to see its messages</i></p>
  {:else}
  <div class="row">
    <div class="col-8" class:d-none={minimal}>
      <h3 class="text-center"><a href="#/requests/{post.id}">{ post.title }</a></h3>

      <div class="text-center">
        <small>
          <strong>{ post.createdBy.nickname }</strong> @ { destination }
        </small>
      </div>
    </div>

    <div class="col text-right mb-1">
      {#if creator.id == $me.id }
        {#if provider.nickname }
          { provider.nickname } committed to bring this.
        {/if}
        {#if post.status === 'COMMITTED' && isConversingWithProvider}
          <button class="btn btn-sm btn-success" on:click={ accept }>Accept</button>
        {/if}
      {:else}
        {#if provider.id == $me.id }
          You committed to bring this.
        {:else if provider.id }
          Someone else has committed to bring this.
        {:else}
          <button class="btn btn-sm btn-info" on:click={ commit }>
            I'll bring it
          </button>
        {/if}
      {/if}
    </div>
  </div>

  <hr class="mt-1" />
  
  {#each messages as message}
    {#if message.sender.id === $me.id}
      <blockquote class="blockquote text-right">
        <p class="mb-0 message-content">{message.content}</p>
        <footer class="blockquote-footer">you, { whenWas(message.createdAt) }</footer>
      </blockquote>
    {:else}
      <blockquote class="blockquote">
        <p class="mb-0 message-content">{message.content}</p>
        <footer class="blockquote-footer">{message.sender.nickname}, { whenWas(message.createdAt) }</footer>
      </blockquote>
    {/if}
  {/each}

  <div class="card-footer">
    <form on:submit|preventDefault={ sendMessage }>
      <div class="row">
        <div class="col">
          <label class="sr-only" for="replyField">Reply</label>

          <input bind:value={ reply } class="form-control mb-2 mr-sm-2"
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
