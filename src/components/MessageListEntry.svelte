<script>
export let active = false
export let conversation = {}
export let me = {}

$: isCreatedByMe = post => post.createdBy.id === me.id
$: isProvidedByMe = post => post.provider && post.provider.id === me.id
$: creator = post => post.createdBy && post.createdBy.nickname
$: messageFrom = participants => participants.filter(p => p.id !== me.id).map(p => p.nickname).join(', ')
</script>

<style>
</style>

<a href="#/messages/{ conversation.id }" class:active={ active } class="list-group-item list-group-item-action">
  { conversation.post.title } &ndash; { `${ isCreatedByMe(conversation.post) ? messageFrom(conversation.participants) : creator(conversation.post) }` }

  {#if isProvidedByMe(conversation.post)}
  <svg class="lnr lnr-checkmark-circle"><use xlink:href="#lnr-checkmark-circle"></use></svg>
  {/if}
</a>
