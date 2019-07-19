<script>
import { post } from './gqlQueries';
import { push } from "svelte-spa-router";

let imgSrc = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"

let request = {
    title: '',
    destination: '',
    description: '',
    neededAfter: '',
    neededBefore: '',
    category: '',
    size: '',
    cost: '',
    viewableBy: '',
    image: '',
    url: '',

};

function updateImage(event) {
    imgSrc = URL.createObjectURL(event.target.files[0])
}

jQuery(function () {
    jQuery('[data-toggle="tooltip"]').tooltip();

})


async function onSubmit(event) {
    console.log(request);
    let response = await post({
      orgID: "5de70d9d-298f-4338-a13b-0801f63513c7",
      type: "REQUEST",
      title: request.title,
      description: request.description,
      destination: request.destination,
      size: request.size,
      neededAfter: request.neededAfter,
      neededBefore: request.neededBefore,
      category: request.category
    })
     console.log(response);
    push(`/requests`);
}
</script>

<style>

</style>

<h2>Make a Request</h2>

<br>

<form on:submit|preventDefault={ onSubmit }>

    <div class="row">
        <div class="form-group required col-12">
           <input class="form-control form-control-lg" id="requestTitle" type="text" bind:value={ request.title } placeholder="Request Title">
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
                        <input type="text" bind:value={ request.destination } class="form-control" id="requestDestination" required placeholder="City, State/Province, Country, or Region, etc.">
                    </div>
                    <small id="destRequired" class="form-text text-danger">Required</small>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 col-lg-4 col-xl-4 form-group">
                   <label for="viewableBy">Viewable By <svg class="lnr lnr-question-circle"><use xlink:href="#lnr-question-circle"></use></svg></label>
                   <select class="form-control" id="viewableBy"
                        bind:value={ request.viewableBy }
                         data-toggle="tooltip" data-placement="top" title="If your request is viewable by all trusted orgs, any organization using HandCarry can see it. These organizations have an agreement with your organization.">

                        <option value="1">All Trusted Orgs</option>
                        <option value="2">My Oranization</option>
                        <option value="3">My Organizational Unit</option>

                   </select>
               </div>

               <div class="col-sm-6 col-lg-4 col-xl-4 form-group">
                    <label for="needAfter">Need After</label>
                    <input type="date" bind:value={ request.neededAfter } class="form-control" id="neededAfter">
                </div>

                <div class="col-sm-6 col-lg-4 col-xl-4 form-group">
                    <label for="needBefore">Need By</label>
                    <input type="date" class="form-control" bind:value={ request.neededBefore } id="neededBefore" placeholder="">
                </div>


            </div>

            <div class="row">
                <div class="col-sm-12 col-lg-2 col-xl-4">
                    <label for="requestCost">Approximate Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input class="form-control" bind:value={ request.cost } type="number" value="100" id="requestCost">
                    </div>
                </div>

                <div class="col-sm-12 col-lg-4 col-xl-4 form-group">
                    <label for="requestSize">Approximate Size</label>
                    <select class="form-control" required id="requestSize" bind:value={ request.size }>
                         <option selected>Choose...</option>
                         <option value="Small">Small (purse)</option>
                         <option value="Medium">Medium (laptop)</option>
                         <option value="Large">Large (suitcase)</option>
                    </select>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4 form-group">
                    <label for="category">Category</label>
                        <select class="form-control" id="category" bind:value={ request.category }>
                            <option>Choose...</option>
                            <option value="Technology">Technology</option>
                            <option value="Food">Food</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
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
                    <input type="file" accept="image/*" on:change={updateImage} bind:value={ request.image }>
                </div>
            </div>
         </div>
        <!--Add in URL pull later --->
    </div>

    <div class="row">
        <div class="col-sm-12 col-lg-8 col-xl-8 form-group">
            <label for="url">Request URL</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><svg class="lnr lnr-link"><use xlink:href="#lnr-link"></use></svg></span>
                </div>
                <input class="form-control" type="url" bind:value={ request.url } id="url" placeholder="URL or Web Address for item (e.g. link to Amazon product)">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" bind:value={ request.description } rows="3" placeholder="A description of the thing you want brought."></textarea>
        </div>
    </div>

    <div class="row">
        <div class="col-9"></div>
        <div class="col-3">
            <button type="submit" class="btn btn-primary float-right">Make Request</button>
        </div>
    </div>

</form>