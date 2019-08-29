<script>
import { formatDistanceToNow } from 'date-fns'
import { sendMessage } from '../data/gqlQueries'

export let me = {}
export let conversation = {}
$: post = conversation.post || {}
$: creator = post.createdBy || {}
$: provider = post.provider || {}
$: messages = conversation.messages || []

let reply = ''

function acceptCommitment() {
  /** TODO: Change this to call an API when it's ready */

  console.log(`Accepted user ${post.committedUserId}'s commitment to bring ${post.title}`)
}

function asReadableDate(timestamp) {
  return new Date(timestamp).toLocaleDateString()
}

async function send() {
  if (reply !== '') {
    const response = await sendMessage(conversation.id, reply)
    messages = response.createMessage.thread.messages
    reply = ''
  }
}

function commit() {
  /** TODO: Change this to call an API when that's ready */
  conversation.post.provider = {
    id: me.id,
    nickname: me.nickname,
  }
}

const whenWas = dateTimeString => formatDistanceToNow(new Date(dateTimeString), {addSuffix: true})
</script>

<style>
.message-content {
  border: 1px solid #ccc;
  border-radius: 12px 12px 12px 0;
  display: inline-block;
  padding: 4px 8px;
}
.text-right .message-content {
  border-radius: 12px 12px 0 12px;
}
</style>

<div class="tab-pane card-body active">
  {#if ! conversation.id}
  <p class="text-center"><i>Please select a conversation to see its messages</i></p>
  {:else}
  <div class="row">
    <div class="col">
      <h3 class="text-center mb-0">{ post.title }</h3>

      <div class="text-center">
        <small>
          { post.destination }
          {#if post.neededAfter && post.neededBefore }
            | between { asReadableDate(post.neededAfter) } and { asReadableDate(post.neededBefore) }
          {:else if post.neededAfter }
            | after { asReadableDate(post.neededAfter) }
          {:else if post.neededBefore }
            | before { asReadableDate(post.neededBefore) }
          {/if}
        </small>
      </div>
    </div>
    <div class="col-4 text-center">
      {#if creator.id == me.id }
        {#if provider.nickname }
          User { provider.nickname } committed to bring this.
          <button class="btn btn-sm btn-outline-success" on:click={ acceptCommitment }>
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
                 placeholder="Reply" autocomplete="off" />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-2">Send</button>
        </div>
      </div>
    </form>
  </div>
  {/if}
</div>
