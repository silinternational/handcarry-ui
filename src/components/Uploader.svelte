<script>
import { upload } from '../data/api'
import { createEventDispatcher } from 'svelte'

const dispatch = createEventDispatcher()

let file = {}
let uploading = false

async function chosen(event) {
  const formData = new FormData()
  formData.append('file', event.target.files[0])

  uploading = true
  file = await upload(formData)
  uploading = false

  dispatch('uploaded', file)
}
</script>

<style>
/* these are sort of ugle by default so let's hide it without losing it's capabilities */
input[type=file] {
  width: 0px;
  height: 0px;
}
label {
  cursor: pointer;
}
label.disabled {
  cursor: progress;
}
</style>

<label for="uploader" class="btn btn-primary d-inline-flex align-items-center" class:disabled={uploading}>
  {#if uploading}
  <span class="spinner-grow spinner-grow-sm mr-3" role="status" aria-hidden="true"></span>
  <span>Adding image</span>
  {:else}
  <svg class="lnr lnr-big lnr-cloud-upload mr-3"><use xlink:href="#lnr-cloud-upload" /></svg>
  <span>Add image</span>
  {/if}
</label>
<input id="uploader" type="file" accept="image/*" on:change={chosen} disabled={uploading} />

