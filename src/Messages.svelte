<script>
import {distanceInWordsToNow} from 'date-fns';

export let conversations = [
    {
        id: 17,
        post: 2,
        'user': 'Clark Kent',
        'title': 'Peanut Butter',
        'messages': [
            {
                'timestamp': 1563298677000,
                'from': 'me',
                'content': 'Any chance you can bring some PB?',
            },
            {
                'timestamp': 1563298747000,
                'from': 'them',
                'content': 'Absolutely!',
            },
        ],
    },
    {
        'id': 21,
        'post': 5,
        'user': 'Jane Doe',
        'title': 'Altoids',
        'messages': [
            {
                'timestamp': 1563298577000,
                'from': 'them',
                'content': 'Did you find any Wintergreen Altoids?',
            },
            {
                'timestamp': 1563298757000,
                'from': 'me',
                'content': 'No luck, sorry',
            },
        ],
    },
];

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
</style>

<div class="row">
    <div class="col">
        <h2>Messages</h2>
    </div>
</div>

<div class="row no-gutters">
    <div class="col-sm-5 col-lg-4">
        <div class="list-group list-group-flush" id="myList" role="tablist">
            {#each conversations as conversation }
                <a class="list-group-item list-group-item-action"
                   data-toggle="list" href="#messages{ conversation.id }" role="tab">
                    { conversation.title } - { conversation.user }
                </a>
            {/each}

            {#if conversations.length < 1 }
                <i class="text-muted">none</i>
            {/if}
        </div>
    </div>
    <div class="col-sm-7 col-lg-8">
        <div class="tab-content card conversation-card">
            <div class="tab-pane card-body active" id="messages17" role="tabpanel">
                <h3 class="text-center">Peanut Butter - Clark Kent</h3>
                <hr />

                <blockquote class="blockquote text-right">
                  <p class="mb-0">Any chance you can bring some PB?</p>
                  <footer class="blockquote-footer">you, { whenWas(1563298677000) }</footer>
                </blockquote>

                <blockquote class="blockquote">
                  <p class="mb-0">Absolutely!</p>
                  <footer class="blockquote-footer">Clark Kent, { whenWas(1563307287000) }</footer>
                </blockquote>
            </div>
            <div class="tab-pane card-body" id="messages21" role="tabpanel">
                <h3 class="text-center">Altoids - Jane Doe</h3>
                <hr />

                <blockquote class="blockquote">
                  <p class="mb-0">Did you find any Wintergreen Altoids?</p>
                  <footer class="blockquote-footer">Jane Doe, { whenWas(1563288647000) }</footer>
                </blockquote>

                <blockquote class="blockquote text-right">
                  <p class="mb-0">No luck, sorry</p>
                  <footer class="blockquote-footer">you, { whenWas(1563288648000) }</footer>
                </blockquote>
            </div>
        </div>
    </div>
</div>
