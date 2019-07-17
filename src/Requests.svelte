<script>

function format ( d ) {
    // `d` is the original data object for the row
    return 'Request description, who made it, picture, etc.';
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
                <tr>

                    <td><a href="#/messages/21" alt="contact requestor"><svg class="lnr lnr-bubble"><use alt="contact requestor" xlink:href="#lnr-bubble"></use></svg></a></td>
                     <td>Burt's Bee's Lip Balm</td>
                    <td>Atlanta, GA, USA</td>
                    <td>18 Jul </td>
                    <td></td>
                    <td>4</td>
                    <td>Personal</td>
                    <td>Tiny</td>
                    <td>21</td>
                    <td><svg class="lnr lnr-star"><use xlink:href="#lnr-star"></use></svg> </td>
                </tr>
                <tr>

                    <td><a href="#/messages/17" alt="contact requestor"><svg class="lnr lnr-bubble"><use xlink:href="#lnr-bubble"></use></svg></a></td>
                     <td>Jif Peanut Butter</td>
                    <td>JAARS, NC, USA</td>
                    <td></td>
                    <td>3 Aug</td>
                    <td>5</td>
                    <td>Food</td>
                    <td>Small</td>
                    <td>17</td>
                    <td><svg class="lnr lnr-star"><use xlink:href="#lnr-user"></use></svg> </td>
                 </tr>
                 <tr>
                     <td><a href="#/messages/1" alt="contact requestor"><svg class="lnr lnr-bubble"><use xlink:href="#lnr-bubble"></use></svg></a></td>
                     <td>Maple Syrup</td>
                     <td>Madrid, Spain</td>
                     <td>19 Jul</td>
                     <td>3 Aug</td>
                     <td>5</td>
                     <td></td>
                     <td>Medium</td>
                     <td>1</td>
                     <td></td>
                  </tr>
             </tbody>
        </table>
    </div>
</div>