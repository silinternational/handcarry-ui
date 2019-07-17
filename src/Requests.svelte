<script>

    jQuery(document).ready(function() {
        var table = jQuery('#allRequests').DataTable( {
             "columnDefs": [
                 {
                     "targets": [ 7 ],
                     "visible": false,
                     "searchable": false
                 }
             ]
         } );

        jQuery('#allRequests tbody').on('click', 'tr', function () {
                var data = table.row( this ).data();
                alert( 'You clicked on '+data[7]+'\'s row' );
            } );
    } );
</script>

<style>
h3 {
    font-size: 1.4rem;
}
</style>

<div class="row">
    <h2>Requests <a href="#/requestform">[add]</a></h2>
</div>

<div class="row">

    <div class="col-12">



        <table class="table table-hover" id="allRequests">
            <thead>

                <tr>
                    <th>Request</th>
                    <th>Destination</th>
                    <th>Needed After</th>
                    <th>Needed Before</th>
                    <th>Cost</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>ID</th>
                </tr>
             </thead>
             <tbody>
                <tr>
                    <td>Burt's Bee's Lip Balm</td>
                    <td>Atlanta, GA, USA</td>
                    <td>18 Jul </td>
                    <td></td>
                    <td>4</td>
                    <td>Personal</td>
                    <td>Tiny</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Jif Peanut Butter</td>
                    <td>JAARS, NC, USA</td>
                    <td></td>
                    <td>3 Aug</td>
                    <td>5</td>
                    <td>Food</td>
                    <td>Small</td>
                    <td>5</td>
                 </tr>
             </tbody>
        </table>
    </div>
</div>