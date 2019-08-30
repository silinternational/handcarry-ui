<script>
  import { formatDistanceToNow } from "date-fns"

  let conversations = [
    {
      id: 17,
      post: 2,
      handCarrier: "Clark Kent",
      title: "Peanut Butter",
      description:
        "Peanut butter is a food paste or spread made from ground dry-roasted peanuts. It often contains additional ingredients that modify the taste or texture, such as salt, sweeteners, or emulsifiers. Peanut butter is popular in many countries. The United States[1] is a leading exporter of peanut butter and itself consumes $800 million of peanut butter annually.[2]                         Peanut butter is served as a spread on bread, toast, or crackers, and used to make sandwiches (notably the peanut butter and jelly sandwich). It is also used in a number of breakfast dishes and desserts, such as peanut-flavored granola, smoothies, crepes, cookies, brownies, or croissants. It is similar to other nut butters such as cashew butter and almond butter.",
      needAfter: "8/3/2019",
      needBefore: "9/1/2019",
      destination: "Orlando, FL, USA",
      messages: [
        {
          timestamp: 1563298677000,
          from: "me",
          content: "Any chance you can bring some PB?"
        },
        {
          timestamp: 1563298747000,
          from: "them",
          content: "Absolutely!"
        }
      ]
    }
  ]

  function whenWas(timestamp) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }
</script>

<h2 class="pb-4">My Requests</h2>

<div class="row">
  <div class="col-sm-12 col-lg-12">
    <div class="list-group list-group-flush" role="tablist">
      {#each conversations as conversation}
        <div class="list-group-item">
          <div class="row pb-4">
            <div class="col-8">
              <h4 class="d-flex align-items-center">
                {conversation.title}
                <a class="btn btn-sm btn-outline-secondary ml-4 disabled" href="#/requestform">Edit</a>
                <a class="btn btn-sm btn-outline-danger ml-1 disabled" href="#/requestform">Cancel</a>
                <a class="btn btn-sm btn-outline-info ml-1 disabled" href="#/requestform">Duplicate</a>
              </h4>
            </div>
            <div class="col-4">
              {#if conversation.handCarrier.length > 0}
                <a class="btn btn-primary float-right" href="#/requests" aria-pressed="true" role="button">Confirm Receipt</a>
              {:else}
                <button class="btn btn-sm btn-outline-secondary float-right">No HandCourier yet</button>
              {/if}
            </div>
          </div>

          {#if conversation.handCarrier.length > 0}
            <div class="row">
              <div class="col pb-1">
                To be delivered by:
                <a href="#/profile" class="pl-1">{conversation.handCarrier}</a>
                <a href="#/messages/21" alt="contact requestor" class="pl-1">
                  <svg class="lnr lnr-bubble"><use alt="contact requestor" xlink:href="#lnr-bubble" /></svg>
                </a>
              </div>
            </div>
          {/if}

          <div class="row">
            <div class="col pb-1">
              Deliver to:
              <a target="_blank" href="https://www.google.com/maps/search/{conversation.destination}" class="pl-1">
                <svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker" /></svg>
                {conversation.destination}
              </a>
            </div>
          </div>

          <div class="row">
            <div class="col">
              Need between {conversation.needAfter} and {conversation.needBefore}
            </div>
          </div>

          <div class="row pt-4">
            <div class="col">
              {conversation.description}
            </div>
          </div>          
        </div>
      {/each}

      {#if conversations.length < 1}
        <i class="text-muted">none</i>
      {:else}
        <!-- TODO: need to work out the details on this piece of functionality 
        <p>
          <a class="btn btn-outline-secondary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Show/Hide Older Requests
          </a>
        </p>

        <div class="collapse" id="collapseExample">
          {#each conversations as conversation}
            <div class="highlight">
              <div class="row">
                <div class="col-8">
                  <a class="btn btn-sm btn-outline-info" href="#/requestform">
                    Duplicate
                  </a>
                  <strong>{conversation.title}</strong>
                </div>
                <div class="col-4">
                  {#if conversation.handCarrier.length > 0}
                    HandCourier:
                    <a href="#/profile">{conversation.handCarrier}</a>
                    <a href="#/messages/21" alt="contact requestor">
                      <svg class="lnr lnr-bubble"><use alt="contact requestor" xlink:href="#lnr-bubble" /></svg>
                    </a>
                  {/if}
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="float-right">
                    <svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker" /></svg>
                    {conversation.destination}, After {conversation.needAfter},
                    Before {conversation.needBefore}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div> -->
      {/if}
    </div>
  </div>
</div>
