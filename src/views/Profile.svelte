<script>
export let name = 'John Smith';
export let avatarUrl = 'https://avatars3.githubusercontent.com/u/6233204?s=180&v=4';
export let contactMethods = [
    { 'type': 'Email', 'value': 'john_smith@example.org' },
    { 'type': 'WhatsApp', 'value': '555-123-4567' },
    { 'type': 'Skype', 'value': 'john_smith_example' },
];
</script>

<style>
h3 {
    font-size: 1.4rem;
}
</style>

<div class="row">
    <div class="col">
        <h2>{name}</h2>
    </div>
</div>

<div class="row">
    <div class="col-sm-4 col-lg-3">
        <img alt="Profile image" src="{avatarUrl}"
             style="width: 100%; max-width: 100px; height: auto;"/>
    </div>
    <div class="col-sm-8 col-lg-9">
        <h3>Contact Info</h3>
        <div class="container-fluid">
            <dl class="row">
                {#each contactMethods as contactMethod}
                    <dt class="col-sm-4 col-lg-3 col-xl-2">{contactMethod.type}:</dt>
                    <dd class="col-sm-8 col-lg-9 col-xl-10">{contactMethod.value}</dd>
                {/each}
            </dl>
        </div>
    </div>
</div>
