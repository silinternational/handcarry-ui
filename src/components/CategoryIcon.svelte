<style>
.category-icon {
  font-size: 1.8em;
	margin: auto;
	height: 1.2em;
	width: 1.8em;
}
</style>

<script>
export let category;

let categoryCssClasses = {
  'Food': 'lnr-dinner',
  'Personal': 'lnr-user',
  'Unknown': 'lnr-frame-expand',
}
$: cssClass = getCssClassFor(category) 

function getCssClassFor(category) {
  if (category) {
    return categoryCssClasses[category] || 'lnr-frame-expand'
  }
  return '' 
}
</script>

{#if cssClass }
  <div class="category-icon" aria-label="{ category }"><svg class="lnr { cssClass }"><use xlink:href="#{ cssClass }" /></svg></div>
{/if}
