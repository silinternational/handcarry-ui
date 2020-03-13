<script>
import Icon from 'fa-svelte'
import { faThList, faTh } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'

export let choice = 'grid'

const dispatch = createEventDispatcher()
const classes = `btn btn-sm ${$$props.class}`

$: isGrid = choice === 'grid'
$: isList = choice === 'list'
</script>

<button title="Show as a grid" on:click={() => dispatch('click', 'grid')} class={classes} class:btn-secondary={isGrid} class:btn-outline-secondary={!isGrid}>
  <Icon icon={faTh} />
</button>
<button  title="Show as a list" on:click={() => dispatch('click', 'list')} class={classes} class:btn-secondary={isList} class:btn-outline-secondary={!isList}>
  <Icon icon={faThList} />
</button>
