<script>
import RequestImage from '../components/RequestImage.svelte'
import SizeSelector from '../components/SizeSelector.svelte'
import Uploader from '../components/Uploader.svelte'
import { me } from '../data/user'
import { requests, cancel, create, update } from '../data/requests'
import { push, pop } from 'svelte-spa-router'
import { format, addMonths } from 'date-fns'
import { GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps' //https://github.com/beyonk-adventures/svelte-googlemaps
import Icon from 'fa-svelte'
import { faMapMarkerAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

export let params = {} // URL path parameters, provided by router.

// Needed to override the default 'regions' restriction in the GooglePlacesAutocomplete component
// so we could use house addresses, lat/long, etc...no need for restrictions.  See 
// (https://developers.google.com/places/supported_types#table3 && https://github.com/beyonk-adventures/svelte-googlemaps/blob/master/src/GooglePlacesAutocomplete.svelte#L15)
const options = {
  types: []
}

let imgSrc = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'
let errorMessage = ''
let imageUrl = ''
const newRequest = {
  title: '',
  description: ''
}

$: request = $requests.find(({ id }) => id === params.id) || newRequest
$: if ($me.organizations && $me.organizations.length > 0) {
  request.viewableBy = $me.organizations[0].id
}

function extractCountryCode(addressComponents) {
  return addressComponents.filter(component => component.types.includes('country'))[0].short_name
}

function assertHas(value, errorMessage) {
  if (!value) {
    throw new Error(errorMessage)
  }
}

function validate(request) {
  assertHas(request.title, 'Please tell us what you are requesting')
  assertHas(request.destination, 'Please provide a destination')
  assertHas(request.size, 'Please tell us the size of the item you are requesting')
  errorMessage = ''
}

async function onSubmit() {
  try {
    validate(request)

    if (request.id) {
      await update(request)

      push(`/requests/${request.id}`)
    } else {
      await create({
          orgID: request.viewableBy,
          type: "REQUEST",
          title: request.title,
          description: request.description,
          destination: {
            description: request.destination.formatted_address,
            latitude: request.destination.geometry.location.lat(),
            longitude: request.destination.geometry.location.lng(),
            country: extractCountryCode(request.destination.address_components),
          },
          photoID: request.photoID,
          size: request.size,
      })

      push(`/requests`)
    }
  } catch (error) {
    errorMessage = error.message
    scrollTo(0, 0)
  }  
}

function imageUploaded(event) {
  request.photoID = event.detail.id
  imageUrl = event.detail.url 
}

async function cancelRequest() {
  await cancel(params.id)

  push(`/requests`)
}
</script>

<style>
.image-preview {
  max-height: 160px;
}
</style>

<h2 class="mb-3">Make a Request</h2>

<form on:submit|preventDefault={onSubmit} autocomplete="off">
  {#if errorMessage}
    <div class="alert alert-danger">{errorMessage}</div>
  {/if}

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
      Destination:
    </label>
    
    <div class="col">
      {#if request.id}
        <!-- TODO: need to learn how to preload the GPA with existing values while having the value get loaded with the right location object, for now this is readonly  -->
        <input class="form-control form-control-lg" placeholder={request.destination.description} readonly>
      {:else}
      <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <Icon icon={faMapMarkerAlt} />
              </span>
            </div>

            <GooglePlacesAutocomplete bind:value={request.destination} placeholder="Where?" {options} apiKey={process.env.GOOGLE_PLACES_API_KEY} styleClass="form-control form-control-lg" />
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="form-row form-group">
    <div class="col-12 col-md-3 col-lg-2 col-form-label-lg">Size: </div>
    <div class="col"><SizeSelector bind:selectedName={request.size} /></div>
  </div>
  
  <!-- <div class="form-row form-group">
    <div class="col-12 col-sm-3 col-lg-2 col-form-label-lg">
      <label for="request-weight">Est. weight:</label>
    </div>
    <div class="col-4 col-sm-3 col-md-2 col-xl-1">
      <input type="text" class="form-control form-control-lg" id="request-weight" bind:value={request.weight} />
    </div>
    <div class="col-auto">
      <select class="form-control form-control-lg" bind:value={request.weightUnits}>
        <option>kg</option>
        <option>lb</option>
      </select>
    </div>
  </div> -->
  
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
    <div class="col-auto">
      <a href="#/requests" on:click|preventDefault={pop} class="btn btn-outline-dark">« Cancel</a>
    </div>
    <div class="col"></div>
    
    {#if request.id}
      <div class="col-auto text-center">
        <button on:click={cancelRequest} class="btn btn-outline-danger">
          <Icon icon={faTrash} /> Delete
        </button>
      </div>
      <div class="col"></div>
    {/if}
    
    <div class="col-auto">
      <button type="submit" class="btn btn-primary float-right">
        {#if request.id}
          Update request
        {:else}
          Make request
        {/if}
      </button>
    </div>
  </div>
</form>
