<script>
import { upload } from '../data/api'
import { createEventDispatcher } from 'svelte'
import Icon from 'fa-svelte'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

export let type = 'add'
export let small = false

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
/* these are sort of ugly by default so let's hide it without losing it's capabilities */
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

<label for="uploader" class="btn btn-primary d-inline-flex align-items-center" class:disabled={uploading} class:btn-sm={small}>
  {#if uploading}
    <span class="spinner-grow spinner-grow-sm mr-3" role="status" aria-hidden="true"></span>
    <span>{type === 'add' ? 'Adding' : 'Changing'} image</span>
  {:else}
    <Icon icon={faCloudUploadAlt} class="mr-2" />
    <span>{type === 'add' ? 'Add' : 'Change'} image</span>
  {/if}
</label>
<input id="uploader" type="file" accept="image/*" on:change={chosen} disabled={uploading} />

