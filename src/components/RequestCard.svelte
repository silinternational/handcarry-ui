<script>
  import RequestImage from '../components/RequestImage.svelte'
  import UserAvatar from '../components/UserAvatar.svelte'
  import { goto } from '@roxi/routify'
  import { Card } from '@silintl/ui-components'

  export let request;
  export let smaller = false;

  $: user = request.createdBy || {}
  $: from = request.origin?.description
  $: to = request.meeting ? request.meeting.name : request.destination.description
</script>

<style>
  .content {
    overflow-wrap: anywhere;
  }

  .multi-line-truncate {
    /* See https://stackoverflow.com/a/13924997 and https://caniuse.com/#search=line-clamp for details. */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* number of lines to show */
  }

  .line-clamp-3 {
    -webkit-line-clamp: 3; /* number of lines to show */
  }

  .max-height {
    max-height: 100px;
    min-height: 40px;
    overflow: hidden;
  }

  .max-height .fadeout { 
    position: absolute; 
    bottom: 0; 
    left: 0;
    margin: 0; padding: 60px 0; 
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
  }

  .request-image {
    overflow: hidden;
    height: 10rem;
  }
  .request-image.smaller {
    height: 6rem;
  }
</style>

<div tabindex="0" on:click={ $goto(`/requests/${request.id}`) }>
  <Card class="mdc-card__primary-action h-100 py-1">
    <div class="flex justify-between align-items-center black m-2">
      <UserAvatar {user} small />

      <div>
        <h5 class="multi-line-truncate my-0">{request.title}</h5>

        <div class="multi-line-truncate">{user.nickname}</div>
      </div>

      <span class="material-icons">chat</span>  
    </div>

    <div class="card-img-top request-image text-center mb-2" class:smaller>
      <RequestImage {request} />
    </div>

    <div class="fs-14 mb-1">
      <div class="flex justify-between align-items-center black">
        <div>
          <div class="uppercase fs-10">from</div>
          {#if from }
            <p>{from}</p>
          {:else}
            <p class="font-italic">anywhere</p>
          {/if}
        </div>

        <div>
          <div class="uppercase fs-10">to</div>

          <p>{to}</p>
        </div>
      </div>
    </div>

    {#if true}
      <div class="content multi-line-truncate line-clamp-3 fs-12 gray max-height h-100 mb-1">
        Descriptons of stuff. More text to show how it will respond. Descriptons of stuff. More text to show how it will respond. Descriptons of stuff. More text to show how it will respond. Descriptons of stuff. More text to show how it will respond.
        
        <div class="fadeout align-center w-100"></div>
      </div>
    {/if}
  </Card>
</div>