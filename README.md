# Voting App for Free Code Camp

> Create, manage and share your polls with the world

## Build Setup

The Voting App is built using the Vue based Nuxt JS Framework with an Express backend and MongoDB Database.

To enable Twitter integration a /server/passport/config.js file is required.

``` javascript
module.exports = {
  consumerKey: '**************',
  consumerSecret: '***************',
  callbackURL: '<your-domain>/api/auth/twitter/callback'
}
```

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```
