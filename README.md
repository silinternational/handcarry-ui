# WeCarry app

## Dependencies
[Node](https://nodejs.org/en/download) and [Make](https://www.gnu.org/software/make)


## Local development
This project utilizes [Rollup](https://rollupjs.org) for its builds

> Ensure your `etc/hosts` has a `wecarry.local` alias to localhost

Install the project dependencies and start a local server
```
make
``` 


Navigate to [http://wecarry.local:5000](http://wecarry.local:5000). You should see your app running. Edit a component file in `src`, save it, and the page will automatically reload with your changes.

## Deployment

```bash
BASE_API_URL=http://wecarry.local:3000 npm run build
```

The contents of the `public` folder can then be deployed to your host
