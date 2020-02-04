<script>
import { createEventDispatcher } from 'svelte'
import { me } from '../data/user.js'
import { describeVisibility } from '../data/visibility.js'

export let visibility

const dispatch = createEventDispatcher()
const values = ['SAME', 'TRUSTED', 'ALL']

$: organizations = $me.organizations || []
$: dispatch('change', visibility)
</script>

<style>
label {
  cursor: pointer;
}
</style>

<div class="form-check">
  {#each values as value }
    <label class="form-check-label d-block mb-1 w-100" for="{value}">
      <input type="radio" checked="{visibility === value}" class="form-check-input" bind:group={visibility}
             id={value} name="visibility" value={value}>
      { describeVisibility(value, organizations) }
    </label>
  {/each}
</div>
