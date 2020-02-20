<script>
import { unreads } from '../data/messaging'
import { location } from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import polyglot from '../i18n'
import UserAvatar from './UserAvatar.svelte'
import { logout } from '../data/auth'
import CountIndicator from './CountIndicator.svelte'
import { 
  createRequestByFab, 
  clickedLogo,
  createRequestByButton,
  choseMyRequests,
  choseMyCommitments,
} from '../data/analytics'

export let user = {}
export let minimal = false

$: userIsAuthn = user.id
$: totalNumUnreads = $unreads.reduce((sum, { count }) => sum + count, 0)
</script>

<style>
.fab {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  z-index: 1030; /* matches bootstrap's suggestion for z-index-fixed */
}
</style>

{#if $location === '/requests'}
  <!-- only shown on phones -->
  <a href="/#/requests/new" title="{polyglot.t('nav-requests-create')}" on:click={createRequestByFab} class="btn btn-lg btn-success rounded-circle fab shadow-lg text-monospace d-block d-md-none">
    +
  </a>
{/if}

<nav class="navbar navbar-expand-md navbar-light bg-light mb-4">
  <a class="navbar-brand" href={userIsAuthn ? '/#/requests' : '/#/login'} on:click={clickedLogo}>
    <img src="/logo.svg" alt="WeCarry logo" />
  </a>

  {#if ! minimal}
    <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto align-items-center">
        {#if $location !== '/requests/new'}
          <li class="nav-item pr-2 d-none d-md-block"> <!-- hidden on phones -->
            <a href="/#/requests/new" on:click={createRequestByButton} class="btn btn-sm btn-success">
              {polyglot.t('nav-requests-create')}
            </a>
          </li>
        {/if}

        <li class="nav-item">
          <a href="/#/requests" class="nav-link" class:active={$location === '/requests'}>
            {polyglot.t('nav-requests')}
          </a>
        </li>

        <li class="nav-item">
          <a href="/#/messages" class="nav-link d-flex align-items-start" class:active={$location.startsWith('/messages')}>
            {polyglot.t('nav-requests-messages')} <CountIndicator number={totalNumUnreads} />
          </a>
        </li>

        <li class="nav-item dropdown">
          <a href="/#/profile" data-toggle="dropdown" id="avatarDropdown" class="nav-link dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
            <UserAvatar {user} small />
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="avatarDropdown">
            <a href="/#/profile" class="dropdown-item">
              {polyglot.t('nav-profile')}
            </a>

            <a href="/#/requests?creator={user.id}" on:click={choseMyRequests} class="dropdown-item">
              {polyglot.t('nav-requests-mine')}
            </a>

            <a href="/#/requests?provider={user.id}" on:click={choseMyCommitments} class="dropdown-item">
              {polyglot.t('nav-requests-commitments')}
            </a>

            <div class="dropdown-divider"></div>
            
            <button on:click={logout} class="dropdown-item">
              {polyglot.t('nav-sign-out')}
            </button>
          </div>
        </li>
      </ul>
    </div>
  {/if}
</nav>
