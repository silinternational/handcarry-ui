<script>
import {distanceInWordsToNow} from 'date-fns';

export let isSelected = false;
export let myUserId;
export let post = {};

function acceptCommitment() {

    /** @todo Change this to call an API when it's ready */

    console.log(`Accepted user ${post.committedUserId}'s commitment to bring ${post.title}`);
}

function asReadableDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

function commitToBring() {

    /** @todo Change this to call an API when it's ready */

    console.log(`You committed to bring ${post.title} to ${post.user}.`);

    post.committedUserId = myUserId;
}

function replyFormSubmitted(event) {
    let replyField = event.currentTarget.elements.replyField;
    sendReply(replyField.value);
    replyField.value = '';
}

function sendReply(text) {

    /** @todo: Send this to the API when it's ready. */

    let newMessage = {
        timestamp: Date.now(),
        from: 'me',
        content: text,
    };
    post.messages = [...post.messages, newMessage];
}

function whenWas(timestamp) {
    return distanceInWordsToNow(
        new Date(timestamp),
        {addSuffix: true}
    );
}
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

<div class="tab-pane card-body" class:active={ isSelected }>
    <div class="row">
        <div class="col">
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
        </div>
        <div class="col-4 text-center">
            {#if post.requestingUserId == myUserId }
                {#if post.committedUserId }
                    User { post.committedUserId } committed to bring this.
                    <button class="btn btn-sm btn-outline-success" on:click={ acceptCommitment }>
                        Accept
                    </button>
                {/if}
            {:else}
                {#if post.committedUserId == myUserId }
                    You committed to bring this.
                {:else if post.committedUserId }
                    Someone else has committed to bring this.
                {:else}
                    <button class="btn btn-sm btn-info" on:click={ commitToBring }>
                        I'll bring it
                    </button>
                {/if}
            {/if}
        </div>
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