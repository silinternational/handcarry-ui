<script>
  export let current = window.location.hash;
</script>

<style>
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
   <a class="navbar-brand" href="#">HandCarry</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
   </button>

   <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
         <li class="nav-item">
            <a class="nav-link" class:active="{current === '#requests'}" href="#requests">
              Requests
             {#if current === '#requests'}<span class="sr-only">(current)</span>{/if}
           </a>
         </li>
         <li class="nav-item">
            <a class="nav-link" class:active="{current === '#commitments'}" href="#commitments">
              Commitments
              {#if current === '#commitments'}<span class="sr-only">(current)</span>{/if}
            </a>
         </li>
         <li class="nav-item">
            <a class="nav-link" class:active="{current === '#messages'}" href="#messages">
              Messages
              {#if current === '#messages'}<span class="sr-only">(current)</span>{/if}
            </a>
         </li>
         <li>
            <a class="nav-link" class:active="{current === '#profile'}" href="#profile">
              (avatar)
              {#if current === '#profile'}<span class="sr-only">(current)</span>{/if}
           </a>
         </li>
      </ul>
   </div>
</nav>