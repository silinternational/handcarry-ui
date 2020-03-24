<script>
import GooglePlacesAutocomplete from '@silintl/svelte-google-places-autocomplete'
import { createEventDispatcher } from 'svelte'
import Icon from 'fa-svelte'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export let placeholder
export let location = null

$: description = (location && location.description) || ''

const dispatch = createEventDispatcher()
const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY
const options = {
  fields: ['address_components', 'geometry'],
  types: ['(cities)']
}

function onPlaceChanged(event) {
  const locationData = event.detail
  if (locationData) {
    selectLocation(locationData.text, locationData.place)
  } else {
    clearLocation()
  }
}

function selectLocation(description, place) {
  dispatch('change', {
    description: description,
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
    country: extractCountryCode(place.address_components),
  })
}

function extractCountryCode(addressComponents) {
  return addressComponents.filter(component => component.types.includes('country'))[0].short_name
}

function clearLocation() {
  dispatch('change', null)
}
</script>

<div class="input-group-prepend">
    <div class="input-group-text">
        <Icon icon={faMapMarkerAlt} />
    </div>
</div>
<GooglePlacesAutocomplete apiKey={googlePlacesApiKey} class={$$props.class} on:place_changed={onPlaceChanged} {options}
                          {placeholder} value={description} />
