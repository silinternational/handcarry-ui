<script>
import { posts, sendMessageToNewConversation } from "./gqlQueries";
import { push } from "svelte-spa-router";

function format(d) {
  // `d` is the original data object for the row
  return "Request description, who made it, picture, etc.";
}

function asReadableDate(timestamp) {
  if (!timestamp) {
    return "";
  }
  
  return new Date(timestamp).toLocaleDateString();
}

async function startConversation(postUuid) {
  let response = await sendMessageToNewConversation({
    content: 'Hi',
    postID: postUuid,
  });
  console.log(response.createMessage.thread.id);
  push(`/messages/${response.createMessage.thread.id}`);
}

// jQuery(document).ready(function() {
//     var requestTable = jQuery('#allRequests').DataTable({
//          order: [[1, 'desc']],
//          "columnDefs": [
//              {
//                   "targets": [ 0 ],
//                   "orderable": false,
//                   "searchable": false
//               },
//               {
//                  "targets": [ 8 ],
//                  "visible": false,
//                  "searchable": false
//               }
//          ]
//      });
// // Add event listener for opening and closing details
// jQuery('#allRequests tbody').on('click', 'td.details-control', function () {
//     var tr = jQuery(this).closest('tr');
//     var row = table.row( tr );

//     if ( row.child.isShown() ) {
//         // This row is already open - close it
//         row.child.hide();
//         tr.removeClass('shown');
//     }
//     else {
//         // Open this row
//         row.child( format(row.data()) ).show();
//         tr.addClass('shown');
//     }
// } );
// } );
</script>

<style>
/* td.details-control {
background: url("https://cdn0.iconfinder.com/data/icons/ie_Bright/512/plus_add_green.png")
    no-repeat center center;
cursor: pointer;
}
tr.details td.details-control {
background: url("https://www.pinclipart.com/picdir/middle/43-433525_plus-and-minus-icons-red-minus-sign-png.png")
    no-repeat center center;
} */
</style>

<div class="row">
  <div class="col-6">
    <h2>Requests</h2>
  </div>
  <div class="col-6">
    <div class="float-right">
      <a
        class="btn btn-primary"
        href="#/requests?a=all"
        aria-pressed="true"
        role="button">
        All
      </a>
      <a class="btn btn-outline-primary" href="#/requests?a=mine" role="button">
        My Requests
      </a>
      <a class="btn btn-outline-primary" href="#/commitments" role="button">
        My Commitments
      </a>
      <a class="btn btn-outline-primary" href="#/requestForm" role="button">
        Add
      </a>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-12">

  <div class="alert alert-light" role="alert">

      requests that show up here are the current user's OR uncommitted OR
      current user commitments
    </div>

    <table class="table table-hover" id="allRequests">
      <thead>
        <tr>
          <th />
          <th>Request</th>
          <th>Destination</th>
          <th>Needed After</th>
          <th>Needed Before</th>
          <th>Cost</th>
          <th>Category</th>
          <th>Size</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#await posts()}
          <p>⏳ retrieving requests...</p>
        {:then data}
        {#each data.posts as post}
          <tr>
            <td>
              {#if post.myThreadID}
                <a href="#/messages/{post.post.myThreadId}" alt="contact requestor"><svg class="lnr lnr-bubble"><use alt="contact requestor" xlink:href="#lnr-bubble"></use></svg></a>
              {:else}
                <button class="btn btn-link" on:click={ () => startConversation(post.uuid) }><svg class="lnr lnr-plus-circle"><use alt="contact requestor" xlink:href="#lnr-plus-circle"></use></svg></button>
              {/if}
            </td>
            <td>{ post.title }</td>
            <td>{ post.destination }</td>
            <td>{ asReadableDate(post.neededAfter) }</td>
            <td>{ asReadableDate(post.neededBefore) }</td>
            <td>{ post.cost || '–'}</td>
            <td>{ post.category || '–' }</td>
            <td>{ post.size || '–' }</td>
            <td>
            <!-- { #if request.mine }
                <svg class="lnr lnr-user"><use xlink:href="#lnr-user"></use></svg>
            {:else if request.committed }
                <svg class="lnr lnr-checkmark-circle"><use xlink:href="#lnr-checkmark-circle"></use></svg>
            {/if} -->
            </td>
          </tr>
        {/each}
        {:catch error}
          <p>🧨 Something went wrong: {error.message}</p>
        {/await}
      </tbody>
    </table>
  </div>
</div>
