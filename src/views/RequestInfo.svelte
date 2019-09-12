<script>
import { getRequest, cancelPost } from '../data/gqlQueries'
import { push } from 'svelte-spa-router'

export let params = {} // URL path parameters, provided by router.

let request = {}; loadRequest()
let requestor = ''
let me = {}

async function loadRequest() {
  const response = await getRequest(params.id)
  request = response.post
  requestor = request.createdBy
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
</script>

<h2 class="pb-4">{ request.title }</h2>

<div class="alert alert-warning text-center" role="alert">
  Kate, make me beautiful please
</div>

<pre style="font-size: x-small;">{ JSON.stringify(request, null, 2)}</pre>

<a href="#/requests" class="btn btn-secondary" role="button">Back to requests</a>
{#if isMine()}
<button on:click={cancel} class="btn btn-danger">cancel this request</button>
{:else}
<a href={`${window.location.hash}/new-conversation?with=${requestor.nickname}`} class="btn btn-success btn-sm" role="button">
  Start a conversation with { requestor.nickname } about this item
</a>
{/if}
