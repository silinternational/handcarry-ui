<script>
import { createEventDispatcher } from 'svelte'

export let eventId
export let events = []
export let placeholder = 'Upcoming Event'

const dispatch = createEventDispatcher()

// Ensure that, if not given a value, we use an empty string (to match our "placeholder" option's value).
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
