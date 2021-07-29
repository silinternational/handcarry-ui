<script>
  import { getOneEvent, addCoOrganizers } from 'data/events.js'
  import { throwError, reset } from 'data/error.js'
  import { goto, params } from '@roxi/routify'

  let event = {}
  let emails

  $: $params.eventId && getOneEvent($params.eventId).then(e => event = e)

  /**
   * @description a function to handle submiting of invites
   */
  async function submitCoOrganizers() {
    if (!emails) return throwError("Please provide emails to add as co-organizers")

    let parsedEmails = parseEmails(emails)

    await addCoOrganizers($params.eventId, parsedEmails)

    $goto("/events")
    // TODO: use this when feature/meeting-detail branch is merged
    // $goto(`/events/${event.id}`)
  }

  /**
   * 
   * @description a function to parse a raw emails from the invite form
   * @param {String} emails
   * @returns {String}
   */
  function parseEmails(emails) {
    emails = emails.replaceAll(" ", "").replaceAll("\n", ",")
    let emailList = []

    emails.split(",").forEach((e, i) => {
      if (e == "") return
      let email = e.match(/(^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$)/gi)
      if (!email) throwError(`The ${formatPosition(i)} email provided is not a valid email address`)
      emailList.push(email[0])
    })

    return emailList
  }

  /**
   * 
   * @description a function to format a number (offset by -1) into "1st", "2nd" etc.
   * @param {Number} num
   * @returns {String}
   */
  function formatPosition(num) {
    switch (num) {
      case (0): {
        return "1st"
      }
      case (1): {
        return "2nd"
      }
      case (2): {
        return "3rd"
      }
      default: {
        return `${num + 1}th`
      }
    }
  }
</script>

<style>

  .form-container {
      margin: 0 auto;
  }

  #cancel-button {
    border: 1px black solid;
    border-radius: 4px;
    background-color: white;
    margin: 8px;
    padding: 5px 15px;
  }

  #cancel-button:hover {
    background-color: #e9ebf0;
  }

  #emails {
    margin-top: 0 !important;
    width: 100%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 15px;
    resize: none;
  }
</style>

{#if event.id }
  <div class="text-align-center">
    <div class="col-6 form-container">
      <h2>Add Co-organizers to {event.name}</h2>
      <form on:submit|preventDefault={submitCoOrganizers}>
        <label style="margin: 10px !important;" for="emails">Co-organizers can update this event and invite participants. Paste in a list of email addresses seperated by new lines or commas. An email will be sent notifying them of their new role for this event.</label>
        <textarea rows="4" id="emails" placeholder="Paste email addresses here" bind:value={emails} />
        <br />
        <div class="flex justify-between">
          <button id="cancel-button" on:click|preventDefault={() => $goto(`/events/${ encodeURIComponent(event.id) }`)}>{"<<"} Cancel</button>
          <input class="btn btn-primary d-block m-2 invite-submit" type="submit" value="Add">
        </div>
      </form>
    </div>
  </div>
{/if}