<script>
  import UserAvatar from '../components/UserAvatar.svelte'
  import { goto } from '@roxi/routify'
  import { Card } from '@silintl/ui-components'
  import { sizes } from '../data/sizes'

  export let request;

  $: user = request.createdBy || {}
  $: size = request.size
  $: from = request.origin?.description
  $: to = request.meeting ? request.meeting.name : request.destination.description
  $: photoUrl = request.photo?.url || ''
  $: imgUrl = photoUrl || getGraphicForSize(size)
  $: console.log(request)

  function getGraphicForSize(requestSize) {
    for (const size of sizes) {
      if (size.type === requestSize) {
        return size.genericGraphicUrl
      }
    }
  }
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
</style>

<div tabindex="0" on:click={ $goto(`/requests/${request.id}`) }>
  <Card class="mdc-card__primary-action h-100 py-1">
    <div class="flex justify-between align-items-center black m-2">
      <UserAvatar {user} small />

      <div class="request-header">
        <h5 class="multi-line-truncate my-0">{request.title}</h5>

        <div class="multi-line-truncate">{user.nickname}</div>
      </div>

      <span class="material-icons">chat</span>  
    </div>

    <div class="request-image flex justify-center mb-2">
      <img class="w-100" src={imgUrl} alt='item'/>
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
      <div class="content fs-12 gray max-height h-100 mb-1">
        Descriptons of stuff. More text to show how it will respond. Descriptons of stuff. More text to show how it will respond. Descriptons of stuff. More text to show how it will respond. Descriptons of stuff. More text to show how it will respond.
        
        <div class="fadeout align-center w-100"></div>
      </div>
    {/if}
  </Card>
</div>