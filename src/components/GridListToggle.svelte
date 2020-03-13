<script>
import Icon from 'fa-svelte'
import { createEventDispatcher } from 'svelte'
import { faThList, faTh } from '@fortawesome/free-solid-svg-icons'
import { viewedRequestsAsGrid, viewedRequestsAsList } from '../data/analytics'

export let buttonCssClass = ''
export let showAsList

const dispatch = createEventDispatcher()

function wantsGrid() {
  viewedRequestsAsGrid()
  dispatch('grid')
}
function wantsList() {
  viewedRequestsAsList()
  dispatch('list')
}
</script>

<button class="btn btn-sm {buttonCssClass}" title="Show as a grid" on:click={wantsGrid} class:btn-secondary={!showAsList} class:btn-outline-secondary={showAsList}>
  <Icon icon={faTh} />
</button>
<button class="btn btn-sm {buttonCssClass}" title="Show as a list" on:click={wantsList} class:btn-secondary={showAsList} class:btn-outline-secondary={!showAsList}>
  <Icon icon={faThList} />
</button>
