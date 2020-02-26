<script>
import EventFilters from '../components/EventFilters.svelte'
import FilteredDisplay from '../components/FilteredDisplay.svelte'
import Icon from 'fa-svelte'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { clearEventFilter, populateEventFilterFrom } from '../data/eventFiltering'
import { init, events, loading } from '../data/events'
import { updateQueryString } from '../data/url'
import qs from 'qs'
import { onMount } from 'svelte'
import { querystring } from 'svelte-spa-router'

onMount(() => {
  init() // move to App.svelte if data is needed earlier.
})

const format = date => new Date(date).toLocaleDateString(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
const logoUrl = event => event.imageFile && event.imageFile.url || ''

let eventFilter = {}

$: queryStringData = qs.parse($querystring)
$: eventFilter = populateEventFilterFrom(queryStringData)

function onSetFilter(event) {
  const updates = event.detail
  updateQueryString(updates)
}
</script>

<style>
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
    <EventFilters filter={eventFilter} on:reset={clearEventFilter} on:set={onSetFilter} />
  </div>
  <div slot="items" let:items={filteredEvents}>
    {#if $loading}
      <p>⏳ Retrieving events...</p>
    {:else}
      {#each filteredEvents as event}
        <ol class="list-group mb-2">
          <li class="list-group-item">
            <div class="row">
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
            </div>
          </li>
        </ol>
      {:else}
        No upcoming events
      {/each}
    {/if}
  </div>
</FilteredDisplay>
