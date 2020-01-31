<script>
import GooglePlacesAutocomplete from '@silintl/svelte-google-places-autocomplete'
import { createEventDispatcher } from 'svelte'

export let googlePlacesApiKey
export let placeholder

const dispatch = createEventDispatcher()
const options = {
  fields: ['address_components', 'geometry'],
  types: ['(cities)']
}

function onPlaceChanged(event) {
  
  console.log('place_changed', event.detail) // TEMP
  
  const place = event.detail.place
  const description = event.detail.text
  dispatch('locationSelected', {
    description: description,
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
    country: extractCountryCode(place.address_components),
  })
}

function extractCountryCode(addressComponents) {
  return addressComponents.filter(component => component.types.includes('country'))[0].short_name
}
</script>

<GooglePlacesAutocomplete apiKey={googlePlacesApiKey} class={$$props.class} on:place_changed={onPlaceChanged} {options}
                          {placeholder} />
