<script>
import { getMyRequests, confirmReceipt } from '../data/gqlQueries'
import { format } from 'date-fns'

let requests = []; loadMyRequests()

async function loadMyRequests() {
  const response = await getMyRequests()
  requests = response.user.posts
}

async function received(request) {
  try {
    await confirmReceipt(request.id)
    // TODO: not sure what the UX will be here yet.
    loadMyRequests()
  } catch (e) {
    // TODO: need errorhandling
  }
}

</script>

<h2 class="pb-4">My Requests</h2>

<div class="alert alert-warning text-center" role="alert">
  Kate, make me beautiful please
</div>

<div class="row">
  <div class="col-sm-12 col-lg-12">
    <div class="list-group list-group-flush" role="tablist">
      {#each requests as request}
        <div class="list-group-item">
          <div class="row pb-4">
            <div class="col-8">
              <h4 class="d-flex align-items-center">
                { request.title }
                <a class="btn btn-sm btn-outline-secondary ml-4 disabled" href="#/requestform">Edit</a>
                <a class="btn btn-sm btn-outline-danger ml-1 disabled" href="#/requestform">Cancel</a>
                <a class="btn btn-sm btn-outline-info ml-1 disabled" href="#/requestform">Duplicate</a>
              </h4>
            </div>
            <div class="col-4">
              {#if request.status === 'COMMITTED'}
                <button on:click={ () => received(request) } class="btn btn-primary float-right">Confirm Receipt</button>
              {:else if ! request.provider.nickname}
                <button class="btn btn-sm btn-outline-secondary float-right">No HandCourier yet</button>
              {/if}
            </div>
          </div>

          {#if request.provider.nickname }
            <div class="row">
              <div class="col pb-1">
                To be delivered by:
                <a href="#/profile" class="pl-1">{ request.provider.nickname }</a>
                <a href="#/messages/21" alt="contact requestor" class="pl-1">
                  <svg class="lnr lnr-bubble"><use alt="contact requestor" xlink:href="#lnr-bubble" /></svg>
                </a>
              </div>
            </div>
          {/if}

          <div class="row">
            <div class="col pb-1">
              Deliver to:
              <a target="_blank" href="https://www.google.com/maps/search/{ request.destination }" class="pl-1">
                <svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker" /></svg> { request.destination }
              </a>
            </div>
          </div>

          <div class="row">
            <div class="col">
              Needed between 
              <strong>
                { format(new Date(request.neededAfter), 'MMM e, yyyy') } – { format(new Date(request.neededBefore), 'MMM e, yyyy') }
              </strong>
            </div>
          </div>

          <div class="row pt-4">
            <div class="col">
              { request.description }
            </div>
          </div>          
        </div>
      {/each}

      {#if requests.length < 1}
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
