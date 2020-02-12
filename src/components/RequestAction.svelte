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
$: potentialProviders = request.potentialProviders || []
$: provider = request.provider || {}
$: hasProvider = !!provider.id
$: status = request.status
$: isMine = (creator.id === $me.id)
$: iOfferedToProvideIt = isInList($me, potentialProviders)
$: imProviding = (provider.id === $me.id)
$: isOpen = (status === 'OPEN')
$: isDelivered = (status === 'DELIVERED')
$: isAccepted = (status === 'ACCEPTED')
$: isCompleted = (status === 'COMPLETED')
$: iHaveDeliveredIt = isDelivered || isCompleted
$: participants = conversationParticipants || []
$: isConversingWithPotentialProvider = participants.some(participant => isInList(participant, potentialProviders))
$: isConversingWithProvider = isInList(provider, participants)

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

function isInList(user, listOfUsers) {
  return listOfUsers.some(({ id }) => id === user.id)
}
</script>

{#if isMine}
  {#if isOpen && isConversingWithPotentialProvider }
    {#each potentialProviders as potentialProvider }
      {#if isInList(potentialProvider, participants) }
        {potentialProvider.nickname} offered to bring this.
        <button class="btn btn-sm btn-success" on:click="{() => acceptOfferFrom(potentialProvider)}">Accept</button>
      {/if}
    {/each}
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
    {#if ! iHaveDeliveredIt }
      {creator.nickname} accepted your offer to bring this.
      <button class="btn btn-sm btn-info" on:click={delivered}>I delivered it</button>
    {:else}
      You delivered this.
    {/if}          
  {:else if hasProvider}
    Someone else has agreed to bring this.
  {:else if iOfferedToProvideIt }
    You offered to bring this.
  {:else}
    <button class="btn btn-sm btn-info" on:click={offerToProvide}>
      I can bring this
    </button>
  {/if}
{/if}
