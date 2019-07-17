<script>
import {distanceInWordsToNow} from 'date-fns';

export let params = {}; // URL path parameters, provided by router.

export let posts = [
    {
        id: 17,
        user: 'Clark Kent',
        title: 'Peanut Butter',
        destination: 'Somewhere, USA',
        needBefore: 1564804800000,
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
        user: 'Jane Doe',
        title: 'Altoids',
        destination: 'Timbuktu, Mali',
        needAfter: 1564200000000,
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
    {
        id: 9,
        user: 'Denethor',
        title: 'A ring',
        destination: 'Gondor',
        needAfter: 1564200000000,
        needBefore: 1564804800000,
        messages: [
            {
                timestamp: 1563390232037,
                from: 'them',
                content: 'I haven\'t heard from my son, either. Have you seen him recently?',
            },
        ],
    },
];

function selectConversation(id) {
    window.location.hash = '#/messages/' + Number(id);
}

if (!params.id && posts.length > 0) {
    selectConversation(posts[0].id);
}

function replyFormSubmitted(event) {
    sendReply(
        event.currentTarget.elements.postId.value,
        event.currentTarget.elements.replyField.value
    );
    event.currentTarget.elements.replyField.value = '';
}

function sendReply(postId, text) {

    /* @todo: Send this to the API when it's ready. */

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id == postId) {
            let newMessage = {
                timestamp: Date.now(),
                from: 'me',
                content: text,
            };
            posts[i].messages = [...posts[i].messages, newMessage];
        }
    }
}

function asReadableDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
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
            {#each posts as post }
                <a class="list-group-item list-group-item-action"
                   class:active={ params.id == post.id }
                   href="#/messages/{ post.id }">
                    { post.title } - { post.user }
                </a>
            {/each}

            {#if posts.length < 1 }
                <i class="text-muted">none</i>
            {/if}
        </div>
    </div>
    <div class="col-sm-7 col-lg-8">
        <div class="tab-content card conversation-card"
             class:conversation-card-empty={ !params.id }>
            {#each posts as post }
                <div class="tab-pane card-body"
                     class:active={ params.id == post.id }>
                    <h3 class="text-center mb-0">{ post.title } - { post.user }</h3>
                    <div class="text-center">
                        <small>
                            { post.destination }
                            {#if post.needAfter && post.needBefore }
                                | between { asReadableDate(post.needAfter) } and { asReadableDate(post.needBefore) }
                            {:else if post.needAfter }
                                | after { asReadableDate(post.needAfter) }
                            {:else if post.needBefore }
                                | before { asReadableDate(post.needBefore) }
                            {/if}
                        </small>
                    </div>
                    <hr class="mt-1" />
                    {#each post.messages as message}
                        {#if message.from === 'me'}
                            <blockquote class="blockquote text-right">
                              <p class="mb-0 message-content">{message.content}</p>
                              <footer class="blockquote-footer">you, { whenWas(message.timestamp) }</footer>
                            </blockquote>
                        {:else}
                            <blockquote class="blockquote">
                              <p class="mb-0 message-content">{message.content}</p>
                              <footer class="blockquote-footer">{post.user}, { whenWas(message.timestamp) }</footer>
                            </blockquote>
                        {/if}
                    {/each}
                    <div class="card-footer">
                        <form on:submit={ replyFormSubmitted }>
                            <div class="row">
                                <div class="col">
                                    <input type="hidden" id="postId" value="{ post.id }" />
                                    <label class="sr-only" for="replyField">Reply</label>

                                    <input type="text" class="form-control mb-2 mr-sm-2" id="replyField"
                                           placeholder="Reply" autocomplete="off" />
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
