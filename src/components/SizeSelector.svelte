<script>
import SizeTile from 'components/SizeTile.svelte'
import { sizes } from 'data/sizes.js'

export let selectedName = ''
</script>

<style>
/* Technique based on https://stackoverflow.com/a/17541916 */
[type=radio] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

label {
  cursor: pointer;
}
</style>

<div class="form-row justify-content-center">
  {#each sizes as size }
    <div class="col-6 col-sm d-flex align-items-stretch mb-2">
      <label class="form-check-label d-block mb-1 w-100" for="{size.type}">
        <input type="radio" name="size" id="{size.type}" value={size.type} class="form-check-input" bind:group={selectedName}>
        <SizeTile isButton size={size.type} selected={selectedName === size.type} />
      </label>
    </div>
  {/each}
</div>
