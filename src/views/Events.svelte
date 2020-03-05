<script>
import EventFilters from '../components/EventFilters.svelte'
import FilteredDisplay from '../components/FilteredDisplay.svelte'
import Icon from 'fa-svelte'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { populateEventFilterFrom } from '../data/eventFiltering'
import { events, loading } from '../data/events'
import { isItemInList } from '../data/filtering'
import { updateQueryString } from '../data/url'
import { addToMyEvents, me } from '../data/user'
import qs from 'qs'
import { onMount } from 'svelte'
import { flip } from 'svelte/animate';
import { fade } from 'svelte/transition';
import { querystring } from 'svelte-spa-router'

const format = date => new Date(date).toLocaleDateString(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
const logoUrl = event => event.imageFile && event.imageFile.url || ''

let eventFilter = {}

$: queryStringData = qs.parse($querystring)
$: eventFilter = populateEventFilterFrom(queryStringData, $me)

function amParticipantIn(event) {
  return isItemInList(event, $me.meetingsAsParticipant)
}
</script>

<style>
.event-buttons-container .btn {
  width: 10em;
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
  }
}
</style>

<FilteredDisplay title="Events" filter={eventFilter} items={$events}>
  <div slot="filters">
    <EventFilters filter={eventFilter} />
  </div>
  <div slot="items" let:items={filteredEvents}>
    {#if $loading}
      <p>⏳ Retrieving events...</p>
    {:else if filteredEvents.length }
      <ol class="list-unstyled">
        {#each filteredEvents as event (event.id) }
          <li class="border rounded mb-2 p-2"
              animate:flip="{{ duration: 350 }}"
              in:fade>
            <div class="row align-items-center">
              <div class="col-md-4 col-sm-5 logo">
                <img src="{logoUrl(event) || 'logo.svg'}" alt="event logo" />
              </div>
              <div class="col">
                <h4>{event.name}</h4>
                
                <div>{event.location.description}</div>
                <div class="pb-1">
                  {format(event.startDate)} – {format(event.endDate)}
                </div>
      
                {#if event.moreInfoURL}
                  <a href="{event.moreInfoURL}" target="_blank">
                    <Icon icon={faExternalLinkAlt} />
                    <small class="align-bottom">Event Website</small>
                  </a>
                {/if}
              </div>
              <div class="col-auto align-self-start">
                <div class="event-buttons-container">
                  <a href="#/requests?event={ encodeURIComponent(event.id) }" class="btn btn-primary d-block m-2">View Requests</a>
                  <button class="btn btn-outline-dark d-block m-2" disabled={amParticipantIn(event)}
                          on:click="{ () => addToMyEvents(event.id) }">
                    {#if amParticipantIn(event) }
                      Added
                    {:else}
                      Add to my events
                    {/if}
                  </button>
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
