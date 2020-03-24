<script>
import { createEventDispatcher } from 'svelte'
import Icon from 'fa-svelte'
import LocationInput from './LocationInput.svelte'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export let title
export let value
export let placeholder = 'City'

const dispatch = createEventDispatcher()

function onChange(event) {
  dispatch('change', event.detail)
}
</script>

  <p class="mb-1 text-muted">{ title }:</p>
  <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <Icon icon={faMapMarkerAlt} />
        </div>
      </div>

      <LocationInput class="form-control form-control-sm" on:change={onChange} {placeholder} location={value} />
  </div>
