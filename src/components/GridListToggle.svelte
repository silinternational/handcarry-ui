<script>
import Icon from 'fa-svelte'
import { faThList, faTh } from '@fortawesome/free-solid-svg-icons'
import { createEventDispatcher } from 'svelte'

export let choice = 'grid'

const dispatch = createEventDispatcher()

$: isGrid = choice === 'grid'
$: isList = choice === 'list'
</script>

<button title="Show as a grid" on:click={() => dispatch('click', 'grid')} class="btn btn-sm {$$props.class}" class:btn-secondary={isGrid} class:btn-outline-secondary={!isGrid}>
  <Icon icon={faTh} />
</button>
<button  title="Show as a list" on:click={() => dispatch('click', 'list')} class="btn btn-sm {$$props.class}" class:btn-secondary={isList} class:btn-outline-secondary={!isList}>
  <Icon icon={faThList} />
</button>
