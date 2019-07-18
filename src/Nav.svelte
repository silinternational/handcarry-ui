<script>
import { location } from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import polyglot from './i18n'
</script>

<style>
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
   <a class="navbar-brand" href="/#/requests"><svg class="lnr lnr-briefcase"><use alt="contact requestor" xlink:href="#lnr-briefcase"></use></svg> HandCarry</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
   </button>

   <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
         <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" class:active="{ $location.startsWith('/request') }"
               href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              { polyglot.t('nav-requests') }
              {#if $location === '/requests'}<span class="sr-only">(current)</span>{/if}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
               <a class="dropdown-item" href="#/requests">{ polyglot.t('nav-requests-view') }</a>
               <a class="dropdown-item" href="#/requestsmine">{ polyglot.t('nav-requests-mine') }</a>
               <a class="dropdown-item" href="#/requestform">{ polyglot.t('nav-requests-create') }</a>
            </div>
         </li>
         <li class="nav-item">
            <a class="nav-link" class:active="{$location === '/commitments'}" href="#/commitments">
              { polyglot.t('nav-requests-comittments') }
              {#if $location === '/commitments'}<span class="sr-only">(current)</span>{/if}
            </a>
         </li>
         <li class="nav-item">
            <a class="nav-link" class:active="{$location === '/messages'}" href="#/messages">
              { polyglot.t('nav-requests-messages') }
              <svg class="lnr lnr-bubble"><use alt="contact requestor" xlink:href="#lnr-bubble"></use></svg>
              {#if $location === '/messages'}<span class="sr-only">(current)</span>{/if}

            </a>
         </li>
         <li>
            <a class="nav-link" class:active="{$location === '/profile'}" href="#/profile">
              (avatar)
              {#if $location === '/profile'}<span class="sr-only">(current)</span>{/if}
           </a>
         </li>
      </ul>
   </div>
</nav>
