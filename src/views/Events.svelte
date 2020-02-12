<script>
import Icon from 'fa-svelte'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const events = [
  {
    imageFile: {
      url: 'logo.svg'
    },
    name: 'IT Connect / ICCM',
    location: {
      description: 'Nairobi, Kenya'
    },
    startDate: '2020-03-15',
    endDate: '2020-03-20',
    moreInfoURL: 'https://example.org/event-site',
  },
  {
    imageFile: {
      url: ''
    },
    name: 'EMDC',
    location: {
      description: 'Chaing Mai, Thailand'
    },
    startDate: '2020-03-04',
    endDate: '2020-03-09',
    moreInfoURL: 'https://example.org/event-site',
  }
]
</script>

<style>
.center-child {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<div class="row">
  <div class="col-12 col-md-auto text-center text-sm-left">
    <h2>Events</h2>
  </div>
</div>

<ol class="list-group mt-2">
  {#each events as event}
    <li class="list-group-item">
      <div class="row">
        <div class="col-4 center-child">
          <img src="{event.imageFile.url || 'logo.svg'}" alt="event logo" class="w-75" />
        </div>
        <div class="col">
          <h3>{event.name}</h3>
          
          <div>{event.location.description}</div>
          <div class="pb-1">
            {new Date(event.startDate).toLocaleDateString()} – {new Date(event.endDate).toLocaleDateString()}
          </div>

          <a href="{event.moreInfoURL}" target="_blank">
            <Icon icon={faExternalLinkAlt} />
            <small class="align-bottom">more information</small>
          </a>
        </div>
      </div>
    </li>
  {:else}
    No upcoming events
  {/each}
</ol>

<!-- TODO: need mobile view -->