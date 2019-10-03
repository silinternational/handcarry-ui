<script>
import { getUser } from '../data/gqlQueries'
import { location } from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import polyglot from '../i18n'
import UserAvatar from './UserAvatar.svelte'
import { logoutUrl } from '../data/api'

let me = {}; loadMe()

async function loadMe() {
    const response = await getUser()
    me = response.user
}
</script>

<style>
nav :global(img) {
   height: 2rem;
}
</style>

<nav class="navbar navbar-expand-md navbar-light bg-light mb-4">
  <a class="navbar-brand" href="/">
    <img src="/logo.svg" alt="WeCarry logo" />
  </a>

  <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>

  {#if me.nickname}
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto align-items-center">
      <li class="nav-item dropdown">
        <a href="#" class:active={$location.startsWith('/request')} data-toggle="dropdown" id="navbarDropdown" class="nav-link dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
          {polyglot.t('nav-requests')}
          {#if $location.startsWith('/request')}
          <span class="sr-only">(current)</span>
          {/if}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/#/requests">
            {polyglot.t('nav-requests-view')}
          </a>
          <a class="dropdown-item" href="/#/requests/mine">
            {polyglot.t('nav-requests-mine')}
          </a>
          <a class="dropdown-item" href="/#/requests/new">
            {polyglot.t('nav-requests-create')}
          </a>
        </div>
      </li>

      <li class="nav-item">
        <a href="/#/commitments" class:active={$location.startsWith('/commitments')} class="nav-link">
          {polyglot.t('nav-requests-comittments')}
          {#if $location.startsWith('/commitments')}
          <span class="sr-only">(current)</span>
          {/if}
        </a>
      </li>

      <li class="nav-item">
        <a href="/#/messages" class:active={$location.startsWith('/messages')} class="nav-link">
          {polyglot.t('nav-requests-messages')}
          {#if $location.startsWith('/messages')}
          <span class="sr-only">(current)</span>
          {/if}
        </a>
      </li>

      <li class="nav-item dropdown">
        <a href="#" data-toggle="dropdown" id="avatarDropdown" class="nav-link dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
          <UserAvatar user={me} />
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="avatarDropdown">
          <a class="dropdown-item" href="/#/profile">
            My profile
          </a>
          
          <div class="dropdown-divider"></div>
          
          <a class="dropdown-item" href={logoutUrl}>
            Sign out
          </a>
        </div>
      </li>
    </ul>
  </div>
  {/if}
</nav>
