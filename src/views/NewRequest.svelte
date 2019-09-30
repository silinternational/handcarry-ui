<script>
import { getUser, createPost } from '../data/gqlQueries'
import { push } from 'svelte-spa-router'
import { format, addMonths } from 'date-fns'
import { GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps' //https://github.com/beyonk-adventures/svelte-googlemaps

let imgSrc = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'

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
    category: '',
    size: '',
    cost: '',
    viewableBy: '',
    image: '',
    url: ''
}

function updateImage(event) {
    imgSrc = URL.createObjectURL(event.target.files[0])
}

jQuery(function() {
    jQuery('[data-toggle="tooltip"]').tooltip()
})

async function onSubmit(event) {
    await createPost({
        orgID: request.viewableBy,
        type: "REQUEST",
        title: request.title,
        description: request.description,
        destination: request.destination.formatted_address,
        size: request.size,
        neededAfter: request.neededAfter,
        neededBefore: request.neededBefore,
        category: request.category,
        url: request.url,
        cost: request.cost
    })

    push(`/requests`)
}
</script>

<h2>Make a Request</h2>

<form on:submit|preventDefault={onSubmit}>
  <div class="row">
    <div class="form-group required col-12">
      <input class="form-control form-control-lg" bind:value={request.title} placeholder="Request Title" />
      <small class="form-text text-danger">Required</small>
    </div>
  </div>

  <div class="row">
    <div class="col-8">
      <div class="row">
        <div class="col-12 form-group required">
          <label class="control-label">Destination</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker" /></svg>
              </span>
            </div>
            <GooglePlacesAutocomplete bind:value={ request.destination } placeholder="City, State/Province, Country, or Region, etc." styleClass="form-control" apiKey={process.env.GOOGLE_PLACES_API_KEY} />
          </div>
          <small class="form-text text-danger">Required</small>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 col-lg-4 col-xl-4 form-group">
          <label>Viewable By <svg class="lnr lnr-question-circle"> <use xlink:href="#lnr-question-circle" /></svg></label>
          <select bind:value={request.viewableBy} class="form-control" data-toggle="tooltip" data-placement="top"
                  title="If your request is viewable by all trusted orgs, any organization using WeCarry can see it. These organizations have an agreement with your organization.">
            {#each myOrgs as org}
            <option value={org.id} selected>{org.name}</option>
            {/each}
          </select>
        </div>

        <div class="col-sm-6 col-lg-4 col-xl-4 form-group">
          <label>Need After</label>
          <input type="date" bind:value={request.neededAfter} class="form-control" />
        </div>

        <div class="col-sm-6 col-lg-4 col-xl-4 form-group">
          <label for="needBefore">Need By</label>
          <input type="date" class="form-control" bind:value={request.neededBefore} />
        </div>

      </div>

      <div class="row">
        <div class="col-sm-12 col-lg-4 col-xl-4">
          <label>Approximate Cost</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
            </div>
            <input class="form-control" bind:value={request.cost} />
          </div>
        </div>

        <div class="col-sm-12 col-lg-4 col-xl-4 form-group">
          <label>Approximate Size</label>
          <select class="form-control" required bind:value={request.size}>
            <option selected>Choose...</option>
            <option value="Small">Small (purse)</option>
            <option value="Medium">Medium (laptop)</option>
            <option value="Large">Large (suitcase)</option>
          </select>
        </div>
        <div class="col-sm-12 col-lg-4 col-xl-4 form-group">
          <label for="category">Category</label>
          <select class="form-control" bind:value={request.category}>
            <option>Choose...</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

      </div>
    </div>

    <div class="col-4">
      <div class="file-field">
        <img src={imgSrc} class="img-fluid" alt="Upload Request Image" />
      </div>
      <div class="d-flex justify-content-center">
        <div class="btn btn-mdb-color btn-rounded">
          <input type="file" accept="image/*" on:change={updateImage} bind:value={request.image} />
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12 col-lg-8 col-xl-8 form-group">
      <label>Request URL</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <svg class="lnr lnr-link">
              <use xlink:href="#lnr-link" />
            </svg>
          </span>
        </div>
        <input class="form-control" type="url" bind:value={request.url} placeholder="URL or Web Address for item (e.g. link to Amazon product)" />
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col form-group">
      <label>Description</label>
      <textarea
        class="form-control" bind:value={request.description} rows="3" placeholder="A description of the thing you want brought." />
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
