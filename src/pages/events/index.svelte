<script>
import EventFilters from '../../components/EventFilters.svelte'
import FilteredDisplay from '../../components/FilteredDisplay.svelte'
import Icon from 'fa-svelte'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { isParticipant, populateEventFilterFrom } from '../../data/eventFiltering'
import { join, events, loading } from '../../data/events'
import { me } from '../../data/user'
import { flip } from 'svelte/animate';
import { fade } from 'svelte/transition';
import { goto, params } from '@roxi/routify'

const format = date => new Date(date).toLocaleDateString([], {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})
const logoUrl = event => event.image_file?.url || ''

let eventFilter = {}

$: eventFilter = populateEventFilterFrom($params, $me)
</script>

<style>
.event-buttons-container .btn {
  width: 10em;
}

.event-buttons-container .btn:disabled {
  cursor: unset;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* these will get used only on XS screens */
.logo img {
  max-height: 5rem;
  margin-bottom: 2rem;
}
li {
  max-height: initial;
}

/* https://getbootstrap.com/docs/4.4/layout/overview/#responsive-breakpoints */
/* these will get used on everything above XS screens using bootstrap's breakpoint settings */
@media (min-width: 576px) {
  .logo img {
    max-width: 90%;
    max-height: 9rem;
    margin-bottom: initial;
  }
  li {
    max-height: 11rem;
    cursor: pointer;
  }

  li:hover {
    background-color: #f5f5f5;;
  }
}
</style>

<FilteredDisplay title="Events" filter={eventFilter} items={$events}>
  <div slot="filters">
    <EventFilters filter={eventFilter} />
  </div>
  <div slot="items" let:items={filteredEvents}>
    <button on:click={() => $goto("/events/new")} type="submit" class="btn btn-primary mb-2">Create Event</button>
    {#if $loading}
      <p>⏳ Retrieving events...</p>
    {:else if filteredEvents.length }
      <ol class="list-unstyled">
        {#each filteredEvents as event (event.id) }
          <li class="border rounded mb-2 p-2"
              animate:flip="{{ duration: 350 }}"
              in:fade
              on:click={() => $goto(`/events/${event.id}`)}>
            <div class="row align-items-center">
              <div class="col-md-4 col-sm-5 logo">
                <img src="{logoUrl(event) || 'logo.svg'}" alt="event logo" />
              </div>
              <div class="col">
                <h4>{event.name}</h4>

                <div>{event.location.description}</div>
                <div class="pb-1">
                  {format(event.start_date)} – {format(event.end_date)}
                </div>

                {#if event.more_info_url}
                  <a href="{event.more_info_url}" target="_blank">
                    <Icon icon={faExternalLinkAlt} />
                    <small class="align-bottom">Event Website</small>
                  </a>
                {/if}
              </div>
              <div class="col-auto align-self-start">
                <div class="event-buttons-container">
                  <a href="/requests?event={ encodeURIComponent(event.id) }" class="btn btn-primary d-block m-2">View Requests</a>
                  {#if isParticipant($me, event) }
                    <button class="btn btn-light d-block m-2" disabled>Added</button>
                  {:else}
                    <button class="btn btn-secondary d-block m-2" on:click="{ () => join(event.id) }">Add to my events</button>
                  {/if}
                </div>
              </div>
            </div>
          </li>
        {/each}
      </ol>
    {:else}
      No upcoming events
    {/if}
  </div>
</FilteredDisplay>
