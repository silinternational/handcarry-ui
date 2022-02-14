<script>
import Uploader from 'components/Uploader.svelte'
import UserAvatar from 'components/UserAvatar.svelte'
import Watches from 'components/Watches.svelte'
import { me, changeNickname, changeProfilePicture } from 'data/user.js'

import Icon from 'fa-svelte'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

let editingNickname = false
let newNickname

$: orgs = $me.organizations || []
$: !newNickname && (newNickname = $me.nickname)

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
          <span class="pr-1">{$me.nickname}</span>

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

    <h2 class="pt-4 pb-2">Saved alerts</h2>
    <Watches />
  </div>

  <div class="col-md"/>
</div>
