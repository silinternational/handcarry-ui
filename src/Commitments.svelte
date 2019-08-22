<script>
import { formatDistanceToNow } from 'date-fns'

export let params; // URL path parameters, provided by router.

export let conversations = [
    {
        id: 17,
        post: 2,
        'user': 'Clark Kent',
        'title': 'Peanut Butter',
        'description': 'Peanut butter is a food paste or spread made from ground dry-roasted peanuts. It often contains additional ingredients that modify the taste or texture, such as salt, sweeteners, or emulsifiers. Peanut butter is popular in many countries. The United States[1] is a leading exporter of peanut butter and itself consumes $800 million of peanut butter annually.[2]                         Peanut butter is served as a spread on bread, toast, or crackers, and used to make sandwiches (notably the peanut butter and jelly sandwich). It is also used in a number of breakfast dishes and desserts, such as peanut-flavored granola, smoothies, crepes, cookies, brownies, or croissants. It is similar to other nut butters such as cashew butter and almond butter.',
        'needAfter': '8/3/2019',
        'needBefore': '9/1/2019',
        'destination': 'Orlando, FL, USA',
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
        'description': 'Altoids are a brand of mints. The brand was created by the London-based Smith & Company in the 1780s, and became part of the Callard & Bowser company in the 19th century. Their advertising slogan is "The Original Celebrated Curiously Strong Mints", referring to the high concentration of peppermint oil used in the original flavour lozenge.',
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
    return formatDistanceToNow(
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
        <h2>Commitments</h2>
    </div>
</div>


<div class="row no-gutters">
    <div class="col-sm-12 col-lg-12">
        <div class="list-group list-group-flush" id="myList" role="tablist">
            {#each conversations as conversation }
                <div class="list-group-item">
                    <div class="row">
                        <div class="col-8">
                          <h4>{ conversation.title } - { conversation.user }</h4>
                        </div>
                        <div class="col-4">
                            <a class="btn btn-primary float-right" href="#/requests" aria-pressed="true" role="button">Confirm Delivery</a>
                        </div>
                   </div>
                   Need After { conversation.needAfter}, Need Before { conversation.needBefore }

                                               <a target="_blank" href="https://www.google.com/maps/search/orlando,%20fl?hl=en&source=opensearch"><svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker"></use></svg>{ conversation.destination }</a>

                   <br><br>
                    { conversation.description }
                </div>


            {/each}

            {#if conversations.length < 1 }
                <i class="text-muted">none</i>
            {/if}
        </div>

    </div>

</div>
