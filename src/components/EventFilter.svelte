<script>
import { createEventDispatcher } from 'svelte'

export let eventId
export let events = []
export let placeholder = 'Upcoming Event'

const dispatch = createEventDispatcher()

// Set up a local variable we can bind to without that binding causing the input variable to change.
$: selectedEventId = eventId || ''

function onChange(domEvent) {
  dispatch('change', domEvent.target.value)
}
</script>

<select class="form-control form-control-sm" class:text-muted={!selectedEventId}
        bind:value={selectedEventId} on:change={onChange}>
  <option class="font-italic text-muted" value="">{ placeholder }</option>
  {#each events as event}
    <option class="text-dark" value={event.id}>{ event.name }</option>
  {/each}
</select>
