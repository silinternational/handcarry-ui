<script>
import UserAvatar from '../../components/UserAvatar.svelte'
import Uploader from '../../components/Uploader.svelte'
import { me, changeNickname, changeProfilePicture } from '../../data/user'
import { goto, params } from '@roxi/routify'
import qs from 'qs'

let weightPreference = ''
let home = null
let timezone = null
let newNickname = {}

$: initializeUpdates($me)

function initializeUpdates({ nickname }) {
  newNickname = nickname
}

async function save() {
  await changeNickname(newNickname)

  $goto($params['return-to'] || '/requests')
}

async function imageUploaded(event) {
  await changeProfilePicture(event.detail.id)
}
</script>

<div class="row pt-4">
  <div class="col-lg"/>

  <div class="col-lg-7">
    <h1 class="text-center">Let's get personal</h1>

    <p class="text-center">
      To ensure your WeCarry experience is just right for you, please adjust the options below to your liking.  You can always change them later in your preferences.
    </p>
  </div>

  <div class="col-lg"/>
</div>

<div class="row pt-4">
  <div class="col-lg"/>

  <div class="col-lg-2 d-flex flex-column align-items-center">
    <UserAvatar user={$me} />

    <div class="pt-2">
      <Uploader on:uploaded={imageUploaded} type='change' small />
    </div>
  </div>

  <div class="col-lg-5">
    <div class="form-group pb-4">
      <label for="nickname"><strong>Choose a nickname</strong></label>
      <input id="nickname" aria-describedby="nicknameHelp" bind:value={newNickname} class="form-control">
      <small id="nicknameHelp" class="form-text text-muted">
        We display only your nickname to other users
      </small>
    </div>

    <!-- <div class="form-group pb-4">
      <strong class="d-block pb-1">How do you prefer to measure weight?</strong>
      <div class="form-check">
        <input id="pounds" type="radio" name="weightPreference" bind:group={weightPreference} value="pounds" class="form-check-input mr-2">
        <label for="pounds" class="form-check-label">pounds</label>
      </div>
      <div class="form-check">
        <input id="kilograms" type="radio" name="weightPreference" bind:group={weightPreference} value="kilograms" class="form-check-input mr-2">
        <label for="kilograms" class="form-check-label">kilograms</label>
      </div>
    </div>

    <div class="form-group pb-4">
      <label for="home"><strong>What is your "home" location?</strong></label>
      <input id="home" aria-describedby="homeHelp" bind:value={home} class="form-control">
      <small id="homeHelp" class="form-text text-muted">
        We will use this as a default destination on your new requests
      </small>
    </div> -->

<!-- TODO: if you can get this from the browser, use it as the default to the backend (Intl.DateTimeFormat().resolvedOptions().timeZone) -->
<!-- TODO: same for preferred lang. (const langOnlyNoVariant = navigator.language.substring(0,2) OR Intl.DateTimeFormat().resolvedOptions().locale..substring(0,2)) -->
    <!-- <div class="form-group pb-4">
      <label for="timezone"><strong>What is your timezone?</strong></label>
      <input id="timezone" aria-describedby="timezoneHelp" bind:value={timezone} class="form-control">
      <small id="timezoneHelp" class="form-text text-muted">
        When messaging with others, your timezone will be displayed to set expectations of whether you may respond soon or not
      </small>
    </div> -->
  </div>

  <div class="col-lg"/>
</div>


<div class="row">
  <div class="col"/>

  <div class="col-7">
    <button on:click={save} class="btn btn-primary float-right">Continue</button>
  </div>

  <div class="col"/>
</div>

