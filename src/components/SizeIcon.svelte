<style>
.size-indicator {
	border: solid 2px;
	border-radius: 1em;
	font-weight: bold;
	height: 1.8em;
	width: 1.8em;
	margin: auto;
	text-align: center;
}
</style>

<script>
export let size;

let sizeContent = {
  'Tiny': '1',
  'Small': '2',
  'Medium': '3',
  'Large': '4',
}
$: content = getContentFor(size) 

function getContentFor(size) {
  if (size) {
    return sizeContent[size] || '?'
  }
  return '' 
}
</script>

{#if content }
  <div class="size-indicator" aria-disabled="true">{ content }</div>
{/if}
