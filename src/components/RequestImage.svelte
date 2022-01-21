<script>
import SizeIndicator from 'components/SizeIndicator.svelte'
import { sizes } from 'data/sizes.js'


export let request = {}
export let cssClass = ''
export let hideSize = false

$: size = request.size
$: photoUrl = (request.photo && request.photo.url) || ''
$: imgUrl = photoUrl || getGraphicForSize(size)

function getGraphicForSize(requestSize) {
  for (const size of sizes) {
    if (size.type === requestSize) {
      return size.genericGraphicUrl
    }
  }
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
  position: relative;
}

.size-indicator-container {
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
}
</style>

<div style="background-image: url({imgUrl})" class:request-photo={photoUrl} class:generic-graphic={!photoUrl} class="{cssClass}">
  <div class:d-none={hideSize} class="size-indicator-container"><SizeIndicator {size} /></div>
</div>
