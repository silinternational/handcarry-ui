<script>
  import { getOneEvent, deleteOneEvent } from '../data/events'
  import { goto, params } from '@roxi/routify'

  let event = {}

  $: existingEvent = null
  $: $params.eventId && getOneEvent($params.eventId).then(e => existingEvent = e)
  $: initializeEvent(existingEvent)
  $: partsSelected = true

  function initializeEvent(existingEvent) {
    if (!existingEvent) {
      return
    }
    event = existingEvent
    event.invitations = [
      {
        email: "levi_wenger@sil.org",
        name: "Levi Wenger"
      },
      {
        email: "myeyesareonmizar@gmail.com",
        name: "cqptain"
      }
    ]
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

  function handleDelete() {
    deleteOneEvent(event.id)

    $goto("/events")
  }

  function getOrganizers() {
    let orgs = []

    event.participants.forEach(val => {
      if (val.is_organizer) orgs.push({name: val.user.nickname})
    })

    orgs.push({name: event.created_by.nickname})
    return orgs
  }

</script>

<style>
  #meeting-table {
    border-color: black;
    border-collapse: collapse;
    border-style: solid;
    border-width: 1px !important;
    width: 100%;
  }

  .meeting-row {
    border: 1px solid black;
    border-right: 0px;
    border-left: 0px;
  }

  td, th {
    border-style: none;
    text-align: left;
    padding: 8px;
  }

  #event-image {
    margin-right: 25px;
    max-width: 30%
  }

  #top {
    display: flex;
    justify-content: space-between;
  }

  #middle {
    display: flex;
  }

  #bottom {
    display: flex; 
    justify-content: space-between;
    margin-top: 100px;
  }

  .meeting-table-button {
    border-radius: 0;
    border-width: 0; 
    border-color: black;
    background-color: white;
    margin-top: 20px;
  }

  .meeting-table-button-selected {
    border-bottom-width: 2px;
  }

  #delete-button{
    background-color: #F30000;
    border-color: #F30000;
  }

  #delete-button:hover {
    background-color: #cd0000;
    border-color: #c00000;
  }

  #invite-button {
    border-width: 1px;
    border-color: black;
    border-radius: 4px;
    background-color: white;
    margin: 6px;
    padding: 5px 15px;
  }

  #button-row {
    display: flex;
    justify-content: space-between;
  }

  .participant-avatar {
    margin-right: 5px;
    width: 34px;
  }

  .alternate-padding {
    padding: 3px;
    padding-left: 0 !important;
  }
</style>

<div class="row mb-3">
  <div class="col">
    <a href="/events" class="text-secondary mb-3">« back to events</a>
  </div>
</div>

{#if event.id }
<div>
  <div id="top">
    <h2 class="mb-3">Event Details: {event.name}</h2>
    <div style="display: flex;">
      {#if event.is_deletable }<a on:click={handleDelete} class="btn btn-primary d-block m-2" id="delete-button">Delete Event</a>{/if}
      {#if event.is_editable }<a href="/events/{ encodeURIComponent(event.id) }/edit" class="btn btn-primary d-block m-2">Edit Event</a>{/if}
    </div>
  </div>
  <div id="middle">
      {#if event.image_file?.url}
        <div id="event-image" class="text-center">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img style="max-width: 100%;" src={event.image_file.url} alt="Event image"/>
        </div>
      {/if}
      <div>
        <div>{event.name}</div>
        <div>{event.location?.description}</div>
        <div>{format(event.start_date)} - {format(event.end_date)}</div>
        <!--TODO FUTURE: add support for meeting organization-->
        <div>Orgnizers: {formatOrgs(getOrganizers())} (<a href="/events/{ encodeURIComponent(event.id)}/add-co-organizer">Add</a>)</div>
        {#if event.description }
          <br />
          <div>{event.description}</div>
        {/if}
        <br />
        {#if event.more_info_url}
          <div>More Information: <a href="{event.more_info_url}" target="_blank">here</a></div>
        {/if}
      </div>
  </div>
  <br />
  <br />
  <!--TODO FUTURE: make this dependent on wether backend sends the participant and invite list-->
  {#if event.is_editable }
  <div id="tables">
    <div id="button-row">
      <div>
        <button class="meeting-table-button {partsSelected ? "meeting-table-button-selected" : ""}" on:click={() => partsSelected = true}>Participants ({event.participants.length})</button>
        <button class="meeting-table-button {!partsSelected ? "meeting-table-button-selected" : ""}" on:click={() => partsSelected = false}>Pending Invites ({event.invitations.length})</button>
      </div>
      <div>
        <button id="invite-button" on:click={() => $goto(`/events/${ encodeURIComponent(event.id)}/invite`)}>+ Invite Participants</button>
      </div>
    </div>
    {#if partsSelected }
      <table id="meeting-table">
        <tr class="meeting-row">
          <th>Name</th>
          <th>Join Method</th>
        </tr>
        {#each event.participants as participant}
          <tr class="meeting-row">
            <td class="alternate-padding"><img class="participant-avatar" src="{participant.user.avatar_url}" alt="Participant avatar">{participant.user.nickname}</td>
            <!--TODO FUTURE: add support for user specific orgs (can't access them right now)-->
            <!--TODO: add support for join method-->
            <td>Opt-In</td>
            <!--TODO: add support for the delete participant endpoint-->
            <!-- <td><a href="/events/{ encodeURIComponent(event.id) }/delete">Delete</a></td> -->
          </tr>
        {/each}
      </table>
    {:else}
      <table id="meeting-table">
        <tr class="meeting-row">
          <th>Email Address</th>
        </tr>
        {#each event.invitations as inv }
          <tr class="meeting-row">
            <td>{inv.email}</td>
            <!--TODO: add support for resending the invite-->
            <td><a href="/events/{ encodeURIComponent(event.id) }">Resend Invite</a></td>
            <!--TODO: add support for cancling invite -->
            <td><a href="/events/{ encodeURIComponent(event.id) }">Cancel Invite</a></td>
          </tr>
        {/each}
      </table>
    {/if}
  </div>
  {/if}
  <div id="bottom">
    <div></div>
    <div style="display: flex;">
      {#if event.is_deletable }<a on:click={handleDelete} class="btn btn-primary d-block m-2" id="delete-button">Delete Event</a>{/if}
      {#if event.is_editable }<a href="/events/{ encodeURIComponent(event.id) }/edit" class="btn btn-primary d-block m-2">Edit Event</a>{/if}
    </div>
  </div>
</div>
{/if}