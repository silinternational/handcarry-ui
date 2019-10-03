<script>
import SizeSelector from '../components/SizeSelector.svelte'
import { getUser, createPost } from '../data/gqlQueries'
import { push } from 'svelte-spa-router'
import { format, addMonths } from 'date-fns'
import { GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps' //https://github.com/beyonk-adventures/svelte-googlemaps

let imgSrc = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'

let errorMessage = ''
let me = {}; loadMe()
let myOrgs = []

async function loadMe() {
    const response = await getUser()
    me = response.user
    myOrgs = me.organizations
    request.viewableBy = myOrgs[0].id // needed a default
}

let request = {
    title: '',
    destination: '',
    description: '',
    neededAfter: format(Date.now(), 'yyyy-MM-dd'),
    neededBefore: format(addMonths(Date.now(), 1), 'yyyy-MM-dd'), 
    size: '',
    image: '',
    weight: 0,
    weightUnits: ''
}

function updateImage(event) {
    imgSrc = URL.createObjectURL(event.target.files[0])
}

async function onSubmit(event) {
  try {
    await createPost({
        orgID: request.viewableBy,
        type: "REQUEST",
        title: request.title,
        description: request.description,
        destination: request.destination.formatted_address,
        size: request.size,
        neededAfter: request.neededAfter,
        neededBefore: request.neededBefore,
    })

    push(`/requests`)
  } catch (error) {
    errorMessage = error.message
    scrollTo(0, 0)
  }  
}
</script>

<h2 class="mb-3">Make a Request</h2>

<form on:submit|preventDefault={onSubmit} autocomplete="off">

  {#if errorMessage}
    <div class="alert alert-danger">{ errorMessage }</div>
  {/if}
  
  <div class="form-group form-row mb-0">
    <label for="request-title" class="col-12 col-sm-auto col-form-label-lg mb-1">
      Looking for someone to bring
    </label>
    <div class="col-12 col-sm mb-2">
      <input type="text" class="form-control form-control-lg" id="request-title" bind:value={request.title} placeholder="What?">
    </div>
  </div>
  
  <div class="form-group form-row">
    <label class="col-auto col-form-label-lg">
      to
    </label>
    <div class="col">
      <div class="form-group required">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker" /></svg>
            </span>
          </div>
          <GooglePlacesAutocomplete bind:value={ request.destination } placeholder="Where?" styleClass="form-control form-control-lg" apiKey={process.env.GOOGLE_PLACES_API_KEY} />
        </div>
      </div>
    </div>
  </div>

  <div class="form-group form-row">
    <div class="col-12 col-lg-1 col-form-label-lg">Size: </div>
    <div class="col-12 col-lg-11"><SizeSelector bind:selectedName={ request.size } /></div>
  </div>
  
  <div class="form-group form-row">
    <div class="col-auto col-form-label-lg">
      <label for="request-weight">Weight:</label>
    </div>
    <div class="col-auto">
      <input type="text" class="form-control form-control-lg" id="request-weight" bind:value={request.weight} />
    </div>
    <div class="col-auto">
      <select class="form-control form-control-lg" bind:value={request.weightUnits}>
        <option>lb</option>
        <option>kg</option>
      </select>
    </div>
  </div>
  
  <div class="form-row form-group">
    <div class="col col-form-label-lg mt-0">
      It looks like this:
      <button class="btn btn-outline-dark mx-2">Add image</button>
      <i class="text-muted">(optional)</i>
    </div>
  </div>
  
  <div class="row">
    <div class="col form-group">
      <label>Description</label>
      <textarea class="form-control" bind:value={request.description} rows="3" 
                placeholder="Please describe the item" />
    </div>
  </div>

  <div class="row">
    <div class="col-9" />
    <div class="col-3">
      <button type="submit" class="btn btn-primary float-right">
        Make Request
      </button>
    </div>
  </div>
</form>
