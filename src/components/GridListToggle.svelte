<script>
import Icon from 'fa-svelte'
import { createEventDispatcher } from 'svelte'
import { faThList, faTh } from '@fortawesome/free-solid-svg-icons'

export let buttonCssClass = ''
export let showAsList

const dispatch = createEventDispatcher()
</script>

<button class="btn btn-sm {buttonCssClass}" title="Show as a grid" on:click={() => dispatch('grid')} class:btn-secondary={!showAsList} class:btn-outline-secondary={showAsList}>
  <Icon icon={faTh} />
</button>
<button class="btn btn-sm {buttonCssClass}" title="Show as a list" on:click={() => dispatch('list')} class:btn-secondary={showAsList} class:btn-outline-secondary={!showAsList}>
  <Icon icon={faThList} />
</button>
