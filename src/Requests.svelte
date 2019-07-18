<script>

    let requests = [
        {
            id: 21,
            title: "Burt's Bee's Lip Balm",
            destination: "Atlanta, GA, USA",
            needAfter: 1566100800000,
            size: 'Tiny',
            cost: 4,
            category: 'Personal',
            mine: true,
            committed: false,
        },
        {
                    id: 17,
                    title: "Jif Peanut Butter",
                    destination: "JAARS, NC, USA",
                    needBy: 1567310400000,
                    size: 'Small',
                    cost: 4,
                    category: 'Food',
                    mine: false,
                    committed: false,
                },
                {
                            id: 1,
                            title: "Maple Syrup",
                            destination: "Madrid, Span",
                            needAfter: 1566100800000,
                            size: 'Medium',
                            cost: 443,
                            category: 'Personal',
                            mine: false,
                            committed: true,
                        },
    ];



    function format ( d ) {
        // `d` is the original data object for the row
        return 'Request description, who made it, picture, etc.';
    }

     function asReadableDate(timestamp){
        if(!timestamp){
            return '';
        }
        return new Date(timestamp).toLocaleDateString();
     }

    jQuery(document).ready(function() {
        var requestTable = jQuery('#allRequests').DataTable( {
             order: [[1, 'desc']],
             "columnDefs": [

                 {
                      "targets": [ 0 ],
                      "orderable": false,
                      "searchable": false
                  },
                  {
                     "targets": [ 8 ],
                     "visible": false,
                     "searchable": false
                 }
             ]
         } );
        // Add event listener for opening and closing details
            jQuery('#allRequests tbody').on('click', 'td.details-control', function () {
                var tr = jQuery(this).closest('tr');
                var row = table.row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );
    } );
</script>

<style>
    td.details-control {
        background: url('https://cdn0.iconfinder.com/data/icons/ie_Bright/512/plus_add_green.png') no-repeat center center;
        cursor: pointer;
    }
    tr.details td.details-control {
        background: url('https://www.pinclipart.com/picdir/middle/43-433525_plus-and-minus-icons-red-minus-sign-png.png') no-repeat center center;
    }
</style>

<div class="row">
    <div class="col-6">
        <h2>Requests </h2>

    </div>
    <div class="col-6">
        <div class="float-right">
            <a class="btn btn-primary" href="#/requests?a=all" aria-pressed="true" role="button">All</a>
            <a class="btn btn-outline-primary" href="#/requests?a=mine" role="button">My Requests</a>
            <a class="btn btn-outline-primary" href="#/commitments" role="button">My Commitments</a>
            <a class="btn btn-outline-primary" href="#/requestForm" role="button">Add</a>
        </div>
    </div>
</div>

<div class="row">

    <div class="col-12">
        <p class="lead">requests that show up here are the current user's OR uncommitted OR current user commitments</p>
        <div class="bd-callout bd-callout-warning">
            <h5 id="making-tooltips-work-for-keyboard-and-assistive-technology-users">Making tooltips work for keyboard and assistive technology users</h5>

            <p>requests that show up here are the current user's OR uncommitted OR current user commitments</p>
        </div>

        <table class="table table-hover" id="allRequests">
            <thead>

                <tr>

                    <th></th>
                    <th>Request</th>
                    <th>Destination</th>
                    <th>Needed After</th>
                    <th>Needed Before</th>
                    <th>Cost</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>ID</th>
                    <th></th>
                </tr>
             </thead>
             <tbody>
                {#each requests as request}
                    <tr>
                        <td><a href="#/messages/{request.id}" alt="contact requestor"><svg class="lnr lnr-bubble"><use alt="contact requestor" xlink:href="#lnr-bubble"></use></svg></a></td>
                        <td>{ request.title }</td>
                        <td>{ request.destination }</td>
                        <td>{ asReadableDate(request.needAfter) }</td>
                        <td>{ asReadableDate(request.needBy) }</td>
                        <td>{ request.cost }</td>
                        <td>{ request.category }</td>
                        <td>{ request.size }</td>
                        <td>{ request.id }</td>
                        <td>
                            { #if request.mine }
                                <svg class="lnr lnr-user"><use xlink:href="#lnr-user"></use></svg>
                            {:else if request.committed }
                                <svg class="lnr lnr-checkmark-circle"><use xlink:href="#lnr-checkmark-circle"></use></svg>
                            {/if}
                        </td>
                    </tr>
                {/each}
             </tbody>
        </table>
    </div>
</div>