<script>
import Conversation from './Conversation.svelte'
import { myConversations, sendMessage } from './gqlQueries'

export let params = {}; // URL path parameters, provided by router.
let conversations = []
let me = {}

// TODO: would like to establish a web socket here to receive messages from 
// the api when a relevant change to conversations takes place, e.g., 
// a conversation is expired, a new one is added, an existing one is updated...
async function loadConversations() {
  let response = await myConversations() // TODO: errorhandling needed?
  conversations = response.myThreads
  me = response.user
}
loadConversations()

function getConversationById(conversationId) {
  for (let i = 0; i < conversations.length; i++) {
    if (conversations[i].id == conversationId) {
      return conversations[i];
    }
  }
  throw new Error(`No such conversation found (id: ${conversationId})`);
}

function onCommit(event) {

  let conversationId = event.detail;

  /** @todo Change this to call an API when that's ready */
  let conversation = getConversationById(conversationId);

  conversation.post.provider = {
    id: me.id,
    nickname: me.nickname,
  };

  // Get the each-conversations loops to re-evaluate.
  conversations = conversations;
}

function onSend(event) {

  let conversationId = event.detail.conversationId;
  let messageContent = event.detail.messageContent;

  /** @todo Change this to call an API when that's ready */
  let conversation = getConversationById(conversationId);

// let newMessage = {
//     timestamp: Date.now(),
//     user: {
//       id: me.id,
//       nickname: me.nickname
//     },
//     content: messageContent,
//   };

//   conversation.messages = [...conversation.messages, newMessage];
// TODO: gather inputs for newMessage
// TODO: sendMessage(newMessage)
// TODO: response *might* have all messages to be used in this selected conversation.

}

function selectConversation(id) {
  window.location.hash = '#/messages/' + Number(id);
}

if (!params.id && conversations.length > 0) {
  selectConversation(conversations[0].id);
}
</script>

<style>
.conversation-card {
  border: 2px solid #007bff;
  border-radius: revert;
}
.conversation-card-empty {
  border-color: #999;
}
</style>

<div class="row">
  <div class="col">
    <h2>Messages</h2>
  </div>
</div>

<div class="row no-gutters">
  <div class="col-sm-5 col-lg-4">
    <div class="list-group list-group-flush">
      {#each conversations as conversation}
        <a class="list-group-item list-group-item-action"
            class:active={ params.id == conversation.id }
            href="#/messages/{ conversation.id }">
          {#if conversation.post}
            { conversation.post.title }
            {#if conversation.post.createdBy && conversation.post.createdBy.id !== me.id}
              - { conversation.post.createdBy.nickname }
            {/if}

            {#if conversation.post.provider && conversation.post.provider.id == me.id}
              <svg class="lnr lnr-checkmark-circle"><use xlink:href="#lnr-checkmark-circle"></use></svg>
            {/if}
          {:else}
            <i class="text-muted">No post found for conversation {conversation.id}</i>
          {/if}
        </a>
      {/each}

      {#if conversations.length < 1 }
        <i class="text-muted">none</i>
      {/if}
    </div>
  </div>
  <div class="col-sm-7 col-lg-8">
    <div class="tab-content card conversation-card"
         class:conversation-card-empty={ !params.id }>
      {#each conversations as conversation}
          <Conversation isSelected={ params.id == conversation.id } {me} {conversation}
                        on:commit={onCommit} on:send={onSend} />
      {/each}

      <div class="tab-pane card-body"
           class:active={ !params.id }>
          <p class="text-center"><i>Please select a conversation to see its messages</i></p>
      </div>
    </div>
  </div>
</div>
