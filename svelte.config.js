// needed scss support (as well as the global tag) for Bootstrap integration
// https://github.com/kaisermann/svelte-preprocess
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    // ...svelte-preprocess options
  }),
  // ...other svelte options
};