<script>
export let selectedName

let sizes = [
  {
    'name': 'Tiny',
    'title': 'Tiny',
    'picture': '[altoids]',
    'description': 'Fits in a purse'
  },
  {
    'name': 'Small',
    'title': 'Small',
    'picture': '[book]',
    'description': 'Fits in a carry-on bag'
  },
  {
    'name': 'Medium',
    'title': 'Medium',
    'picture': '[laptop]',
    'description': 'Fits in a backpack'
  },
  {
    'name': 'Large',
    'title': 'Large',
    'picture': '[ ? ]',
    'description': 'Fits in a suitcase'
  },
  {
    'name': 'XLarge',
    'title': 'X-Large',
    'picture': '[ ? ]',
    'description': 'Is bigger than that...'
  },
]
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

<div class="form-row">
  {#each sizes as size }
    <div class="col-10 offset-1 col-sm offset-sm-0 col-lg-2 d-flex align-items-stretch">
      <label class="form-check-label d-block mb-1" for="size{size.name}">
        <input type="radio" name="size" id="size{size.name}" value={size.name} class="form-check-input" bind:group={selectedName}>
        <div class="btn btn-block h-100 d-flex align-items-end flex-column" class:btn-primary={selectedName === size.name} class:btn-outline-dark={selectedName !== size.name}>
          <div class="description w-100 d-sm-inline">{size.description}</div>
          <div class="picture mt-auto w-100 d-sm-inline">{size.picture}</div>
          <div class="title w-100 d-sm-inline">{size.title}</div>
        </div>
      </label>
    </div>
  {/each}
</div>
