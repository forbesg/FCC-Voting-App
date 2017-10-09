import passport from 'passport';
import Local from 'passport-local'
import User from '../models/users'

const LocalStrategy = Local.Strategy

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

export default passport;
