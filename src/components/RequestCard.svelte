<script>
  import RequestImage from '../components/RequestImage.svelte'
  import UserAvatar from '../components/UserAvatar.svelte'
  import { goto } from '@roxi/routify'
  import { Card } from '@silintl/ui-components'

  export let request;
  export let smaller = false;

  $: user = request.created_by || {}
  $: from = request.origin?.description
  $: to = request.meeting ? request.meeting.name : request.destination.description

  const gotoRequest = () => $goto(`/requests/${request.id}`)
</script>

<style>
  .content {
    overflow-wrap: anywhere;
  }

  .content.smaller {
    -webkit-line-clamp: 1;
  }

  .header {
    padding-left: 6px;
  }

  .multi-line-truncate {
    /* See https://stackoverflow.com/a/13924997 and https://caniuse.com/#search=line-clamp for details. */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* number of lines to show */
  }

  .line-clamp-1.smaller {
    -webkit-line-clamp: 1;
  }

  .line-clamp-3 {
    -webkit-line-clamp: 3;
  }

  .request-image {
    overflow: hidden;
    height: 10rem;
  }

  .request-image.smaller {
    height: 6rem;
  }

  h5.smaller {
    font-size: 1.15rem;
  }

  .smaller {
    font-size: 0.9rem;
  }

  .from-to {
    height: 3.5rem;
  }

  .from-to.smaller {
    height: auto;
    display: block;
  }
</style>

<Card isClickable noPadding on:click={gotoRequest} on:keypress={gotoRequest} class="h-100 py-1">
  <div class="flex justify-between align-items-center black m-2 px-1">
    <UserAvatar {user} small />

    <div class="header">
      <h5 class="multi-line-truncate my-0" class:smaller>{request.title}</h5>

      <div class="multi-line-truncate fs-14" class:smaller>{user.nickname}</div>
    </div>
    {#if !smaller}
      <span class="material-icons">chat</span>
    {/if}
  </div>

  <div class="card-img-top request-image text-center mb-2" class:smaller>
    <RequestImage {request} />
  </div>

  <div class="from-to flex justify-between black fs-14 mb-1 px-3" class:smaller>
    <div class="pr-3">
      <div class="uppercase fs-10">from</div>
      {#if from }
        <p class="mb-1 multi-line-truncate" class:smaller>{from}</p>
      {:else}
        <p class="mb-1 font-italic" class:smaller>anywhere</p>
      {/if}
    </div>

    <div>
      <div class="uppercase fs-10">to</div>

      <p class="mb-1 multi-line-truncate" class:smaller>{to}</p>
    </div>
  </div>

  <div class="content multi-line-truncate line-clamp-3 fs-12 gray mb-2 px-3"  class:smaller>
    {request.description  || ''}
  </div>
</Card>