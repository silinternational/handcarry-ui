<script>
import UserAvatar from '../components/UserAvatar.svelte'
import Uploader from '../components/Uploader.svelte'
import { me, changeNickname, changeProfilePicture } from '../data/user'
import Icon from 'fa-svelte'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { getWatches } from '../data/watch'
import { onMount } from 'svelte'

let editingNickname = false
let newNickname = {}
let watches = []
let loading = false

onMount(async () => {
  try {
    loading = true
    watches = await getWatches()  
  } finally {
    loading = false
  }
})
      
$: orgs = $me.organizations || []
$: initializeUpdates($me)

function initializeUpdates({ nickname }) {
  newNickname = nickname
}

async function imageUploaded(event) {
  await changeProfilePicture(event.detail.id)
}

async function saveNewNickname() {
  await changeNickname(newNickname)

  editingNickname = false
}
</script>

<div class="row pt-4">
  <div class="col-md"/>

  <div class="col-md-2 d-flex flex-column align-items-center">
    <UserAvatar user={$me} />
    
    <div class="pt-2">
      <Uploader on:uploaded={imageUploaded} type='change' small />
    </div>
  </div>

  <div class="col-md-5">
    <div class="form-group">
      {#if editingNickname}
        <form on:submit|preventDefault={saveNewNickname} class="input-group input-group-lg">
          <!-- svelte-ignore a11y-autofocus -->
          <input bind:value={newNickname} autofocus class="form-control">
          
          <div class="input-group-append">
            <button class="btn btn-primary">Save</button>
          </div>
        </form>
      {:else}
        <h2 class="d-flex flex-row align-items-center">
          <span class="pr-3">{$me.nickname}</span>

          <button on:click={() => editingNickname = true} class="btn btn-outline-primary btn-sm rounded-circle">
            <Icon icon={faEdit} />
          </button>
        </h2>
      {/if}
    </div>

    <p>{$me.email}</p>

    {#each orgs as org}
      <span class="badge badge-pill badge-info mr-2">{org.name}</span>
    {/each}
  </div>

  <div class="col-md"/>
</div>

<div class="row">
  <div class="col-md" />

  <div class="col-md-3">
    <h2>Saved alerts</h2>

    {#each watches as watch}
      {watch.name}
    {:else}
      {#if loading}
        ⏳ checking for saved alerts...
      {:else}
        No saved alerts.
      {/if}
    {/each}
  </div>
  
  <div class="col-md" />
</div>
