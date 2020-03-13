<script>
import Icon from 'fa-svelte'
import { faThList, faTh } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'
import { viewedRequestsAs } from '../data/analytics'
import { save, LIFESPAN, retrieve } from '../data/storage'

let chosen = retrieve('preference-grid-list-view') || 'grid'

const dispatch = createEventDispatcher()
const classes = `btn btn-sm ${$$props.class}`

$: isGrid = chosen === 'grid'
$: isList = chosen === 'list'

function wants(choice) {
  chosen = choice
  
  save('preference-grid-list-view', chosen, LIFESPAN.LONG)

  viewedRequestsAs(chosen)
  
  dispatch(chosen)
}
</script>

<button title="Show as a grid" on:click={() => wants('grid')} class={classes} class:btn-secondary={isGrid} class:btn-outline-secondary={!isGrid}>
  <Icon icon={faTh} />
</button>
<button  title="Show as a list" on:click={() => wants('list')} class={classes} class:btn-secondary={isList} class:btn-outline-secondary={!isList}>
  <Icon icon={faThList} />
</button>
