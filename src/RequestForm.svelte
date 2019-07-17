<script>
let imgSrc = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"

function updateImage(event) {
    imgSrc = URL.createObjectURL(event.target.files[0])
}
</script>

<style>
.lnr {
    display: inline-block;
    fill: currentColor;
    width: 1em;
    height: 1em;
    vertical-align: -0.05em;
}
</style>
<div class="row">
    <div class="col">
        <h2>Add a Request</h2>
    </div>
</div>

<br>

<form>

    <div class="row">
        <div class="form-group required col-12">
           <input class="form-control form-control-lg" id="requestTitle" type="text" placeholder="Request Title">
           <small id="titleHelp" class="form-text text-danger">Required</small>
        </div>
    </div>


    <div class="row">
        <div class="col-8">
            <div class="row">
                <div class="col-12 form-group required">
                    <label for="requestDestination" class="control-label">Destination</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><svg class="lnr lnr-map-marker"><use xlink:href="#lnr-map-marker"></use></svg></span>
                        </div>
                        <input type="text" class="form-control" id="requestDestination" required placeholder="City, State/Province, Country, or Region, etc.">
                    </div>
                    <small id="destRequired" class="form-text text-danger">Required</small>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 col-lg-3 col-xl-6 form-group">
                    <label for="requestNeedBy">Need By</label>
                    <input type="date" class="form-control" id="requestNeedBy" placeholder="">
                </div>

                <div class="col-sm-6 col-lg-3 col-xl-6 form-group">
                    <label for="need_after">Need After</label>
                    <input type="date" class="form-control" id="need_after" placeholder="7/16/2019">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 col-lg-2 col-xl-4">
                    <label for="requestCost">Approximate Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input class="form-control" type="number" value="100" id="requestCost">
                    </div>
                </div>

                <div class="col-sm-12 col-lg-4 col-xl-4 form-group">
                    <label for="requestSize">Approximate Size</label>
                    <select class="form-control" id="requestSize">
                         <option selected>Choose...</option>
                         <option value="1">Small (purse)</option>
                         <option value="2">Medium (laptop)</option>
                         <option value="3">Large (suitcase)</option>
                    </select>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4 form-group">
                    <label for="requestCat">Category</label>
                        <select class="form-control" id="requestCat">
                            <option>Choose...</option>
                            <option value="1">Technology</option>
                            <option value="2">Food</option>
                            <option value="3">Personal</option>
                            <option value="4">Other</option>
                        </select>
                </div>

             </div>
        </div>


        <div class="col-4">
            <div class="file-field">
                <img src={imgSrc} class="img-fluid" alt="Upload Request Image">
            </div>
            <div class="d-flex justify-content-center">
                <div class="btn btn-mdb-color btn-rounded">
                    <input type="file" accept="image/*" on:change={updateImage}>
                </div>
            </div>
         </div>
        <!--Add in URL pull later --->
    </div>

    <div class="row">
        <div class="col-sm-12 col-lg-8 col-xl-8 form-group">
            <label for="requestURL">Request URL</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><svg class="lnr lnr-link"><use xlink:href="#lnr-link"></use></svg></span>
                </div>
                <input class="form-control" type="url" id="requestURL" placeholder="URL or Web Address for item (e.g. link to Amazon product)">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col form-group">
            <label for="requestDesc">Description</label>
            <textarea class="form-control" id="requestDesc" rows="3" placeholder="A description of the thing you want brought."></textarea>
        </div>
    </div>

    <div class="row">
        <div class="col-9"></div>
        <div class="col-3">
            <button type="submit" class="btn btn-primary float-right">Add Request</button>
        </div>
    </div>

</form>