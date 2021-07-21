<script>
  import Uploader from './Uploader.svelte'
  import { events } from '../data/events'
  import LocationInput from './LocationInput.svelte'
  import { throwError } from '../data/error'
  import { me } from '../data/user'
  import { goto, params } from '@roxi/routify'

  $: event = null
  $: existingEvent = $events.find(({ id }) => id === $params.eventId)
  $: initializeEvent(existingEvent)

  function initializeEvent(existingEvent) {
    if (!existingEvent) {
      return
    }
    event = existingEvent
  }

  const format = date => new Date(date).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const formatOrgs = orgs => {
    let output = ""

    for (let i = 0; i < (orgs.length - 1); i++) {
      output += orgs[i].name + (i == (orgs.length - 2) ? ", and " : ", ")
    }

    return output += orgs[orgs.length - 1].name
  }

</script>

<style>
  #part-table {
    border-collapse: collapse;
    border-style: solid;
    border-width: 1.5px;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    border-right: 0px;
    border-left: 0px;
  }

  #top {
    display: flex;
    justify-content: space-between;
  }

  #middle {
    display: flex;
  }
</style>

<!-- svelte-ignore empty-block -->
{#if $events.length != 0 && !event }
<h2 class="mb-3">Event not found!</h2>
{:else if $events.length != 0}
<div>
  <div id="top">
    <h2 class="mb-3">Event Details: {event.name}</h2>
    <a href="/events/{ encodeURIComponent(event.id) }/edit" class="btn btn-primary d-block m-2">Edit Event</a>
  </div>
  <div id="middle">
      {#if event.image_file?.url}
        <div class="col-12 col-sm-5 text-center text-sm-left">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img src={event.image_file.url} alt="Event image" class="preview" />
        </div>
      {/if}
      <div>
        <div>{event.name}</div>
        <div>{event.location?.description}</div>
        <div>{format(event.start_date)} - {format(event.end_date)}</div>
        {#if $me.organizations} <div>Visible to members of {formatOrgs($me.organizations)}</div> {/if}
        <!--TODO: add support for co-orgnizers-->
        <div>Co-orgnizers: Jeff</div>
        <br />
        {#if event.more_info_url}
          <div>More Information: <a href="{event.more_info_url}" target="_blank">{event.more_info_url}</a></div>
        {/if}
      </div>
  </div>
  <br />
  <br />
  <div id="bottom">
    {#if existingEvent } 
      <table id="part-table">
        <tr class="part-row">
          <th>Name</th>
          <th>Organization</th>
          <th>Join Method</th>
        </tr>
        {#each event.participants as participant}
          <tr>
            <td>{participant.user.nickname}</td>
            <!--TODO: add support for user specific orgs (can't access them right now)-->
            <td>SIL</td>
            <!--TODO: add support for join method-->
            <td>Invitation</td>
            <td><a href="/events/{ encodeURIComponent(event.id) }/delete">Delete</a></td>
          </tr>
        {/each}
      </table>
    {/if}
  </div>
</div>
{/if}