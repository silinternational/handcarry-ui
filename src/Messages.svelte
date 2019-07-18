<script>
import Conversation from './Conversation.svelte'

export let params = {}; // URL path parameters, provided by router.

export let myUserId = 4;
let posts = [
    {
        id: 17,
        requestingUserId: 4,
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
        id: 22,
        requestingUserId: 4,
        committedUserId: 8,
        user: 'Jane Eyre',
        title: 'Jam',
        destination: 'Somewhere, USA',
        messages: [
            {
                timestamp: 1563277777000,
                from: 'me',
                content: 'Red plum jam, if possible',
            },
        ],
    },
    {
        id: 21,
        requestingUserId: 2,
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
        requestingUserId: 7,
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
            {#each posts as post }
                <a class="list-group-item list-group-item-action"
                   class:active={ params.id == post.id }
                   href="#/messages/{ post.id }">
                    { post.title } - { post.user }
                    {#if post.committedUserId == myUserId}
                        <svg class="lnr lnr-checkmark-circle"><use xlink:href="#lnr-checkmark-circle"></use></svg>
                    {/if}
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
                <Conversation isSelected={ params.id == post.id } {myUserId} {post} />
            {/each}

            <div class="tab-pane card-body"
                 class:active={ !params.id }>
                <p class="text-center"><i>Please select a conversation to see its messages</i></p>
            </div>
        </div>
    </div>
</div>
