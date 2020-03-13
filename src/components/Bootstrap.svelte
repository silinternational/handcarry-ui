<script>
import 'bootstrap'
</script>

<!-- use of this `global` attribute comes from svelte-preprocess, not Svelte. -->
<style lang="scss" global>
$theme-colors: (
  "dark-gray" :#292923,
  
  "primary": #0095F3,
  "blue": #0095F3,
  
  "success": #67ae09,
  "green": #67ae09,
  
  "info": #0d98aa,
  "teal": #0d98aa,
  
  "warning": #ff731b,
  "orange": #ff731b,
  
  "danger": #e0221f,
  "red": #e0221f,
);

$enable-responsive-font-sizes: true;

@import "bootstrap/scss/bootstrap";
</style>
