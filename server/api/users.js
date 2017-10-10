import { Router } from 'express'
import bodyParser from 'body-parser'
import passport from '../passport/auth'
import User from '../models/users'

const router = Router()

router.get('/users', (req, res) => {
  res.send({message: 'OK'})
})
/* UPDATE users password. */
router.put('/users/:id', bodyParser.json(),  function (req, res, next) {
  const id = req.params.id
  User.findOneAndUpdate({'_id': id, 'password': req.body.current_password}, { $set: { password: req.body.new_password} }, { new: true }).then((doc) => {
    if (doc) {
      return res.status(201).send(doc)
    }
    res.send({Error: 'Password is Incorrect'})
  }).catch(err => {
    console.log(err)
    res.send({Error: 'Database Error'})
  })
})

router.post('/register', bodyParser.urlencoded({extended: true}), (req, res) => {
  if (req.body.password !== req.body.password2) {
    req.flash('error', 'Passwords do not match')
    return res.redirect('/register')
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  user.save(err => {
    if (err) {
      console.log(err);
      req.flash('error', 'There was an error adding new user to DB')
      return res.redirect('/register')
    }
    req.login(user, err => {
      if (err) {
        req.flash('error', 'There was an error logging the new user in')
        return res.redirect('/register')
      }
      return res.redirect('/dashboard')
    })
  })
})

router.post('/login', bodyParser.json(), passport.authenticate('local'), (req, res) => {
  // If Authenticated by Passport req.user will be added by Passport
  if (req.user) {
    return res.send(req.user)
  }
});

// Sign In With Twitter


router.get('/auth/twitter/callback', (req, res, next) => {
  console.log('Heard back from Twitter')
  next()
}, passport.authenticate('twitter', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/logout', (req, res) => {
  req.logout()
  req.session.authUser = null
  res.redirect('/login')
})

export default router
