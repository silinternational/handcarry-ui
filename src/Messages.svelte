<script>
import {distanceInWordsToNow} from 'date-fns';

export let params = {}; // URL path parameters, provided by router.

export let conversations = [
    {
        id: 17,
        post: 2,
        user: 'Clark Kent',
        title: 'Peanut Butter',
        messages: [
            {
                timestamp: 1563277677000,
                from: 'me',
                content: 'Any chance you can bring some PB?',
            },
            {
                timestamp: 1563288747000,
                from: 'them',
                content: 'Absolutely!',
            },
            {
                timestamp: 1563299747000,
                from: 'me',
                content: 'Thanks 😁',
            },
        ],
    },
    {
        id: 21,
        post: 5,
        user: 'Jane Doe',
        title: 'Altoids',
        messages: [
            {
                timestamp: 1563298577000,
                from: 'them',
                content: 'Did you find any Wintergreen Altoids?',
            },
            {
                timestamp: 1563398757000,
                from: 'me',
                content: 'No luck, sorry',
            },
        ],
    },
];

function selectConversation(id) {
    window.location.hash = '#/messages/' + Number(id);
}

if (!params.id && conversations.length > 0) {
    selectConversation(conversations[0].id);
}

function whenWas(timestamp) {
    return distanceInWordsToNow(
        new Date(timestamp),
        {addSuffix: true}
    );
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

<div class="row">
    <div class="col">
        <h2>Messages</h2>
    </div>
</div>

<div class="row no-gutters">
    <div class="col-sm-5 col-lg-4">
        <div class="list-group list-group-flush">
            {#each conversations as conversation }
                <a class="list-group-item list-group-item-action"
                   class:active={ params.id == conversation.id }
                   href="#/messages/{ conversation.id }">
                    { conversation.title } - { conversation.user }
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
            {#each conversations as conversation }
                <div class="tab-pane card-body"
                     class:active={ params.id == conversation.id }>
                    <h3 class="text-center">{ conversation.title } - { conversation.user }</h3>
                    <hr />
                    {#each conversation.messages as message}
                        {#if message.from === 'me'}
                            <blockquote class="blockquote text-right">
                              <p class="mb-0 message-content">{message.content}</p>
                              <footer class="blockquote-footer">you, { whenWas(message.timestamp) }</footer>
                            </blockquote>
                        {:else}
                            <blockquote class="blockquote">
                              <p class="mb-0 message-content">{message.content}</p>
                              <footer class="blockquote-footer">{conversation.user}, { whenWas(message.timestamp) }</footer>
                            </blockquote>
                        {/if}
                    {/each}
                    <div class="card-footer">
                        <form on:submit>
                            <div class="row">
                                <div class="col">
                                    <label class="sr-only" for="replyField">Reply</label>
                                    <input type="text" class="form-control mb-2 mr-sm-2" id="replyField" placeholder="Reply">
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-primary mb-2">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            {/each}

            <div class="tab-pane card-body"
                 class:active={ !params.id }>
                <p class="text-center"><i>Please select a conversation to see its messages</i></p>
            </div>
        </div>
    </div>
</div>
