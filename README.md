# Handcarry app


## Get started

1. Install Node
2. Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
BASE_API_URL=http://handcarry.local:3000 npm run dev
```

...then update your `etc/hosts` with a `handcarry.local` to localhost

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.


## Deploying to the web

```bash
BASE_API_URL=http://handcarry.local:3000 npm run build
```

And the deploy `public` contents to your host
