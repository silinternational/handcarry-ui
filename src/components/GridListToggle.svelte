<script>
import Icon from 'fa-svelte'
import { faThList, faTh } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'
import { viewedRequestsAs } from '../data/analytics'

export let buttonCssClass = ''

let chosen = 'grid'

const dispatch = createEventDispatcher()

$: isGrid = chosen === 'grid'
$: isList = chosen === 'list'

function wants(choice) {
  chosen = choice
  
  viewedRequestsAs(chosen)
  
  dispatch(chosen)
}
</script>

<button title="Show as a grid" on:click={() => wants('grid')} class="btn btn-sm {buttonCssClass}" class:btn-secondary={isGrid} class:btn-outline-secondary={!isGrid}>
  <Icon icon={faTh} />
</button>
<button  title="Show as a list" on:click={() => wants('list')} class="btn btn-sm {buttonCssClass}" class:btn-secondary={isList} class:btn-outline-secondary={!isList}>
  <Icon icon={faThList} />
</button>
