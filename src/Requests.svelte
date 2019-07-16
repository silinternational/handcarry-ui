<script>
    jQuery(document).ready(function() {
        jQuery('#allrequests').DataTable();
    } );
</script>

<style>
h3 {
    font-size: 1.4rem;
}
</style>

<div class="row">
    <h2>Requests</h2>
</div>

<div class="row">

    <div class="col-12">



        <table class="table table-hover" id="allrequests">
            <thead>

                <tr>
                    <th>Request</th>
                    <th>Destination</th>
                    <th>Needed After</th>
                    <th>Needed Before</th>
                    <th>Cost</th>
                    <th>Category</th>
                    <th>Size</th>
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
                </tr>
                <tr>
                    <td>Jif Peanut Butter</td>
                    <td>JAARS, NC, USA</td>
                    <td></td>
                    <td>3 Aug</td>
                    <td>5</td>
                    <td>Food</td>
                    <td>Small</td>
                 </tr>
             </tbody>
        </table>
    </div>
</div>