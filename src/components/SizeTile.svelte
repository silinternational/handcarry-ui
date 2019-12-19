<script>
import { sizes } from '../data/sizes'
import SizeIndicator from '../components/SizeIndicator.svelte'

export let size
export let selected = false

$: match = sizes.find(s => s.type === size) || {}
$: description = match.description || ''
$: name = match.name || 'unknown'
$: pictureUrl = match.pictureUrl || ''
</script>

<style>
/* Technique based on https://stackoverflow.com/a/17541916 */
[type=radio]:focus + .btn-outline-dark {
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

img {
  width: 60px;
}
</style>

<div class="btn btn-block h-100 d-flex align-items-end flex-column" class:btn-primary={selected} class:btn-outline-dark={!selected}>
  <div class="description w-100 d-sm-inline pb-2">{description}</div>
  <div class="picture mt-auto w-100 d-sm-inline pb-2"><img src="{pictureUrl}" alt={`picture of something ${name}`} /></div>
  <div class="w-100 d-sm-inline"><SizeIndicator {size} /></div>
</div>
