<script>
import { createEventDispatcher } from 'svelte'

export let eventId
export let location
export let title
export let events = []
export let placeholder = 'City'

const dispatch = createEventDispatcher()

$: selectedLocation = location
$: selectedEventId = eventId || ''

function onLocationInput(domEvent) {
  dispatch('location', domEvent.target.value)
}

function onEventChange(domEvent) {
  dispatch('event', domEvent.target.value)
}
</script>

<label class="d-block">
  <p class="mb-1 text-muted">{ title }:</p>
  <input class="form-control form-control-sm" {placeholder} bind:value={selectedLocation}
         on:input={onLocationInput} />
</label>

{#if events.length }
  <p class="mb-2 text-center text-muted">– or –</p>
  
  <select class="form-control form-control-sm" class:text-muted={!selectedEventId}
          bind:value={selectedEventId} on:change={onEventChange}>
    <option class="font-italic text-muted" value="">Upcoming Event</option>
    {#each events as event}
      <option class="text-dark" value={event.id}>{ event.name }</option>
    {/each}
  </select>
{/if}
