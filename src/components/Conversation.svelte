<script>
import { formatDistanceToNow } from 'date-fns'
import { sendMessage, sendCommit, acceptCommittment } from '../data/gqlQueries'
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let me = {}
export let conversation = {}
$: post = conversation.post || {}
$: creator = post.createdBy || {}
$: provider = post.provider || {}
$: messages = conversation.messages || []

let reply = ''

async function accept() {
  try {
    const response = await acceptCommittment(conversation.post.id)
    post = response.updatePost
  } catch (e) {
    // TODO: need errorhandling
  }
}

function asReadableDate(timestamp) {
  return new Date(timestamp).toLocaleDateString()
}

async function send() {
  if (reply !== '') {
    let isNewConversation = !conversation.id
    const response = await sendMessage(conversation.id, reply, post.id)
    conversation.messages = response.createMessage.thread.messages
    reply = ''
    
    if (isNewConversation) {
      dispatch('new', {
        id: response.createMessage.thread.id,
        messages: response.createMessage.thread.messages
      })
    }
  }
}

async function commit() {
  try {
    const response = await sendCommit(conversation.post.id)
    post = response.updatePost
  } catch (e) {
    // TODO: need errorhandling
  }
}

const whenWas = dateTimeString => formatDistanceToNow(new Date(dateTimeString), {addSuffix: true})

function focusOnCreate(element) {
  element.focus()
}
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
  {#if ! conversation.post}
  <p class="text-center"><i>Please select a conversation to see its messages</i></p>
  {:else}
  <div class="row">
    <div class="col">
      <h3 class="text-center"><a href="#/requests/{post.id}">{ post.title }</a></h3>

      <div class="text-center">
        <small>
          <b>{ post.createdBy.nickname }</b> @ { post.destination }<br />
          {#if post.neededAfter && post.neededBefore }
            between { asReadableDate(post.neededAfter) } and { asReadableDate(post.neededBefore) }
          {:else if post.neededAfter }
            after { asReadableDate(post.neededAfter) }
          {:else if post.neededBefore }
            before { asReadableDate(post.neededBefore) }
          {/if}
        </small>
      </div>
    </div>
    <div class="col-4 text-right">
      {#if creator.id == me.id }
        {#if provider.nickname }
          { provider.nickname } committed to bring this.
        {/if}
        {#if post.status === 'COMMITTED' }
        <button class="btn btn-sm btn-outline-success" on:click={ accept }>
          Accept
        </button>
        {/if}
      {:else}
        {#if provider.id == me.id }
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
    {#if message.sender.id === me.id}
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
    <form on:submit|preventDefault={ send }>
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
