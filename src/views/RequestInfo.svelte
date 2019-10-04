<script>
import CategoryIcon from '../components/CategoryIcon.svelte'
import SizeIndicator from '../components/SizeIndicator.svelte'
import { getRequest, cancelPost } from '../data/gqlQueries'
import { push } from 'svelte-spa-router'

export let params = {} // URL path parameters, provided by router.

let request = {}; loadRequest()
let category = ''
let cost = ''
let description = ''
let destination = ''
let origin = ''
let requestor = ''
let requestorNickname = ''
let size = ''
let status = ''
let title = ''
let url = ''
let me = {}

async function loadRequest() {
  const response = await getRequest(params.id)
  request = response.post
  category = request.category
  cost = request.cost || ''
  description = request.description
  destination = request.destination
  origin = request.origin
  requestor = request.createdBy
  requestorNickname = requestor.nickname
  size = request.size
  status = request.status
  title = request.title
  url = request.url
  me = response.user
}

$: isMine = () => requestor.id === me.id

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

<h2 class="text-center">{ title }</h2>

<div class="row">
  <div class="col">
    <blockquote class="blockquote">
      <p class="mb-0">{ description }</p>
      <footer class="blockquote-footer">{ requestorNickname }</footer>
    </blockquote>
    {#if url }
      <p><a href="{ url }" target="_blank">{ url }</a></p>
    {/if}
  </div>
  
  <div class="col-3 col-sm-2">
    <div class="row">
      <div class="col">
        {#if category }
          <p class="text-center">
            <CategoryIcon {category} />
            <small><i>{ category }</i></small>
          </p>
        {/if}
      </div>
    </div>
    
    <div class="row">
      <div class="col">
        <p class="text-center">
          {#if size }
            <SizeIndicator {size} />
          {/if}
        </p>
      </div>
    </div>
  </div>
</div>

<hr />

<div class="row">
  <div class="col-md">
    {#if destination }
      <p>
        <b>Destination:</b><br />
        { destination }
      </p>
    {/if}
      
    {#if origin }
      <p>
        <b>Origin:</b><br />
        { origin }
      </p>
    {/if}
  </div>
  
  <div class="col-md">
    <p>
      {#if category }
        <b>Category:</b> { category }<br />
      {/if}
      
      {#if size }
        <b>Size:</b> { size }<br />
      {/if}
      
      {#if cost }
        <b>Cost:</b> { cost }<br />
      {/if}
    </p>
  </div>
  
  <div class="col-md">
    <p>
      <b>Status:</b> { status }<br />
    </p>
  </div>
</div>

<hr />

<div class="row">
  <div class="col text-center">
    <a href="#/requests" class="btn btn-secondary btn-sm m-1" role="button">Back to requests</a>
    {#if isMine()}
      <button on:click={cancel} class="btn btn-danger btn-sm m-1">Cancel this request</button>
    {:else}
      <a href="#/messages/new-conversation/{ params.id }" class="btn btn-success btn-sm m-1" role="button">
        Chat with { requestor.nickname } about this
      </a>
    {/if}
  </div>
</div>
