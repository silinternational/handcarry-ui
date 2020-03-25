<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeSelector from '../components/SizeSelector.svelte'
import VisibilitySelector from '../components/VisibilitySelector.svelte'
import Uploader from '../components/Uploader.svelte'
import { me } from '../data/user'
import { requests, cancel, create, update } from '../data/requests'
import { push, pop } from 'svelte-spa-router'
import { format, addDays } from 'date-fns'
import LocationInput from '../components/LocationInput.svelte'
import WeightSelector from '../components/WeightSelector.svelte'
import Icon from 'fa-svelte'
import { faMapMarkerAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { updated, created, cancelled } from '../data/analytics'
import { throwError } from '../data/error'

export let params = {} // URL path parameters, provided by router.

let imageUrl = ''

const defaults = {
  title: '',
  description: '',
  visibility: 'SAME'
}
let request = {}
const tomorrow = format(addDays(Date.now(), 1), 'yyyy-MM-dd')

$: existingRequest = $requests.find(({ id }) => id === params.id)
$: initializeUpdates(existingRequest || defaults)
$: isNew = !request.id
$: if ($me.organizations && $me.organizations.length > 0) {
  request.viewableBy = $me.organizations[0].id
}

function initializeUpdates(requestBeingEdited) {
  request = Object.assign({}, requestBeingEdited)
}

function assertHas(value, errorMessage) {
  if (!value) {
    throwError(errorMessage)
  }
}

function validate(request) {
  assertHas(request.title, 'Please tell us what you are requesting')
  assertHas(request.destination, 'Please provide a destination')
  assertHas(request.size, 'Please tell us the size of the item you are requesting')
}

async function onSubmit() {
  validate(request)

  if (isNew) {
    await create({
        orgID: request.viewableBy,
        title: request.title,
        description: request.description,
        destination: request.destination,
        kilograms: request.kilograms,
        neededBefore: request.neededBefore, 
        origin: request.origin,
        photoID: request.photoID,
        size: request.size,
        visibility: request.visibility,
    })

    push(`/requests`)

    created()
  } else {
    await update(request)

    push(`/requests/${request.id}`)

    updated()
  }
}

function imageUploaded(event) {
  request.photoID = event.detail.id
  imageUrl = event.detail.url 
}

async function cancelRequest() {
  await cancel(params.id)

  push(`/requests`)
  
  cancelled()
}

function onDestinationChanged(event) {
  request.destination = event.detail
}

function onOriginChanged(event) {
  request.origin = event.detail
}

function OnVisibilityChanged(event) {
  request.visibility = event.detail
}

function onWeightChanged(event) {
  request.kilograms = event.detail
}
</script>

<style>
.image-preview {
  max-height: 160px;
}
</style>

<h2 class="mb-3">Make a Request</h2>

<form on:submit|preventDefault={onSubmit} autocomplete="off">
  <div class="form-row form-group">
    <label for="request-title" class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      Requesting:
    </label>
    
    <div class="col">
      <input type="text" class="form-control form-control-lg" id="request-title" bind:value={request.title} placeholder="What?">
    </div>
  </div>
  
  <div class="form-row form-group">
    <label class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      To:
    </label>
    
    <div class="col">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <Icon icon={faMapMarkerAlt} />
            </span>
          </div>

          <LocationInput class="form-control form-control-lg" on:change={onDestinationChanged}
                         placeholder="Destination city" location={request.destination} />
        </div>
      </div>
    </div>
  </div>
  
  <div class="form-row form-group">
    <label class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      From: <br />
      <small class="text-muted font-italic">(optional)</small>
    </label>
    
    <div class="col">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <Icon icon={faMapMarkerAlt} />
            </span>
          </div>

          <LocationInput class="form-control form-control-lg" on:change={onOriginChanged}
                         placeholder="Origin city" location={request.origin} />
        </div>
      </div>
    </div>
  </div>

  <div class="form-row form-group">
    <div class="col-12 col-md-3 col-lg-2 col-form-label-lg">Size: </div>
    <div class="col"><SizeSelector bind:selectedName={request.size} /></div>
  </div>
  
  <div class="form-row form-group">
    <div class="col-12 col-md-3 col-lg-2 col-form-label-lg">
      Weight:<br />
      <small class="text-muted font-italic">(optional)</small>
    </div>
    <div class="col"><WeightSelector on:change={onWeightChanged} kilograms={request.kilograms} /></div>
  </div>
  
  <div class="form-row form-group">
    <div class="col-auto col-sm-3 col-lg-2 col-form-label-lg">
      Upload image: <br />
      <small class="text-muted font-italic">(optional)</small>
    </div>

    <div class="col-auto mt-1">
      <Uploader on:uploaded={imageUploaded} type={ request.photo && request.photo.url ? 'change' : 'add'}/>
    </div>
    
    {#if imageUrl || request.photo && request.photo.url}
      <div class="col-12 col-sm-5 image-preview text-center text-sm-left">
        <img src={imageUrl || request.photo && request.photo.url} alt="Your image" class="image-preview" />
      </div>
    {/if}
  </div>
  
  <div class="form-row form-group">
    <div class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      <label for="request-description">Description:</label>
    </div>
    <div class="col">
      <textarea class="form-control" bind:value={request.description} rows="3" 
                id="request-description" placeholder="Please describe the item" />
    </div>
  </div>

  <div class="form-row form-group">
    <div class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      <label>
        Visibility:<br />
        <small class="text-muted font-italic">(Who can see this request)</small>
      </label>
    </div>
    <div class="col p-2">
      <VisibilitySelector on:change={OnVisibilityChanged} visibility={request.visibility} />
    </div>
  </div>

  <div class="form-row form-group">
    <div class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      <label for="request-needed-before">
        Needed before:<br />
        <small class="text-muted font-italic">(optional)</small>
      </label>
    </div>
    <div class="col-auto">
      <input type="date" class="form-control form-control-lg" id="request-needed-before" min={tomorrow} bind:value={request.neededBefore} />
    </div>
  </div>

  <div class="form-row form-group">
    <div class="col-auto">
      <a href="#/requests" on:click|preventDefault={pop} class="btn btn-outline-dark">« Cancel</a>
    </div>
    <div class="col"></div>
    
    {#if !isNew}
      <div class="col-auto text-center">
        <button type="button" on:click={cancelRequest} class="btn btn-outline-danger">
          <Icon icon={faTrash} /> Delete
        </button>
      </div>
      <div class="col"></div>
    {/if}
    
    <div class="col-auto">
      <button type="submit" class="btn btn-primary float-right">
        {#if isNew}
          Make request
        {:else}
          Update request
        {/if}
      </button>
    </div>
  </div>
</form>
