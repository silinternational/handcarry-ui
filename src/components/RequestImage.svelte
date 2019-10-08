<script>
import { sizes } from '../data/sizes'

export let request
export let cssClass = ''

let genericGraphicUrl
let photoUrl

$: photo = request.photo || {}
$: photoUrl = photo.url || ''
$: genericGraphicUrl = getGraphicForSize(request.size)

function getGraphicForSize(requestSize) {
  for (const size of sizes) {
    genericGraphicUrl = size.genericGraphicUrl
    if (size.type === requestSize) {
      break;
    }
  }
  return genericGraphicUrl
}
</script>

<style>
img {
  max-height: 100%;
  max-width: 100%;
}
</style>

{#if photoUrl }
  <img src={photoUrl} class="request-photo {cssClass}" alt="An example picture of {request.title}" />
{:else}
  <img src={genericGraphicUrl} class="generic-graphic {cssClass}" alt="A generic {request.size} item graphic" />
{/if}
