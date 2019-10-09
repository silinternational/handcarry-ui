<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import { getRequest, cancelPost } from '../data/gqlQueries'
import { push } from 'svelte-spa-router'

export let params = {} // URL path parameters, provided by router.

let request = {}; loadRequest()
let me = {}

async function loadRequest() {
  const response = await getRequest(params.id)
  request = response.post
  me = response.user
}

$: requestor = request.createdBy || {}
$: isMine = requestor.id === me.id

async function cancel() {
  try {
    await cancelPost(params.id)

    push(`/requests`)
  } catch (e) {
    // TODO: need errorhandling
  }
}

function asReadableDate(timestamp) {
  return new Date(timestamp).toLocaleDateString()
}
</script>

<style>
div.card-img {
  min-height: 215px; /* wanted to keep short squatty images from making the whole card look weird. */
}
</style>

<h3 class="pb-4">Request detail</h3>

<div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-12 col-md-3 card-img">
      <RequestImage {request} />
    </div>

    <div class="col-md-9">
      <div class="card-body">
        <h5 class="card-title">
          { request.title || ''}
          {#if isMine}
          <button on:click={cancel} class="btn btn-sm btn-outline-danger rounded-circle float-right">
            <svg class="lnr lnr-trash"><use xlink:href="#lnr-trash"></use></svg>
          </button>
          {/if}
        </h5>
        <p>{ request.destination || ''}</p>
        <blockquote class="blockquote">
          { request.description }
          <footer class="blockquote-footer">
            { requestor.nickname } 
            {#if ! isMine}
            <a href="#/messages/new-conversation/{ params.id }" class="btn btn-success btn-sm m-1" role="button">
              <svg class="lnr lnr-bubble mr-2"><use xlink:href="#lnr-bubble"></use></svg>
              Start a discussion
            </a>
            {/if}
          </footer>
        </blockquote>
      </div>

      <div class="row p-2">
        <div class="col" />
        <div class="col-auto">
          {#if isMine}
          <button class="btn btn-sm btn-warning" disabled title="unavailable at this time">Edit</button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<a href="#/requests" class="text-secondary">« back to requests</a>
