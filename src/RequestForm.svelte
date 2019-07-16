<script>
</script>

<style>
h3 {
    font-size: 1.4rem;
}
</style>

<div class="row">
    <div class="col">
        <h2>Add a Request</h2>
        <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Need By</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="7/16/2019">
                </div>
                    <div class="form-group">
                                <label for="need_after">Need After</label>
                                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                              </div>


        <div class="form-group">
            <label for="exampleFormControlInput1">Destination</label>
            <input type="text" id="exampleFormControlInput1" placeholder="name@example.com">
          </div>

        <label for="max-cost" class="col-2 col-form-label">Max Cost</label>
          <div class="col-10">
            <input class="form-control" type="number" value="100" id="max-cost">
          </div>

<div class="form-group">
<label class="mr-sm-2" for="inlineFormCustomSelect">Max Size</label>
  <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
    <option selected>Choose...</option>
    <option value="1">Small (purse)</option>
    <option value="2">Medium (laptop)</option>
    <option value="3">Large (suitcase)</option>
  </select>
</div>
          <div class="form-group">
            <label for="exampleFormControlSelect2">Categories</label>
            <select multiple class="form-control" id="exampleFormControlSelect2">
              <option>Technology</option>
              <option>Food</option>
              <option>Personal</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </form>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Request</th>
                    <th>Destination</th>
                    <th>Needed After</th>
                    <th>Needed Before</th>
                </tr>
             </thead>
             <tbody>
                <tr>
                    <td>Burt's Bee's Lip Balm</td>
                    <td>Atlanta, GA, USA</td>
                    <td>18 Jul </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Jif Peanut Butter</td>
                    <td>JAARS, NC, USA</td>
                    <td></td>
                    <td>3 Aug</td>
                 </tr>
             </tbody>
        </table>
    </div>

</div>