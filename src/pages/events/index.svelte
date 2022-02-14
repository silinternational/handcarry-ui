<script>
  import EventFilters from "components/EventFilters.svelte"
  import FilteredDisplay from "components/FilteredDisplay.svelte"
  import { isParticipant, populateEventFilterFrom } from "data/eventFiltering.js"
  import { join, events, loading } from "data/events.js"
  import { me } from "data/user.js"

  import Icon from "fa-svelte"
  import { faExternalLinkAlt, faEdit } from "@fortawesome/free-solid-svg-icons"
  import { goto, params } from "@roxi/routify"
  import * as animateScroll from "svelte-scrollto"
  import { flip } from "svelte/animate"
  import { fade } from "svelte/transition"

  const format = date =>
    new Date(date).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  const logoUrl = event => event.image_file?.url || ""

  let eventFilter = {}

  $: eventFilter = populateEventFilterFrom($params)

  function scrollToEvent(filteredEvents) {
    if ($params.scrollTo) {
      let eventNum

      filteredEvents.forEach((val, i) => {
        if (val.id == $params.scrollTo) eventNum = i + 1
      });

      if (!eventNum) return "";
      let eventId = `#event-${eventNum}`

      setTimeout(() => {
        animateScroll.scrollTo({
          element: eventId,
          duration: 1000,
        });
      }, 1000)

    }

    return ""
  }
</script>

<style>
  @keyframes event-blinking {
    25% {
      border-color: #dee2e6;
      background-color: white;
    }
    43.75%, 81.25% {
      border-color: #85888a;
      background-color: #f5f5f5;
    }
    62.5%, 100% {
      border-color: #dee2e6;
      background-color: white;
    }
  }

  .blinking {
    animation: event-blinking 4s;
  }

  .event-item {
    border: 1px solid #dee2e6;
  }

  .event-buttons-container .btn {
    width: 10em;
  }

  .event-buttons-container .btn:disabled {
    cursor: unset;
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
    <button
      on:click={() => $goto("/events/new")}
      type="submit"
      class="btn btn-primary mb-2">Create Event</button>
    {#if $loading}
      <p>⏳ Retrieving events...</p>
    {:else if filteredEvents.length}
      {scrollToEvent(filteredEvents)}
      <ol class="list-unstyled">
        {#each filteredEvents as event, i (event.id)}
          <li
            id="event-{i + 1}"
            class="rounded mb-2 half-p event-item {$params.scrollTo &&
            event.id == $params.scrollTo
              ? 'blinking'
              : ''}"
            animate:flip={{ duration: 350 }}
            in:fade>
            <div class="row align-items-center">
              <div class="col-md-4 col-sm-5 flex justify-center align-items-center logo">
                <img src={logoUrl(event) || "logo.svg"} alt="event logo" />
              </div>
              <div class="col">
                <div class="flex">
                  <h4 style="padding-right: 10px">{event.name}</h4>
                  {#if event.created_by.id == $me.id}
                    <a
                      style="paddding-top: 5px"
                      href="/events/{encodeURIComponent(event.id)}/edit">
                      <Icon style="padding-top: 2px;" icon={faEdit} />
                    </a>
                  {/if}
                </div>

                <div>{event.location.description}</div>
                <div class="pb-1">
                  {format(event.start_date)} – {format(event.end_date)}
                </div>

                {#if event.more_info_url}
                  <a href={event.more_info_url} target="_blank">
                    <Icon icon={faExternalLinkAlt} />
                    <small class="align-bottom">Event Website</small>
                  </a>
                {/if}
              </div>
              <div class="col-auto align-self-start">
                <div class="event-buttons-container">
                  <a href="/requests?event={ encodeURIComponent(event.id) }" class="btn btn-primary d-block half-m">View Requests</a>
                  {#if isParticipant(event) }
                    <button class="btn btn-light d-block half-m" disabled>Added</button>
                  {:else}
                    <button class="btn btn-secondary d-block half-m" on:click="{ () => join(event.id) }">Add to my events</button>
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
