<script>
  import LocationInput from 'components/LocationInput.svelte'
  import Uploader from 'components/Uploader.svelte'
  import { throwError } from 'data/error.js'
  import { events, update, create } from 'data/events.js'

  import { format, addDays } from 'date-fns'
  import { goto, params } from '@roxi/routify'

  const tomorrow = format(addDays(Date.now(), 1), 'yyyy-MM-dd')

  $: event = {}
  $: existingEvent = $events == null ? null : $events.find(({ id }) => id === $params.eventId)
  $: initializeUpdates(existingEvent)
  $: isNew = !event.id

  function initializeUpdates(eventBeingEdited) {
    if (!eventBeingEdited) return
    event = Object.assign({}, eventBeingEdited)
  }

  function assertHas(value, errorMessage) {
    if (!value) {
      throwError(errorMessage)
    }
  }

  function validate(event) {
    assertHas(event.name, 'Please provide the name of the event')
    assertHas(event.location, 'Please provide a location')
    assertHas(event.start_date, 'Please tell us the start date')
    assertHas(event.end_date, 'Please tell us the end date')
    let startDate = new Date(event.start_date)
    let endDate = new Date(event.endd_date)
    assertHas(startDate > endDate, "Start date can't be after end date")
  }

  async function onSubmit() {
    validate(event)

    if (isNew) await create(event)
    else await update(event)

    $goto(`/events`)

  }

  function imageUploaded(e) {
    event.image_file = e.detail
  }

  function onLocationChanged(e) {
    event.location = e.detail
  }

</script>

<style>
  .preview {
    max-height: 160px;
  }
</style>

{#if $events && !existingEvent && !isNew }
  <h2 class="mb-e">Event does not exist!</h2>
{:else if !isNew && !existingEvent?.is_editable }
  <h2 class="mb-e">You cannot edit this event!</h2>
{:else if $events}
  <h2 class="mb-3">{isNew ? "Create an " : "Edit"} Event</h2>

  <form on:submit|preventDefault={onSubmit} autocomplete="off">
    <div class="form-row form-group">
      <label for="event-name" class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
        Event name:
      </label>

      <div class="col">
        <input type="text" class="form-control form-control-lg" id="event-name" bind:value={event.name} placeholder="Event Name">
      </div>
    </div>

    <div class="form-row form-group">
      <div class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
        <label for="request-description">Description:</label>
        <small class="text-muted font-italic">(optional)</small>
      </div>
      <div class="col">
        <textarea class="form-control" bind:value={event.description} rows="3"
                    id="event-description" placeholder="Please describe the item" />
      </div>
    </div>

    <div class="form-row form-group">
      <div class="col-auto col-sm-3 col-lg-2 col-form-label-lg">
        Upload image: <br />
        <small class="text-muted font-italic">(optional)</small>
      </div>

      <div class="col-auto mt-1">
        <Uploader on:uploaded={imageUploaded} type={ event.image_file?.url ? 'change' : 'add'}/>
      </div>

      {#if event.image_file}
        <div class="col-12 col-sm-5 text-center text-sm-left">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={event.image_file.url} alt="Event image" class="preview" />
        </div>
      {/if}
    </div>

    <div class="form-row form-group">
      <span class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
        Location:
      </span>

      <div class="col">
        <div class="form-group">
          <LocationInput class="form-control form-control-lg" on:change={onLocationChanged}
                            placeholder="Location" location={event.location} />
        </div>
      </div>
    </div>

    <div class="form-row form-group">
      <div class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      <label for="event-start-date">
          Start Date:<br />
      </label>
      </div>
      <div class="col-auto">
        <input type="date" class="form-control form-control-lg" id="event-start-date" min={tomorrow} bind:value={event.start_date} />
      </div>
    </div>

    <div class="form-row form-group">
      <div class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      <label for="event-end-date">
          End Date:<br />
      </label>
      </div>
      <div class="col-auto">
        <input type="date" class="form-control form-control-lg" id="event-end-date" min={tomorrow} bind:value={event.end_date} />
      </div>
    </div>

    <div class="form-row form-group">
      <label for="event-more-info-url" class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
        More info URL:
      <small class="text-muted font-italic">(optional)</small>
      </label>

      <div class="col">
        <input type="url" class="form-control form-control-lg" id="event-more-info-url" bind:value={event.more_info_url} placeholder="https://example.com">
      </div>
    </div>

    <div class="form-row form-group">
      <div class="col-auto">
      <button type="submit" class="btn btn-primary float-right">
        {isNew ? "Create" : "Edit"} Event
      </button>
      </div>
    </div>
  </form>
{/if} 