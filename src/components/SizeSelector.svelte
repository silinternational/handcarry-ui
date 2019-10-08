<script>
import SizeIndicator from './SizeIndicator.svelte'
import { sizes } from '../data/sizes'

export let selectedName
</script>

<style>
/* Technique based on https://stackoverflow.com/a/17541916 */
[type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

[type=radio]:focus + .btn-outline-dark {
  border-color: var(--blue);
  color: var(--blue);
}

[type=radio]:focus:hover + .btn {
  border-color: var(--dark);
  color: var(--light);
}

[type=radio]:hover + .btn {
  background-color: var(--blue);
}

label {
  cursor: pointer;
}

img {
  width: 60px;
}
</style>

<div class="form-row justify-content-center">
  {#each sizes as size }
    <div class="col-6 col-sm d-flex align-items-stretch mb-2">
      <label class="form-check-label d-block mb-1 w-100" for="size{size.type}">
        <input type="radio" name="size" id="size{size.type}" value={size.type} class="form-check-input" bind:group={selectedName}>
        <div class="btn btn-block h-100 d-flex align-items-end flex-column" class:btn-primary={selectedName === size.type} class:btn-outline-dark={selectedName !== size.type}>
          <div class="description w-100 d-sm-inline pb-2">{size.description}</div>
          <div class="picture mt-auto w-100 d-sm-inline pb-2"><img src="{size.pictureUrl}" alt={`picture of something ${size.name}`} /></div>
          <div class="w-100 d-sm-inline"><SizeIndicator size={size.name} /></div>
        </div>
      </label>
    </div>
  {/each}
</div>
