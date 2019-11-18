<div class="d-flex flex-column align-items-center">
  <h1 class="py-4">Welcome to WeCarry!</h1>

  <!-- TODO: get real video from Sheryl -->
  <iframe src="https://www.youtube.com/embed/kXDeNWDlEqk" frameborder="0" title="Welcome video"/>
  
  <a href="/welcome/preferences" class="btn btn-primary mt-4">Continue</a>

  <footer class="pt-4">
    <a href="/welcome/privacy" class="pr-4">
      <small class="text-warning">Privacy policy</small>
    </a>

    <a href="/welcome/terms">
      <small class="text-warning">Terms of use</small>
    </a>
  </footer>
</div>

<style>
iframe {
  height: 315px;
  width: 560px;
}

/* ensures the entire video remains visible on phones */
@media (max-width: 576px) { 
  iframe {
    height: auto;
    width: 95vw;
  }
}
</style>