<script>
  export let current = 'requests';
</script>

<style>
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
   <a class="navbar-brand" href="#">HandCarry</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
   </button>

   <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
         <li class="nav-item">
           <a class="nav-link" href="#requests">Requests</a>
         </li>
         <li class="nav-item">
           <a class="nav-link" href="#commitments">Commitments</a>
         </li>
         <li class="nav-item active">
           <a class="nav-link" href="#messages">Messages <span class="sr-only">(current)</span></a>
         </li>
         <li>
           <a class="nav-link" href="#profile">(avatar)</a>
         </li>
      </ul>
   </div>
</nav>