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
.generic-graphic {
  background-size: cover;
}
.request-photo {
  background-size: contain;
}

.generic-graphic,
.request-photo {
  background-position: center center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
</style>

{#if photoUrl }
  <div style="background-image: url({photoUrl})" class="request-photo {cssClass}" />
{:else}
  <div style="background-image: url({genericGraphicUrl})" class="generic-graphic {cssClass}" />
{/if}
