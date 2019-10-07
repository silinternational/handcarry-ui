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

label {
  cursor: pointer;
  width: 100%;
}

.title {
  font-weight: bold;
}
</style>

<div class="form-row justify-content-center">
  {#each sizes as size }
    <div class="col-6 col-sm d-flex align-items-stretch mb-2">
      <label class="form-check-label d-block mb-1" for="size{size.name}">
        <input type="radio" name="size" id="size{size.name}" value={size.name} class="form-check-input" bind:group={selectedName}>
        <div class="btn btn-block h-100 d-flex align-items-end flex-column" class:btn-primary={selectedName === size.name} class:btn-outline-dark={selectedName !== size.name}>
          <div class="description w-100 d-sm-inline">{size.description}</div>
          <div class="picture mt-auto w-100 d-sm-inline my-1"><img src="{size.pictureUrl}" style="width: 60px;" alt={`picture of something ${size.name}`} /></div>
          <div class="title w-100 d-sm-inline"><SizeIndicator size={size.name} /></div>
        </div>
      </label>
    </div>
  {/each}
</div>
