<script>
import { sizes } from '../data/sizes'
import SizeIndicator from '../components/SizeIndicator.svelte'

export let size
export let selected = false
export let isButton = false

const nonButtonCssClasses = 'border p-2 rounded text-center'

$: buttonCssClasses = 'btn btn-block ' + (selected ? 'btn-primary' : 'btn-outline-dark')
$: extraCssClasses = isButton ? buttonCssClasses : nonButtonCssClasses

$: match = sizes.find(s => s.type === size) || {}
$: description = match.description || ''
$: name = match.name || ''
$: pictureUrl = match.pictureUrl || ''
$: alt = name ? `picture of something ${name}` : ''
</script>

<style>
img {
  width: 60px;
}
/* Technique based on https://stackoverflow.com/a/17541916 */
/* TODO: fix this, it was broken by a dependency update. The primary effect is that a tab into this component does not
   outline the first size. */
input[type=radio]:focus + .btn-outline-dark {
  border-color: var(--blue);
  color: var(--blue);
}

[type=radio]:focus:hover + .btn {
  border-color: var(--dark);
  color: var(--light);
}

[type=radio]:hover + .btn {
  background-color: var(--blue);
}
</style>

<div class="{extraCssClasses} h-100 d-flex align-items-end flex-column">
  <div class="description w-100 d-sm-inline pb-2">{description}</div>
  <div class="picture mt-auto w-100 d-sm-inline pb-2"><img src="{pictureUrl}" {alt} /></div>
  <div class="w-100 d-sm-inline"><SizeIndicator {size} /></div>
</div>
