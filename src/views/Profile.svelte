<script>
import UserAvatar from '../components/UserAvatar.svelte'
import Uploader from '../components/Uploader.svelte'
import { me, changeNickname, changeProfilePicture } from '../data/user'
import Icon from 'fa-svelte'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

let editingNickname = false

$: nickname = $me.nickname
$: orgs = $me.organizations || []

async function imageUploaded(event) {
  await changeProfilePicture(event.detail.id)
}

async function saveNewNickname() {
  await changeNickname(nickname)

  editingNickname = false
}
</script>

<div class="row pt-4">
  <div class="col-lg"/>

  <div class="col-lg-2 d-flex flex-column align-items-center">
    <UserAvatar user={$me} />
    
    <div class="pt-2">
      <Uploader on:uploaded={imageUploaded} type='change' small />
    </div>
  </div>

  <div class="col-lg-5">
    <div class="form-group">
      {#if editingNickname}
        <form on:submit|preventDefault={saveNewNickname} class="input-group input-group-lg">
          <!-- svelte-ignore a11y-autofocus -->
          <input bind:value={$me.nickname} autofocus class="form-control">
          
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

  <div class="col-lg"/>
</div>  
