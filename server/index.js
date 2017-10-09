import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import session from 'cookie-session'
import passport from './passport/auth'
import flash from 'connect-flash'

import api from './api'

import './models/db'

if (process.env.NODE_ENV === 'production') {
  console.log('Setting Env')
  process.env.HOST = '0.0.0.0'
  process.env.PORT = 8080
}

const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

console.log(host, port);

app.set('port', port)

app.use(session({
  name: '_voting-session',
  secret: 'its time to vote',
  maxAge: 24 * 60 * 60 * 1000 // 24 Hours
}));

// Initialise passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});

// Initialise Flash Messages
app.use(flash());

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on port ' + port) // eslint-disable-line no-console
