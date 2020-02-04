<script>
import { createEventDispatcher } from 'svelte'
import { me } from '../data/user.js'

export let visibility

const dispatch = createEventDispatcher()

$: organizations = $me.organizations || []
$: organizationNames = organizations.map(org => org.name).join(' and ')
$: options = [
  {
    'value': 'SAME',
    'label': `Only members of ${organizationNames}`
  },
  {
    'value': 'TRUSTED',
    'label': `Only members of ${organizationNames} and affiliated organizations`
  },
  {
    'value': 'ALL',
    'label': `All WeCarry users`
  }
]
$: dispatch('change', visibility)
</script>

<style>
label {
  cursor: pointer;
}
</style>

<div class="form-check">
  {#each options as {value, label} }
    <label class="form-check-label d-block mb-1 w-100" for="{value}">
      <input type="radio" checked="{visibility === value}" class="form-check-input" bind:group={visibility}
             id={value} name="visibility" value={value}>
      { label }
    </label>
  {/each}
</div>
