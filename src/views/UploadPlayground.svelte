<script>
import token from '../data/token'

let files = []
let httpBinResponse = {}

$: uploads = httpBinResponse.files && httpBinResponse.files.uploads

// needed this mapping since the FileList object does not have an iterator
function mapFiles(event) {
  httpBinResponse = {}

  for (let i = 0; i < event.target.files.length; i++) {
    // may need to release these urls (https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Using_object_URLs)
    event.target.files[i].url = URL.createObjectURL(event.target.files[i])
    files = [...files, event.target.files[i]]
  }
}

function prettySize(number) {
  if(number < 1024) {
    return number + 'bytes'
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB'
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB'
  }
}

async function upload() {
  const formData = new FormData()

  files.map(file => formData.append('uploads', file))

  const response = await fetch(`https://httpbin.org/post`, {
    method: 'post',
    body: formData,
  })

  httpBinResponse = await response.json()

  files.map(file => URL.revokeObjectURL(file.url))
  files = []
}
</script>

<style>
input[type=file] {
  visibility: hidden;
}
label {
  cursor: pointer;
}
section {
  /* this forces the flex column wrapping to start a new column */
  max-height: 1200px;
}
div.card {
  max-width: 300px;
}
</style>

<form action="https://httpbin.org/post" enctype="multipart/form-data" method="POST">
  <label for="filePicker" class="btn btn-primary btn-sm">Add some pics</label>
  <input id="filePicker" name="uploads" type="file" accept="image/*" multiple on:change={mapFiles} />
  
  {#if files.length}
  <button class="btn btn-primary btn-sm">upload (via form submit)</button>
  <button type="button" on:click={upload} class="btn btn-sm btn-outline-primary">upload (via xhr)</button>
  {/if}
</form>

<section class="d-flex flex-column flex-wrap">
  {#each files as image}
  <div class="card m-1">
    <img src={image.url} alt={image.name} class="img-fluid">
    <small class="card-footer text-muted">
      {image.name} ({prettySize(image.size)})
    </small>
  </div>
  {/each}
</section>

{#if uploads}
<img src={uploads} alt='uploaded pics'>
{/if}