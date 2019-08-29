<script>
import { getRequest } from '../data/gqlQueries'

export let params = {} // URL path parameters, provided by router.

let request = {}; loadRequest()
let requestor = ''
async function loadRequest() {
  const response = await getRequest(params.id)
  request = response.post
  requestor = request.createdBy.nickname
}
</script>

<h2 class="pb-4">{ request.title }</h2>

<div class="alert alert-warning text-center" role="alert">
  Kate, make me beautiful please
</div>

<pre style="font-size: x-small;">{ JSON.stringify(request, null, 2)}</pre>

<a href="#/requests" class="btn btn-secondary btn-sm" role="button">Back to requests</a>
<a href={`${window.location.hash}/new-conversation?with=${requestor}`} class="btn btn-success btn-sm" role="button">
  Start a conversation with { requestor } about this item
</a>
