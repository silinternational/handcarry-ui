<script>
import {location} from 'svelte-spa-router'
</script>

<style>
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
   <a class="navbar-brand" href="/">HandCarry</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
   </button>

   <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
         <li class="nav-item">
            <a class="nav-link" class:active="{$location === '/requests'}" href="#/requests">
              Requests
             {#if $location === '/requests'}<span class="sr-only">(current)</span>{/if}
           </a>
         </li>
         <li class="nav-item">
            <a class="nav-link" class:active="{$location === '/commitments'}" href="#/commitments">
              Commitments
              {#if $location === '/commitments'}<span class="sr-only">(current)</span>{/if}
            </a>
         </li>
         <li class="nav-item">
            <a class="nav-link" class:active="{$location === '/messages'}" href="#/messages">
              Messages
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