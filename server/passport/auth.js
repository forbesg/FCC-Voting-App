import passport from 'passport';
import Local from 'passport-local'
import Twitter from 'passport-twitter'
import User from '../models/users'
// Should only be imported in development
// let config = require('./config')

const LocalStrategy = Local.Strategy
const TwitterStrategy = Twitter.Strategy

passport.use(new LocalStrategy ({
  usernameField: 'email'
},
  function (username, password, done) {
    User.findOne({email: username}, (err, user) => {
      if (err) { return done(err, null); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Twitter Strategy
passport.use(new TwitterStrategy ({
    consumerKey: process.env.TWITTER_CONSUMER_KEY || config.consumerKey,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || config.consumerSecret,
    callbackURL: process.env.TWITTER_CALLBACK_URL || config.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    // Use twitter username as email
    User.findOne({ email: `@${profile.username}` }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        let newUser = new User({
          email: `@${profile.username}`,
          name: profile.displayName,
          password: token
        });
        newUser.save().then(user => {
          done(null, user)
        }).catch(err => {
          done(err, false)
        })
      } else {
        done(null, user);
      }
    });
  }))

export default passport;
