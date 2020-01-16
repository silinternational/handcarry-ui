<script>
import { me } from '../data/user'
import { provide, accept, deliver, receive } from '../data/requests'
import { 
  accepted,
  committed,
  trackReceived,
  trackDelivered,
 } from '../data/analytics'

export let request
export let conversationParticipants = []

$: creator = request.createdBy || {}
$: provider = request.provider || {}
$: status = request.status
$: isMine = (creator.id === $me.id)
$: imProviding = (provider.id === $me.id)
$: isCommitted = (status === 'COMMITTED')
$: isDelivered = (status === 'DELIVERED')
$: isAccepted = (status === 'ACCEPTED')
$: isCompleted = (status === 'COMPLETED')
$: participants = conversationParticipants || []
$: isConversingWithProvider = participants.some(({ id }) => id === provider.id)

async function acceptCommitment() {
  // TODO: updating post like this shouldn't be necessary, having to do it this way because conversations and requests are separate stores
  // and this component is only interested in the conversation (and it's attached post) and those changes aren't coming down... maybe a 
  // refactor needs to be considered here.
  request = await accept(request.id)

  accepted()
}

async function commit() {
  // TODO: see notes in `acceptCommitment`
  request = await provide(request.id)

  committed()
}

async function delivered() {
  // TODO: see notes in `acceptCommitment`
  request = await deliver(request.id)

  trackDelivered()
}

async function received() {
  // TODO: see notes in `acceptCommitment`
  request = await receive(request.id)

  trackReceived()
}
</script>

{#if isMine}
  {#if isCommitted }
    {provider.nickname} committed to bring this.
    {#if isConversingWithProvider}
      <button class="btn btn-sm btn-success" on:click={acceptCommitment}>Accept</button>
    {/if}
  {:else if isDelivered }
    {provider.nickname} delivered this.
    {#if isConversingWithProvider}
      <button class="btn btn-sm btn-success" on:click={received}>I received it</button>
    {/if}
  {:else if isAccepted }
    {provider.nickname} is set to deliver this to you.
    {#if isConversingWithProvider}
      <button class="btn btn-sm btn-success" on:click={received}>I already received it</button>
    {/if}
  {:else if isCompleted }
    It is finished.
  {/if}
{:else}
  {#if imProviding }
    {#if isCommitted }
      You committed to bring this.
    {:else if isAccepted }
      <button class="btn btn-sm btn-info" on:click={delivered}>I delivered it</button>
    {:else if isDelivered}
      You delivered this.
    {/if}          
  {:else if provider.id}
    Someone else has committed to bring this.
  {:else}
    <button class="btn btn-sm btn-info" on:click={commit}>
      I'll bring it
    </button>
  {/if}
{/if}
